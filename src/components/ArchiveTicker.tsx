import React, { useEffect, useRef } from 'react';
import { siteConfig } from '../site.config';

export const ArchiveTicker: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const words = siteConfig.tickerWords && siteConfig.tickerWords.length > 0
    ? siteConfig.tickerWords
    : ['MISSIONS', 'HERITAGE', 'REVIVAL', 'INTERVIEWS', 'AFRICAN CHRISTIAN HISTORY', 'LEADERSHIP', 'STORIES'];

  const marqueePhrase = words.join(' • ') + ' • ';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx: any = null;

    import('gsap').then(({ default: gsap }) => {
      if (!marqueeRef.current) return;
      ctx = gsap.context(() => {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 35,
          ease: 'none',
          repeat: -1,
        });
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden whitespace-nowrap py-4 sm:py-5 border-y border-stroke/50 bg-surface/30 select-none"
      role="region"
      aria-label="Archive topics ticker"
    >
      <div ref={marqueeRef} className="inline-flex will-change-transform items-center">
        <span className="font-mono text-xs sm:text-sm tracking-[0.25em] font-semibold text-forest dark:text-[#E2C27F] uppercase px-4">
          {marqueePhrase} {marqueePhrase}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-xs sm:text-sm tracking-[0.25em] font-semibold text-forest dark:text-[#E2C27F] uppercase px-4"
        >
          {marqueePhrase} {marqueePhrase}
        </span>
      </div>
    </div>
  );
};
