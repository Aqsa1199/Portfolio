import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import {
  about,
  allSkillNames,
  approach,
  contact,
  experience,
  profile,
  sectionNumber,
  site,
  skills,
  visibleNav,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header brand={site.brand} role={profile.role} nav={visibleNav} cta={site.cta} />
      <main className="flex-1">
        <Hero profile={profile} />
        <Marquee items={allSkillNames} />
        <About data={about} number={sectionNumber("about")} name={profile.name} />
        <Expertise data={skills} number={sectionNumber("expertise")} />
        <Approach data={approach} number={sectionNumber("approach")} />
        <Experience data={experience} number={sectionNumber("experience")} />
        <Contact data={contact} number={sectionNumber("contact")} />
      </main>
      <Footer site={site} />
    </>
  );
}
