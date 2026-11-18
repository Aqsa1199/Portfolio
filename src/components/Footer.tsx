import type { Site } from "@/types/content";
import { Container } from "./ui";

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="border-t border-white/15 bg-wine-deep pt-8 pb-10">
      <Container className="flex flex-col gap-4 text-sm text-[#D9A7B5] sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display text-base text-white">{site.brand}</span>
          <span className="mx-2 text-white/30">/</span>
          {site.footer.note}
        </p>
        <a href="#top" className="transition-colors hover:text-white">
          {site.footer.backToTop} ↑
        </a>
      </Container>
    </footer>
  );
}
