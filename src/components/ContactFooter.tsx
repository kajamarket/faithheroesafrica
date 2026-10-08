import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

const DEFAULT_VIDEO_URL = 'https://assets.mixkit.co/videos/41401/41401-720.mp4';
const DEFAULT_POSTER_URL = 'https://assets.mixkit.co/videos/41401/41401-thumb-720-0.jpg';

export const ContactFooter: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const videoUrl = siteConfig.heroVideoUrl || DEFAULT_VIDEO_URL;

  // Background Video Setup (Flipped vertically scale-y-[-1]) - SSR Safe
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const video = videoRef.current;
    if (!video) return;

    if (videoUrl.includes('.m3u8')) {
      let hlsInstance: any = null;
      import('hls.js').then(({ default: Hls }) => {
        if (!video) return;
        if (Hls.isSupported()) {
          hlsInstance = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
          });
          hlsInstance.loadSource(videoUrl);
          hlsInstance.attachMedia(video);
          hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {});
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoUrl;
          video.addEventListener('loadedmetadata', () => {
            video.play().catch(() => {});
          });
        }
      });
      return () => {
        if (hlsInstance) {
          hlsInstance.destroy();
        }
      };
    } else {
      if (!video.src || video.src !== videoUrl) {
        video.src = videoUrl;
      }
      video.play().catch(() => {});
    }
  }, [videoUrl]);

  // GSAP Marquee animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx: any = null;

    import('gsap').then(({ default: gsap }) => {
      if (!marqueeRef.current) return;
      ctx = gsap.context(() => {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 40,
          ease: 'none',
          repeat: -1,
        });
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const marqueePhrase = `${siteConfig.heroTitle.toUpperCase()} • CHRONICLING COURAGEOUS FAITH ACROSS AFRICA • `;
  const marqueeText = Array(4).fill(marqueePhrase).join('');

  const networkItems = (siteConfig.network || []).filter(
    (item) => item.href && item.href.trim() !== ''
  );

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-24 pb-12 overflow-hidden border-t border-stroke/50"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={DEFAULT_POSTER_URL}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-35"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0C211C]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>

      {/* Marquee Strip */}
      <div className="relative z-10 w-full overflow-hidden whitespace-nowrap mb-16 md:mb-20 py-4 select-none opacity-80 border-y border-stroke/40">
        <div ref={marqueeRef} className="inline-flex will-change-transform">
          <span className="font-display italic text-2xl sm:text-4xl md:text-5xl text-heading tracking-wider px-4">
            {marqueeText}
          </span>
          <span
            aria-hidden="true"
            className="font-display italic text-2xl sm:text-4xl md:text-5xl text-heading tracking-wider px-4"
          >
            {marqueeText}
          </span>
        </div>
      </div>

      {/* Main CTA Section */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center mb-16 md:mb-20">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-accent/60" />
          <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
            CONNECT WITH THE ARCHIVE
          </span>
          <span className="w-8 h-px bg-accent/60" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl text-heading font-light tracking-tight max-w-2xl mb-5">
          Documenting <span className="font-display italic font-normal">The Moves of God</span> in Africa.
        </h2>

        <p className="text-sm md:text-base text-muted max-w-md mb-8 font-light leading-relaxed">
          Have an archive submission, historical record, or testimony to share? Reach out to our editorial desk.
        </p>

        {/* Email CTA button */}
        {siteConfig.contactEmail && (
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="relative p-[1.5px] rounded-full group cursor-pointer inline-flex transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-full accent-gradient opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 bg-surface border border-stroke text-xs sm:text-sm text-heading font-medium transition-colors group-hover:bg-bg group-hover:border-transparent shadow-lg">
              <span>{siteConfig.contactEmail}</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent">
                ↗
              </span>
            </div>
          </a>
        )}
      </div>

      {/* Tidy Link Columns */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-stroke/60 text-xs">
          {/* Column 1: Explore */}
          <div>
            <span className="font-mono uppercase tracking-widest text-[11px] text-accent font-semibold block mb-3">
              Explore
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-muted hover:text-heading transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog/" className="text-muted hover:text-heading transition-colors">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: About */}
          <div>
            <span className="font-mono uppercase tracking-widest text-[11px] text-accent font-semibold block mb-3">
              About
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about/" className="text-muted hover:text-heading transition-colors">
                  About Archive
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="text-muted hover:text-heading transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Network (only if network has entries) */}
          {networkItems.length > 0 && (
            <div>
              <span className="font-mono uppercase tracking-widest text-[11px] text-accent font-semibold block mb-3">
                Network
              </span>
              <ul className="space-y-2.5">
                {networkItems.map((net) => (
                  <li key={net.href}>
                    <a
                      href={net.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-heading transition-colors"
                    >
                      {net.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 4: Connect */}
          <div>
            <span className="font-mono uppercase tracking-widest text-[11px] text-accent font-semibold block mb-3">
              Connect
            </span>
            <ul className="space-y-2.5">
              {siteConfig.social.map((soc) => (
                <li key={soc.label}>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-heading transition-colors"
                  >
                    {soc.label}
                  </a>
                </li>
              ))}
              {siteConfig.contactEmail && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-muted hover:text-heading transition-colors"
                  >
                    Email Desk
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-6 border-t border-stroke/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
        <div>
          {siteConfig.tagline}
        </div>
        <div>
          © {new Date().getFullYear()} {siteConfig.name}
        </div>
      </div>
    </footer>
  );
};
