'use client';

import { motion } from 'framer-motion';
import ParticleCanvas from '../ui/ParticleCanvas';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="snap-section relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0f172a' }}
    >
      {/* Backgrounds */}
      <ParticleCanvas />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)',
          animation: 'pulse-glow 4s ease-in-out infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[680px] px-6">

        {/* Avatar */}
        <motion.div
          {...fadeUp(0)}
          className="relative w-[88px] h-[88px] md:w-[110px] md:h-[110px] mb-8"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-[28px] md:text-[36px] font-black text-white relative z-10"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)',
              boxShadow: '0 0 40px rgba(99,102,241,0.6),0 0 80px rgba(99,102,241,0.3)',
            }}
          >
            HM
          </div>
          <div
            className="absolute rounded-full border border-[rgba(99,102,241,0.5)]"
            style={{ inset: '-8px', animation: 'spin-slow 10s linear infinite' }}
          >
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#818cf8]"
              style={{ boxShadow: '0 0 8px #818cf8' }}
            />
          </div>
          <div
            className="absolute rounded-full border border-dashed border-[rgba(99,102,241,0.2)]"
            style={{ inset: '-16px', animation: 'spin-slow 18s linear infinite reverse' }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium text-[#818cf8] mb-5"
          style={{
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.35)',
            animation: 'badge-glow 3s ease-in-out infinite',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"
            style={{ animation: 'blink 2s ease-in-out infinite' }}
          />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-[clamp(30px,5vw,56px)] font-black tracking-[-2px] leading-[1.1] mb-2"
          style={{
            background: 'linear-gradient(135deg,#f8fafc 0%,#c7d2fe 50%,#818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Ma Trung Hướng
        </motion.h1>

        {/* Role */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-[clamp(14px,1.8vw,18px)] text-[#818cf8] font-medium mb-4"
        >
          Frontend Developer · React &amp; Flutter Specialist
        </motion.p>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.4)}
          className="text-[clamp(13px,1.4vw,16px)] text-[#64748b] leading-[1.8] max-w-[500px] mb-9"
        >
          Crafting beautiful UIs with React &amp; Flutter —<br />
          turning ideas into elegant digital experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-3 rounded-[10px] text-sm font-semibold text-white cursor-pointer relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            }}
          >
            Get in touch ✦
          </button>
          <a
            href="https://github.com/huongmt0909"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-[10px] text-sm font-semibold text-[#818cf8] border border-[rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[rgba(99,102,241,0.1)] hover:border-[#6366f1] hover:-translate-y-1 text-center"
          >
            View GitHub ↗
          </a>
        </motion.div>

        {/* Chips */}
        <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-2 justify-center">
          {['ReactJS', 'Flutter', 'TypeScript', 'Node.js', '3+ years'].map(chip => (
            <span
              key={chip}
              className="px-3.5 py-1 rounded-lg text-[11px] text-[#94a3b8] border border-[#1e293b] transition-all duration-300 hover:bg-[rgba(99,102,241,0.12)] hover:border-[rgba(99,102,241,0.4)] hover:text-[#818cf8] hover:-translate-y-0.5"
              style={{ background: 'rgba(30,41,59,0.8)', backdropFilter: 'blur(4px)' }}
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-7 left-1/2 flex flex-col items-center gap-1.5 text-[#334155] text-[11px] tracking-[2px]"
        style={{ animation: 'fadeup 2s ease-in-out infinite' }}
      >
        <span>SCROLL</span>
        <div className="w-px h-9" style={{ background: 'linear-gradient(to bottom,#475569,transparent)' }} />
      </div>
    </section>
  );
}
