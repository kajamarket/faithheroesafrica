import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../types/blog';

interface JournalProps {
  posts: BlogPost[];
}

const JOURNAL_THUMBNAILS = [
  '/src/assets/images/journal_spatial_computing_1791444057754.jpg',
  '/src/assets/images/journal_design_systems_1791444045954.jpg',
  '/src/assets/images/work_automotive_motion_1791443951229.jpg',
  '/src/assets/images/work_urban_architecture_1791443963290.jpg',
];

export const Journal: React.FC<JournalProps> = ({ posts }) => {
  // Display posts in the journal section
  const displayPosts = posts.length > 0 ? posts.slice(0, 4) : [];

  return (
    <section id="journal" className="bg-bg py-20 md:py-28 relative border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header pattern */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent/60" />
              <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
                STORIES & WRITINGS
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15]">
              Recent stories
            </h2>

            {/* Subtext */}
            <p className="text-muted text-sm md:text-base mt-3 max-w-lg font-light leading-relaxed">
              Equipping believers through thoughtful biblical perspectives, spiritual leadership, and devotionals.
            </p>
          </div>

          {/* "View all" button */}
          <div className="hidden md:inline-flex shrink-0">
            <Link
              to="/blog/"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stroke bg-surface/60 text-xs font-medium text-heading hover:border-accent hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>View all stories</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Journal entries displayed as horizontal pills */}
        <div className="flex flex-col gap-4">
          {displayPosts.map((post, idx) => {
            const thumbnail = JOURNAL_THUMBNAILS[idx % JOURNAL_THUMBNAILS.length];
            const categoryName = post.categories?.[0]?.name || 'Ministry';

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  to={`/blog/${post.slug}/`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 md:p-5 bg-surface/40 hover:bg-surface border border-stroke/70 rounded-[28px] sm:rounded-full transition-all duration-300 group cursor-pointer hover:border-accent/60 hover:shadow-sm"
                >
                  {/* Left: Thumbnail & Title */}
                  <div className="flex items-center gap-4 md:gap-6 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke group-hover:border-accent transition-colors">
                      <img
                        src={thumbnail}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 pr-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-display italic text-heading group-hover:text-accent transition-colors truncate">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted mt-1 font-light font-mono">
                        <span className="text-accent">{categoryName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.date.slice(0, 10)}</span>
                        {post.readingTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{post.readingTime} min read</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Read CTA arrow */}
                  <div className="hidden sm:flex items-center gap-2 pr-4 shrink-0 text-xs font-mono uppercase tracking-wider text-muted group-hover:text-heading transition-colors">
                    <span>Read story</span>
                    <span className="text-accent text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
