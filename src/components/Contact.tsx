import type { Contact as ContactData } from "@/types/content";
import { Reveal } from "./Reveal";
import { ArrowIcon, Container, Eyebrow, SocialIcon } from "./ui";

export function Contact({ data, number }: { data: ContactData; number: string }) {
  return (
    <section id="contact" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-wine px-6 py-14 text-paper sm:px-10 md:px-16 md:py-24">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-10 font-display text-[22rem] leading-none text-paper/[0.06] italic select-none"
          >
            &amp;
          </span>

          <div className="relative">
            <Eyebrow number={number} tone="inverse">
              {data.eyebrow}
            </Eyebrow>
            <h2 className="mt-8 max-w-[14ch] font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.03em] text-balance">
              {data.title}
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">{data.text}</p>

            <a
              href={`mailto:${data.email}`}
              className="group mt-12 inline-flex max-w-full items-center gap-4 border-b border-paper/30 pb-3 font-display text-[clamp(1.5rem,4vw,3rem)] tracking-tight transition-colors hover:border-paper"
            >
              <span className="truncate">{data.email}</span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-wine transition-transform duration-300 group-hover:rotate-45">
                <ArrowIcon className="h-5 w-5" />
              </span>
            </a>

            <div className="mt-16 flex flex-col gap-8 border-t border-paper/20 pt-8 md:flex-row md:items-center md:justify-between">
              <ul className="flex flex-wrap gap-2">
                {data.socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-paper/25 px-4 text-sm transition-colors hover:bg-paper hover:text-wine"
                    >
                      <SocialIcon platform={social.platform} className="h-4 w-4" />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 text-sm text-paper/70">
                <span className="h-1.5 w-1.5 rounded-full bg-paper" aria-hidden />
                {data.responseNote}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
