import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

// Exercise the actual route with an isolated environment and mocked mail provider.
// No test can send mail or read the developer's credentials.
function compile(file, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(
    readFileSync(new URL(file, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  vm.runInNewContext(code, { exports, ...globals });
  return exports;
}
const enquiry = compile("../src/lib/enquiry.ts");
function handler(
  env = {},
  fetch = () => {
    throw new Error("Unexpected mail request");
  },
) {
  return compile("../src/app/api/contact/route.ts", {
    require: (name) =>
      name === "next/server"
        ? { NextResponse: { json: (body, init) => Response.json(body, init) } }
        : enquiry,
    process: { env },
    fetch,
    TextDecoder,
    AbortSignal,
    URL,
  }).POST;
}
const valid = {
  ...enquiry.emptyEnquiry("contact"),
  firstName: "Test",
  lastName: "Visitor",
  email: "test@example.com",
  message: "A local-only delivery test.",
  consent: true,
};
const request = (body, headers = {}) =>
  new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
const configured = {
  RESEND_API_KEY: "test-only",
  RESEND_FROM_EMAIL: "test@example.com",
};

test("unconfigured delivery returns 503, never success", async () => {
  const response = await handler()(request(valid));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, undefined);
});
test("rejects malformed bodies, incorrect types and unsupported fields", async () => {
  for (const body of [
    null,
    [],
    { ...valid, firstName: {} },
    { ...valid, email: "invalid" },
    { ...valid, consent: "true" },
    { ...valid, type: "unknown" },
    { ...valid, interest: "unlisted" },
    { ...valid, message: "short" },
    { ...valid, company: "x".repeat(201) },
    { ...valid, website: "spam" },
  ])
    assert.equal((await handler()(request(body))).status, 400);
  assert.equal(
    (
      await handler()(
        new Request("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{invalid",
        }),
      )
    ).status,
    400,
  );
});
test("enforces application kind and area on the server", async () => {
  assert.equal(
    (await handler()(request({ ...valid, type: "application", kind: "" })))
      .status,
    400,
  );
  assert.equal(
    (
      await handler()(
        request({
          ...valid,
          type: "application",
          kind: enquiry.applicationKinds[0],
          area: "unknown",
        }),
      )
    ).status,
    400,
  );
});
test("rejects cross-origin, oversized and non-JSON requests", async () => {
  assert.equal(
    (await handler()(request(valid, { Origin: "https://example.org" }))).status,
    403,
  );
  assert.equal(
    (await handler()(request({ ...valid, message: "x".repeat(21000) }))).status,
    413,
  );
  assert.equal(
    (await handler()(request(valid, { "Content-Type": "text/plain" }))).status,
    415,
  );
});
test("returns success only when provider accepts with a delivery identifier", async () => {
  let payload;
  const send = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    payload = JSON.parse(options.body);
    return Response.json({ id: "test-delivery-id" });
  };
  const response = await handler(
    configured,
    send,
  )(
    request({
      ...valid,
      type: "application",
      kind: enquiry.applicationKinds[0],
      area: "Engineering",
    }),
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.match(payload.text, /Application: Internship \/ work experience/);
  assert.match(payload.text, /Area: Engineering/);
  assert.equal(payload.reply_to, "test@example.com");
  assert.equal(payload.subject, "Crown Power website application");
});
test("provider failure, network error and missing id never produce false success", async () => {
  for (const fetch of [
    async () => Response.json({}, { status: 500 }),
    async () => Response.json({}),
    async () => {
      throw new Error("private provider detail");
    },
  ]) {
    const response = await handler(configured, fetch)(request(valid));
    assert.equal(response.status, 502);
    const text = await response.text();
    assert.doesNotMatch(text, /private provider detail|test-only/);
  }
});
