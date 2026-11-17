import type { Profile } from "@/types/content";
import { ArrowIcon, Container } from "./ui";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="relative pt-32 pb-16 md:pt-44 md:pb-24">
      <Container>
        <div className="rise flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-sand/60 px-3 py-1 text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-raspberry" aria-hidden />
            {profile.availability}
          </span>
          <span>{profile.location}</span>
        </div>

        <p className="rise mt-10 text-lg text-muted" style={{ animationDelay: "80ms" }}>
          {profile.name} <span className="text-line">/</span> {profile.role}
        </p>

        <h1
          className="rise mt-3 max-w-[13ch] font-display text-[clamp(3rem,9vw,8rem)] leading-[0.94] tracking-[-0.035em] text-ink"
          style={{ animationDelay: "140ms" }}
        >
          {profile.headline.map((segment, i) =>
            segment.accent ? (
              <em key={i} className="font-display text-raspberry italic">
                {segment.text}
              </em>
            ) : (
              <span key={i}>{segment.text}</span>
            ),
          )}
        </h1>

        <div
          className="rise mt-14 grid gap-12 border-t border-line pt-10 md:mt-20 md:grid-cols-12"
          style={{ animationDelay: "240ms" }}
        >
          <div className="md:col-span-6">
            <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={profile.primaryCta.href}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-wine pr-5 pl-6 font-medium text-paper transition-colors hover:bg-raspberry"
              >
                {profile.primaryCta.label}
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={profile.secondaryCta.href}
                className="inline-flex h-12 items-center rounded-full border border-line px-6 font-medium text-ink transition-colors hover:border-wine hover:text-wine"
              >
                {profile.secondaryCta.label}
              </a>
            </div>
          </div>

          <dl className="divide-y divide-line border-y border-line md:col-span-5 md:col-start-8 md:self-start">
            {profile.highlights.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="text-right text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
