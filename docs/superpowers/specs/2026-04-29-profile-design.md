# Profile Website Design — Ma Trung Hướng

**Date:** 2026-04-29  
**Project:** `my-profile` (Next.js 16, TypeScript, Tailwind CSS v4)  
**Goal:** Trang profile cá nhân phục vụ tìm việc / freelance

---

## 1. Overview

Trang single-page profile giới thiệu bản thân **Ma Trung Hướng (Hướng MT.)** — Frontend Developer chuyên ReactJS và Flutter. Mục tiêu thu hút nhà tuyển dụng và client, thể hiện kỹ năng và kinh nghiệm một cách chuyên nghiệp và ấn tượng.

---

## 2. Design System

| Token | Value |
|---|---|
| Background | `#0f172a` / `#020617` (xen kẽ giữa các section) |
| Accent | `#6366f1` → `#8b5cf6` (gradient indigo→violet) |
| Text primary | `#f8fafc` |
| Text secondary | `#94a3b8` |
| Text muted | `#475569` |
| Border | `#1e293b` / `#334155` |
| Font | Geist Sans (đã có sẵn trong Next.js) |

**Style:** Dark Modern — sang trọng, tech-forward, nhiều animation.

---

## 3. Layout

**Full-screen snap scroll** — mỗi section chiếm `100vh`, cuộn theo `scroll-snap-type: y mandatory`.

**Navigation:**
- **Desktop/Tablet**: Sidebar trái cố định (`position: fixed; left: 28px`) — logo `HMT.` + dots + labels. Labels luôn hiển thị (mờ khi inactive, sáng khi active/hover).
- **Mobile (≤ 640px)**: Sidebar ẩn, thay bằng bottom nav pill (blur backdrop, rounded-full, dots + labels nhỏ).

---

## 4. Sections

### 4.1 Hero
- Avatar orb gradient (indigo→violet→pink) + 2 vòng xoay
- Badge "Available for opportunities" với green dot nhấp nháy
- Tên: **Ma Trung Hướng** (gradient text)
- Role: **Frontend Developer · React & Flutter Specialist**
- Tagline: *"Crafting beautiful UIs with React & Flutter — turning ideas into elegant digital experiences."*
- CTA: `Get in touch` (primary button) + `View GitHub ↗` (outline link → github.com/huongmt0909)
- Tech chips: ReactJS, Flutter, TypeScript, Node.js, 3+ years
- Background: particle canvas (dots + connecting lines animated), grid overlay, radial glow pulse

### 4.2 About
- Layout 2 cột (desktop) / 1 cột (mobile)
- Trái: heading, mô tả ngắn, stats grid (3+ years, 10+ stacks, 2 platforms, ∞ curiosity) với count-up animation
- Phải: 2 card nhóm skills:
  - **Main Stack** (tím nổi): ReactJS, Flutter, TypeScript
  - **Also worked with** (xám): Node.js, Ruby on Rails, Django, Kotlin, Swift, Angular, Vue.js

### 4.3 Skills
- 6 card nhóm, grid 3 cột (desktop) / 2 cột (tablet) / 1 cột (mobile)
- Nhóm: Frontend, Backend, Mobile, Database, Tools & IDE, AI Tools
- Hover: card nổi lên + glow border + gradient overlay
- Tags highlight cho main skills (ReactJS, Flutter, VS Code)

### 4.4 Experience
- *(Projects section ẩn — chưa có dự án cá nhân)*
- Timeline: 1 mục — **Bunbu Software** (06/2022 → nay, 3+ years)
- Timeline line tự vẽ khi scroll vào (height animate 0 → 100%)
- Card hover: trượt phải + left border accent
- Link: bunbusoft.com

### 4.5 Contact
- Radial glow từ dưới
- Heading: "Let's work together"
- 4 link cards: Email, GitHub, LinkedIn, Facebook
- Hover: nổi lên + glow + icon xoay nhẹ
- Footer: "Built with Next.js · Framer Motion · Tailwind CSS v4"

---

## 5. Animations

**Thư viện:** Framer Motion + CSS Keyframes

| Hiệu ứng | Chi tiết |
|---|---|
| Particle background | Canvas animation, dots + connecting lines |
| Floating avatar | `translateY` oscillate 6s ease-in-out |
| Radial glow pulse | Scale + opacity 4s ease-in-out |
| Scroll reveal | `opacity 0→1` + `translateY/X` khi enter viewport (Framer Motion `whileInView`) |
| Stagger delays | Các element trong cùng section delay 0.1s mỗi cái |
| Count-up numbers | 0 → target khi About section vào viewport |
| Skill bar fill | Width 0 → value khi vào viewport |
| Timeline draw | Height 0 → 100% khi vào viewport |
| Button hover | `translateY(-3px)` + box-shadow tăng |
| Card hover | `translateY(-6px) scale(1.02)` + glow border |
| Avatar rings | Rotate 360° liên tục (10s + 18s reverse) |
| Badge glow | Box-shadow pulse 3s |
| Scroll hint | FadeUp bounce 2s |

---

## 6. Responsive

| Breakpoint | Thay đổi |
|---|---|
| Desktop (> 1024px) | Layout đầy đủ, sidebar trái, 3-col skills |
| Tablet (≤ 1024px) | Skills 2 cột, about gap nhỏ hơn |
| Mobile (≤ 640px) | Sidebar ẩn → bottom nav, about stack 1 cột, skills 1 cột, contact 1 cột, buttons stack |

---

## 7. SEO & Head

- **Title:** `Hướng MT. | Frontend Developer`
- **Description:** Ma Trung Hướng — Frontend Developer chuyên ReactJS và Flutter. 3+ năm kinh nghiệm.
- **OG tags:** title, description, type, locale
- **Twitter card:** summary
- **Favicon:** SVG inline — chữ `H` trắng trên nền indigo `#6366f1`

---

## 8. Contact Info

| Kênh | Địa chỉ |
|---|---|
| Email | huongmt.0909@gmail.com |
| GitHub | github.com/huongmt0909 |
| LinkedIn | linkedin.com/in/hướng-mt-9b04a8345 |
| Facebook | facebook.com/huongmt-0909 |

---

## 9. Tech Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Font:** Geist (Next.js built-in)
- **Deployment:** Vercel (recommended)

---

## 10. File Structure (dự kiến)

```
app/
├── layout.tsx          # metadata, font, global css
├── page.tsx            # root — render <ProfilePage>
├── globals.css         # Tailwind + CSS custom properties
components/
├── sections/
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   └── ContactSection.tsx
├── navigation/
│   ├── SideNav.tsx     # desktop/tablet
│   └── BottomNav.tsx   # mobile
├── ui/
│   ├── ParticleCanvas.tsx
│   └── SectionReveal.tsx   # Framer Motion wrapper
```
