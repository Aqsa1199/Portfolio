import type { ReactNode } from "react";
import type { SkillIllustration } from "@/types/content";

/** 4-point sparkle centred on (x, y). Twinkles via the shared `.twinkle` animation. */
function Sparkle({ x, y, size, delay = "0s" }: { x: number; y: number; size: number; delay?: string }) {
  const s = size;
  return (
    <path
      className="twinkle fill-gold-light"
      style={{ animationDelay: delay, transformBox: "fill-box", transformOrigin: "center" }}
      d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z`}
    />
  );
}

/** Conversation bubbles with a heart: audiences that talk back. */
function Social() {
  return (
    <>
      <path className="fill-wine" d="M32 66 L27 82 L48 66 Z" />
      <rect className="fill-wine" x="16" y="24" width="62" height="44" rx="14" />
      <circle className="fill-paper" cx="35" cy="46" r="4" />
      <circle className="fill-paper" cx="47" cy="46" r="4" />
      <circle className="fill-paper" cx="59" cy="46" r="4" />
      <path className="fill-blush stroke-wine" strokeWidth="2.5" strokeLinejoin="round" d="M70 56 H96 A10 10 0 0 1 106 66 V82 A10 10 0 0 1 96 92 H94 L98 103 L84 92 H70 A10 10 0 0 1 60 82 V66 A10 10 0 0 1 70 56 Z" />
      <path className="fill-raspberry" d="M83 84 C71 76 73 64 79 65.5 C81 66 83 68 83 70 C83 68 85 66 87 65.5 C93 64 95 76 83 84 Z" />
      <Sparkle x={102} y={28} size={7} />
      <Sparkle x={18} y={98} size={5} delay="1.4s" />
    </>
  );
}

/** Target hit dead-centre, with a coin: budget turned into results. */
function Paid() {
  return (
    <>
      <circle className="fill-paper stroke-wine" strokeWidth="2.5" cx="52" cy="66" r="36" />
      <circle className="fill-blush" cx="52" cy="66" r="26" />
      <circle className="fill-paper stroke-wine" strokeWidth="2.5" cx="52" cy="66" r="15" />
      <circle className="fill-wine" cx="52" cy="66" r="6" />
      <path className="stroke-wine" strokeWidth="3.5" strokeLinecap="round" d="M52 66 L96 22" />
      <path className="fill-gold-light stroke-wine" strokeWidth="1.5" strokeLinejoin="round" d="M96 22 L99 8 L106 15 Z M96 22 L110 19 L103 12 Z" />
      <circle className="fill-gold-light stroke-wine" strokeWidth="2.5" cx="98" cy="94" r="13" />
      <circle className="fill-none stroke-wine" strokeWidth="1.5" cx="98" cy="94" r="7.5" />
      <Sparkle x={20} y={22} size={6} delay="0.8s" />
    </>
  );
}

/** Magnifier over a page of content: being found when people look. */
function Search() {
  return (
    <>
      <rect className="fill-paper stroke-wine" strokeWidth="2.5" x="18" y="16" width="56" height="74" rx="8" />
      <rect className="fill-wine" x="28" y="29" width="32" height="6" rx="3" />
      <rect className="fill-blush" x="28" y="42" width="36" height="4.5" rx="2.25" />
      <rect className="fill-blush" x="28" y="52" width="26" height="4.5" rx="2.25" />
      <rect className="fill-blush" x="28" y="62" width="32" height="4.5" rx="2.25" />
      <rect className="fill-blush" x="28" y="72" width="20" height="4.5" rx="2.25" />
      <path className="stroke-wine" strokeWidth="9" strokeLinecap="round" d="M93 87 L106 100" />
      <circle className="fill-blush/70 stroke-wine" strokeWidth="4.5" cx="78" cy="72" r="20" />
      <path className="fill-none stroke-paper" strokeWidth="3" strokeLinecap="round" d="M67 66 A12 12 0 0 1 77 60" />
      <Sparkle x={102} y={26} size={7} delay="0.4s" />
      <Sparkle x={92} y={48} size={4} delay="1.8s" />
    </>
  );
}

/** Rising bars with a trend arrow: activity tied to outcomes. */
function Growth() {
  return (
    <>
      <rect className="fill-blush" x="22" y="74" width="15" height="26" rx="3" />
      <rect className="fill-blush" x="43" y="60" width="15" height="40" rx="3" />
      <rect className="fill-raspberry" x="64" y="46" width="15" height="54" rx="3" />
      <rect className="fill-wine" x="85" y="30" width="15" height="70" rx="3" />
      <path className="stroke-wine" strokeWidth="2.5" strokeLinecap="round" d="M14 100 H108" />
      <path className="fill-none stroke-gold" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M18 66 L40 50 L60 56 L94 18 M82 20 L94 18 L93 30" />
      <circle className="fill-paper stroke-gold" strokeWidth="2.5" cx="40" cy="50" r="4" />
      <circle className="fill-paper stroke-gold" strokeWidth="2.5" cx="60" cy="56" r="4" />
      <Sparkle x={22} y={26} size={7} delay="1s" />
    </>
  );
}

const art: Record<SkillIllustration, () => ReactNode> = { social: Social, paid: Paid, search: Search, growth: Growth };
const fallbackOrder: SkillIllustration[] = ["social", "paid", "search", "growth"];

/** Decorative vector for an Expertise group; falls back to one by position. */
export function ExpertiseArt({
  kind,
  index,
  className = "",
}: {
  kind?: string;
  index: number;
  className?: string;
}) {
  const key = kind && kind in art ? (kind as SkillIllustration) : fallbackOrder[index % fallbackOrder.length];
  const Art = art[key];
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" className={className}>
      <circle className="fill-sand" cx="60" cy="62" r="54" />
      <Art />
    </svg>
  );
}
