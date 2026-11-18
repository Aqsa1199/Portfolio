import type { About as AboutData } from "@/types/content";
import { AboutPortrait } from "./AboutPortrait";
import { Reveal } from "./Reveal";
import { Container, Eyebrow, SectionTitle } from "./ui";

export function About({ data, number, name }: { data: AboutData; number: string; name: string }) {
  return (
    <section id="about" className="scroll-mt-20 py-24 md:py-36">
      <Container className="grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-4 md:self-center">
          <AboutPortrait src={data.portrait} alt={data.portraitAlt ?? name} />
        </Reveal>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal>
            <Eyebrow number={number}>{data.eyebrow}</Eyebrow>
            <SectionTitle className="mt-6">{data.title}</SectionTitle>
          </Reveal>

          <Reveal delay={100} className="mt-10 space-y-5 text-lg leading-relaxed text-muted">
            {data.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {data.principles.map((item, i) => (
              <li key={item.title} className="bg-paper">
                <Reveal delay={i * 90} className="h-full p-6">
                  <p className="font-display text-2xl text-wine">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
