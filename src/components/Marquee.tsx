export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-display text-2xl whitespace-nowrap text-[#F6D9DF] italic md:text-3xl">
            {item}
          </span>
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-gold-light" aria-hidden>
            <path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee group overflow-hidden bg-wine py-5">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
