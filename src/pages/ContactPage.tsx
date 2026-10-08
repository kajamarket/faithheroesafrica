import React from 'react';
import { Seo } from '../components/Seo';
import { ContactFooter } from '../components/ContactFooter';
import { siteConfig } from '../site.config';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-text-primary pt-28 pb-16">
      <Seo
        title="Contact Our Desk"
        description={`Get in touch with the editorial team at ${siteConfig.name}. Send inquiries, feedback, or historical testimonies.`}
        path="/contact/"
        type="website"
        pageType="ContactPage"
        breadcrumbs={[{ name: 'Contact', path: '/contact/' }]}
      />

      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
              EDITORIAL INQUIRIES
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-heading tracking-tight mb-6">
            Contact <span className="font-display italic font-normal">{siteConfig.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-heading/90 font-light leading-relaxed">
            We welcome correspondence from pastors, researchers, writers, and readers across Africa and the global diaspora.
          </p>
        </div>

        {/* Descriptive Text (> 150 words) */}
        <div className="space-y-6 text-base md:text-lg text-text-primary/85 leading-relaxed font-light border-t border-stroke/60 pt-10 mb-12">
          <p>
            Whether you represent a local church fellowship, an academic institution researching African religious history, or a family seeking to preserve the memoirs of a pioneer evangelist, our editorial desk is here to listen. We collaborate actively with Christian historians, researchers, and contributing writers across the continent.
          </p>
          <p>
            Every article published on {siteConfig.name} undergoes editorial review to ensure doctrinal balance, respectful representation, and historical precision. If you have corrections to an existing profile, recommendations for future research, or wish to propose an interview with a contemporary church leader, please reach out directly through our contact channels below.
          </p>
          <p>
            We respond to inquiries within three to five business days. For urgent permissions or republishing rights, please clearly indicate your organization name and the specific article title in the subject line.
          </p>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-stroke/60 pt-10 mb-16">
          {/* Email Block */}
          <div className="p-8 rounded-3xl bg-surface/50 border border-stroke/70 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs text-accent uppercase tracking-[0.2em] font-mono font-medium block mb-2">
                Primary Email
              </span>
              <h2 className="text-xl font-display italic text-heading mb-3">
                Editorial Desk
              </h2>
              <p className="text-xs text-muted mb-6 font-light leading-relaxed">
                Send article feedback, biographical inquiries, or requests for collaborative documentation.
              </p>
            </div>

            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-2 text-sm text-heading hover:text-accent font-mono transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-accent/60 group-hover:decoration-accent">
                {siteConfig.contactEmail}
              </span>
              <span className="text-accent">↗</span>
            </a>
          </div>

          {/* Submissions Block */}
          <div className="p-8 rounded-3xl bg-surface/50 border border-stroke/70 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs text-accent uppercase tracking-[0.2em] font-mono font-medium block mb-2">
                Contributions
              </span>
              <h2 className="text-xl font-display italic text-heading mb-3">
                Testimony Records
              </h2>
              <p className="text-xs text-muted mb-6 font-light leading-relaxed">
                Do you have documented historical materials or firsthand testimonies of faith pioneers in your nation?
              </p>
            </div>

            <a
              href={`mailto:${siteConfig.contactEmail}?subject=Testimony%20Submission`}
              className="inline-flex items-center gap-2 text-sm text-heading hover:text-accent font-mono transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-accent/60 group-hover:decoration-accent">
                Submit Historical Record
              </span>
              <span className="text-accent">↗</span>
            </a>
          </div>
        </div>

        {/* Social communities */}
        {siteConfig.social && siteConfig.social.length > 0 && (
          <div className="p-8 rounded-3xl bg-surface/40 border border-stroke/70">
            <h2 className="text-xs text-muted uppercase tracking-[0.2em] font-mono font-medium mb-4">
              Social Communities
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              {siteConfig.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-surface border border-stroke text-xs font-mono text-heading hover:border-accent hover:text-accent transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>{s.label}</span>
                  <span className="text-accent">↗</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-24">
        <ContactFooter />
      </div>
    </div>
  );
};
