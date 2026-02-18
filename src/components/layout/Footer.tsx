interface FooterDivisionLink {
  name: string;
  href: string;
  tagline: string;
}

const DIVISION_LINKS: FooterDivisionLink[] = [
  {
    name: "Crumbling Studio",
    href: "https://crumblingstudio.com",
    tagline: "Art Division",
  },
  {
    name: "Flip Beetle",
    href: "https://flipbeetle.com",
    tagline: "Design & Dev Division",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--sc-black)] bg-[var(--sc-off-white)]">
      <div className="container-x py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Left — brand */}
          <div className="flex flex-col gap-2">
            <span className="font-display text-3xl font-bold leading-none">
              Studio Crobe
            </span>
            <p className="font-accent text-lg text-[var(--sc-mid-gray)]">
              Where art meets design.
            </p>
          </div>

          {/* Right — division links */}
          <div className="flex flex-col sm:flex-row gap-8">
            {DIVISION_LINKS.map(({ name, href, tagline }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1"
              >
                <span className="font-accent text-xs tracking-widest uppercase text-[var(--sc-mid-gray)]">
                  {tagline}
                </span>
                <span className="font-display text-base font-semibold group-hover:underline transition-all">
                  {name} &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--sc-light-gray)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[var(--sc-mid-gray)] tracking-wide">
            &copy; {year} Studio Crobe. All rights reserved.
          </p>
          <p className="font-accent text-sm text-[var(--sc-mid-gray)]">
            Crumbling Studio &middot; Flip Beetle
          </p>
        </div>
      </div>
    </footer>
  );
}
