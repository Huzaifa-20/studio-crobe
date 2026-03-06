import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center pb-0 pt-28"
    >
      {/* Headline */}
      <div className="container-x w-full text-center mb-12 md:mb-16 flex-1 flex flex-col items-center justify-center">
        <h1
          className="font-display font-extrabold leading-[0.88] tracking-tighter"
          style={{ fontSize: "clamp(4.5rem, 18vw, 16rem)" }}
        >
          Studio
          <br />
          Crobe
        </h1>
        <p className="font-accent mt-6 text-[var(--sc-mid-gray)]"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
        >
          Where art meets design.
        </p>

        <a
          href="https://cal.com/studio-crobe"
          target="_blank"
          rel="noopener noreferrer"
          className="sketch-border-sm mt-10 px-7 py-3.5 font-display font-bold text-sm tracking-widest uppercase bg-[var(--sc-black)] text-[var(--sc-white)] hover:bg-[var(--sc-white)] hover:text-[var(--sc-black)] transition-colors duration-200"
        >
          Book a Call
        </a>
      </div>

      {/* Doodle image — place hero-doodle.png in /public */}
      <div className="w-full">
        <HeroImage />
      </div>
    </section>
  );
}
