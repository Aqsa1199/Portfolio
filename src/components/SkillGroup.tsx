"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One expertise group. Its heading card pins to the top while the group's skills
 * scroll past; while pinned it turns wine, tracks progress and highlights the
 * skill row currently in reading position. Rows opt in with `data-skill-row`.
 */
export function SkillGroup({
  letter,
  title,
  summary,
  count,
  children,
}: {
  letter: string;
  title: string;
  summary: string;
  count: number;
  children: ReactNode;
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [stuck, setStuck] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const group = groupRef.current;
    const panel = panelRef.current;
    const bar = barRef.current;
    if (!group || !panel || !bar) return;

    const sideBySide = window.matchMedia("(min-width: 48rem)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const groupBox = group.getBoundingClientRect();
      const panelBox = panel.getBoundingClientRect();
      const style = getComputedStyle(group);
      const padTop = parseFloat(style.paddingTop);
      const padBottom = parseFloat(style.paddingBottom);

      // How far the card has slid from its natural spot, out of how far it can slide.
      const offset = panelBox.top - (groupBox.top + padTop);
      const travel = groupBox.height - padTop - padBottom - panelBox.height;
      const isStuck = offset > 1;
      const progress = travel > 0 ? Math.min(1, Math.max(0, offset / travel)) : 0;

      const rows = Array.from(group.querySelectorAll<HTMLElement>("[data-skill-row]"));
      let index = 0;
      if (isStuck && sideBySide.matches) {
        // Desktop: card sits beside the list, so each row gets an equal slice of the pinned scroll.
        index = Math.min(rows.length, Math.floor(progress * rows.length) + 1);
      } else if (isStuck) {
        // Mobile: card covers the top of the list, so highlight the first row whose
        // title is fully visible below it.
        const next = rows.findIndex(
          (row) => row.getBoundingClientRect().top >= panelBox.bottom - 16,
        );
        index = next === -1 ? rows.length : next + 1;
      }
      rows.forEach((row, i) => {
        row.dataset.active = String(i === index - 1);
      });
      bar.style.transform = `scaleX(${progress})`;

      setStuck(isStuck);
      setCurrent(isStuck ? index : 0);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={groupRef}
      data-stuck={stuck}
      className="group/sec grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-8 md:py-16"
    >
      {/* `contents` on mobile lets the card stick within the whole group, not just its column. */}
      <div className="contents md:col-span-4 md:block">
        <div
          ref={panelRef}
          className={`sticky top-[4.75rem] z-10 rounded-2xl border p-5 transition-[background-color,border-color,color,box-shadow] duration-500 ease-out md:top-28 md:p-7 ${
            stuck
              ? "border-wine bg-wine text-paper shadow-[0_24px_60px_-28px_rgb(42_21_32/0.6)]"
              : "border-line bg-sand text-ink"
          }`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-paper font-mono text-sm transition-colors duration-500 ${
                stuck ? "border-paper text-wine" : "border-line text-raspberry"
              }`}
            >
              {letter}
            </span>
            <h3 className="font-display text-2xl tracking-tight md:order-last md:mt-3 md:basis-full md:text-4xl">
              {title}
            </h3>
            <span
              className={`ml-auto font-mono text-sm tabular-nums transition-colors duration-500 ${
                stuck ? "text-paper/80" : "text-muted"
              }`}
              aria-hidden
            >
              {current > 0
                ? `${String(current).padStart(2, "0")} / ${String(count).padStart(2, "0")}`
                : `${count} ${count === 1 ? "skill" : "skills"}`}
            </span>
          </div>

          <p
            className={`mt-3 hidden max-w-xs leading-relaxed transition-colors duration-500 md:block ${
              stuck ? "text-paper/75" : "text-muted"
            }`}
          >
            {summary}
          </p>

          <span
            className={`relative mt-5 block h-0.5 overflow-hidden rounded-full transition-colors duration-500 md:mt-8 ${
              stuck ? "bg-paper/25" : "bg-line"
            }`}
            aria-hidden
          >
            <span
              ref={barRef}
              style={{ transform: "scaleX(0)" }}
              className={`absolute inset-0 origin-left rounded-full transition-[transform,background-color] duration-200 ease-out ${
                stuck ? "bg-paper" : "bg-raspberry"
              }`}
            />
          </span>
        </div>

        <p className="leading-relaxed text-muted md:hidden">{summary}</p>
      </div>

      <div className="md:col-span-8">{children}</div>
    </div>
  );
}
