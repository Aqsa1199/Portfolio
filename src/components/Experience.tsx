import { cacheLife } from "next/cache";
import type { Experience as ExperienceData, ExperienceItem, PlatformLink } from "@/types/content";
import { LogoMark } from "./LogoMark";
import { Reveal } from "./Reveal";
import { ArrowIcon, Container, Eyebrow, SectionTitle, SocialIcon } from "./ui";

const platformNames: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
};

function monthIndex(yyyyMm: string): number {
  const [year, month] = yyyyMm.split("-").map(Number);
  return year * 12 + (month - 1);
}

/** This month, refreshed daily so "Present" roles keep counting without a rebuild. */
async function currentMonthIndex(): Promise<number> {
  "use cache";
  cacheLife("days");
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

/** "2 yrs 8 mos", counting both the first and last month. Null without a start date. */
function timeInRole(item: ExperienceItem, thisMonth: number): string | null {
  if (!item.start) return null;
  const end = item.end ? monthIndex(item.end) : thisMonth;
  const months = end - monthIndex(item.start) + 1;
  if (months < 1) return null;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

function ExperienceEntry({ item, thisMonth }: { item: ExperienceItem; thisMonth: number }) {
  const isCurrent = item.start !== undefined && item.end === null;
  const duration = timeInRole(item, thisMonth);
  const platforms: PlatformLink[] = (item.platforms ?? []).map((p) =>
    typeof p === "string" ? { platform: p } : p,
  );

  return (
    <div className="grid gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-16">
      {/* Who and when: stays in view while the details scroll past */}
      <div className="md:sticky md:top-28 md:col-span-5 md:self-start">
        <div className="flex items-center gap-4">
          <LogoMark name={item.company} logo={item.logo} className="h-16 w-16 text-2xl" />
          <div>
            <p className="font-mono text-sm text-raspberry">{item.period}</p>
            {item.location && <p className="mt-1 text-sm text-muted">{item.location}</p>}
          </div>
        </div>

        <h3 className="mt-7 font-display text-3xl leading-tight tracking-tight text-ink text-balance md:text-4xl">
          {item.role}
        </h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg text-wine">
          {item.company}
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-raspberry/30 bg-raspberry/5 px-2.5 py-0.5 text-xs text-raspberry">
              <span className="h-1.5 w-1.5 rounded-full bg-raspberry" aria-hidden />
              Current role
            </span>
          )}
        </p>

        {(duration || platforms.length > 0) && (
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
            {duration && (
              <div>
                <dt className="text-sm text-muted">Time in role</dt>
                <dd className="mt-2 font-display text-2xl leading-none text-ink">{duration}</dd>
              </div>
            )}
            {platforms.length > 0 && (
              <div>
                <dt className="text-sm text-muted">Platforms</dt>
                <dd className="mt-2">
                  <ul className="flex gap-2">
                    {platforms.map(({ platform, href }) => {
                      const name = platformNames[platform] ?? platform;
                      const badge =
                        "flex h-9 w-9 items-center justify-center rounded-full border border-line bg-sand text-wine";
                      const icon = <SocialIcon platform={platform} className="h-4 w-4" />;
                      return (
                        <li key={platform}>
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`${item.company} on ${name}`}
                              className={`${badge} transition-colors hover:border-raspberry hover:bg-raspberry hover:text-white`}
                            >
                              {icon}
                              <span className="sr-only">
                                {item.company} on {name} (opens in a new tab)
                              </span>
                            </a>
                          ) : (
                            <span title={name} className={badge}>
                              {icon}
                              <span className="sr-only">{name}</span>
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        )}

        {item.link && (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-sm text-wine transition-colors hover:text-raspberry"
          >
            {item.link.label}
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </a>
        )}
      </div>

      {/* What the work was */}
      <div className="md:col-span-7">
        <p className="text-lg leading-relaxed text-ink/80">{item.summary}</p>

        {(item.challenge || item.outcome) && (
          <dl className="mt-8 grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
            {item.challenge && (
              <div className="bg-sand/60 p-6">
                <dt className="text-sm text-muted">The challenge</dt>
                <dd className="mt-2 leading-relaxed text-ink">{item.challenge}</dd>
              </div>
            )}
            {item.outcome && (
              <div className="border-t border-line bg-paper p-6 sm:border-t-0 sm:border-l">
                <dt className="flex items-center gap-2 text-sm text-raspberry">
                  <span className="h-px w-4 bg-raspberry" aria-hidden />
                  What I delivered
                </dt>
                <dd className="mt-2 leading-relaxed text-ink">{item.outcome}</dd>
              </div>
            )}
          </dl>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="mt-8">
            <p className="text-sm text-muted">What the work covered</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-sand px-3 py-1 text-sm text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export async function Experience({ data, number }: { data: ExperienceData; number: string }) {
  if (data.items.length === 0) return null;
  const thisMonth = await currentMonthIndex();

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
              <Reveal delay={i * 60}>
                <ExperienceEntry item={item} thisMonth={thisMonth} />
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
