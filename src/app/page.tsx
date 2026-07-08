import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { TechStack } from "@/components/sections/TechStack";
import { Contributions } from "@/components/sections/Contributions";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Frame>
        <main>
          <Hero />
          <About />
          <Experience />
          <Work />
          <TechStack />
          <Contributions />
          <Education />
          <Contact />
        </main>
        <Footer />
      </Frame>
    </>
  );
}
