"use client";

import { useState, FormEvent } from "react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "textarea";
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
  subject: "",
  message: "",
};

export default function Contact() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (id: string) => (value: string) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    /*
      Hook up your preferred form service here:
      — Formspree, Resend, Nodemailer, etc.
      For now we simulate a 1-second send delay.
    */
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
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
          <div className="flex flex-col gap-4 mt-4 pt-6 border-t border-[var(--sc-light-gray)]">
            {[
              {
                tag: "Art",
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

              <button
                type="submit"
                disabled={loading}
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
