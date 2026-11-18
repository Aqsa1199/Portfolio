# Aqsa — Portfolio

Personal portfolio site for Aqsa, digital marketer. Built with Next.js and Tailwind CSS.

## Run locally

```bash
bun install
bun dev
```

Then open http://localhost:3000.

## Editing content

All text lives in `src/data/*.json`, so most updates don't need code changes:

| File | Section |
| --- | --- |
| `site.json` | Page title, menu, footer |
| `profile.json` | Hero (headline, intro, highlights) |
| `about.json` | About |
| `skills.json` | Expertise and the skills ticker |
| `experience.json` | Work experience |
| `brands.json` | Brands and pages she built |
| `contact.json` | Email and social links |

A section hides itself, along with its menu link, when its list is empty.

Brand logos go in `public/brands/`; point a brand's `"logo"` at the file, e.g. `"/brands/nixo.jpg"`. With no logo, the card shows the brand's initials.
