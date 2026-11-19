export type Link = { label: string; href: string };

export type NavItem = { id: string; label: string };

export type Site = {
  title: string;
  description: string;
  brand: string;
  nav: NavItem[];
  cta: Link;
  footer: { note: string; backToTop: string };
};

export type HeadlineSegment = { text: string; accent?: boolean };

export type Profile = {
  name: string;
  role: string;
  availability: string;
  location: string;
  headline: HeadlineSegment[];
  intro: string;
  /** Caption card floating over the hero photo. */
  photoChip?: { title: string; text: string };
  primaryCta: Link;
  secondaryCta: Link;
  highlights: { label: string; value: string }[];
};

export type SectionCopy = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export type About = SectionCopy & {
  paragraphs: string[];
  /** Path inside /public, e.g. "/aqsa.png". */
  portrait: string;
  /** Describes the image; falls back to the name. */
  portraitAlt?: string;
  principles: { title: string; text: string }[];
};

export type Skill = { name: string; description: string };

/** Which vector illustration a group's card shows. */
export type SkillIllustration = "social" | "paid" | "search" | "growth";

export type SkillGroup = {
  title: string;
  summary: string;
  /** One of SkillIllustration; anything else falls back to one picked by position. */
  illustration?: string;
  skills: Skill[];
};

export type Skills = SectionCopy & { groups: SkillGroup[] };

export type ExperienceItem = {
  role: string;
  company: string;
  /** Free text, e.g. "2023 — Present" */
  period: string;
  /** "YYYY-MM", used to work out time in role. */
  start?: string;
  /** "YYYY-MM", or null while the role is current. */
  end?: string | null;
  location?: string;
  /** Path inside /public, e.g. "/work/gmz.png". Null shows the initials instead. */
  logo?: string | null;
  /** Keys understood by SocialIcon, e.g. "facebook", "instagram", "linkedin". */
  platforms?: string[];
  summary: string;
  /** "What they were facing" */
  challenge?: string;
  /** "What I gave them" */
  outcome?: string;
  tags?: string[];
  link?: Link;
};

export type Experience = SectionCopy & { items: ExperienceItem[] };

export type Brand = {
  name: string;
  place: string;
  role: string;
  /** Free text; null hides it. */
  period: string | null;
  /** Path inside /public, e.g. "/brands/nixo.jpg". Null shows the initials instead. */
  logo: string | null;
  stat: { value: string; label: string } | null;
  challenge: string;
  outcome: string;
  links: Link[];
};

export type Brands = SectionCopy & { items: Brand[] };

export type Social = {
  platform: string;
  label: string;
  url: string;
  /** Shown under the label, e.g. "@aqsagulammustafa". */
  handle?: string;
};

export type Contact = SectionCopy & {
  /** Italic accent that follows the title, e.g. "something together." */
  titleAccent?: string;
  text: string;
  email: string;
  responseNote: string;
  socials: Social[];
  /** Last card: an email with a preset subject. */
  project?: { label: string; text: string; subject: string };
};
