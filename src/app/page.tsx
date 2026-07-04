import { Nav } from "@/components/Nav";
import { NavRail } from "@/components/NavRail";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Process } from "@/components/sections/Process";
import { Education } from "@/components/sections/Education";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <NavRail />
      <main>
        <Hero />
        <Stats />
        <Experience />
        <Work />
        <Services />
        <TechStack />
        <Process />
        <Education />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
