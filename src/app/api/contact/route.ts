import { NextResponse } from "next/server";
import { emptyEnquiry, validateEnquiry, type Enquiry } from "@/lib/enquiry";
const error = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return error("Expected a JSON request.", 415);
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return error("This request is not allowed.", 403);
  // Bound the body even when the caller omits Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return error("Empty request.", 400);
  let size = 0;
  let raw = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20000) {
        await reader.cancel();
        return error("The enquiry is too large.", 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return error("Could not read the request.", 400);
  }
  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return error("Invalid request.", 400);
    body = parsed;
  } catch {
    return error("Invalid request.", 400);
  }
  if (body.type !== "contact" && body.type !== "application")
    return error("Invalid enquiry type.", 400);
  const values = emptyEnquiry(body.type);
  for (const key of Object.keys(values) as (keyof Enquiry)[]) {
    if (key === "type" || key === "consent") continue;
    if (body[key] !== undefined && typeof body[key] !== "string")
      return error("Invalid field value.", 400);
    values[key] =
      typeof body[key] === "string" ? body[key].trim() : values[key];
  }
  values.consent = body.consent === true;
  if (values.website) return error("The enquiry could not be accepted.", 400);
  if (Object.keys(validateEnquiry(values)).length)
    return error("Please check the required fields and try again.", 400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from)
    return error(
      "Online delivery is not available. Please email info@crownpoweruk.co.uk. Your details have not been sent.",
      503,
    );
  const text = [
    `Type: ${values.type}`,
    `Name: ${values.firstName} ${values.lastName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Company: ${values.company}`,
    `Interest: ${values.interest}`,
    `Application: ${values.kind}`,
    `Area: ${values.area}`,
    "",
    values.message,
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_TO_EMAIL || "info@crownpoweruk.co.uk"],
        reply_to: values.email,
        subject:
          values.type === "application"
            ? "Crown Power website application"
            : "Crown Power website enquiry",
        text,
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      return error(
        "The email service could not accept your message. Please email us directly.",
        502,
      );
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id)
      return error(
        "Delivery could not be confirmed. Please email us directly.",
        502,
      );
    return NextResponse.json({ ok: true });
  } catch {
    return error(
      "Delivery could not be confirmed. Please email us directly before resubmitting.",
      502,
    );
  }
}
