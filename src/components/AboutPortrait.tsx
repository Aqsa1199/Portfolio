"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";

/** Where the twinkling gold sparkles sit, as % of the frame, with a stagger. */
const sparkles = [
  { top: "14%", left: "18%", size: 18, delay: "0s" },
  { top: "22%", left: "84%", size: 12, delay: "1.1s" },
  { top: "78%", left: "12%", size: 14, delay: "2.1s" },
  { top: "84%", left: "80%", size: 20, delay: "0.6s" },
];

/**
 * About image: wipes up into view (CSS, keyed off the parent <Reveal>), then floats
 * gently, twinkles, and tilts toward the pointer on devices that have one.
 */
export function AboutPortrait({ src, alt }: { src: string; alt: string }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = tiltRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
  };

  const onLeave = () => {
    tiltRef.current?.style.setProperty("--rx", "0deg");
    tiltRef.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="relative mr-4 max-w-sm" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* Offset tinted backing that drifts against the image. */}
      <span
        aria-hidden
        className="portrait-back absolute inset-[1.25rem_-1rem_-1rem_1.25rem] rounded-[1.75rem] bg-wine/12"
      />

      <div ref={tiltRef} className="portrait-tilt relative">
        <div className="portrait-float relative">
          <div className="portrait-frame relative aspect-4/5 w-full overflow-hidden rounded-[1.75rem] bg-[#F7F1EC] shadow-[0_24px_50px_-20px_rgb(74_8_27/0.35)]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 30vw, 90vw"
              className="object-cover"
            />
            {sparkles.map((s) => (
              <svg
                key={`${s.top}-${s.left}`}
                viewBox="0 0 10 10"
                aria-hidden
                className="twinkle absolute -translate-1/2 text-gold-light drop-shadow-[0_0_6px_rgb(217_180_95/0.7)]"
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                }}
              >
                <path d="M5 0 6.2 3.8 10 5 6.2 6.2 5 10 3.8 6.2 0 5 3.8 3.8Z" fill="currentColor" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
