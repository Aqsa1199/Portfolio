import type { Skills } from "@/types/content";
import { Reveal } from "./Reveal";
import { Container, Eyebrow, SectionTitle } from "./ui";

export function Expertise({ data, number }: { data: Skills; number: string }) {
  // Running skill number across groups: group 2 starts where group 1 ended.
  const offsets = data.groups.map((_, g) =>
    data.groups.slice(0, g).reduce((sum, group) => sum + group.skills.length, 0),
  );

  return (
    <section id="expertise" className="scroll-mt-20 bg-sand py-24 md:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow number={number}>{data.eyebrow}</Eyebrow>
          <SectionTitle className="mt-6">{data.title}</SectionTitle>
          {data.intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{data.intro}</p>
          )}
        </Reveal>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2">
          {data.groups.map((group, groupIndex) => (
            <Reveal
              key={group.title}
              delay={(groupIndex % 2) * 110}
              className="group/card h-full"
            >
              <article className="h-full rounded-[1.125rem] border border-line bg-paper px-6 pt-7 pb-3 transition-[box-shadow,border-color,translate] duration-500 hover:-translate-y-1 hover:border-raspberry/40 hover:shadow-[0_24px_50px_-24px_rgb(74_8_27/0.35)] md:px-8 md:pt-8">
                <header className="mb-2 flex items-center gap-4 border-b-2 border-wine pb-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine font-display text-2xl text-paper transition-transform duration-500 group-hover/card:rotate-[-8deg] group-hover/card:scale-105">
                    {String.fromCharCode(65 + groupIndex)}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight text-ink">{group.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{group.summary}</p>
                  </div>
                </header>

                <ul>
                  {group.skills.map((skill, i) => (
                    <li
                      key={skill.name}
                      className="border-b border-dashed border-line py-4 last:border-b-0"
                    >
                      <h4 className="flex items-baseline gap-3 font-semibold text-ink">
                        <span className="font-display text-[0.95rem] text-gold italic">
                          {String(offsets[groupIndex] + i + 1).padStart(2, "0")}
                        </span>
                        {skill.name}
                      </h4>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                        {skill.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
