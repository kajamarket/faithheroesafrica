import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ContactFooter } from '../components/ContactFooter';
import { siteConfig } from '../site.config';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-text-primary pt-28 pb-16">
      <Seo
        title="About Our Ministry"
        description={`Learn about the mission, heritage, and vision of ${siteConfig.name} across the African continent.`}
        path="/about/"
        type="website"
        pageType="AboutPage"
        breadcrumbs={[{ name: 'About', path: '/about/' }]}
      />

      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
              MISSION & HERITAGE
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-heading tracking-tight mb-6">
            About <span className="font-display italic font-normal">{siteConfig.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-heading/90 font-light leading-relaxed">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Narrative Section (Substantive visible text > 150 words) */}
        <div className="space-y-10 text-base md:text-lg text-text-primary/85 leading-relaxed font-light border-t border-stroke/60 pt-10">
          <section>
            <h2 className="text-2xl font-display italic text-heading mb-4">
              Our Vision & Calling
            </h2>
            <p className="mb-4">
              {siteConfig.description} Across fifty-four sovereign nations and thousands of distinct language groups, God has woven an extraordinary tapestry of spiritual awakening, sacrificial missionary service, and victorious community transformation. We believe that actively chronicling these triumphs preserves vital spiritual anchors for modern African believers, diaspora communities, and global students of Christian history.
            </p>
            <p className="mb-4">
              From the historic East African Revival of the early twentieth century to the daring frontier evangelists walking across the Sahel, and the visionary reformers planting educational institutions and hospitals throughout Central and Southern Africa, our continent is rich with heroes of genuine, tested faith.
            </p>
            <p>
              By documenting their biographies, sermons, personal journals, and ministry principles, we seek to stir fresh faith and resilience in today&apos;s emerging leaders.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-surface/50 border border-stroke/70 shadow-sm">
            <h2 className="text-xs text-accent uppercase tracking-[0.2em] font-mono font-medium mb-4">
              Guiding Convictions
            </h2>
            <ul className="space-y-3.5 text-sm md:text-base text-text-primary/90 font-light">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span><strong className="font-semibold text-heading">Scriptural Fidelity:</strong> Every narrative is evaluated through the lens of biblical truth, highlighting Christ as the center of all authentic spiritual impact.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span><strong className="font-semibold text-heading">Historical Accuracy:</strong> We prioritize verified eyewitness accounts, archival documents, and rigorous editorial stewardship to present truthful, balanced biographies.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span><strong className="font-semibold text-heading">Continental Scope:</strong> Dedicated to telling stories from all regions—North, West, Central, East, and Southern Africa—without geographical or cultural bias.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display italic text-heading mb-4">
              Editorial Purpose
            </h2>
            <p className="mb-4">
              Our articles address everyday spiritual challenges with clarity, humility, and theological depth. Whether tackling personal discipleship in a noisy digital culture, raising ethical Christian leaders in civic life, or navigating generational transitions in ministry, we point readers back to the unwavering faithfulness of God.
            </p>
            <p>
              True victory is neither accidental nor fleeting; it is rooted in eternal purpose, nurtured through spiritual discipline, and sustained by humble obedience to the Holy Spirit.
            </p>
          </section>

          {/* Action CTAs */}
          <div className="pt-8 border-t border-stroke/60 flex flex-wrap items-center gap-4">
            <Link
              to="/blog/"
              className="px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-light hover:text-black font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
            >
              Explore Our Stories →
            </Link>
            <Link
              to="/contact/"
              className="px-6 py-3 rounded-full bg-surface border border-stroke text-heading font-medium text-xs font-mono uppercase tracking-wider hover:border-accent hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              Contact Editorial Desk
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <ContactFooter />
      </div>
    </div>
  );
};
