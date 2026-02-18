"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Divisions", href: "#divisions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[var(--sc-white)] border-b border-[var(--sc-black)]"
        : "bg-transparent"
        }`}
    >
      <div className="container-x flex items-center justify-between py-5">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight leading-none"
        >
          <Image
            src="/logo.jpg"
            alt="Studio Crobe logo"
            width={34}
            height={34}
          />
          Studio Crobe
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium tracking-widest uppercase hover:opacity-50 transition-opacity"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-7 h-7"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] bg-[var(--sc-black)] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
          />
          <span
            className={`block h-[1.5px] bg-[var(--sc-black)] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
          />
          <span
            className={`block h-[1.5px] bg-[var(--sc-black)] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[var(--sc-white)] border-b border-[var(--sc-black)] ${menuOpen ? "max-h-64" : "max-h-0"
          }`}
      >
        <ul className="container-x flex flex-col py-6 gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={handleLinkClick}
                className="font-display text-2xl font-bold tracking-tight hover:opacity-50 transition-opacity"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
