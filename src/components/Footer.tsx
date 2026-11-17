import type { Site } from "@/types/content";
import { Container } from "./ui";

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="pt-4 pb-10">
      <Container className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display text-base text-ink">{site.brand}</span>
          <span className="mx-2 text-line">/</span>
          {site.footer.note}
        </p>
        <a href="#top" className="transition-colors hover:text-wine">
          {site.footer.backToTop} ↑
        </a>
      </Container>
    </footer>
  );
}
