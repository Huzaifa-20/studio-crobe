"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full aspect-[16/7] border border-dashed border-[var(--sc-light-gray)] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border border-dashed border-[var(--sc-mid-gray)]" />
        <p className="font-accent text-base text-[var(--sc-mid-gray)] text-center">
          Add <code className="font-sans text-sm">Hero_Section.png</code> to your{" "}
          <code className="font-sans text-sm">/public</code> folder
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] aspect-[16/7]">
      <Image
        src="/Hero_Section.png"
        alt="Studio Crobe — hero image"
        fill
        className="object-cover object-bottom"
        priority
        onError={() => setHasError(true)}
      />
    </div>
  );
}
