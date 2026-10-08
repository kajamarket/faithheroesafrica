import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const FounderSection: React.FC = () => {
  const founder = siteConfig.founder;

  // Omit the section if founder config is absent
  if (!founder || !founder.name) {
    return null;
  }

  // Initials generator
  const initials = founder.name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <section
      id="founder"
      className="relative bg-bg py-20 md:py-28 border-t border-stroke/50 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Deep forest-green background panel (in both modes) */}
        <div className="relative rounded-3xl md:rounded-[36px] bg-[#0E2620] text-[#F7F4EC] p-8 md:p-14 lg:p-16 border border-[#1C463B] overflow-hidden shadow-2xl">
          {/* Large typographic "04" in thin gold watermark */}
          <div
            aria-hidden="true"
            className="absolute -top-10 md:-top-16 -right-4 md:right-8 font-display italic text-[140px] md:text-[240px] text-[#C99A4B]/10 select-none pointer-events-none leading-none z-0"
          >
            {founder.number || '04'}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* Left Column: Portrait OR Elegant Typographic Initials Panel */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              {/* Replace with a verified real photograph at /public/founder.jpg and set founder.photo; never use AI-generated or stock images. */}
              {founder.photo && founder.photo.trim() !== '' ? (
                <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#C99A4B]/40 shadow-xl bg-[#091A16]">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E2620]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl border border-[#C99A4B]/30 bg-[#091A16] flex flex-col items-center justify-center p-8 text-center shadow-xl">
                  {/* Subtle decorative gold frame */}
                  <div className="w-24 h-24 rounded-full border border-[#C99A4B]/40 flex items-center justify-center mb-6 bg-[#0E2620]/60">
                    <span className="font-display italic text-3xl sm:text-4xl text-[#E2C27F] tracking-wider select-none">
                      {initials}
                    </span>
                  </div>
                  <div className="font-display italic text-xl text-[#F7F4EC] mb-1">
                    {founder.name}
                  </div>
                  <div className="text-xs text-[#E2C27F] uppercase tracking-[0.2em] font-mono">
                    Archival Founder
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Founder Copy */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Numbered label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#E2C27F] font-mono text-xs tracking-widest font-semibold">
                  04.
                </span>
                <span className="text-[#F7F4EC]/70 text-xs tracking-[0.25em] font-medium uppercase font-mono">
                  {founder.label ? founder.label.replace(/^04\.\s*/, '') : 'THE FOUNDER'}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-[#F7F4EC] tracking-tight leading-[1.15] mb-6">
                {founder.title || `Meet ${founder.name}`}
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#F7F4EC]/85 font-light leading-relaxed">
                {founder.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Optional quote: renders only if non-empty */}
              {founder.quote && founder.quote.trim() !== '' && (
                <blockquote className="mt-8 pt-6 border-t border-[#1C463B]">
                  <p className="font-display italic text-lg sm:text-xl text-[#E2C27F] mb-2 leading-relaxed">
                    “{founder.quote}”
                  </p>
                  <cite className="not-italic text-xs text-[#F7F4EC]/60 uppercase tracking-widest font-mono">
                    — {founder.name}
                  </cite>
                </blockquote>
              )}

              {/* Strip & Books CTA */}
              {founder.stripText && (
                <div className="mt-8 pt-6 border-t border-[#1C463B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-[#E2C27F] font-mono uppercase tracking-wider">
                    {founder.stripText}
                  </div>
                  {founder.booksUrl && founder.booksUrl.trim() !== '' && (
                    <a
                      href={founder.booksUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F7F4EC] hover:text-[#E2C27F] underline underline-offset-4 decoration-[#C99A4B]/60 transition-colors"
                    >
                      <span>Explore Books</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
