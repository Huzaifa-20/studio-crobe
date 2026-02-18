interface DivisionProps {
  href: string;
  tag: string;
  name: string;
  nameLine2: string;
  description: string;
  cta: string;
  borderClass?: string;
}

function DivisionBox({
  href,
  tag,
  name,
  nameLine2,
  description,
  cta,
  borderClass = "",
}: DivisionProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-1 flex-col items-center justify-center overflow-hidden cursor-pointer min-h-[50vh] md:min-h-0 ${borderClass}`}
    >
      {/* Ink fill — slides up from the bottom on hover */}
      <span
        className="absolute inset-0 bg-[var(--sc-black)] translate-y-full group-hover:translate-y-0"
        style={{ transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)" }}
        aria-hidden="true"
      />

      {/* Subtle texture dots visible at rest — vanish when ink covers */}
      <span
        className="absolute inset-0 opacity-[0.03] group-hover:opacity-0 transition-opacity duration-300"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--sc-black) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-16 gap-6">
        {/* Tag */}
        <span className="font-accent text-sm tracking-[0.2em] uppercase text-[var(--sc-mid-gray)] group-hover:text-[var(--sc-light-gray)] transition-colors duration-650">
          {tag}
        </span>

        {/* Division name */}
        <h2
          className="font-display font-extrabold leading-[0.9] tracking-tighter text-[var(--sc-black)] group-hover:text-[var(--sc-white)] transition-colors duration-650"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
        >
          {name}
          <br />
          {nameLine2}
        </h2>

        {/* Description */}
        <p className="max-w-xs text-sm leading-relaxed tracking-wide text-[var(--sc-dark-gray)] group-hover:text-[var(--sc-light-gray)] transition-colors duration-650">
          {description}
        </p>

        {/* CTA */}
        <div
          className="flex items-center gap-3 mt-2 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--sc-black)] group-hover:text-[var(--sc-white)] transition-colors duration-650"
        >
          <span
            className="block h-px w-6 bg-[var(--sc-black)] group-hover:bg-[var(--sc-white)] group-hover:w-10 transition-all duration-650"
          />
          <span>{cta}</span>
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-650">
            &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Divisions() {
  return (
    <section
      id="divisions"
      className="w-full border-t border-[var(--sc-black)]"
      style={{ minHeight: "100svh" }}
    >
      <div className="flex flex-col md:flex-row h-full" style={{ minHeight: "100svh" }}>
        {/* Crumbling Studio */}
        <DivisionBox
          href="https://crumblingstudio.com"
          tag="Art Division"
          name="Crumbling"
          nameLine2="Studio"
          description="Hand-drawn animations, music videos &amp; short films. Storytelling that lives in every line."
          cta="Explore Art"
          borderClass="border-b md:border-b-0 md:border-r border-[var(--sc-black)]"
        />

        {/* Flip Beetle */}
        <DivisionBox
          href="https://flipbeetle.com"
          tag="Design & Dev Division"
          name="Flip"
          nameLine2="Beetle"
          description="Branding, UI/UX design &amp; web development. Building brands people believe in."
          cta="Explore Design"
        />
      </div>
    </section>
  );
}
