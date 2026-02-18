interface StatementWordProps {
  children: React.ReactNode;
  italic?: boolean;
}

function StatementWord({ children, italic }: StatementWordProps) {
  return (
    <span className={italic ? "italic" : ""}>{children}</span>
  );
}

export default function Philosophy() {
  return (
    <section
      id="about"
      className="border-t border-[var(--sc-black)] section-y container-x"
    >
      {/* Section label */}
      <span className="font-accent text-sm tracking-[0.25em] uppercase text-[var(--sc-mid-gray)]">
        What we are
      </span>

      {/* Big statement */}
      <h2
        className="font-display font-extrabold leading-[0.9] tracking-tighter mt-6"
        style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
      >
        <StatementWord>Two</StatementWord>{" "}
        <StatementWord italic>worlds.</StatementWord>
        <br />
        <StatementWord>One</StatementWord>{" "}
        <StatementWord italic>studio.</StatementWord>
      </h2>

      {/* Divider */}
      <div className="mt-14 mb-14 h-px bg-[var(--sc-light-gray)]" />

      {/* Body copy — two columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="flex flex-col gap-4">
          <p
            className="font-display font-semibold leading-snug tracking-tight"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
          >
            Art that breathes.
            <br />
            Design that speaks.
          </p>
          <p className="text-[var(--sc-dark-gray)] leading-relaxed text-base max-w-md">
            Studio Crobe is where a pencil and a pixel share the same desk.
            We are the convergence of two fiercely independent creative
            forces, each brilliant in its own right, and even more powerful
            together.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Crumbling Studio blurb */}
          <div className="flex flex-col gap-2">
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-[var(--sc-mid-gray)]">
              Crumbling Studio
            </span>
            <p className="leading-relaxed text-[var(--sc-dark-gray)]">
              Our art division lives in the gap between a rough sketch and a
              finished frame. Every hand drawn line tells a story.
              Animations, advertisments, and films crafted with
              deliberate imperfection.
            </p>
          </div>

          {/* Flip Beetle blurb */}
          <div className="flex flex-col gap-2">
            <span className="font-accent text-xs tracking-[0.2em] uppercase text-[var(--sc-mid-gray)]">
              Flip Beetle
            </span>
            <p className="leading-relaxed text-[var(--sc-dark-gray)]">
              Our design &amp; development division builds brands from
              understanding, not templates. Visual identities, digital
              experiences, and websites that people believe in.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom pull quote */}
      <div className="mt-16 pt-10 border-t border-[var(--sc-light-gray)]">
        <p
          className="font-accent text-[var(--sc-mid-gray)] max-w-xl"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
        >
          &ldquo;Crumbling since day one. Building since day two.&rdquo;
        </p>
      </div>
    </section>
  );
}
