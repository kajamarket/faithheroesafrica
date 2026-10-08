import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const EditorialStatement: React.FC = () => {
  const statement = siteConfig.editorialStatement;
  if (!statement || !statement.statement) {
    return null;
  }

  return (
    <section className="relative w-full py-20 md:py-32 bg-surface/50 border-y border-stroke/50 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto"
        >
          {/* Subtle gold line ornament */}
          <div className="w-12 h-px bg-accent/60 mb-8" />

          {/* Large Serif Statement */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display italic text-heading tracking-tight leading-[1.1] mb-6">
            “{statement.statement}”
          </h2>

          {/* Subtext */}
          {statement.subtext && (
            <p className="text-sm sm:text-base md:text-lg text-muted uppercase tracking-[0.2em] font-light font-mono max-w-xl">
              {statement.subtext}
            </p>
          )}

          <div className="w-12 h-px bg-accent/60 mt-8" />
        </motion.div>
      </div>
    </section>
  );
};
