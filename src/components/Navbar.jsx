import React, { useState, useEffect, useRef } from 'react';
import GooeyNav from './GooeyNav';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const isManualScrolling = useRef(false);
  const scrollLockTimeout = useRef(null);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Academics', id: 'academics' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  const domSections = ['hero', 'about', 'academics', 'skills', 'projects', 'contact'];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      // If user clicked an item, lock scroll-spy tracking during smooth scroll
      if (isManualScrolling.current) return;

      if (!ticking) {
        requestAnimationFrame(() => {
          // If at the top hero section
          if (window.scrollY < 200) {
            setActiveSection('hero');
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
    setActiveSection(id);

    // Lock scroll-spy updates so intermediate sections don't flicker or disrupt gooey flow
    isManualScrolling.current = true;
    clearTimeout(scrollLockTimeout.current);
    scrollLockTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);

    if (id === 'hero') {
      if (window.lenis) {
        window.lenis.scrollTo(0, {
          duration: 0.95,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    if (window.lenis) {
      window.lenis.scrollTo(el, {
        offset: -30,
        duration: 0.95,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === activeSection)
  );

  return (
    <div
      aria-label="Bottom Floating Dock"
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <GooeyNav
        items={navItems}
        activeIndex={activeIndex}
        onChange={(index, item) => scrollTo(item.id)}
        theme="dark"
        size="md"
        frame={true}
        particleCount={15}
        spread={40}
        animationTime={350}
        timeVariance={1000}
        gooeyness={1}
        wobble={0.5}
        hoverEffect={true}
      />
    </div>
  );
}
