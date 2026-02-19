import Image from "next/image";

interface DivisionProps {
  href: string;
  tag: string;
  name: string;
  nameLine2: string;
  description: string;
  cta: string;
  image?: string;
  borderClass?: string;
}

function DivisionBox({
  href,
  tag,
  name,
  nameLine2,
  description,
  cta,
  image,
  borderClass = "",
}: DivisionProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-1 flex-col items-center justify-center overflow-hidden cursor-pointer ${borderClass}`}
    >
      {/* Ink fill — slides up from the bottom on hover */}
      <span
        className="absolute inset-0 bg-[var(--sc-black)] translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0"
        style={{ transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)" }}
        aria-hidden="true"
      />

      {/* Subtle texture dots visible at rest — vanish when ink covers */}
      <span
        className="absolute inset-0 opacity-0 lg:opacity-[0.03] lg:group-hover:opacity-0 transition-opacity duration-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--sc-black) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-24 md:py-32 gap-6">
        {/* Tag */}
        <span className="font-accent text-sm tracking-[0.2em] uppercase text-[var(--sc-light-gray)] lg:text-[var(--sc-mid-gray)] lg:group-hover:text-[var(--sc-light-gray)] transition-colors duration-0">
          {tag}
        </span>

        {/* Division name */}
        <h2
          className="font-display font-extrabold leading-[0.9] tracking-tighter text-[var(--sc-white)] lg:text-[var(--sc-black)] lg:group-hover:text-[var(--sc-white)] transition-colors duration-0"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
        >
          {name}
          <br />
          {nameLine2}
        </h2>

        {/* Description */}
        <p className="max-w-xs text-sm leading-relaxed tracking-wide text-[var(--sc-light-gray)] lg:text-[var(--sc-dark-gray)] lg:group-hover:text-[var(--sc-light-gray)] transition-colors duration-0">
          {description}
        </p>

        {/* Optional image */}
        {image && (
          <Image
            src={image}
            alt=""
            width={480}
            height={270}
            className={`w-80 opacity-100 invert lg:invert-0 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:invert transition-all duration-0 ${image === "/crow.gif" ? "scale-150" : "scale-none"}`}
            unoptimized
          />
        )}

        {/* CTA */}
        <div
          className="flex items-center gap-3 mt-2 text-xs font-semibold tracking-[0.2em] uppercase text-[var(--sc-white)] lg:text-[var(--sc-black)] lg:group-hover:text-[var(--sc-white)] transition-colors duration-0"
        >
          <span
            className="block h-px w-6 bg-[var(--sc-white)] lg:bg-[var(--sc-black)] lg:group-hover:bg-[var(--sc-white)]"
          />
          <span>{cta}</span>
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-0">
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
      className="w-full border-t border-[var(--sc-white)] lg:border-[var(--sc-black)]"
    >
      <div className="flex flex-col md:flex-row">
        {/* Crumbling Studio */}
        <DivisionBox
          href="https://crumblingstudio.com"
          tag="Art Division"
          name="Crumbling"
          nameLine2="Studio"
          description="Hand drawn animations, advertisements &amp; films. Storytelling that lives in every line."
          image="/crow.gif"
          cta="Explore Art"
          borderClass="border-b md:border-b-0 md:border-r border-[var(--sc-white)] lg:border-[var(--sc-black)]"
        />

        {/* Flip Beetle */}
        <DivisionBox
          href="https://flipbeetle.com"
          tag="Design & Dev Division"
          name="Flip"
          nameLine2="Beetle"
          description="Branding, UI/UX design &amp; web development. Building brands people believe in."
          image="/beetle.gif"
          cta="Explore Design"
          borderClass="border-b md:border-b-0 md:border-r border-[var(--sc-white)] lg:border-[var(--sc-black)]"

        />
      </div>
    </section>
  );
}
