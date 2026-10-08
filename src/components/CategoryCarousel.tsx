import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { siteConfig } from '../site.config';
import { BlogPost } from '../types/blog';

// 1. Missions in Africa — Line-drawn compass star with radiating pathways
const MissionsIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    <path
      d="M24 6L27 21L42 24L27 27L24 42L21 27L6 24L21 21L24 6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="24" r="3" fill="#C99A4B" />
    <path d="M24 18V30M18 24H30" stroke="#C99A4B" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

// 2. African Ministers in Diaspora — Transatlantic arcs and soaring herald dove
const DiasporaIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <ellipse cx="24" cy="24" rx="10" ry="19" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <line x1="5" y1="24" x2="43" y2="24" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <path
      d="M14 26C18 21 24 16 34 14C32 20 28 26 22 28C18 29.5 15 28 14 26Z"
      stroke="#C99A4B"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="#C99A4B"
      fillOpacity="0.18"
    />
    <path
      d="M22 20C25 15 31 11 36 10C34 14 31 17 28 19"
      stroke="#C99A4B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="34" cy="14" r="2" fill="#C99A4B" />
  </svg>
);

// 3. Heritage of the African Faith — Lalibela rock-hewn cruciform & historic foundation
const HeritageIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="20" y="8" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10" y="18" width="28" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M24 11V15M24 33V37M13 22H17M31 22H35"
      stroke="#C99A4B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="22" r="2.5" fill="#C99A4B" />
    <path d="M8 42H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 40H36" stroke="#C99A4B" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 4. Those Africa Can Never Forget — Eternal flame of remembrance & memorial pedestal
const RemembranceIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M24 7C25.5 12 29 16 31 21C33.5 27 30 34 24 36C18 34 14.5 27 17 21C19 16 22.5 12 24 7Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M24 16C25 19 27 22 27 25C27 28.5 25.5 31 24 32C22.5 31 21 28.5 21 25C21 22 23 19 24 16Z"
      fill="#C99A4B"
      stroke="#C99A4B"
      strokeWidth="1.2"
    />
    <path d="M16 38H32M19 41H29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="18" r="1.5" fill="#C99A4B" />
    <circle cx="36" cy="18" r="1.5" fill="#C99A4B" />
  </svg>
);

// 5. Interviews — Dialogue scrolls & recording quill
const InterviewsIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="8" y="10" width="22" height="26" rx="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M13 17H23M13 22H23M13 27H19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <path
      d="M38 10C35 15 32 24 24 36L21 37L22 34C28 28 34 18 38 10Z"
      stroke="#C99A4B"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="#C99A4B"
      fillOpacity="0.2"
    />
    <path d="M33 16C30 19 28 23 26 27" stroke="#C99A4B" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M31 38C34 38 37 36 39 34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <path d="M30 42C35 42 40 39 42 35" stroke="#C99A4B" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 6. Revival Resources — Awakening dawn rays and fire above open scriptures
const RevivalIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 32C15 30 20 31 24 34C28 31 33 30 38 32V16C33 14 28 15 24 18C20 15 15 14 10 16V32Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <line x1="24" y1="18" x2="24" y2="34" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M24 6C25.5 9 27.5 11 27.5 13C27.5 15 26 16.5 24 16.5C22 16.5 20.5 15 20.5 13C20.5 11 22.5 9 24 6Z"
      fill="#C99A4B"
      stroke="#C99A4B"
      strokeWidth="1.2"
    />
    <line x1="24" y1="3" x2="24" y2="5" stroke="#C99A4B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="6" x2="18" y2="8" stroke="#C99A4B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="6" x2="30" y2="8" stroke="#C99A4B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="11" x2="13" y2="12" stroke="#C99A4B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="37" y1="11" x2="35" y2="12" stroke="#C99A4B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 7. General Stories — Open chronicle volume with silk bookmark ribbon
const GeneralStoriesIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="11" y="9" width="26" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16" y1="9" x2="16" y2="41" stroke="currentColor" strokeWidth="1.2" />
    <line x1="20" y1="16" x2="31" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="20" y1="21" x2="31" y2="21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="20" y1="26" x2="27" y2="26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <path
      d="M26 9V29L29 26L32 29V9"
      fill="#C99A4B"
      stroke="#C99A4B"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <circle cx="26" cy="34" r="2.5" fill="#C99A4B" />
  </svg>
);

interface CategoryItem {
  title: string;
  description: string;
  slug: string;
  Icon: React.FC<{ className?: string }>;
}

const CATEGORY_CARDS: CategoryItem[] = [
  {
    title: 'Missions in Africa',
    description: 'Stories of missionaries, ministries and movements carrying the Gospel across Africa.',
    slug: 'missions',
    Icon: MissionsIcon,
  },
  {
    title: 'African Ministers in Diaspora',
    description: 'Exploring the lives and ministries of African Christian leaders making an impact beyond the continent.',
    slug: 'african-ministers-in-diaspora',
    Icon: DiasporaIcon,
  },
  {
    title: 'Heritage of the African Faith',
    description: 'Preserving the history, traditions and foundations of Christianity in Africa.',
    slug: 'heritage',
    Icon: HeritageIcon,
  },
  {
    title: 'Those Africa Can Never Forget',
    description: 'Remembering the people whose faith, sacrifice and service left an enduring mark on Africa.',
    slug: 'those-africa-can-never-forget',
    Icon: RemembranceIcon,
  },
  {
    title: 'Interviews',
    description: 'Conversations with Christian leaders, ministers, authors and influential voices.',
    slug: 'interviews',
    Icon: InterviewsIcon,
  },
  {
    title: 'Revival Resources',
    description: 'Stories, materials and resources for understanding revival and spiritual awakening.',
    slug: 'revival',
    Icon: RevivalIcon,
  },
  {
    title: 'General Stories',
    description: 'Stories from across the African Christian community, past and present.',
    slug: 'uncategorized',
    Icon: GeneralStoriesIcon,
  },
];

interface CategoryCarouselProps {
  posts?: BlogPost[];
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canAutoAdvance, setCanAutoAdvance] = useState<boolean>(true);
  const config = siteConfig.categoriesSection;

  // Stop auto-advance permanently upon any user interaction
  const stopAutoAdvance = () => {
    setCanAutoAdvance(false);
  };

  // Auto-advance logic
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!canAutoAdvance) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCanAutoAdvance(false);
      return;
    }

    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 360, behavior: 'smooth' });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [canAutoAdvance]);

  const handleScrollLeft = () => {
    stopAutoAdvance();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    stopAutoAdvance();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  if (!config) {
    return null;
  }

  return (
    <section
      id="category-collections"
      className="relative bg-bg py-20 md:py-28 border-t border-stroke/50"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-10 md:mb-14">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent/70" />
              <span className="text-muted text-xs tracking-[0.25em] font-medium uppercase font-mono">
                {config.label ? config.label.replace(/^0\d\.\s*/, '') : 'EXPLORE THE COLLECTION'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15]">
              {config.heading}
            </h2>

            {config.intro && (
              <p className="text-muted text-sm md:text-base mt-4 font-light leading-relaxed">
                {config.intro}
              </p>
            )}
          </div>

          {/* Controls & Prompt Label (Navigation Scroll Buttons) */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <span className="text-xs font-mono uppercase tracking-wider text-muted hidden sm:inline-block">
              {config.promptDesktop || 'EXPLORE A CATEGORY →'}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-muted sm:hidden">
              {config.promptMobile || 'Swipe to explore →'}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                aria-label="Scroll categories backward"
                className="w-10 h-10 rounded-full border border-stroke bg-surface/40 flex items-center justify-center text-muted hover:text-heading hover:border-accent hover:bg-surface transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                aria-label="Scroll categories forward"
                className="w-10 h-10 rounded-full border border-stroke bg-surface/40 flex items-center justify-center text-muted hover:text-heading hover:border-accent hover:bg-surface transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Snap Carousel: Horizontal swipe on mobile, invisible scrollbar on desktop */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div
          ref={containerRef}
          onMouseEnter={stopAutoAdvance}
          onTouchStart={stopAutoAdvance}
          onFocus={stopAutoAdvance}
          onScroll={stopAutoAdvance}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 pt-2 select-none focus:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Categories collection carousel"
        >
          {CATEGORY_CARDS.map((cat, idx) => {
            const { Icon } = cat;

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="snap-start shrink-0 w-[290px] sm:w-[330px] md:w-[360px]"
              >
                <Link
                  to={`/category/${cat.slug}/`}
                  className="group flex flex-col justify-between h-full min-h-[380px] p-8 sm:p-9 rounded-[28px] bg-[#FAF8F5] text-[#173F35] border border-[#E7DFD2] shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-[#C99A4B]/60"
                >
                  {/* Card Header & Content */}
                  <div>
                    {/* Top Row: Symbolic visual + Gold accent indicator */}
                    <div className="flex items-center justify-between mb-7">
                      <div className="w-14 h-14 rounded-2xl bg-[#EFE9DD]/80 border border-[#DDD4C3] flex items-center justify-center text-[#173F35] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#EAE2D2] group-hover:border-[#C99A4B]/60 group-hover:text-[#0D2620]">
                        <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1" />
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C99A4B] font-semibold opacity-90 group-hover:opacity-100 transition-opacity">
                        COLLECTION
                      </span>
                    </div>

                    {/* Category Title: Deep green editorial serif */}
                    <h3 className="text-xl sm:text-2xl font-display italic text-[#173F35] tracking-tight leading-[1.2] mb-3 group-hover:text-[#0D241E] transition-colors">
                      {cat.title}
                    </h3>

                    {/* Gold Accent Divider Bar */}
                    <div className="w-8 h-[2px] bg-[#C99A4B]/60 my-4 transition-all duration-300 group-hover:w-14 group-hover:bg-[#C99A4B]" />

                    {/* Editorial Short Description */}
                    <p className="text-xs sm:text-[13.5px] text-[#223530]/85 font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Directional Arrow & Action: Generous whitespace & forward movement */}
                  <div className="pt-6 mt-8 border-t border-[#E8DFD0] flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#173F35] font-semibold transition-colors group-hover:text-[#C99A4B]">
                      Explore Stories
                    </span>

                    <div className="w-8 h-8 rounded-full bg-[#EFE8DC] text-[#173F35] flex items-center justify-center transition-all duration-300 group-hover:bg-[#C99A4B] group-hover:text-white group-hover:translate-x-1.5 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
