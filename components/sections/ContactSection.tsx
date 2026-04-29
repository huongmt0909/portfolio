'use client';

import SectionReveal from '../ui/SectionReveal';

const CONTACTS = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'huongmt.0909@gmail.com',
    href: 'mailto:huongmt.0909@gmail.com',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'huongmt0909',
    href: 'https://github.com/huongmt0909',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'Hướng MT.',
    href: 'https://www.linkedin.com/in/h%C6%B0%E1%BB%9Bng-mt-9b04a8345',
  },
  {
    icon: '📘',
    label: 'Facebook',
    value: 'huongmt-0909',
    href: 'https://facebook.com/huongmt-0909',
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="snap-section relative flex flex-col items-center justify-center px-6 py-16 md:pl-20 overflow-hidden"
      style={{ background: '#020617' }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 70% at 50% 100%,rgba(99,102,241,0.14) 0%,transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[620px] w-full text-center">
        <SectionReveal>
          <p className="text-[11px] tracking-[3px] uppercase text-[#6366f1] font-semibold mb-2.5">
            Get In Touch
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="text-[clamp(24px,3vw,42px)] font-black leading-[1.1] mb-3">
            Let&apos;s work{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              together
            </span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="text-[#64748b] text-sm leading-[1.8] mb-11">
            Tôi luôn sẵn sàng cho những cơ hội mới.<br />
            Hãy liên hệ nếu bạn có dự án thú vị!
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONTACTS.map((c, i) => (
            <SectionReveal key={c.label} delay={0.1 + i * 0.1}>
              <a
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 sm:p-[18px] rounded-[14px] text-left no-underline transition-all duration-300 hover:-translate-y-1.5 group"
                style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b' }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(99,102,241,0.5)';
                  el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4),0 0 20px rgba(99,102,241,0.15)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#1e293b';
                  el.style.boxShadow = '';
                }}
              >
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: 'rgba(99,102,241,0.12)' }}
                >
                  {c.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[1.5px] text-[#475569]">{c.label}</p>
                  <p className="text-[13px] font-medium text-[#818cf8] mt-0.5 group-hover:text-[#a5b4fc] transition-colors duration-300 break-all">
                    {c.value}
                  </p>
                </div>
              </a>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.5}>
          <p className="mt-12 text-[11px] tracking-[1px] text-[#334155]">
            Built with Next.js · Framer Motion · Tailwind CSS v4
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
