import Image from "next/image";
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

        <div className="mt-3 flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          <h1
            className="rise max-w-[13ch] font-display text-[clamp(3rem,9vw,8rem)] leading-[0.94] tracking-[-0.035em] text-ink"
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
            className="rise relative mb-6 ml-4 w-60 shrink-0 sm:w-64 md:mb-0 md:ml-0 md:w-[clamp(15rem,27vw,23rem)]"
            style={{ animationDelay: "200ms" }}
          >
            {/* Offset tinted arch behind the photo. */}
            <span
              aria-hidden
              className="absolute inset-[1.375rem_-0.875rem_-0.875rem_1.375rem] rounded-[200px_200px_22px_22px] bg-wine/15"
            />
            <div className="relative aspect-[1/1.04] overflow-hidden rounded-[200px_200px_22px_22px] border-[6px] border-paper shadow-[0_24px_50px_rgb(74_8_27/0.18)]">
              <Image
                src="/aqsa.png"
                alt={profile.name}
                fill
                priority
                sizes="(min-width: 768px) 27vw, 16rem"
                className="object-cover"
              />
            </div>
            {profile.photoChip && (
              <div className="absolute -bottom-5 -left-4 max-w-[15.5rem] rounded-2xl border border-line bg-paper px-4 py-3 sm:bottom-6 shadow-[0_14px_34px_rgb(74_8_27/0.16)] md:bottom-9 md:-left-8 md:px-5">
                <p className="text-sm font-semibold text-wine">{profile.photoChip.title}</p>
                <p className="mt-0.5 hidden text-xs leading-snug text-muted sm:block md:text-[0.82rem]">
                  {profile.photoChip.text}
                </p>
              </div>
            )}
          </div>
        </div>

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
