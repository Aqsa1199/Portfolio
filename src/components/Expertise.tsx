import type { Skills } from "@/types/content";
import { Reveal } from "./Reveal";
import { SkillGroup } from "./SkillGroup";
import { ArrowIcon, Container, Eyebrow, SectionTitle } from "./ui";

export function Expertise({ data, number }: { data: Skills; number: string }) {
  // Running skill number across groups: group 2 starts where group 1 ended.
  const offsets = data.groups.map((_, g) =>
    data.groups.slice(0, g).reduce((sum, group) => sum + group.skills.length, 0),
  );

  return (
    <section id="expertise" className="scroll-mt-20 pb-24 md:pb-36">
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

        <div className="mt-16 md:mt-24">
          {data.groups.map((group, groupIndex) => (
            <SkillGroup
              key={group.title}
              letter={String.fromCharCode(65 + groupIndex)}
              title={group.title}
              summary={group.summary}
              count={group.skills.length}
            >
              <ul>
                {group.skills.map((skill, i) => {
                  const counter = offsets[groupIndex] + i + 1;
                  return (
                    <li
                      key={skill.name}
                      data-skill-row
                      className="group/row transition-opacity duration-500 group-data-[stuck=true]/sec:opacity-45 data-[active=true]:opacity-100!"
                    >
                      <Reveal delay={i * 70}>
                        <div
                          className={`group grid grid-cols-[2.5rem_1fr_auto] gap-x-4 border-b border-line pb-7 ${i === 0 ? "" : "pt-7"} md:grid-cols-[3.5rem_1fr_auto]`}
                        >
                          <span className="pt-1.5 font-mono text-sm text-muted transition-colors duration-500 group-hover:text-raspberry group-data-[active=true]/row:text-raspberry">
                            {String(counter).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="text-xl font-medium tracking-tight text-ink transition-colors duration-500 group-hover:text-wine group-data-[active=true]/row:text-wine md:text-2xl">
                              {skill.name}
                            </h4>
                            <p className="mt-2 max-w-xl leading-relaxed text-muted">
                              {skill.description}
                            </p>
                          </div>
                          <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 group-hover:border-raspberry group-hover:bg-raspberry group-hover:text-paper group-data-[active=true]/row:rotate-45 group-data-[active=true]/row:border-raspberry group-data-[active=true]/row:bg-raspberry group-data-[active=true]/row:text-paper">
                            <ArrowIcon className="h-4 w-4" />
                          </span>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </SkillGroup>
          ))}
        </div>
      </Container>
    </section>
  );
}
