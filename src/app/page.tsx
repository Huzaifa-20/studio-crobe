import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Divisions from "@/components/sections/Divisions";
import Philosophy from "@/components/sections/Philosophy";
import BookCall from "@/components/sections/BookCall";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divisions />
        <Philosophy />
        <BookCall />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
