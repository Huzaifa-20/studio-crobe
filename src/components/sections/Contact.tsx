"use client";

import { useState, useRef, useCallback, FormEvent } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  required?: boolean;
}

const FORM_FIELDS: FormField[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    required: true,
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    placeholder: "+1 (555) 000-0000",
  },
  {
    id: "subject",
    label: "What's this about?",
    type: "text",
    placeholder: "Animation project, branding, website…",
  },
];

interface FieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

function FormFieldInput({ field, value, onChange }: FieldProps) {
  const inputClass =
    "input-line w-full py-3 text-base placeholder-[var(--sc-mid-gray)] transition-colors duration-200";

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={field.id}
        className="font-accent text-xs tracking-[0.2em] uppercase text-[var(--sc-mid-gray)]"
      >
        {field.label}
        {field.required && (
          <span className="ml-1 text-[var(--sc-black)]">*</span>
        )}
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          className={`${inputClass} resize-none min-h-[120px]`}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      ) : (
        <input
          id={field.id}
          type={field.type}
          className={inputClass}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      )}
    </div>
  );
}

const INITIAL_VALUES: Record<string, string> = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const handleChange = (id: string) => (value: string) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
    setTurnstileError(null);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileError("Verification failed. Please try again.");
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileError("Verification expired. Please verify again.");
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setTurnstileError("Please complete the verification challenge.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        if (res.status === 403) {
          setTurnstileToken(null);
          turnstileRef.current?.reset();
          throw new Error(errorData?.error || "Verification failed. Please try again.");
        }
        throw new Error(errorData?.error || "Failed to send message");
      }

      setSubmitted(true);
      setValues(INITIAL_VALUES);
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sorry, something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-[var(--sc-black)] section-y container-x"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left — heading */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <span className="font-accent text-sm tracking-[0.25em] uppercase text-[var(--sc-mid-gray)]">
            Get in touch
          </span>

          <h2
            className="font-display font-extrabold leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Let&apos;s make
            <br />
            <span className="italic">something.</span>
          </h2>

          <p className="text-[var(--sc-dark-gray)] leading-relaxed max-w-xs text-sm mt-2">
            Whether you have an animation in mind, need a brand built from
            scratch, or just want to say hello, we&apos;re all ears.
          </p>

          {/* Division callouts */}
          <div className="flex flex-col gap-3 pt-6 border-t border-[var(--sc-light-gray)]">
            {[
              {
                tag: "Animation & Production",
                detail: "crumblingstudio.com",
                href: "https://crumblingstudio.com",
              },
              {
                tag: "Design & Dev",
                detail: "flipbeetle.com",
                href: "https://flipbeetle.com",
              },
            ].map(({ tag, detail, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between"
              >
                <span className="font-accent text-xs tracking-[0.2em] uppercase text-[var(--sc-mid-gray)]">
                  {tag}
                </span>
                <span className="text-sm font-medium group-hover:underline transition-all">
                  {detail} &rarr;
                </span>
              </a>
            ))}
          </div>

          {/* Direct contact */}
          <div className="flex items-center gap-5 mt-4 pt-6 border-t border-[var(--sc-light-gray)]">
            <a
              href="https://www.instagram.com/studiocrobe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[var(--sc-mid-gray)] hover:text-[var(--sc-black)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a
              href="https://www.linkedin.com/company/studio-crobe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--sc-mid-gray)] hover:text-[var(--sc-black)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a
              href="https://wa.me/971525021443"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-[var(--sc-mid-gray)] hover:text-[var(--sc-black)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
            </a>
            <a
              href="tel:+971525021443"
              aria-label="Phone"
              className="text-[var(--sc-mid-gray)] hover:text-[var(--sc-black)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </a>
            <a
              href="mailto:hello@studiocrobe.com"
              aria-label="Email"
              className="text-[var(--sc-mid-gray)] hover:text-[var(--sc-black)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div>
          {submitted ? (
            <div className="flex flex-col gap-4 py-12">
              <div
                className="w-10 h-10 sketch-border-sm flex items-center justify-center font-accent text-lg"
              >
                ✓
              </div>
              <p
                className="font-display font-bold leading-snug"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                Message received.
              </p>
              <p className="text-[var(--sc-dark-gray)] text-sm leading-relaxed max-w-sm">
                We&apos;ll get back to you shortly. In the meantime, explore
                our divisions.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold tracking-widest uppercase underline underline-offset-4 w-fit hover:opacity-50 transition-opacity"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {FORM_FIELDS.map((field) => (
                <FormFieldInput
                  key={field.id}
                  field={field}
                  value={values[field.id]}
                  onChange={handleChange(field.id)}
                />
              ))}

              {/* Message textarea handled separately since it's not in FORM_FIELDS loop */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-accent text-xs tracking-[0.2em] uppercase text-[var(--sc-mid-gray)]"
                >
                  Message <span className="text-[var(--sc-black)]">*</span>
                </label>
                <textarea
                  id="message"
                  className="input-line w-full py-3 text-base placeholder-[var(--sc-mid-gray)] resize-none min-h-[140px]"
                  placeholder="Tell us about your project…"
                  value={values.message}
                  onChange={(e) =>
                    setValues((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                />
              </div>

              {/* Turnstile CAPTCHA */}
              <div className="space-y-2">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={handleTurnstileSuccess}
                  onError={handleTurnstileError}
                  onExpire={handleTurnstileExpire}
                  options={{
                    theme: "light",
                    size: "flexible",
                  }}
                />
                {turnstileError && (
                  <p className="text-red-500 text-sm">{turnstileError}</p>
                )}
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !turnstileToken}
                className="sketch-border self-start px-8 py-4 font-display font-bold text-sm tracking-widest uppercase bg-[var(--sc-black)] text-[var(--sc-white)] hover:bg-[var(--sc-white)] hover:text-[var(--sc-black)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
