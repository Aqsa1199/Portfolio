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
  monogram: string;
  /** Shown on the monogram card when there's no portrait. */
  cardCaption: string;
  /** Path inside /public, e.g. "/portrait.jpg". Leave null to show the monogram. */
  portrait: string | null;
  principles: { title: string; text: string }[];
};

export type Skill = { name: string; description: string };

export type SkillGroup = { title: string; summary: string; skills: Skill[] };

export type Skills = SectionCopy & { groups: SkillGroup[] };

export type Approach = SectionCopy & {
  steps: { title: string; text: string }[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  /** Free text, e.g. "2023 — Present" */
  period: string;
  location?: string;
  summary: string;
  highlights?: string[];
  tags?: string[];
};

export type Experience = SectionCopy & { items: ExperienceItem[] };

export type Social = { platform: string; label: string; url: string };

export type Contact = SectionCopy & {
  text: string;
  email: string;
  responseNote: string;
  socials: Social[];
};
