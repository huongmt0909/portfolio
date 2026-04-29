'use client';

import { useEffect, useRef } from 'react';
import SectionReveal from '../ui/SectionReveal';

const TAGS = ['ReactJS', 'Flutter', 'Node.js', 'MySQL', 'MongoDB'];

export default function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const container = el.parentElement;
    if (!container) return;
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) el.style.height = '100%';
      },
      { threshold: 0.3 },
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="snap-section flex flex-col items-center justify-center px-6 py-16 md:pl-20"
      style={{ background: '#0f172a' }}
    >
      <div className="max-w-[720px] w-full">
        <SectionReveal>
          <p className="text-[11px] tracking-[3px] uppercase text-[#6366f1] font-semibold mb-2.5">
            Experience
          </p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-[clamp(24px,3vw,38px)] font-extrabold mb-2">Work History</h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="text-[#475569] text-sm mb-11">Hành trình phát triển nghề nghiệp</p>
        </SectionReveal>

        <div className="relative pl-8">
          {/* Timeline line container */}
          <div className="absolute left-0 top-0 w-px overflow-hidden" style={{ height: '100%' }}>
            <div
              ref={lineRef}
              className="w-full transition-all duration-[1400ms]"
              style={{
                height: '0%',
                background: 'linear-gradient(to bottom,#6366f1,rgba(99,102,241,0.3))',
                transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          </div>

          <SectionReveal delay={0.2}>
            {/* Dot */}
            <div
              className="absolute left-[-5px] top-[18px] w-3 h-3 rounded-full border-2 border-[#0f172a]"
              style={{ background: '#6366f1', animation: 'dot-pulse 2.5s ease-in-out infinite' }}
            />

            {/* Card */}
            <div
              className="rounded-[14px] p-5 md:p-6 transition-all duration-300 cursor-default"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(99,102,241,0.5)';
                el.style.transform = 'translateX(6px)';
                el.style.boxShadow = '-4px 0 0 #6366f1';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = '#334155';
                el.style.transform = '';
                el.style.boxShadow = '';
              }}
            >
              <p className="text-[11px] text-[#6366f1] font-semibold tracking-[1px] mb-1.5">
                06/2022 — Present · 3+ years
              </p>
              <p className="text-[20px] font-extrabold text-[#f1f5f9] mb-0.5">Bunbu Software</p>
              <p className="text-sm text-[#818cf8] mb-3">Frontend Developer</p>
              <p className="text-sm text-[#64748b] leading-[1.8] mb-3.5">
                Phát triển và maintain các ứng dụng web và mobile sử dụng ReactJS và Flutter.
                Tham gia toàn bộ vòng đời dự án từ thiết kế UI đến deployment và production.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {TAGS.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-[5px] text-[11px] text-[#94a3b8] transition-colors duration-200 hover:text-[#818cf8]"
                    style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid #334155' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="https://www.bunbusoft.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#6366f1] text-[12px] font-medium transition-all duration-300 hover:gap-3"
              >
                bunbusoft.com ↗
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
