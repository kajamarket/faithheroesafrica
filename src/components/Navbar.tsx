import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '../site.config';
import { ThemeToggle } from './ThemeToggle';

const ARTICLE_CATEGORIES = [
  { name: 'All Articles', href: '/blog/' },
  { name: 'Missions in Africa', href: '/category/missions/' },
  { name: 'African Ministers in Diaspora', href: '/category/african-ministers-in-diaspora/' },
  { name: 'Heritage of the African Faith', href: '/category/heritage/' },
  { name: 'Those Africa Can Never Forget', href: '/category/those-africa-can-never-forget/' },
  { name: 'Interviews', href: '/category/interviews/' },
  { name: 'Revival Resources', href: '/category/revival/' },
  { name: 'General Stories', href: '/category/uncategorized/' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [articlesDropdownOpen, setArticlesDropdownOpen] = useState<boolean>(false);
  const [mobileArticlesOpen, setMobileArticlesOpen] = useState<boolean>(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setArticlesDropdownOpen(false);
  }, [location.pathname]);

  const handleMouseEnterArticles = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setArticlesDropdownOpen(true);
  };

  const handleMouseLeaveArticles = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setArticlesDropdownOpen(false);
    }, 150);
  };

  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-5 px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-stroke/80 bg-surface/90 px-2 py-1.5 md:px-3 md:py-2 transition-all duration-300 shadow-sm ${
          scrolled ? 'shadow-md border-stroke bg-surface/95' : ''
        }`}
      >
        {/* 1. Official Faith Heroes Africa Logo */}
        <Link
          to="/"
          className="relative flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shrink-0 px-2 py-0.5"
          title={`${siteConfig.name} - Home`}
        >
          <img
            src="/faithheroes_original_logo_center-removebg-preview.png"
            alt="Faith Heroes Africa"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* 2. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5 hidden md:block" />

        {/* 3. Desktop Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            const isArticles = item.href === '/blog/';
            const isActive =
              item.href === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.href) || (isArticles && currentPath.startsWith('/category/'));

            if (isArticles) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={handleMouseEnterArticles}
                  onMouseLeave={handleMouseLeaveArticles}
                >
                  <Link
                    to={item.href}
                    className={`group inline-flex items-center gap-1 text-xs lg:text-sm rounded-full px-3 py-1.5 transition-colors cursor-pointer font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? 'text-heading font-semibold'
                        : 'text-muted hover:text-heading'
                    }`}
                  >
                    <span className="relative py-0.5">
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent transition-transform duration-300 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </span>
                    <ChevronDown className="w-3 h-3 text-muted group-hover:text-heading transition-transform" />
                  </Link>

                  {/* Dropdown Menu for Categories */}
                  {articlesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-surface/95 backdrop-blur-xl border border-stroke rounded-2xl py-2 shadow-2xl z-50">
                      <div className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-accent">
                        Categories
                      </div>
                      {ARTICLE_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.href}
                          to={cat.href}
                          onClick={() => setArticlesDropdownOpen(false)}
                          className="block px-3 py-1.5 text-xs text-text-primary/80 hover:text-heading hover:bg-stroke/40 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group relative text-xs lg:text-sm rounded-full px-3 py-1.5 transition-colors cursor-pointer font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'text-heading font-semibold'
                    : 'text-muted hover:text-heading'
                }`}
              >
                <span className="relative py-0.5">
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </span>
              </Link>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5 hidden md:block" />

        {/* 5. Compact primary button "Explore Stories" */}
        <Link
          to="/blog/"
          className="relative inline-flex items-center text-xs font-medium rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-accent text-white hover:bg-accent-light hover:text-black transition-colors shrink-0 shadow-sm whitespace-nowrap ml-1 focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>Explore Stories</span>
        </Link>

        {/* 6. Theme Toggle */}
        <div className="ml-1 shrink-0">
          <ThemeToggle />
        </div>

        {/* 7. Mobile Menu Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden relative w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-text-primary hover:bg-stroke/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ml-0.5 cursor-pointer shrink-0"
        >
          {mobileMenuOpen ? <X className="w-4 h-4 text-heading" /> : <Menu className="w-4 h-4 text-heading" />}
        </button>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto fixed top-16 inset-x-4 max-w-sm mx-auto bg-surface/95 backdrop-blur-xl border border-stroke rounded-3xl p-5 shadow-2xl flex flex-col gap-2 z-50 max-h-[85vh] overflow-y-auto">
          <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono px-3 mb-1">
            Navigation
          </div>
          {siteConfig.nav.map((item) => {
            const isArticles = item.href === '/blog/';
            const isActive =
              item.href === '/'
                ? currentPath === '/'
                : currentPath.startsWith(item.href);

            if (isArticles) {
              return (
                <div key={item.href} className="flex flex-col">
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium">
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={isActive ? 'text-heading font-semibold' : 'text-text-primary/80 hover:text-heading'}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileArticlesOpen(!mobileArticlesOpen)}
                      className="p-1 text-muted hover:text-heading"
                      aria-label="Toggle categories list"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileArticlesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {mobileArticlesOpen && (
                    <div className="pl-4 pr-2 py-1 flex flex-col gap-1 border-l border-stroke/50 ml-3">
                      {ARTICLE_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.href}
                          to={cat.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2 py-1 text-xs text-text-primary/70 hover:text-accent transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-heading bg-stroke/40 font-semibold'
                    : 'text-text-primary/80 hover:text-heading hover:bg-stroke/20'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-accent">→</span>
              </Link>
            );
          })}
          <div className="pt-2 mt-2 border-t border-stroke/60 flex items-center justify-between px-3">
            <span className="text-xs text-muted">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};
