import type { Approach as ApproachData } from "@/types/content";
import { Reveal } from "./Reveal";
import { Container, Eyebrow, SectionTitle } from "./ui";

export function Approach({ data, number }: { data: ApproachData; number: string }) {
  return (
    <section id="approach" className="scroll-mt-20 border-y border-line bg-sand py-24 md:py-36">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow number={number}>{data.eyebrow}</Eyebrow>
          <SectionTitle className="mt-6">{data.title}</SectionTitle>
          {data.intro && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{data.intro}</p>
          )}
        </Reveal>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {data.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal
                delay={i * 90}
                className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition-colors duration-300 hover:border-wine"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-6xl leading-none text-raspberry italic">
                    {i + 1}
                  </span>
                  <span className="text-sm text-muted">
                    Step {i + 1} of {data.steps.length}
                  </span>
                </div>
                <h3 className="mt-12 text-xl font-medium tracking-tight text-ink">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
