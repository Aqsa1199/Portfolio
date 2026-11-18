import type { Brands as BrandsData } from "@/types/content";
import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";
import { ArrowIcon, Container, Eyebrow, SectionTitle } from "./ui";

export function Brands({ data, number }: { data: BrandsData; number: string }) {
  if (data.items.length === 0) return null;

  return (
    <section id="brands" className="scroll-mt-20 border-y border-line bg-sand py-24 md:py-36">
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

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {data.items.map((brand, i) => (
            <li key={brand.name}>
              <Reveal
                delay={(i % 3) * 80}
                className="flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition-colors duration-300 hover:border-wine"
              >
                <div className="flex items-start justify-between gap-4">
                  <LogoMark name={brand.name} logo={brand.logo} className="h-16 w-16 text-2xl" />
                  {brand.stat && (
                    <p className="text-right">
                      <span className="block font-display text-3xl leading-none text-raspberry">
                        {brand.stat.value}
                      </span>
                      <span className="mt-1 block text-xs text-muted">{brand.stat.label}</span>
                    </p>
                  )}
                </div>

                <h3 className="mt-8 font-display text-2xl leading-tight tracking-tight text-ink">
                  {brand.name}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {brand.place}
                  {brand.period && (
                    <>
                      {" · "}
                      <span className="font-mono text-raspberry">{brand.period}</span>
                    </>
                  )}
                </p>

                <p className="mt-6 leading-relaxed text-muted">{brand.challenge}</p>
                <p className="mt-3 flex gap-3 leading-relaxed text-ink">
                  <span className="mt-3 h-px w-4 shrink-0 bg-raspberry" aria-hidden />
                  <span>{brand.outcome}</span>
                </p>

                <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-8">
                  {brand.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${brand.name} on ${link.label}`}
                        className="group inline-flex items-center gap-1.5 text-sm text-wine transition-colors hover:text-raspberry"
                      >
                        {link.label}
                        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
