import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const isManualScrolling = useRef(false);
  const scrollLockTimeout = useRef(null);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Academics', id: 'academics' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    // True sequential order of sections as they appear down the page
    const domSections = ['about', 'academics', 'skills', 'projects', 'contact'];

    let ticking = false;
    const handleScroll = () => {
      // If user clicked a button, ignore scroll tracking while scrolling to target
      if (isManualScrolling.current) return;

      if (!ticking) {
        requestAnimationFrame(() => {
          // If at the top hero section
          if (window.scrollY < 200) {
            setActiveSection('');
            ticking = false;
            return;
          }

          // Check if user has scrolled to the bottom of the page
          const isAtBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 80;

          if (isAtBottom) {
            setActiveSection('contact');
            ticking = false;
            return;
          }

          // Target line at 38% of the viewport height
          const targetY = window.innerHeight * 0.38;
          let matched = '';

          for (const id of domSections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= targetY && rect.bottom > targetY) {
                matched = id;
                break;
              }
            }
          }

          if (matched) {
            setActiveSection(matched);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollLockTimeout.current);
    };
  }, []);

  const scrollTo = (id) => {
    // 1. Immediately lock and set the clicked button
    setActiveSection(id);

    // 2. Lock scroll-spy updates so intermediate buttons NEVER glow or flicker during scroll
    isManualScrolling.current = true;
    clearTimeout(scrollLockTimeout.current);
    scrollLockTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1200);

    const el = document.getElementById(id);
    if (!el) return;

    // 3. Smooth scroll via Lenis for buttery-smooth 60+ FPS motion, or native smooth scroll
    if (window.lenis) {
      window.lenis.scrollTo(el, {
        offset: -30,
        duration: 0.95,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Bottom Floating Dock"
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1.5 sm:p-2 rounded-full bg-[#080909]/80 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.06)] ring-1 ring-white/5 transition-all duration-300 pointer-events-auto"
    >
      <div className="flex items-center gap-1 sm:gap-1.5">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                scrollTo(item.id);
              }}
              onFocus={(e) => e.currentTarget.blur()}
              style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer active:scale-95 select-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ring-0 ${
                isActive
                  ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
