import type { ReactNode } from "react";
import type { Contact as ContactData } from "@/types/content";
import { Reveal } from "./Reveal";
import { ArrowIcon, Container, Eyebrow, SocialIcon } from "./ui";

type Card = { key: string; label: string; value: string; href: string; icon: ReactNode; external: boolean };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

export function Contact({ data, number }: { data: ContactData; number: string }) {
  const cards: Card[] = [
    {
      key: "email",
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
      icon: <MailIcon className="h-5 w-5" />,
      external: false,
    },
    ...data.socials.map((social) => ({
      key: social.platform,
      label: social.label,
      value: social.handle ?? social.url.replace(/^https?:\/\/(www\.)?/, ""),
      href: social.url,
      icon: <SocialIcon platform={social.platform} className="h-5 w-5" />,
      external: true,
    })),
    ...(data.project
      ? [
          {
            key: "project",
            label: data.project.label,
            value: data.project.text,
            href: `mailto:${data.email}?subject=${encodeURIComponent(data.project.subject)}`,
            icon: <SendIcon className="h-5 w-5" />,
            external: false,
          },
        ]
      : []),
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-wine-deep py-24 text-[#F9E9ED] md:py-32"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -bottom-36 font-display text-[24rem] leading-none text-white/5 italic select-none"
      >
        &amp;
      </span>

      <Container className="relative">
        <Reveal className="max-w-3xl">
          <Eyebrow number={number} tone="inverse">
            {data.eyebrow}
          </Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-balance text-white">
            {data.title}
            {data.titleAccent && (
              <>
                {" "}
                <em className="text-blush italic">{data.titleAccent}</em>
              </>
            )}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#EBC6D0]">{data.text}</p>
        </Reveal>

        <ul className="mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {cards.map((card, i) => (
            <li key={card.key} className="min-w-0">
              <Reveal delay={i * 70} className="h-full">
                <a
                  href={card.href}
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full min-h-[4.75rem] items-center gap-4 rounded-2xl border border-white/20 bg-white/6 px-5 py-5 transition-colors duration-300 hover:border-white/40 hover:bg-white/12"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-wine-deep transition-transform duration-300 group-hover:scale-105">
                    {card.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white">{card.label}</span>
                    <span className="block truncate text-sm text-[#EBC6D0]">{card.value}</span>
                  </span>
                  <ArrowIcon className="h-4 w-4 shrink-0 text-gold-light opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex items-center gap-2 text-sm text-[#EBC6D0]">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-light" aria-hidden />
          {data.responseNote}
        </p>
      </Container>
    </section>
  );
}
