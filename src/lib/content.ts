import siteJson from "@/data/site.json";
import profileJson from "@/data/profile.json";
import aboutJson from "@/data/about.json";
import skillsJson from "@/data/skills.json";
import approachJson from "@/data/approach.json";
import experienceJson from "@/data/experience.json";
import contactJson from "@/data/contact.json";
import type {
  About,
  Approach,
  Contact,
  Experience,
  NavItem,
  Profile,
  Site,
  Skills,
} from "@/types/content";

export const site: Site = siteJson;
export const profile: Profile = profileJson;
export const about: About = aboutJson;
export const skills: Skills = skillsJson;
export const approach: Approach = approachJson;
export const experience: Experience = experienceJson;
export const contact: Contact = contactJson;

/** Sections hide themselves (and their nav link) when their JSON has no content. */
const sectionHasContent: Record<string, boolean> = {
  about: about.paragraphs.length > 0,
  expertise: skills.groups.length > 0,
  approach: approach.steps.length > 0,
  experience: experience.items.length > 0,
  contact: Boolean(contact.email),
};

export const visibleNav: NavItem[] = site.nav.filter(
  (item) => sectionHasContent[item.id] ?? true,
);

/** "01", "02"… based on the section's position among visible sections. */
export function sectionNumber(id: string): string {
  const index = visibleNav.findIndex((item) => item.id === id);
  return String(index + 1).padStart(2, "0");
}

export const allSkillNames: string[] = skills.groups.flatMap((group) =>
  group.skills.map((skill) => skill.name),
);
