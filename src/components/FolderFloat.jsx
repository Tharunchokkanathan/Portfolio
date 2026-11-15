import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './FolderFloat.css';

const DEFAULT_ITEMS = [
  { label: 'LinkedIn', value: 'linkedin', href: '#' },
  { label: 'GitHub', value: 'github', href: '#' },
  { label: 'Email', value: 'email', href: '#' },
  { label: 'X (Twitter)', value: 'twitter', href: '#' }
];

const getLayout = (list, spread, lift, tilt) => {
  if (list.length === 4) {
    return [
      { x: -spread * 0.48, y: -lift, r: -tilt * 0.8 },        // Left (LinkedIn)
      { x: -spread * 0.02, y: -lift - 6, r: tilt * 0.2 },     // Center (GitHub)
      { x: spread * 0.48, y: -lift + 2, r: tilt * 0.8 },       // Right (Email Me)
      { x: 0, y: -lift - 52, r: -tilt * 0.3 }                  // Top Center (X / Twitter)
    ];
  }

  return list.map((_, i) => ({
    x: (i - (list.length - 1) / 2) * (spread * 0.45),
    y: -lift - (i % 2) * 20,
    r: (i - (list.length - 1) / 2) * tilt
  }));
};

export default function FolderFloat({
  items = DEFAULT_ITEMS,
  label = 'Connect & Channels',
  sublabel = 'Hover or tap to open',
  trigger = 'hover',
  defaultOpen = false,
  folderColor = '#101512',
  frontColor = '#17241c',
  paperColor = '#ffffff',
  itemColor = '#ffffff',
  itemTextColor = '#09090b',
  labelColor = '#f4f4f5',
  width = 210,
  height = 148,
  radius = 14,
  spread = 170,
  lift = 32,
  tilt = 6,
  flapAngle = 32,
  restAngle = 14,
  openDuration = 460,
  stagger = 38,
  className = ''
}) {
  const [open, setOpen] = useState(defaultOpen);
  const containerRef = useRef(null);
  const leaveTimer = useRef(null);

  const list = items.map((item) =>
    typeof item === 'string' ? { label: item, value: item, href: '#' } : item
  );
  const n = list.length;
  const sub = sublabel || `${n} ${n === 1 ? 'channel' : 'channels'}`;
  const pos = getLayout(list, spread, lift, tilt);

  const isHover = trigger === 'hover';

  const handleMouseEnter = () => {
    if (!isHover) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isHover) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      setOpen(false);
    }, 240); // 240ms grace buffer for fluid cursor transitions
  };

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`folder-float${className ? ` ${className}` : ''}`}
      data-open={open ? '' : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--ff-w': `${width}px`,
        '--ff-h': `${height}px`,
        '--ff-r': `${radius}px`,
        '--ff-back': folderColor,
        '--ff-front': frontColor,
        '--ff-paper': paperColor,
        '--ff-item': itemColor,
        '--ff-item-ink': itemTextColor,
        '--ff-label': labelColor,
        '--ff-spread': `${spread}px`,
        '--ff-lift': `${lift}px`,
        '--ff-angle': `${flapAngle}deg`,
        '--ff-rest': `${restAngle}deg`,
        '--ff-open': `${openDuration}ms`,
        '--ff-close': `${Math.round(openDuration * 0.65)}ms`,
        '--ff-stagger': `${stagger}ms`,
        '--ff-n': n
      }}
    >
      <div className="folder-float__folder">
        {/* Layer 1: Back Shell */}
        <span className="folder-float__back" aria-hidden="true" />

        {/* Layer 2: White Document Paper Sheet */}
        <span className="folder-float__paper" aria-hidden="true" />

        {/* Layer 3: Draggable App Link Buttons (Inwards between Paper and Front Flap) */}
        <div className="folder-float__items">
          {list.map((item, i) => {
            const p = pos[i] || { x: 0, y: 0, r: 0 };
            return (
              <motion.a
                key={item.value || i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                drag
                dragConstraints={{
                  left: -spread - 50,
                  right: spread + 50,
                  top: -lift - 130,
                  bottom: 30
                }}
                dragElastic={0.16}
                dragTransition={{ bounceStiffness: 500, bounceDamping: 26 }}
                whileHover={{
                  scale: 1.08,
                  zIndex: 45,
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.28), 0 4px 10px rgba(0, 0, 0, 0.15)'
                }}
                whileDrag={{
                  scale: 1.14,
                  zIndex: 60,
                  cursor: 'grabbing',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.38)'
                }}
                initial={false}
                animate={{
                  x: open ? p.x : p.x * 0.1,
                  y: open ? p.y : 54,
                  rotate: open ? p.r : 0,
                  scale: open ? 1 : 0.68,
                  opacity: open ? 1 : 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: open ? 360 : 320,
                  damping: open ? 26 : 30,
                  delay: open ? i * 0.038 : (n - 1 - i) * 0.02
                }}
                className="folder-float__item"
                tabIndex={open ? 0 : -1}
                aria-hidden={!open}
                style={{
                  pointerEvents: open ? 'auto' : 'none'
                }}
              >
                {item.icon && (
                  <span className="folder-float__icon">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Layer 4: Front Green Flap (Covers Buttons When Retracted) */}
        <div className="folder-float__front" aria-hidden="true">
          <span className="folder-float__label">{label}</span>
          <span className="folder-float__sub">{sub}</span>
        </div>

        {/* Layer 5: Invisible Front Trigger for Tap / Click Toggle */}
        <button
          type="button"
          className="folder-float__trigger"
          aria-expanded={open}
          aria-label={`${label}, ${sub}`}
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
}
