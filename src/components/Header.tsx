"use client";

import { useEffect, useState } from "react";
import type { Link, NavItem } from "@/types/content";
import { Container } from "./ui";

export function Header({
  brand,
  role,
  nav,
  cta,
}: {
  brand: string;
  role: string;
  nav: NavItem[];
  cta: Link;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // "top" (the hero) is observed too, so scrolling back up clears the highlight.
    const sections = ["top", ...nav.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-18 items-center justify-between">
        <a href="#top" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-tight text-ink">{brand}</span>
          <span className="hidden text-sm text-muted sm:inline">/ {role}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.id ? "bg-sand text-wine" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={cta.href}
            className="hidden h-10 items-center rounded-full bg-wine px-5 text-sm font-medium text-paper transition-colors hover:bg-raspberry sm:inline-flex"
          >
            {cta.label}
          </a>
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-px w-4 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`absolute h-px w-4 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
            />
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] border-t border-line bg-paper md:hidden"
      >
        <Container className="flex h-full flex-col justify-between pt-8 pb-10">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-4"
                >
                  <span className="font-mono text-sm text-raspberry">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-4xl text-ink">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className="inline-flex h-14 items-center justify-center rounded-full bg-wine text-paper"
          >
            {cta.label}
          </a>
        </Container>
      </div>
    </header>
  );
}
