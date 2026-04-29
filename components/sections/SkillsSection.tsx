'use client';

import SectionReveal from '../ui/SectionReveal';

const SKILL_GROUPS = [
  { title: 'Frontend',    tags: ['ReactJS', 'Flutter', 'Angular', 'Vue.js', 'TypeScript'], main: ['ReactJS', 'Flutter'] },
  { title: 'Backend',     tags: ['Node.js', 'Ruby on Rails', 'Django'],                    main: [] },
  { title: 'Mobile',      tags: ['Flutter', 'Kotlin', 'Swift'],                            main: ['Flutter'] },
  { title: 'Database',    tags: ['MySQL', 'MongoDB', 'DBeaver'],                           main: [] },
  { title: 'Tools & IDE', tags: ['VS Code', 'Cursor', 'Android Studio'],                  main: ['VS Code'] },
  { title: 'AI Tools',    tags: ['Claude AI', 'ChatGPT', 'Cursor AI'],                    main: [] },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="snap-section flex flex-col items-center justify-center px-6 py-16 md:pl-20"
      style={{ background: '#020617' }}
    >
      <div className="max-w-[860px] w-full">
        <SectionReveal className="text-center mb-1">
          <p className="text-[11px] tracking-[3px] uppercase text-[#6366f1] font-semibold">
            Tech Stack
          </p>
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
              <div
                className="rounded-[14px] p-5 h-full transition-all duration-300 cursor-default"
                style={{ background: '#0f172a', border: '1px solid #1e293b' }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(99,102,241,0.5)';
                  el.style.transform = 'translateY(-6px) scale(1.02)';
                  el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#1e293b';
                  el.style.transform = '';
                  el.style.boxShadow = '';
                }}
              >
                <p className="text-[11px] tracking-[2px] uppercase text-[#6366f1] font-semibold mb-3.5">
                  {group.title}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.tags.map(tag => {
                    const isMain = group.main.includes(tag);
                    return (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-[7px] text-[11px] transition-all duration-200 hover:-translate-y-px"
                        style={
                          isMain
                            ? {
                                background: 'rgba(99,102,241,0.15)',
                                border: '1px solid rgba(99,102,241,0.4)',
                                color: '#a5b4fc',
                                fontWeight: 600,
                              }
                            : {
                                background: 'rgba(99,102,241,0.06)',
                                border: '1px solid rgba(99,102,241,0.15)',
                                color: '#94a3b8',
                              }
                        }
                      >
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
