import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const NewsletterSection: React.FC = () => {
  const newsletter = siteConfig.newsletter;

  // Omit the section while formAction is empty
  if (!newsletter || !newsletter.formAction || newsletter.formAction.trim() === '') {
    return null;
  }

  return (
    <section
      id="newsletter"
      className="bg-bg py-20 md:py-28 border-t border-stroke/50 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-accent font-mono text-xs tracking-widest font-semibold">
              06.
            </span>
            <span className="text-muted text-xs tracking-[0.25em] font-medium uppercase">
              STAY CONNECTED
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15] mb-4">
            Keep the stories coming.
          </h2>

          <p className="text-muted text-sm md:text-base font-light leading-relaxed mb-8">
            Receive new stories, interviews and updates from {siteConfig.name}.
          </p>

          {/* Plain HTML Form with native POST */}
          <form
            action={newsletter.formAction}
            method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="flex-grow px-5 py-3 rounded-full bg-surface border border-stroke text-sm text-text-primary placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-light hover:text-black font-medium text-xs font-mono uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
            >
              Subscribe →
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
