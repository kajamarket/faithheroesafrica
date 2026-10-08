import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { siteConfig } from '../site.config';
import { BlogPost } from '../types/blog';

interface CategoryCarouselProps {
  posts: BlogPost[];
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ posts }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canAutoAdvance, setCanAutoAdvance] = useState<boolean>(true);
  const config = siteConfig.categoriesSection;

  // Derive categories that actually exist in posts with at least 1 post
  const categories = useMemo(() => {
    const map = new Map<string, { name: string; slug: string; count: number }>();
    for (const p of posts) {
      for (const c of p.categories || []) {
        if (c.slug) {
          const existing = map.get(c.slug);
          if (existing) {
            existing.count += 1;
          } else {
            map.set(c.slug, { name: c.name, slug: c.slug, count: 1 });
          }
        }
      }
    }
    return Array.from(map.values()).filter((item) => item.count > 0);
  }, [posts]);

  // Stop auto-advance permanently upon any user interaction
  const stopAutoAdvance = () => {
    setCanAutoAdvance(false);
  };

  // Auto-advance logic
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!canAutoAdvance || categories.length <= 1) return;

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
        container.scrollBy({ left: 320, behavior: 'smooth' });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [canAutoAdvance, categories.length]);

  const handleScrollLeft = () => {
    stopAutoAdvance();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    stopAutoAdvance();
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (!config || categories.length === 0) {
    return null;
  }

  return (
    <section
      id="archive-categories"
      className="relative bg-bg py-20 md:py-28 border-t border-stroke/50"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-10 md:mb-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent font-mono text-xs tracking-widest font-semibold">
                02.
              </span>
              <span className="text-muted text-xs tracking-[0.25em] font-medium uppercase">
                {config.label ? config.label.replace(/^02\.\s*/, '') : 'EXPLORE THE ARCHIVE'}
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

          {/* Controls & Prompt Label */}
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
                className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-heading hover:border-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                aria-label="Scroll categories forward"
                className="w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-heading hover:border-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Snap Carousel */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div
          ref={containerRef}
          onMouseEnter={stopAutoAdvance}
          onTouchStart={stopAutoAdvance}
          onFocus={stopAutoAdvance}
          onScroll={stopAutoAdvance}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 select-none focus:outline-none"
          tabIndex={0}
          aria-label="Archive categories carousel"
        >
          {categories.map((cat, idx) => {
            const description =
              siteConfig.categoryDescriptions?.[cat.slug] ||
              'Profiles, testimonies, and movements preserved in the continental digital archive.';

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
              >
                <Link
                  to={`/category/${cat.slug}/`}
                  className="group flex flex-col justify-between h-full min-h-[260px] p-7 rounded-3xl bg-surface/70 hover:bg-surface border border-stroke/70 hover:border-accent/60 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  {/* Top Bar: Number & Count */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs text-accent font-semibold tracking-wider group-hover:translate-x-1 transition-transform">
                        0{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono text-muted tracking-wide uppercase px-2.5 py-1 rounded-full bg-bg/60 border border-stroke/50">
                        {cat.count} {cat.count === 1 ? 'Dispatch' : 'Dispatches'}
                      </span>
                    </div>

                    {/* Category Title */}
                    <h3 className="text-xl sm:text-2xl font-display italic text-heading tracking-tight mb-3 group-hover:text-accent transition-colors">
                      {cat.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-text-primary/75 font-light leading-relaxed line-clamp-3">
                      {description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-6 mt-6 border-t border-stroke/50 flex items-center justify-between text-xs font-medium text-heading">
                    <span className="uppercase tracking-widest text-[11px] font-mono text-muted group-hover:text-heading transition-colors">
                      Explore category
                    </span>
                    <span className="text-accent text-sm transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
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
