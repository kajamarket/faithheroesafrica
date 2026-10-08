import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../types/blog';
import { siteConfig } from '../site.config';

interface SelectedWorksProps {
  posts: BlogPost[];
}

const FALLBACK_IMAGES = [
  '/src/assets/images/work_automotive_motion_1791443951229.jpg',
  '/src/assets/images/work_urban_architecture_1791443963290.jpg',
  '/src/assets/images/work_human_perspective_1791443973045.jpg',
  '/src/assets/images/work_brand_identity_1791443984262.jpg',
  '/src/assets/images/journal_spatial_computing_1791444057754.jpg',
  '/src/assets/images/journal_design_systems_1791444045954.jpg',
];

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ posts }) => {
  const config = siteConfig.featuredArchive;
  const heading = config?.heading || 'Stories worth remembering.';
  const intro =
    config?.intro ||
    'Discover stories of faith, leadership, history and transformation from the Faith Heroes Africa collection.';

  if (!posts || posts.length === 0) {
    return null;
  }

  // Display up to 6 posts in a responsive 3-column grid
  const displayPosts = posts.slice(0, 6);

  const getImage = (post: BlogPost, index: number) => {
    return (
      post.featuredImage?.url ||
      FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
    );
  };

  return (
    <section id="stories" className="bg-bg py-20 md:py-28 relative border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent/60" />
              <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
                {config?.label ? config.label.replace(/^03\.\s*/, '') : 'STORIES WORTH REMEMBERING'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15]">
              {heading}
            </h2>

            <p className="text-muted text-sm md:text-base mt-3 max-w-xl font-light leading-relaxed">
              {intro}
            </p>
          </div>

          <div className="hidden md:inline-flex shrink-0">
            <Link
              to="/blog/"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stroke bg-surface/60 text-xs font-medium text-heading hover:border-accent hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Explore all stories</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>

        {/* 3 Article Cards Side by Side on Desktop / Tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {displayPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-surface/60 border border-stroke/70 transition-all duration-300 hover:border-accent/60 hover:bg-surface shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
            >
              <Link to={`/blog/${post.slug}/`} className="flex flex-col h-full">
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface/50">
                  <img
                    src={getImage(post, idx)}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-bg/85 backdrop-blur-md text-accent border border-stroke/60">
                      {post.categories?.[0]?.name || 'Stories'}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-7 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted mb-3 font-mono">
                      <span>{post.date ? post.date.slice(0, 10) : ''}</span>
                      {post.readingTime && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display italic text-heading tracking-tight mb-3 group-hover:text-accent transition-colors leading-[1.25] line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-primary/75 font-light leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-heading group-hover:text-accent transition-colors font-semibold pt-4 border-t border-stroke/40">
                    <span>READ STORY</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
