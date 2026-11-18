import Image from "next/image";

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/** A round logo, or the name's initials on wine when there is no logo file. */
export function LogoMark({
  name,
  logo,
  className = "h-14 w-14 text-xl",
}: {
  name: string;
  logo?: string | null;
  className?: string;
}) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt={`${name} logo`}
        width={96}
        height={96}
        className={`shrink-0 rounded-full border border-line bg-white object-contain ${className}`}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-wine font-display text-paper ${className}`}
    >
      {initials(name)}
    </span>
  );
}
