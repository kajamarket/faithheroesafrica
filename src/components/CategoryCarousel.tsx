import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { siteConfig } from '../site.config';
import { BlogPost } from '../types/blog';

// 1. Missions in Africa — Compass & radiating pathways
const MissionsIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2.5 2.5" opacity="0.5" />
    <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
    <path
      d="M16 4L18 14L28 16L18 18L16 28L14 18L4 16L14 14L16 4Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="16" r="2.2" fill="#C99A4B" />
  </svg>
);

// 2. African Ministers in Diaspora — Transatlantic arc & soaring herald
const DiasporaIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    <ellipse cx="16" cy="16" rx="6.5" ry="13" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
    <line x1="3" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
    <path
      d="M10 18C13 14 17 11 24 10C22.5 14 20 18 16 19.5C13 20.5 11 19.5 10 18Z"
      stroke="#C99A4B"
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="#C99A4B"
      fillOpacity="0.18"
    />
    <circle cx="24" cy="10" r="1.5" fill="#C99A4B" />
  </svg>
);

// 3. Heritage of the African Faith — Lalibela rock-hewn cruciform & historic foundation
const HeritageIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="13.5" y="5" width="5" height="22" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
    <rect x="6.5" y="11.5" width="19" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
    <path d="M16 7V10M16 22V25M8.5 14H11.5M20.5 14H23.5" stroke="#C99A4B" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="16" cy="14" r="1.6" fill="#C99A4B" />
    <path d="M5 28H27" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// 4. Those Africa Can Never Forget — Memorial eternal flame & pedestal
const RemembranceIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M16 4.5C17.2 8 19.8 11 21.2 14.5C23 18.5 20.5 23.5 16 25C11.5 23.5 9 18.5 10.8 14.5C12.2 11 14.8 8 16 4.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M16 11.5C16.8 13.5 18 15.5 18 17.5C18 20 17 21.5 16 22.2C15 21.5 14 20 14 17.5C14 15.5 15.2 13.5 16 11.5Z"
      fill="#C99A4B"
      stroke="#C99A4B"
      strokeWidth="1"
    />
    <path d="M10 26.5H22M12 28.5H20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 5. Interviews — Dialogue scrolls & recording quill
const InterviewsIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="5.5" y="7" width="15" height="18" rx="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9 11.5H16M9 15H16M9 18.5H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path
      d="M26.5 6.5C24.5 10 22 16.5 16.5 24.5L14.5 25.5L15 23C19.5 18.5 23.5 12 26.5 6.5Z"
      stroke="#C99A4B"
      strokeWidth="1.3"
      strokeLinejoin="round"
      fill="#C99A4B"
      fillOpacity="0.2"
    />
  </svg>
);

// 6. Revival Resources — Awakening dawn rays and fire above open scriptures
const RevivalIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M7 22C10.5 20.5 14 21.2 16 23C18 21.2 21.5 20.5 25 22V11C21.5 9.5 18 10.2 16 12C14 10.2 10.5 9.5 7 11V22Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <line x1="16" y1="12" x2="16" y2="23" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M16 4C17.2 6.2 18.5 7.8 18.5 9.2C18.5 10.8 17.4 11.8 16 11.8C14.6 11.8 13.5 10.8 13.5 9.2C13.5 7.8 14.8 6.2 16 4Z"
      fill="#C99A4B"
      stroke="#C99A4B"
      strokeWidth="1"
    />
    <line x1="16" y1="2" x2="16" y2="3.2" stroke="#C99A4B" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="10.5" y1="4.5" x2="11.8" y2="5.8" stroke="#C99A4B" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="21.5" y1="4.5" x2="20.2" y2="5.8" stroke="#C99A4B" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// 7. General Stories — Open chronicle volume with silk bookmark ribbon
const GeneralStoriesIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="7.5" y="6" width="17" height="21" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <line x1="11" y1="6" x2="11" y2="27" stroke="currentColor" strokeWidth="1.1" />
    <line x1="14" y1="11" x2="21" y2="11" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="14" y1="14.5" x2="21" y2="14.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="14" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path
      d="M18 6V19L20 17L22 19V6"
      fill="#C99A4B"
      stroke="#C99A4B"
      strokeWidth="1"
      strokeLinejoin="round"
    />
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

  // Stop auto-advance permanently upon user interaction
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
        container.scrollBy({ left: 460, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [canAutoAdvance]);

  const handleScrollLeft = () => {
    stopAutoAdvance();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    stopAutoAdvance();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 460, behavior: 'smooth' });
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
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 mb-10 md:mb-12">
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

          {/* Controls & Prompt Label (Navigation Scroll Buttons retained, desktop scrollbar hidden) */}
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

      {/* Snap Carousel: Horizontal Card Layout [Icon / visual] [Category information] [Arrow / interaction] */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16">
        <div
          ref={containerRef}
          onMouseEnter={stopAutoAdvance}
          onTouchStart={stopAutoAdvance}
          onFocus={stopAutoAdvance}
          onScroll={stopAutoAdvance}
          className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 select-none focus:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Categories collection carousel"
        >
          {CATEGORY_CARDS.map((cat, idx) => {
            const { Icon } = cat;

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="snap-start shrink-0 w-[310px] sm:w-[420px] md:w-[460px] lg:w-[480px]"
              >
                <Link
                  to={`/category/${cat.slug}/`}
                  className="group relative flex flex-row items-center justify-between h-full min-h-[140px] sm:min-h-[150px] p-5 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl bg-[#FAF8F5] text-[#173F35] border border-[#E7DFD2] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-[#C99A4B]/70"
                >
                  {/* LEFT: Symbolic Icon / Visual Container */}
                  <div className="shrink-0 mr-4 sm:mr-5">
                    <div className="w-13 h-13 sm:w-15 sm:h-15 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-xl sm:rounded-2xl bg-[#EFE9DD]/85 border border-[#DDD4C3] flex items-center justify-center text-[#173F35] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#EAE2D2] group-hover:border-[#C99A4B]/60 group-hover:text-[#0D2620] shadow-xs">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2" />
                    </div>
                  </div>

                  {/* CENTER: Category Information (Title & Short Description) */}
                  <div className="flex-1 min-w-0 pr-3 sm:pr-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-3.5 h-[1.5px] bg-[#C99A4B]/70 transition-all duration-300 group-hover:w-6 group-hover:bg-[#C99A4B]" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C99A4B] font-semibold">
                        COLLECTION
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-[22px] font-display italic text-[#173F35] tracking-tight leading-[1.2] mb-1.5 group-hover:text-[#0D241E] transition-colors truncate">
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-[#223530]/80 font-light leading-snug line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* RIGHT: Directional Arrow & Interaction */}
                  <div className="shrink-0 flex items-center pl-2 border-l border-[#E8DFD0]/70">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EFE8DC] text-[#173F35] flex items-center justify-center transition-all duration-300 group-hover:bg-[#C99A4B] group-hover:text-white group-hover:translate-x-1 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300" />
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
