'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#hero',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact' },
];

export default function SideNav() {
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
    <aside className="fixed left-7 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-start gap-0">
      <span
        className="text-[13px] font-extrabold tracking-tight mb-5"
        style={{
          background: 'linear-gradient(135deg,#f8fafc,#818cf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        HMT.
      </span>
      <div className="flex flex-col gap-1">
        {LINKS.map((link, i) => (
          <div key={link.href}>
            {i > 0 && <div className="w-px h-5 bg-[#1e293b] ml-[2px] my-[3px]" />}
            <a
              href={link.href}
              onClick={e => handleClick(e, link.href)}
              className="flex items-center gap-2.5 py-1"
            >
              <div
                className="w-[5px] h-[5px] rounded-full shrink-0 transition-all duration-300"
                style={{
                  background: active === link.href ? '#6366f1' : '#334155',
                  transform: active === link.href ? 'scale(1.8)' : 'scale(1)',
                  boxShadow: active === link.href ? '0 0 8px rgba(99,102,241,0.6)' : 'none',
                }}
              />
              <span
                className="text-[10px] uppercase tracking-[1.5px] font-semibold whitespace-nowrap transition-colors duration-300"
                style={{ color: active === link.href ? '#818cf8' : '#475569' }}
              >
                {link.label}
              </span>
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
}
