import { About } from "@/components/About";
import { Brands } from "@/components/Brands";
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
  brands,
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
        <Experience data={experience} number={sectionNumber("experience")} />
        <Brands data={brands} number={sectionNumber("brands")} />
        <Contact data={contact} number={sectionNumber("contact")} />
      </main>
      <Footer site={site} />
    </>
  );
}
