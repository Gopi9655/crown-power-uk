"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import {
  applicationKinds,
  applicationAreas,
  contactInterests,
  emptyEnquiry,
  validateEnquiry,
  type Enquiry,
  type FormErrors,
} from "@/lib/enquiry";
export function ContactForm({
  type = "contact",
  deliveryEnabled,
}: {
  type?: Enquiry["type"];
  deliveryEnabled: boolean;
}) {
  const [values, setValues] = useState(() => emptyEnquiry(type));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const application = type === "application";
  const set = (key: keyof Enquiry, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const validation = validateEnquiry(values);
    setErrors(validation);
    setServerError("");
    if (Object.keys(validation).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    if (!deliveryEnabled) {
      setStatus("error");
      setServerError(
        "Online delivery is not available. Your details have not been sent. Please email info@crownpoweruk.co.uk.",
      );
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true)
        throw new Error(
          result.error ||
            "We could not confirm delivery. Please try again or email us.",
        );
      setStatus("success");
      requestAnimationFrame(() =>
        document.getElementById("form-success")?.focus(),
      );
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "We could not confirm delivery. Please email us before resubmitting.",
      );
    }
  }
  const field = (
    key: "firstName" | "lastName" | "email" | "phone" | "company",
    label: string,
    inputType = "text",
    required = false,
    autoComplete?: string,
  ) => (
    <div className="field">
      <label htmlFor={key}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      <input
        id={key}
        name={key}
        type={inputType}
        required={required}
        autoComplete={autoComplete}
        value={values[key]}
        maxLength={key === "phone" ? 50 : 200}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      />
      {errors[key] && (
        <span className="field-error" id={`${key}-error`}>
          {errors[key]}
        </span>
      )}
    </div>
  );
  const select = (
    key: "kind" | "area" | "interest",
    label: string,
    options: string[],
    required = false,
  ) => (
    <div className={`field ${application ? "full-field" : ""}`}>
      <label htmlFor={key}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      <select
        id={key}
        name={key}
        value={values[key]}
        required={required}
        onChange={(e) => set(key, e.target.value)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      >
        {key !== "interest" && (
          <option value="">{required ? "Select…" : "No preference"}</option>
        )}
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {errors[key] && (
        <span id={`${key}-error`} className="field-error">
          {errors[key]}
        </span>
      )}
    </div>
  );
  return (
    <div className="form-panel">
      {status === "success" ? (
        <div
          className="form-status"
          id="form-success"
          tabIndex={-1}
          role="status"
        >
          <h2>{application ? "Application" : "Enquiry"} sent</h2>
          <p>
            Your message has been accepted by our email service. Thank you for
            contacting Crown Power.
          </p>
          <button
            className="button button-outline"
            onClick={() => {
              setValues(emptyEnquiry(type));
              setErrors({});
              setStatus("idle");
            }}
          >
            Send another {application ? "application" : "enquiry"}
          </button>
        </div>
      ) : (
        <form
          ref={form}
          onSubmit={submit}
          noValidate
          aria-busy={status === "submitting"}
        >
          <h2>{application ? "Your application" : "Send an enquiry"}</h2>
          <p className="form-note">
            Fields marked <span className="required">*</span> are required.
          </p>
          {!deliveryEnabled && (
            <p className="form-note">
              Online delivery is not available yet. Please{" "}
              <a href="mailto:info@crownpoweruk.co.uk">email our team</a> to
              send your {application ? "application" : "enquiry"}.
            </p>
          )}
          <div className="form-fields">
            {application &&
              select("kind", "I’m applying for", applicationKinds, true)}
            {field("firstName", "First name", "text", true, "given-name")}
            {field("lastName", "Last name", "text", true, "family-name")}
            {field("email", "Email", "email", true, "email")}
            {field("phone", "Phone", "tel", false, "tel")}
            {application ? (
              select("area", "Area of interest", applicationAreas)
            ) : (
              <>
                {field("company", "Company", "text", false, "organization")}
                {select("interest", "Area of interest", contactInterests)}
              </>
            )}
            <div className="field full-field">
              <label htmlFor="message">
                {application ? "Tell us about yourself" : "Message"}{" "}
                <span className="required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span id="message-error" className="field-error">
                  {errors.message}
                </span>
              )}
            </div>
            {application && (
              <div className="field full-field">
                <label htmlFor="cv">CV / supporting document</label>
                <input
                  type="file"
                  id="cv"
                  disabled
                  aria-describedby="cv-note"
                />
                <span className="form-note" id="cv-note">
                  Document upload is unavailable. Please email your CV or
                  supporting document directly to our team; no file is uploaded
                  by this form.
                </span>
              </div>
            )}
            <div className="full-field">
              <label className="consent-label" htmlFor="consent">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={values.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={
                    errors.consent ? "consent-error" : undefined
                  }
                />
                <span>
                  I consent to Crown Power Energy Systems Ltd storing and
                  processing my details to{" "}
                  {application
                    ? "assess my application"
                    : "respond to this enquiry"}
                  , in line with the <Link href="/privacy">Privacy Policy</Link>
                  . <span className="required">*</span>
                </span>
              </label>
              {errors.consent && (
                <span className="field-error" id="consent-error">
                  {errors.consent}
                </span>
              )}
            </div>
          </div>
          <div hidden aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {Object.values(errors).some(Boolean) && (
            <p className="field-error mt-5" role="alert">
              Please correct the highlighted fields.
            </p>
          )}
          {serverError && (
            <div className="server-error" role="alert">
              {serverError}{" "}
              <a href="mailto:info@crownpoweruk.co.uk">Email Crown Power →</a>
            </div>
          )}
          <button
            className="button button-primary"
            disabled={status === "submitting"}
            type="submit"
          >
            {status === "submitting"
              ? "Submitting…"
              : application
                ? "Submit application →"
                : "Send Enquiry →"}
          </button>
        </form>
      )}
    </div>
  );
}
