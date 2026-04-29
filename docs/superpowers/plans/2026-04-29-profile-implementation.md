# Profile Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng trang profile cá nhân cho Hướng MT. bằng Next.js 16, Framer Motion, Tailwind CSS v4 — full-screen snap scroll, dark modern style, responsive.

**Architecture:** Mỗi section là một Client Component riêng biệt (`'use client'`) vì dùng Framer Motion `whileInView`. `page.tsx` là Server Component, chỉ import và render các sections. Navigation (SideNav/BottomNav) là Client Component riêng vì dùng IntersectionObserver.

**Tech Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4 · Framer Motion · Geist Font (built-in)

---

## File Map

| File | Tạo/Sửa | Mục đích |
|---|---|---|
| `package.json` | Sửa | Thêm framer-motion |
| `app/globals.css` | Sửa | CSS vars, scroll-snap, keyframes |
| `app/layout.tsx` | Sửa | Metadata, SEO, favicon |
| `app/page.tsx` | Sửa | Compose tất cả sections |
| `components/ui/SectionReveal.tsx` | Tạo | Framer Motion whileInView wrapper |
| `components/ui/ParticleCanvas.tsx` | Tạo | Canvas particle animation |
| `components/navigation/SideNav.tsx` | Tạo | Sidebar nav desktop/tablet |
| `components/navigation/BottomNav.tsx` | Tạo | Bottom pill nav mobile |
| `components/sections/HeroSection.tsx` | Tạo | Hero full-screen |
| `components/sections/AboutSection.tsx` | Tạo | About + stats + skill tags |
| `components/sections/SkillsSection.tsx` | Tạo | Tech stack cards |
| `components/sections/ExperienceSection.tsx` | Tạo | Timeline Bunbu |
| `components/sections/ContactSection.tsx` | Tạo | Contact links |

---

## Task 1: Cài đặt Framer Motion

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Cài framer-motion**

```bash
cd /Users/macos/Documents/my-profile
yarn add framer-motion
```

Expected output: `✨ Done` — framer-motion xuất hiện trong dependencies.

- [ ] **Step 2: Verify**

```bash
node -e "require('framer-motion'); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "feat: add framer-motion"
```

---

## Task 2: globals.css — CSS vars + scroll snap + keyframes

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Thay toàn bộ nội dung globals.css**

```css
@import "tailwindcss";

:root {
  --bg-deep: #020617;
  --bg-section: #0f172a;
  --accent: #6366f1;
  --accent-2: #8b5cf6;
  --accent-pink: #ec4899;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #475569;
  --border: #1e293b;
  --border-2: #334155;
}

html {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: #1e293b #020617;
}

body {
  background: var(--bg-deep);
  color: var(--text-primary);
  height: 100%;
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--bg-deep); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

/* Scroll snap per section */
.snap-section {
  scroll-snap-align: start;
  min-height: 100vh;
}

/* Keyframes dùng chung */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.15); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

@keyframes badge-glow {
  0%, 100% { box-shadow: 0 0 0 rgba(99,102,241,0); }
  50%       { box-shadow: 0 0 16px rgba(99,102,241,0.25); }
}

@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 14px rgba(99,102,241,0.8), 0 0 28px rgba(99,102,241,0.3); }
  50%       { box-shadow: 0 0 20px rgba(99,102,241,1),   0 0 40px rgba(99,102,241,0.5); }
}

@keyframes fadeup {
  0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
  50%       { opacity: 1;   transform: translateX(-50%) translateY(-6px); }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: global css vars, scroll-snap, keyframes"
```

---

## Task 3: layout.tsx — Metadata + SEO

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Cập nhật layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hướng MT. | Frontend Developer',
  description:
    'Ma Trung Hướng — Frontend Developer chuyên ReactJS và Flutter. 3+ năm kinh nghiệm xây dựng giao diện đẹp, hiệu suất cao.',
  authors: [{ name: 'Ma Trung Hướng' }],
  keywords: ['Frontend Developer', 'ReactJS', 'Flutter', 'TypeScript', 'Mobile Developer', 'Vietnam'],
  openGraph: {
    title: 'Hướng MT. | Frontend Developer',
    description: 'Ma Trung Hướng — Frontend Developer chuyên ReactJS và Flutter.',
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary',
    title: 'Hướng MT. | Frontend Developer',
    description: 'Ma Trung Hướng — Frontend Developer chuyên ReactJS và Flutter.',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%236366f1'/><text x='16' y='23' font-size='18' font-weight='900' text-anchor='middle' fill='white' font-family='system-ui'>H</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: metadata and SEO tags"
```

---

## Task 4: SectionReveal — Framer Motion wrapper

**Files:**
- Create: `components/ui/SectionReveal.tsx`

- [ ] **Step 1: Tạo thư mục**

```bash
mkdir -p /Users/macos/Documents/my-profile/components/ui
mkdir -p /Users/macos/Documents/my-profile/components/navigation
mkdir -p /Users/macos/Documents/my-profile/components/sections
```

- [ ] **Step 2: Tạo SectionReveal.tsx**

```tsx
'use client';

import { motion, MotionProps } from 'framer-motion';

type Direction = 'up' | 'left' | 'right';

interface SectionRevealProps extends MotionProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const variants = {
  up:    { hidden: { opacity: 0, y: 32 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
};

export default function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  ...rest
}: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/SectionReveal.tsx
git commit -m "feat: SectionReveal framer-motion wrapper"
```

---

## Task 5: ParticleCanvas

**Files:**
- Create: `components/ui/ParticleCanvas.tsx`

- [ ] **Step 1: Tạo ParticleCanvas.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  size: number;
  speedX: number; speedY: number;
  opacity: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const makeParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    });

    const particles: Particle[] = Array.from({ length: 80 }, makeParticle);

    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          Object.assign(p, makeParticle());
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - d / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/ParticleCanvas.tsx
git commit -m "feat: particle canvas background"
```

---

## Task 6: SideNav + BottomNav

**Files:**
- Create: `components/navigation/SideNav.tsx`
- Create: `components/navigation/BottomNav.tsx`

- [ ] **Step 1: Tạo SideNav.tsx**

```tsx
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
      <span className="text-[13px] font-extrabold tracking-tight mb-5"
        style={{ background: 'linear-gradient(135deg,#f8fafc,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        HMT.
      </span>
      <div className="flex flex-col gap-1">
        {LINKS.map((link, i) => (
          <div key={link.href}>
            {i > 0 && (
              <div className="w-px h-5 bg-[#1e293b] ml-[2px] my-[3px]" />
            )}
            <a
              href={link.href}
              onClick={e => handleClick(e, link.href)}
              className="flex items-center gap-2.5 py-1 group"
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
```

- [ ] **Step 2: Tạo BottomNav.tsx**

```tsx
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
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-5 px-5 py-2.5 rounded-full"
      style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(99,102,241,0.2)' }}>
      {LINKS.map(link => {
        const isActive = active === link.href;
        return (
          <a key={link.href} href={link.href} onClick={e => handleClick(e, link.href)}
            className="flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: isActive ? '#6366f1' : '#334155',
                transform: isActive ? 'scale(1.5)' : 'scale(1)',
                boxShadow: isActive ? '0 0 8px rgba(99,102,241,0.7)' : 'none',
              }} />
            <span className="text-[8px] uppercase tracking-[1px] font-semibold transition-colors duration-300"
              style={{ color: isActive ? '#818cf8' : '#475569' }}>
              {link.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/navigation/SideNav.tsx components/navigation/BottomNav.tsx
git commit -m "feat: SideNav and BottomNav components"
```

---

## Task 7: HeroSection

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Tạo HeroSection.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import ParticleCanvas from '../ui/ParticleCanvas';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
  return (
    <section id="hero" className="snap-section relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0f172a' }}>

      {/* Backgrounds */}
      <ParticleCanvas />
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.04) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)',
          animation: 'pulse-glow 4s ease-in-out infinite',
        }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[680px] px-6">

        {/* Avatar */}
        <motion.div {...fadeUp(0)} className="relative w-[110px] h-[110px] mb-8"
          style={{ animation: 'float 6s ease-in-out infinite' }}>
          <div className="w-full h-full rounded-full flex items-center justify-center text-[36px] font-black text-white relative z-10"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', boxShadow: '0 0 40px rgba(99,102,241,0.6),0 0 80px rgba(99,102,241,0.3)' }}>
            HM
          </div>
          <div className="absolute rounded-full border border-[rgba(99,102,241,0.5)]"
            style={{ inset: '-8px', animation: 'spin-slow 10s linear infinite' }}>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#818cf8]"
              style={{ boxShadow: '0 0 8px #818cf8' }} />
          </div>
          <div className="absolute rounded-full border border-dashed border-[rgba(99,102,241,0.2)]"
            style={{ inset: '-16px', animation: 'spin-slow 18s linear infinite reverse' }} />
        </motion.div>

        {/* Badge */}
        <motion.div {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium text-[#818cf8] mb-5"
          style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.35)', animation: 'badge-glow 3s ease-in-out infinite' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'blink 2s ease-in-out infinite' }} />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1 {...fadeUp(0.2)}
          className="text-[clamp(30px,5vw,56px)] font-black tracking-[-2px] leading-[1.1] mb-2"
          style={{ background: 'linear-gradient(135deg,#f8fafc 0%,#c7d2fe 50%,#818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Ma Trung Hướng
        </motion.h1>

        {/* Role */}
        <motion.p {...fadeUp(0.3)} className="text-[clamp(14px,1.8vw,18px)] text-[#818cf8] font-medium mb-4">
          Frontend Developer · React &amp; Flutter Specialist
        </motion.p>

        {/* Tagline */}
        <motion.p {...fadeUp(0.4)} className="text-[clamp(13px,1.4vw,16px)] text-[#64748b] leading-[1.8] max-w-[500px] mb-9">
          Crafting beautiful UIs with React &amp; Flutter —<br />
          turning ideas into elegant digital experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row gap-3 mb-10">
          <a href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3 rounded-[10px] text-sm font-semibold text-white cursor-pointer relative overflow-hidden transition-all duration-300 hover:-translate-y-1 text-center"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>
            Get in touch ✦
          </a>
          <a href="https://github.com/huongmt0909" target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 rounded-[10px] text-sm font-semibold text-[#818cf8] border border-[rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[rgba(99,102,241,0.1)] hover:border-[#6366f1] hover:-translate-y-1 text-center"
            style={{ background: 'transparent' }}>
            View GitHub ↗
          </a>
        </motion.div>

        {/* Chips */}
        <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-2 justify-center">
          {['ReactJS', 'Flutter', 'TypeScript', 'Node.js', '3+ years'].map(chip => (
            <span key={chip}
              className="px-3.5 py-1 rounded-lg text-[11px] text-[#94a3b8] border border-[#1e293b] transition-all duration-300 hover:bg-[rgba(99,102,241,0.12)] hover:border-[rgba(99,102,241,0.4)] hover:text-[#818cf8] hover:-translate-y-0.5"
              style={{ background: 'rgba(30,41,59,0.8)', backdropFilter: 'blur(4px)' }}>
              {chip}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 flex flex-col items-center gap-1.5 text-[#334155] text-[11px] tracking-[2px]"
        style={{ animation: 'fadeup 2s ease-in-out infinite' }}>
        <span>SCROLL</span>
        <div className="w-px h-9" style={{ background: 'linear-gradient(to bottom,#475569,transparent)' }} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Kiểm tra dev server**

```bash
cd /Users/macos/Documents/my-profile && yarn dev
```

Mở http://localhost:3000 — kiểm tra Hero hiển thị đúng, particle chạy, avatar float.

- [ ] **Step 3: Commit**

```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: HeroSection with particles and animations"
```

---

## Task 8: AboutSection

**Files:**
- Create: `components/sections/AboutSection.tsx`

- [ ] **Step 1: Tạo AboutSection.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import SectionReveal from '../ui/SectionReveal';

const STATS = [
  { num: 3, suffix: '+', label: 'Years Experience' },
  { num: 10, suffix: '+', label: 'Tech Stacks' },
  { num: '2', suffix: '', label: 'Platforms' },
  { num: '∞', suffix: '', label: 'Curiosity' },
];

const MAIN_STACK = ['ReactJS', 'Flutter', 'TypeScript'];
const ALSO_STACK = ['Node.js', 'Ruby on Rails', 'Django', 'Kotlin', 'Swift', 'Angular', 'Vue.js'];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
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
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutSection() {
  return (
    <section id="about" className="snap-section flex flex-col items-center justify-center px-6 py-16 md:pl-20"
      style={{ background: '#0f172a' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 max-w-[860px] w-full items-center">

        {/* Left */}
        <div>
          <SectionReveal direction="left">
            <p className="text-[11px] tracking-[3px] uppercase text-[#6366f1] font-semibold mb-2.5">About Me</p>
          </SectionReveal>
          <SectionReveal direction="left" delay={0.1}>
            <h2 className="text-[clamp(24px,3vw,38px)] font-extrabold leading-[1.2] tracking-tight mb-5">
              Passionate about{' '}
              <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                building great UX
              </span>
            </h2>
          </SectionReveal>
          <SectionReveal direction="left" delay={0.2}>
            <p className="text-[#94a3b8] leading-[1.8] text-sm mb-3.5">
              Tôi là{' '}
              <span className="text-[#818cf8] font-semibold">Frontend Developer</span> với hơn 3 năm kinh nghiệm, chuyên về{' '}
              <span className="text-[#818cf8] font-semibold">ReactJS</span> và{' '}
              <span className="text-[#818cf8] font-semibold">Flutter</span>. Tôi đam mê tạo ra những giao diện đẹp, hiệu suất cao và dễ sử dụng.
            </p>
          </SectionReveal>
          <SectionReveal direction="left" delay={0.3}>
            <p className="text-[#94a3b8] leading-[1.8] text-sm mb-6">
              Từng làm việc với nhiều tech stack từ web đến mobile, tôi luôn tìm cách áp dụng những giải pháp tối ưu nhất cho từng dự án.
            </p>
          </SectionReveal>

          {/* Stats */}
          <SectionReveal direction="left" delay={0.4}>
            <div className="grid grid-cols-2 gap-2.5">
              {STATS.map(s => (
                <div key={s.label}
                  className="rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ background: '#1e293b', border: '1px solid #334155' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#334155')}>
                  <div className="text-[30px] font-black"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {typeof s.num === 'number'
                      ? <CountUp target={s.num} suffix={s.suffix} />
                      : <>{s.num}{s.suffix}</>}
                  </div>
                  <div className="text-[11px] text-[#475569] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        {/* Right — skill tag cards */}
        <SectionReveal direction="right" delay={0.1} className="flex flex-col gap-3.5">
          {/* Main Stack */}
          <div className="rounded-2xl p-6 transition-all duration-300"
            style={{ background: '#1e293b', border: '1px solid #1e293b' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e293b')}>
            <p className="text-[11px] tracking-[2px] uppercase text-[#6366f1] font-semibold mb-3.5">Main Stack</p>
            <div className="flex flex-wrap gap-2">
              {MAIN_STACK.map(t => (
                <span key={t} className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-[#a5b4fc]"
                  style={{ background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.45)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Also worked with */}
          <div className="rounded-2xl p-6 transition-all duration-300"
            style={{ background: '#1e293b', border: '1px solid #1e293b' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e293b')}>
            <p className="text-[11px] tracking-[2px] uppercase text-[#6366f1] font-semibold mb-3.5">Also worked with</p>
            <div className="flex flex-wrap gap-2">
              {ALSO_STACK.map(t => (
                <span key={t} className="px-3.5 py-1.5 rounded-lg text-[12px] text-[#94a3b8]"
                  style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid #334155' }}>
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/AboutSection.tsx
git commit -m "feat: AboutSection with count-up stats and skill tags"
```

---

## Task 9: SkillsSection

**Files:**
- Create: `components/sections/SkillsSection.tsx`

- [ ] **Step 1: Tạo SkillsSection.tsx**

```tsx
'use client';

import SectionReveal from '../ui/SectionReveal';

const SKILL_GROUPS = [
  { title: 'Frontend',      tags: ['ReactJS', 'Flutter', 'Angular', 'Vue.js', 'TypeScript'], main: ['ReactJS', 'Flutter'] },
  { title: 'Backend',       tags: ['Node.js', 'Ruby on Rails', 'Django'], main: [] },
  { title: 'Mobile',        tags: ['Flutter', 'Kotlin', 'Swift'], main: ['Flutter'] },
  { title: 'Database',      tags: ['MySQL', 'MongoDB', 'DBeaver'], main: [] },
  { title: 'Tools & IDE',   tags: ['VS Code', 'Cursor', 'Android Studio'], main: ['VS Code'] },
  { title: 'AI Tools',      tags: ['Claude AI', 'ChatGPT', 'Cursor AI'], main: [] },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="snap-section flex flex-col items-center justify-center px-6 py-16 md:pl-20"
      style={{ background: '#020617' }}>
      <div className="max-w-[860px] w-full">
        <SectionReveal className="text-center mb-1">
          <p className="text-[11px] tracking-[3px] uppercase text-[#6366f1] font-semibold">Tech Stack</p>
        </SectionReveal>
        <SectionReveal delay={0.1} className="text-center mb-2">
          <h2 className="text-[clamp(24px,3vw,38px)] font-extrabold">Skills &amp; Tools</h2>
        </SectionReveal>
        <SectionReveal delay={0.2} className="text-center mb-10">
          <p className="text-[#475569] text-sm">Những công nghệ tôi làm việc hàng ngày</p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SKILL_GROUPS.map((group, i) => (
            <SectionReveal key={group.title} delay={0.1 + i * 0.08}>
              <div className="rounded-[14px] p-5 h-full transition-all duration-300 cursor-default group relative overflow-hidden"
                style={{ background: '#0f172a', border: '1px solid #1e293b' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e293b';
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}>
                <p className="text-[11px] tracking-[2px] uppercase text-[#6366f1] font-semibold mb-3.5">{group.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.tags.map(tag => {
                    const isMain = group.main.includes(tag);
                    return (
                      <span key={tag}
                        className="px-2.5 py-1 rounded-[7px] text-[11px] transition-all duration-200 hover:-translate-y-px"
                        style={isMain
                          ? { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', fontWeight: 600 }
                          : { background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', color: '#94a3b8' }}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/SkillsSection.tsx
git commit -m "feat: SkillsSection with hover cards"
```

---

## Task 10: ExperienceSection

**Files:**
- Create: `components/sections/ExperienceSection.tsx`

- [ ] **Step 1: Tạo ExperienceSection.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import SectionReveal from '../ui/SectionReveal';

const TAGS = ['ReactJS', 'Flutter', 'Node.js', 'MySQL', 'MongoDB'];

export default function ExperienceSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) el.style.height = '100%';
    }, { threshold: 0.3 });
    obs.observe(el.parentElement!);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="snap-section flex flex-col items-center justify-center px-6 py-16 md:pl-20"
      style={{ background: '#0f172a' }}>
      <div className="max-w-[720px] w-full">
        <SectionReveal>
          <p className="text-[11px] tracking-[3px] uppercase text-[#6366f1] font-semibold mb-2.5">Experience</p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-[clamp(24px,3vw,38px)] font-extrabold mb-2">Work History</h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="text-[#475569] text-sm mb-11">Hành trình phát triển nghề nghiệp</p>
        </SectionReveal>

        <div className="relative pl-8">
          {/* Timeline line */}
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
            <div className="absolute left-[-5px] top-[18px] w-3 h-3 rounded-full border-2 border-[#0f172a]"
              style={{ background: '#6366f1', animation: 'dot-pulse 2.5s ease-in-out infinite' }} />

            {/* Card */}
            <div className="rounded-[14px] p-6 transition-all duration-300 cursor-default"
              style={{ background: '#1e293b', border: '1px solid #334155' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                e.currentTarget.style.transform = 'translateX(6px)';
                e.currentTarget.style.boxShadow = '-4px 0 0 #6366f1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#334155';
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}>
              <p className="text-[11px] text-[#6366f1] font-semibold tracking-[1px] mb-1.5">06/2022 — Present · 3+ years</p>
              <p className="text-[20px] font-extrabold text-[#f1f5f9] mb-0.5">Bunbu Software</p>
              <p className="text-sm text-[#818cf8] mb-3">Frontend Developer</p>
              <p className="text-sm text-[#64748b] leading-[1.8] mb-3.5">
                Phát triển và maintain các ứng dụng web và mobile sử dụng ReactJS và Flutter.
                Tham gia toàn bộ vòng đời dự án từ thiết kế UI đến deployment và production.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {TAGS.map(t => (
                  <span key={t} className="px-2.5 py-0.5 rounded-[5px] text-[11px] text-[#94a3b8] transition-colors duration-200 hover:text-[#818cf8]"
                    style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid #334155' }}>
                    {t}
                  </span>
                ))}
              </div>
              <a href="https://www.bunbusoft.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#6366f1] text-[12px] font-medium transition-all duration-300 hover:gap-3">
                bunbusoft.com ↗
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperienceSection.tsx
git commit -m "feat: ExperienceSection with animated timeline"
```

---

## Task 11: ContactSection

**Files:**
- Create: `components/sections/ContactSection.tsx`

- [ ] **Step 1: Tạo ContactSection.tsx**

```tsx
'use client';

import SectionReveal from '../ui/SectionReveal';

const CONTACTS = [
  { icon: '✉️', label: 'Email',    value: 'huongmt.0909@gmail.com',  href: 'mailto:huongmt.0909@gmail.com' },
  { icon: '🐙', label: 'GitHub',   value: 'huongmt0909',              href: 'https://github.com/huongmt0909' },
  { icon: '💼', label: 'LinkedIn', value: 'Hướng MT.',                href: 'https://www.linkedin.com/in/h%C6%B0%E1%BB%9Bng-mt-9b04a8345' },
  { icon: '📘', label: 'Facebook', value: 'huongmt-0909',             href: 'https://facebook.com/huongmt-0909' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="snap-section relative flex flex-col items-center justify-center px-6 py-16 md:pl-20 overflow-hidden"
      style={{ background: '#020617' }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 70% at 50% 100%,rgba(99,102,241,0.14) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-[620px] w-full text-center">
        <SectionReveal>
          <p className="text-[11px] tracking-[3px] uppercase text-[#6366f1] font-semibold mb-2.5">Get In Touch</p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-[clamp(24px,3vw,42px)] font-black leading-[1.1] mb-3">
            Let&apos;s work{' '}
            <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
              <a href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 sm:p-[18px] rounded-[14px] text-left no-underline transition-all duration-300 hover:-translate-y-1.5 group"
                style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid #1e293b' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4),0 0 20px rgba(99,102,241,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e293b';
                  e.currentTarget.style.boxShadow = '';
                }}>
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: 'rgba(99,102,241,0.12)' }}>
                  {c.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[1.5px] text-[#475569]">{c.label}</p>
                  <p className="text-[13px] font-medium text-[#818cf8] mt-0.5 group-hover:text-[#a5b4fc] transition-colors duration-300 break-all">{c.value}</p>
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ContactSection.tsx
git commit -m "feat: ContactSection with animated contact cards"
```

---

## Task 12: page.tsx — Compose tất cả

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Cập nhật page.tsx**

```tsx
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import SideNav from '@/components/navigation/SideNav';
import BottomNav from '@/components/navigation/BottomNav';

export default function Home() {
  return (
    <>
      <SideNav />
      <BottomNav />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Chạy dev và kiểm tra toàn bộ trang**

```bash
yarn dev
```

Mở http://localhost:3000 — kiểm tra:
- Scroll snap hoạt động (mỗi section full screen)
- SideNav hiển thị ở desktop, BottomNav ở mobile (DevTools resize)
- Animations trigger khi scroll vào từng section
- Responsive ổn trên mobile/tablet

- [ ] **Step 3: Build kiểm tra lỗi TypeScript**

```bash
yarn build
```

Expected: `✓ Compiled successfully` — không có TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose all sections in page.tsx"
```

---

## Task 13: Thêm .gitignore cho .superpowers

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Thêm vào .gitignore**

Mở `.gitignore` (hoặc tạo nếu chưa có) và thêm:

```
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm dir"
```
