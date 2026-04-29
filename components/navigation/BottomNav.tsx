'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#hero',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Exp' },
  { href: '#contact',    label: 'Contact' },
];

export default function BottomNav() {
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const sections = LINKS.map(l => document.querySelector(l.href));
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); });
      },
      { threshold: 0.5 },
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-5 px-5 py-2.5 rounded-full"
      style={{
        background: 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(99,102,241,0.2)',
      }}
    >
      {LINKS.map(link => {
        const isActive = active === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleClick(e, link.href)}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: isActive ? '#6366f1' : '#334155',
                transform: isActive ? 'scale(1.5)' : 'scale(1)',
                boxShadow: isActive ? '0 0 8px rgba(99,102,241,0.7)' : 'none',
              }}
            />
            <span
              className="text-[8px] uppercase tracking-[1px] font-semibold transition-colors duration-300"
              style={{ color: isActive ? '#818cf8' : '#475569' }}
            >
              {link.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
