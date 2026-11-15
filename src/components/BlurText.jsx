'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef, useEffect, useState } from 'react';

const BlurText = ({
  text = '',
  children,
  delay = 0,
  className = '',
  animateBy = 'words', // 'words' | 'letters' | 'none'
  direction = 'top',
  blur = 10,
  distance = 30,
  stepDuration = 0.35,
  stagger = 0.035,
  as: Component = 'div',
  highlightWords = [],
  highlightClassName = '',
  threshold = 0.1,
  once = false, // false ensures bidirectional backwards and forwards animation
  margin = '-20px 0px -20px 0px'
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: margin || '-20px 0px -20px 0px',
    amount: threshold || 0.1
  });

  const [scrollDir, setScrollDir] = useState('down');
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollDir(currentY >= lastY.current ? 'down' : 'up');
      lastY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Downwards scroll uses specified direction; backwards (upwards) scroll reverses
  const effectiveDirection = scrollDir === 'down' ? direction : (direction === 'top' ? 'bottom' : 'top');
  const sign = effectiveDirection === 'top' ? -1 : 1;
  const initialY = sign * distance;

  // Word tokenization
  const words = useMemo(() => {
    if (!text || typeof text !== 'string') return [];
    return text.split(' ');
  }, [text]);

  const pieces = useMemo(() => {
    if (!text || typeof text !== 'string' || animateBy === 'none') return [];
    const list = [];
    words.forEach((word, w) => {
      const isLast = w === words.length - 1;
      if (animateBy === 'words') {
        list.push({ wordIndex: w, content: isLast ? word : `${word}\u00A0`, key: `w-${w}` });
      } else {
        Array.from(word).forEach((char, c) => {
          list.push({ wordIndex: w, content: char, key: `c-${w}-${c}` });
        });
        if (!isLast) {
          list.push({ wordIndex: w, content: '\u00A0', key: `s-${w}` });
        }
      }
    });
    return list;
  }, [words, animateBy]);

  // If children passed instead of string text, animate the whole block with blur
  if (children || !text) {
    const isFullHeight = className.includes('h-full');
    return (
      <Component ref={containerRef} className={className}>
        <motion.div
          className={isFullHeight ? 'h-full flex flex-col flex-1' : undefined}
          initial={{ opacity: 0, filter: `blur(${blur}px)`, y: initialY }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  transition: {
                    duration: stepDuration * 1.4,
                    delay: delay / 1000,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              : {
                  opacity: 0,
                  filter: `blur(${blur}px)`,
                  y: -initialY * 0.4,
                  transition: {
                    duration: stepDuration * 0.8,
                    ease: [0.55, 0, 0.9, 0.45]
                  }
                }
          }
        >
          {children || text}
        </motion.div>
      </Component>
    );
  }

  // Word/letter staggered blur animation
  return (
    <Component
      ref={containerRef}
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap' }}
    >
      {pieces.map((piece, i) => {
        const isHighlighted = highlightWords.some(hw =>
          words[piece.wordIndex]?.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <motion.span
            key={piece.key}
            className={isHighlighted && highlightClassName ? highlightClassName : undefined}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
            initial={{
              opacity: 0,
              filter: `blur(${blur}px)`,
              y: initialY
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    transition: {
                      duration: stepDuration,
                      delay: delay / 1000 + i * stagger,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                : {
                    opacity: 0,
                    filter: `blur(${blur}px)`,
                    y: -initialY * 0.4,
                    transition: {
                      duration: stepDuration * 0.6,
                      delay: (pieces.length - 1 - i) * (stagger * 0.35),
                      ease: [0.55, 0, 0.9, 0.45]
                    }
                  }
            }
          >
            {piece.content}
          </motion.span>
        );
      })}
    </Component>
  );
};

export default BlurText;
