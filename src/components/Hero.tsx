import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

interface HeroProps {
  ready?: boolean;
}

const DEFAULT_VIDEO_URL = 'https://assets.mixkit.co/videos/41401/41401-720.mp4';
const DEFAULT_POSTER_URL = 'https://assets.mixkit.co/videos/41401/41401-thumb-720-0.jpg';

export const Hero: React.FC<HeroProps> = ({ ready = true }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroContainerRef = useRef<HTMLElement | null>(null);
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [isPrimaryHovered, setIsPrimaryHovered] = useState<boolean>(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState<boolean>(false);

  const videoUrl = siteConfig.heroVideoUrl || DEFAULT_VIDEO_URL;

  // Video setup - supports direct MP4 and HLS stream (.m3u8) - SSR safe
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
            backBufferLength: 90,
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

  // Roles cycle every 2.4 seconds
  useEffect(() => {
    if (!siteConfig.heroRoles || siteConfig.heroRoles.length === 0) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteConfig.heroRoles.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance timeline - dynamically imported inside useEffect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!ready || !heroContainerRef.current) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx: any = null;

    import('gsap').then(({ default: gsap }) => {
      if (!heroContainerRef.current) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          '.name-reveal',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, delay: 0.1 }
        );

        tl.fromTo(
          '.blur-in',
          { opacity: 0, y: 16, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.1 },
          0.3
        );
      }, heroContainerRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, [ready]);

  const activeRole = siteConfig.heroRoles[roleIndex] || siteConfig.heroRoles[0];
  const parts = siteConfig.heroSentence.split('{role}');
  const prefix = parts[0] || 'A ';
  const suffix = parts[1] || ' rises across Africa.';

  const handleScrollToMission = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof document === 'undefined') return;
    const target = document.getElementById('mission');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="relative min-h-[92vh] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg px-4 select-none"
    >
      {/* Background Video with Living Landscape subtle drift */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={DEFAULT_POSTER_URL}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-70 animate-drift"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Subtle deep-green overlay (about 25-30%) */}
        <div className="absolute inset-0 bg-[#0C211C]/30 mix-blend-multiply" />
        {/* Soft warm-gold gradient glow near the horizon */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-[#C99A4B]/10 to-black/20" />
        {/* Bottom fade into the theme background colour */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-bg via-bg/75 to-transparent" />
      </div>

      {/* Hero Content (Ivory text over the hero in both modes for optimal contrast) */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-28 pb-20">
        {/* Eyebrow */}
        <p className="blur-in text-xs text-[#E2C27F] uppercase tracking-[0.3em] mb-5 font-medium flex items-center gap-2">
          <span className="w-6 h-px bg-[#C99A4B]/60" />
          <span>{siteConfig.heroEyebrow}</span>
          <span className="w-6 h-px bg-[#C99A4B]/60" />
        </p>

        {/* Primary H1: exactly one per route */}
        <h1 className="name-reveal text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic leading-[1.02] tracking-tight text-[#F7F4EC] mb-6 drop-shadow-sm max-w-3xl">
          {siteConfig.heroTitle}
        </h1>

        {/* Microcopy pill/tag line */}
        {siteConfig.heroMicrocopy && (
          <div className="blur-in text-xs sm:text-sm text-[#F7F4EC]/75 uppercase tracking-[0.25em] mb-4 font-mono">
            {siteConfig.heroMicrocopy}
          </div>
        )}

        {/* Subtle secondary role-cycling line */}
        <div className="blur-in text-sm md:text-base text-[#F7F4EC]/80 mb-6 font-light tracking-wide flex items-center justify-center gap-1.5 min-h-[28px]">
          <span>{prefix.trim()}</span>
          <span
            key={roleIndex}
            className="font-display italic text-[#E2C27F] text-lg md:text-xl animate-role-fade-in inline-block font-normal px-1"
          >
            {activeRole}
          </span>
          <span>{suffix.trim()}</span>
        </div>

        {/* Supporting text */}
        <p className="blur-in text-sm md:text-base text-[#F7F4EC]/90 max-w-xl mb-10 leading-relaxed font-light">
          {siteConfig.heroDescription || siteConfig.description}
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA: Explore The Archive */}
          <div
            className="relative rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsPrimaryHovered(true)}
            onMouseLeave={() => setIsPrimaryHovered(false)}
          >
            <div
              className={`absolute inset-0 rounded-full accent-gradient transition-opacity duration-300 ${
                isPrimaryHovered ? 'opacity-100' : 'opacity-80'
              }`}
            />
            <Link
              to="/blog/"
              className="relative inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-7 py-3.5 bg-accent text-white hover:bg-accent-light hover:text-black transition-colors cursor-pointer shadow-lg whitespace-nowrap"
            >
              <span>Read Latest Stories</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* Secondary CTA: Explore Our Mission */}
          <div
            className="relative rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsSecondaryHovered(true)}
            onMouseLeave={() => setIsSecondaryHovered(false)}
          >
            <div
              className={`absolute inset-0 rounded-full accent-gradient transition-opacity duration-300 ${
                isSecondaryHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <a
              href="#mission"
              onClick={handleScrollToMission}
              className="relative inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-7 py-3.5 bg-[#0C211C]/60 text-[#F7F4EC] border border-white/20 backdrop-blur-md hover:border-accent hover:text-[#E2C27F] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Explore Our Mission</span>
              <span className="text-xs">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
        <span className="text-[10px] text-[#F7F4EC]/60 uppercase tracking-[0.25em] font-medium font-mono">
          DISCOVER
        </span>
        <div className="relative w-px h-9 bg-white/20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-3.5 bg-[#E2C27F] animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
