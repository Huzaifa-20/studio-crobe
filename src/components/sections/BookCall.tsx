export default function BookCall() {
  return (
    <section
      id="book"
      className="border-t border-[var(--sc-black)] section-y container-x"
    >
      <div className="flex flex-col items-center text-center gap-6">
        <span className="font-accent text-sm tracking-[0.25em] uppercase text-[var(--sc-mid-gray)]">
          Schedule a meeting
        </span>

        <h2
          className="font-display font-extrabold leading-[0.9] tracking-tighter"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Let&apos;s <span className="italic">talk.</span>
        </h2>

        <p className="text-[var(--sc-dark-gray)] leading-relaxed max-w-md text-sm">
          Pick a time that works for you. We&apos;ll hop on a call to discuss
          your project, ideas, or anything else you have in mind.
        </p>

        <a
          href="https://cal.com/studio-crobe"
          target="_blank"
          rel="noopener noreferrer"
          className="sketch-border mt-4 px-10 py-4 font-display font-bold text-sm tracking-widest uppercase bg-[var(--sc-black)] text-[var(--sc-white)] hover:bg-[var(--sc-white)] hover:text-[var(--sc-black)] transition-colors duration-200"
        >
          Book a Call
        </a>
      </div>
    </section>
  );
}
