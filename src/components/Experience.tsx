import type { Experience as ExperienceData } from "@/types/content";
import { Reveal } from "./Reveal";
import { Container, Eyebrow, SectionTitle } from "./ui";

export function Experience({ data, number }: { data: ExperienceData; number: string }) {
  if (data.items.length === 0) return null;

  return (
    <section id="experience" className="scroll-mt-20 py-24 md:py-36">
      <Container>
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow number={number}>{data.eyebrow}</Eyebrow>
            <SectionTitle className="mt-6">{data.title}</SectionTitle>
          </div>
          {data.intro && (
            <p className="text-lg leading-relaxed text-muted md:col-span-4 md:col-start-9">
              {data.intro}
            </p>
          )}
        </Reveal>

        <ol className="mt-16 border-b border-line md:mt-20">
          {data.items.map((item, i) => (
            <li key={`${item.company}-${item.role}`} className="border-t border-line">
              <Reveal delay={i * 60} className="grid gap-6 py-10 md:grid-cols-12 md:py-12">
                <div className="md:col-span-3">
                  <p className="font-mono text-sm text-raspberry">{item.period}</p>
                  {item.location && <p className="mt-1 text-sm text-muted">{item.location}</p>}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-3xl leading-tight tracking-tight text-ink">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-wine">{item.company}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="leading-relaxed text-muted">{item.summary}</p>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-ink">
                          <span className="mt-2.5 h-px w-4 shrink-0 bg-raspberry" aria-hidden />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-line bg-sand px-3 py-1 text-sm text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
