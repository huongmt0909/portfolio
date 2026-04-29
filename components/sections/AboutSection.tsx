'use client';

import { useEffect, useRef } from 'react';
import SectionReveal from '../ui/SectionReveal';

const STATS = [
  { num: 3,   suffix: '+', label: 'Years Experience' },
  { num: 10,  suffix: '+', label: 'Tech Stacks' },
  { num: '2', suffix: '',  label: 'Platforms' },
  { num: '∞', suffix: '',  label: 'Curiosity' },
];

const MAIN_STACK = ['ReactJS', 'Flutter', 'TypeScript'];
const ALSO_STACK = ['Node.js', 'Ruby on Rails', 'Django', 'Kotlin', 'Swift', 'Angular', 'Vue.js'];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          let cur = 0;
          const step = target / 30;
          const timer = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = Math.round(cur) + suffix;
            if (cur >= target) clearInterval(timer);
          }, 40);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="snap-section flex flex-col items-center justify-center px-6 py-16 md:pl-20"
      style={{ background: '#0f172a' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 max-w-[860px] w-full items-center">

        {/* Left */}
        <div>
          <SectionReveal direction="left">
            <p className="text-[11px] tracking-[3px] uppercase text-[#6366f1] font-semibold mb-2.5">
              About Me
            </p>
          </SectionReveal>

          <SectionReveal direction="left" delay={0.1}>
            <h2 className="text-[clamp(24px,3vw,38px)] font-extrabold leading-[1.2] tracking-tight mb-5">
              Passionate about{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                building great UX
              </span>
            </h2>
          </SectionReveal>

          <SectionReveal direction="left" delay={0.2}>
            <p className="text-[#94a3b8] leading-[1.8] text-sm mb-3.5">
              Tôi là{' '}
              <span className="text-[#818cf8] font-semibold">Frontend Developer</span> với hơn 3 năm
              kinh nghiệm, chuyên về{' '}
              <span className="text-[#818cf8] font-semibold">ReactJS</span> và{' '}
              <span className="text-[#818cf8] font-semibold">Flutter</span>. Tôi đam mê tạo ra những
              giao diện đẹp, hiệu suất cao và dễ sử dụng.
            </p>
          </SectionReveal>

          <SectionReveal direction="left" delay={0.3}>
            <p className="text-[#94a3b8] leading-[1.8] text-sm mb-6">
              Từng làm việc với nhiều tech stack từ web đến mobile, tôi luôn tìm cách áp dụng những
              giải pháp tối ưu nhất cho từng dự án.
            </p>
          </SectionReveal>

          {/* Stats */}
          <SectionReveal direction="left" delay={0.4}>
            <div className="grid grid-cols-2 gap-2.5">
              {STATS.map(s => (
                <div
                  key={s.label}
                  className="rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ background: '#1e293b', border: '1px solid #334155' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#334155')}
                >
                  <div
                    className="text-[30px] font-black"
                    style={{
                      background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {typeof s.num === 'number' ? (
                      <CountUp target={s.num} suffix={s.suffix} />
                    ) : (
                      <>{s.num}{s.suffix}</>
                    )}
                  </div>
                  <div className="text-[11px] text-[#475569] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Right — skill tag cards */}
        <SectionReveal direction="right" delay={0.1} className="flex flex-col gap-3.5">
          <div
            className="rounded-2xl p-6 transition-all duration-300"
            style={{ background: '#1e293b', border: '1px solid #1e293b' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e293b')}
          >
            <p className="text-[11px] tracking-[2px] uppercase text-[#6366f1] font-semibold mb-3.5">
              Main Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {MAIN_STACK.map(t => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-[#a5b4fc]"
                  style={{
                    background: 'rgba(99,102,241,0.18)',
                    border: '1px solid rgba(99,102,241,0.45)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-6 transition-all duration-300"
            style={{ background: '#1e293b', border: '1px solid #1e293b' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e293b')}
          >
            <p className="text-[11px] tracking-[2px] uppercase text-[#6366f1] font-semibold mb-3.5">
              Also worked with
            </p>
            <div className="flex flex-wrap gap-2">
              {ALSO_STACK.map(t => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-lg text-[12px] text-[#94a3b8]"
                  style={{
                    background: 'rgba(30,41,59,0.8)',
                    border: '1px solid #334155',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
