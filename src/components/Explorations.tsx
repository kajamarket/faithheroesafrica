import React, { useEffect, useRef, useState } from 'react';
import { LightboxModal } from './LightboxModal';
import { ExplorationItem } from '../data/portfolioData';

const ARCHIVE_ITEMS: ExplorationItem[] = [
  {
    id: "arch-1",
    title: "Bete Giyorgis of Lalibela",
    medium: "Rock-Hewn Heritage",
    year: "12th Century — Ethiopia",
    image: "/landmarks/bete_giyorgis_lalibela.jpg",
    rotation: "-rotate-2",
    aspect: "aspect-square"
  },
  {
    id: "arch-2",
    title: "Bishop Samuel Ajayi Crowther",
    medium: "Pioneer Bishop & Translator",
    year: "1809 — 1891, Nigeria",
    image: "/landmarks/samuel_crowther.jpg",
    rotation: "rotate-3",
    aspect: "aspect-square"
  },
  {
    id: "arch-3",
    title: "Namirembe Cathedral",
    medium: "East African Revival Heritage",
    year: "Founded 1890, Uganda",
    image: "/landmarks/namirembe_cathedral.jpg",
    rotation: "-rotate-1",
    aspect: "aspect-square"
  },
  {
    id: "arch-4",
    title: "Mary Slessor Mission",
    medium: "Calabar Frontier Ministry",
    year: "1876 — 1915, Nigeria",
    image: "/landmarks/mary_slessor.jpg",
    rotation: "rotate-2",
    aspect: "aspect-square"
  },
  {
    id: "arch-5",
    title: "Monastery of Saint Anthony",
    medium: "Desert Fathers & Monastic Heritage",
    year: "c. 356 AD, Egypt",
    image: "/landmarks/st_anthony_monastery.jpg",
    rotation: "-rotate-3",
    aspect: "aspect-square"
  },
  {
    id: "arch-6",
    title: "Prophet William Wadé Harris",
    medium: "West African Mass Awakening",
    year: "1913 — 1915, West Africa",
    image: "/landmarks/william_wade_harris.jpg",
    rotation: "rotate-1",
    aspect: "aspect-square"
  }
];

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const colLeftRef = useRef<HTMLDivElement | null>(null);
  const colRightRef = useRef<HTMLDivElement | null>(null);
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<ExplorationItem | null>(null);

  const leftItems = ARCHIVE_ITEMS.slice(0, 3);
  const rightItems = ARCHIVE_ITEMS.slice(3, 6);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx: any = null;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const pinnedContent = pinnedContentRef.current;
      const colLeft = colLeftRef.current;
      const colRight = colRightRef.current;

      if (!section || !pinnedContent || !colLeft || !colRight) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedContent,
          pinSpacing: false,
        });

        gsap.fromTo(
          colLeft,
          { y: 150 },
          {
            y: -250,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );

        gsap.fromTo(
          colRight,
          { y: 350 },
          {
            y: -400,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          }
        );
      }, section);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        id="explorations"
        ref={sectionRef}
        className="relative min-h-[220vh] md:min-h-[300vh] bg-bg overflow-hidden border-t border-stroke/50"
      >
        {/* Layer 1: Pinned Center */}
        <div
          ref={pinnedContentRef}
          className="h-screen w-full flex flex-col items-center justify-center pointer-events-none z-10 text-center px-6"
        >
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent/60" />
              <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
                VISUAL ARCHIVE
              </span>
              <span className="w-8 h-px bg-accent/60" />
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic text-heading tracking-tight leading-[1.15] mb-4">
              Historical landmarks
            </h2>

            <p className="text-muted text-sm md:text-base max-w-md mb-8 font-light leading-relaxed">
              Photographic narratives and documented milestones across six decades of African revival and mission work.
            </p>
          </div>
        </div>

        {/* Layer 2: Parallax Columns */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12 grid grid-cols-2 gap-6 md:gap-40 pt-[25vh]">
            <div ref={colLeftRef} className="flex flex-col gap-28 md:gap-48 items-start pointer-events-auto">
              {leftItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedLightboxItem(item)}
                  className={`group relative aspect-square w-full max-w-[320px] rounded-2xl md:rounded-3xl overflow-hidden bg-surface border border-stroke/70 cursor-pointer transition-all duration-500 hover:scale-105 hover:border-accent/60 shadow-xl ${
                    item.rotation
                  } hover:rotate-0`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 flex flex-col">
                    <span className="text-[10px] text-accent font-mono uppercase tracking-wider">
                      {item.medium}
                    </span>
                    <div className="flex justify-between items-baseline mt-1">
                      <h3 className="text-xs md:text-sm font-display italic text-heading tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-[10px] text-muted font-mono">{item.year}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-bg/80 backdrop-blur-md border border-stroke/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[11px] text-accent leading-none">⊕</span>
                  </div>
                </div>
              ))}
            </div>

            <div ref={colRightRef} className="flex flex-col gap-28 md:gap-48 items-end pointer-events-auto pt-36">
              {rightItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedLightboxItem(item)}
                  className={`group relative aspect-square w-full max-w-[320px] rounded-2xl md:rounded-3xl overflow-hidden bg-surface border border-stroke/70 cursor-pointer transition-all duration-500 hover:scale-105 hover:border-accent/60 shadow-xl ${
                    item.rotation
                  } hover:rotate-0`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 flex flex-col">
                    <span className="text-[10px] text-accent font-mono uppercase tracking-wider">
                      {item.medium}
                    </span>
                    <div className="flex justify-between items-baseline mt-1">
                      <h3 className="text-xs md:text-sm font-display italic text-heading tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-[10px] text-muted font-mono">{item.year}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-bg/80 backdrop-blur-md border border-stroke/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[11px] text-accent leading-none">⊕</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LightboxModal
        item={selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
      />
    </>
  );
};
