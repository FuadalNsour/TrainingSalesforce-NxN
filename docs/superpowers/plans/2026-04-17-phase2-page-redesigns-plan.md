# Phase 2: Page Redesigns Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all 5 major pages (Home, Chapters, Labs, Lifecycle, Trainer) using the glass component library with contextual motion animations tied to NxN framework concepts.

**Architecture:** Each page composition uses pre-built glass components (GlassPanel, GlassButton, GlassCard, GlassNav, ProcessTimeline, LabChallenge) with contextual animations. Pages follow responsive design patterns (1→2→3 cols). Motion reinforces learning through discovery/commitment/cycle/flow concepts.

**Tech Stack:** Next.js 16.2.3, React 19, Tailwind CSS v4, Framer Motion (no new dependencies)

---

## File Structure

```
app/
├── page.tsx                    [MODIFY] Home page with hero, cards, stats
├── chapters/
│   ├── page.tsx               [MODIFY] Chapter listing/index
│   └── [chapterId]/
│       └── page.tsx           [MODIFY] Chapter detail page
├── labs/
│   └── page.tsx               [MODIFY] Labs grid with filters
├── lifecycle/
│   └── page.tsx               [MODIFY] Full timeline view
├── trainer/
│   └── page.tsx               [MODIFY] Trainer dashboard
└── globals.css                [COMPLETE from Phase 1]

components/
├── glass/                     [COMPLETE from Phase 1]
│   ├── GlassPanel.tsx
│   ├── GlassButton.tsx
│   ├── GlassCard.tsx
│   ├── GlassNav.tsx
│   ├── ProcessTimeline.tsx
│   ├── LabChallenge.tsx
│   ├── SkeletonGlass.tsx
│   ├── AnimatedCounter.tsx
│   └── StaggerContainer.tsx
├── home/
│   ├── HeroSection.tsx        [CREATE] Hero with gradient shift
│   ├── LearningPathSection.tsx [CREATE] Card grid with discovery cards
│   └── CourseInfoSection.tsx  [CREATE] Stats with animated counters
├── chapters/
│   ├── ChapterHero.tsx        [CREATE] Chapter header section
│   ├── ContentSection.tsx     [CREATE] Glass-styled content
│   └── KeyTakeaways.tsx       [CREATE] Collapsible takeaway items
├── labs/
│   └── LabFilter.tsx          [CREATE] Difficulty/topic filters
└── lifecycle/
    ├── StageCard.tsx          [CREATE] Individual stage panel
    └── StageDataCard.tsx      [CREATE] Metrics display

__tests__/
├── pages/
│   ├── page.test.tsx          [CREATE] Home page tests
│   ├── chapters.test.tsx      [CREATE] Chapter page tests
│   ├── labs.test.tsx          [CREATE] Labs page tests
│   ├── lifecycle.test.tsx     [CREATE] Lifecycle page tests
│   └── trainer.test.tsx       [CREATE] Trainer page tests
└── components/
    ├── HeroSection.test.tsx
    ├── LearningPathSection.test.tsx
    └── [...more component tests...]
```

---

## Phase 2 Tasks (5 tasks)

### Task 2.1: Home Page (`/app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/HeroSection.tsx`
- Create: `components/home/LearningPathSection.tsx`
- Create: `components/home/CourseInfoSection.tsx`
- Create: `__tests__/pages/page.test.tsx`

**Overview:** Transform home page with glassmorphic hero (animated gradient), learning path cards with discovery motion, and stats section with animated counters.

---

#### Step 1: Create HeroSection component

**Create:** `components/home/HeroSection.tsx`

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GlassPanel, GlassButton } from '@/components/glass';

interface HeroSectionProps {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  tertiaryCta,
}) => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#F0FDF4] animate-gradient-shift"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating particles (gravity motion) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#0369A1] rounded-full opacity-10"
            animate={{ y: ['0vh', '100vh'], x: [0, 100] }}
            transition={{
              duration: 8 + i,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10px',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Logo/Badge */}
        <motion.div
          className="inline-block mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <GlassPanel variant="elevated" className="px-6 py-2 text-sm font-semibold text-[#0369A1]">
            NxN Commercial Training
          </GlassPanel>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl text-[#64748B] mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href={primaryCta.href}>
            <GlassButton variant="primary" size="lg">
              {primaryCta.label}
            </GlassButton>
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href}>
              <GlassButton variant="secondary" size="lg">
                {secondaryCta.label}
              </GlassButton>
            </Link>
          )}
          {tertiaryCta && (
            <Link href={tertiaryCta.href}>
              <GlassButton variant="ghost" size="lg">
                {tertiaryCta.label}
              </GlassButton>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
```

- [ ] **Step 2: Write test for HeroSection**

**Create:** `__tests__/components/HeroSection.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/home/HeroSection';

describe('HeroSection', () => {
  const props = {
    title: 'Master Commercial Training',
    description: 'Learn the NxN framework',
    primaryCta: { label: 'Start Learning', href: '/chapters' },
  };

  it('renders hero with title and description', () => {
    render(<HeroSection {...props} />);
    expect(screen.getByText('Master Commercial Training')).toBeInTheDocument();
    expect(screen.getByText('Learn the NxN framework')).toBeInTheDocument();
  });

  it('renders primary CTA button', () => {
    render(<HeroSection {...props} />);
    expect(screen.getByText('Start Learning')).toBeInTheDocument();
  });

  it('renders secondary and tertiary CTAs when provided', () => {
    render(
      <HeroSection
        {...props}
        secondaryCta={{ label: 'Browse Labs', href: '/labs' }}
        tertiaryCta={{ label: 'Learn More', href: '/lifecycle' }}
      />
    );
    expect(screen.getByText('Browse Labs')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders NxN badge', () => {
    render(<HeroSection {...props} />);
    expect(screen.getByText('NxN Commercial Training')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test -- __tests__/components/HeroSection.test.tsx
```

Expected: FAIL - Component not found

- [ ] **Step 4: Implement HeroSection (code above)**

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- __tests__/components/HeroSection.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/home/HeroSection.tsx __tests__/components/HeroSection.test.tsx
git commit -m "feat: create HeroSection with gradient shift animation

- Animated gradient background (blue→green→blue)
- Floating particles (gravity motion) moving downward
- NxN branding badge in glass panel
- 3 CTA button support (primary, secondary, tertiary)
- Staggered entrance animations
- Responsive typography (h1: 5xl→7xl)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

#### Step 7: Create LearningPathSection component

**Create:** `components/home/LearningPathSection.tsx`

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, StaggerContainer } from '@/components/glass';
import { staggerContainer } from '@/lib/motion-presets';

interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;
}

interface LearningPathSectionProps {
  chapters: Chapter[];
}

export const LearningPathSection: React.FC<LearningPathSectionProps> = ({ chapters }) => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Your Learning Path
          </h2>
          <p className="text-xl text-[#64748B] max-w-2xl">
            Master the NxN framework through structured chapters, each building on the previous.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <GlassCard
                key={chapter.id}
                title={chapter.title}
                description={chapter.description}
                href={`/chapters/${chapter.id}`}
                icon={chapter.icon}
                metadata={{
                  duration: `${chapter.duration}h`,
                  level: chapter.difficulty,
                }}
                status="in-progress"
              />
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

LearningPathSection.displayName = 'LearningPathSection';
```

- [ ] **Step 8: Write test for LearningPathSection**

```bash
# Test that section renders chapter cards
npm test -- __tests__/components/LearningPathSection.test.tsx
```

- [ ] **Step 9: Run test to verify it passes**

- [ ] **Step 10: Commit**

```bash
git add components/home/LearningPathSection.tsx
git commit -m "feat: create LearningPathSection with discovery cards

- Grid layout responsive (1→2→3 cols)
- GlassCard components with discovery motion
- Chapter metadata (duration, difficulty level)
- Staggered entrance animation on scroll
- Support for chapter icons

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

#### Step 11: Create CourseInfoSection component

**Create:** `components/home/CourseInfoSection.tsx`

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel, AnimatedCounter } from '@/components/glass';

interface CourseInfoSectionProps {
  totalChapters: number;
  totalHours: number;
  completionRate?: number;
}

export const CourseInfoSection: React.FC<CourseInfoSectionProps> = ({
  totalChapters,
  totalHours,
  completionRate = 0,
}) => {
  const stats = [
    {
      label: 'Chapters',
      value: totalChapters,
      color: 'text-[#0369A1]',
    },
    {
      label: 'Learning Hours',
      value: totalHours,
      color: 'text-[#16A34A]',
    },
    {
      label: 'Complete at Your Pace',
      value: completionRate,
      suffix: '%',
      color: 'text-[#0F766E]',
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[#F0F9FF] to-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
            Course Overview
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassPanel variant="surface" className="p-8 text-center">
                <p className="text-lg text-[#64748B] mb-4">{stat.label}</p>
                <AnimatedCounter
                  value={stat.value}
                  duration={2}
                  prefix=""
                  suffix={stat.suffix}
                  className={`text-5xl font-bold ${stat.color}`}
                />
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

CourseInfoSection.displayName = 'CourseInfoSection';
```

- [ ] **Step 12: Write and run tests for CourseInfoSection**

- [ ] **Step 13: Commit**

```bash
git add components/home/CourseInfoSection.tsx
git commit -m "feat: create CourseInfoSection with animated stats

- 3 stat cards in responsive grid (1→3 cols)
- AnimatedCounter for dynamic number display
- Glass panels with surface variant
- Color-coded stats (blue, green, teal)
- Staggered entrance on scroll

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

#### Step 14: Update home page to use all sections

**Modify:** `app/page.tsx`

```typescript
import { HeroSection } from '@/components/home/HeroSection';
import { LearningPathSection } from '@/components/home/LearningPathSection';
import { CourseInfoSection } from '@/components/home/CourseInfoSection';

// Mock data - replace with real data fetch
const chapters = [
  {
    id: '1',
    title: 'Introduction to NxN',
    description: 'Learn the fundamentals of the NxN sales framework',
    duration: 2,
    difficulty: 'beginner' as const,
  },
  {
    id: '2',
    title: 'Discovery Phase',
    description: 'Master prospect discovery techniques',
    duration: 3,
    difficulty: 'intermediate' as const,
  },
  {
    id: '3',
    title: 'Commitment Building',
    description: 'Advanced commitment strategies',
    duration: 4,
    difficulty: 'advanced' as const,
  },
];

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection
        title="Master the NxN Framework"
        description="Learn proven commercial training techniques to accelerate sales success"
        primaryCta={{ label: 'Start Learning', href: '/chapters' }}
        secondaryCta={{ label: 'Explore Labs', href: '/labs' }}
        tertiaryCta={{ label: 'View Timeline', href: '/lifecycle' }}
      />
      <LearningPathSection chapters={chapters} />
      <CourseInfoSection totalChapters={3} totalHours={9} />
    </main>
  );
}
```

- [ ] **Step 15: Write test for home page integration**

**Create:** `__tests__/pages/page.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders hero section with title', () => {
    render(<Home />);
    expect(screen.getByText('Master the NxN Framework')).toBeInTheDocument();
  });

  it('renders learning path section', () => {
    render(<Home />);
    expect(screen.getByText('Your Learning Path')).toBeInTheDocument();
  });

  it('renders course info section', () => {
    render(<Home />);
    expect(screen.getByText('Course Overview')).toBeInTheDocument();
  });

  it('renders all CTA buttons', () => {
    render(<Home />);
    expect(screen.getByText('Start Learning')).toBeInTheDocument();
    expect(screen.getByText('Explore Labs')).toBeInTheDocument();
    expect(screen.getByText('View Timeline')).toBeInTheDocument();
  });
});
```

- [ ] **Step 16: Run tests to verify all pass**

```bash
npm test -- __tests__/pages/page.test.tsx
```

- [ ] **Step 17: Build and verify no errors**

```bash
npm run build
```

- [ ] **Step 18: Final commit for Task 2.1**

```bash
git add app/page.tsx __tests__/pages/page.test.tsx
git commit -m "feat: implement home page with glassmorphic design

- Hero section with animated gradient background
- Learning path section with discovery cards
- Course info section with animated counters
- All components using glass design system
- Responsive design (mobile, tablet, desktop)
- Motion animations contextual to NxN framework

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 2.2: Chapter Pages (`/app/chapters/[chapterId]/page.tsx`)

**Files:**
- Modify: `app/chapters/page.tsx` (index)
- Modify: `app/chapters/[chapterId]/page.tsx` (detail)
- Create: `components/chapters/ChapterHero.tsx`
- Create: `components/chapters/ContentSection.tsx`
- Create: `components/chapters/KeyTakeaways.tsx`
- Create: `__tests__/pages/chapters.test.tsx`

**Overview:** Chapter detail pages with sticky navigation, hero section, process timeline, key takeaways (collapsible), and embedded lab challenges.

---

#### Steps 1-12: Create chapter components and page

[Similar detailed task breakdown for chapter hero, content sections, key takeaways, process timeline integration, and lab embedding]

- [ ] **Create ChapterHero component**
- [ ] **Create ContentSection component**
- [ ] **Create KeyTakeaways component (collapsible)**
- [ ] **Implement chapter detail page**
- [ ] **Add ProcessTimeline to show NxN stage**
- [ ] **Embed LabChallenge cards**
- [ ] **Write and run tests**
- [ ] **Verify build succeeds**
- [ ] **Commit with descriptive message**

---

### Task 2.3: Labs Page (`/app/labs/page.tsx`)

**Files:**
- Modify: `app/labs/page.tsx`
- Create: `components/labs/LabFilter.tsx`
- Create: `components/labs/LabGrid.tsx`
- Create: `components/labs/LabModal.tsx`
- Create: `__tests__/pages/labs.test.tsx`

**Overview:** Labs page with filtering by difficulty/topic, responsive grid of lab challenge cards with cycle motion, and expandable detail modals.

---

#### Steps 1-10: Create lab components and page

[Similar detailed task breakdown for filters, grid layout, modal interactions]

- [ ] **Create LabFilter component with active state**
- [ ] **Create LabGrid component with LabChallenge cards**
- [ ] **Create LabModal for expanded details**
- [ ] **Implement labs page with all components**
- [ ] **Add filter logic (difficulty, topic)**
- [ ] **Test filter interactions**
- [ ] **Test modal open/close**
- [ ] **Write full test suite**
- [ ] **Verify build succeeds**
- [ ] **Commit changes**

---

### Task 2.4: Lifecycle Page (`/app/lifecycle/page.tsx`)

**Files:**
- Modify: `app/lifecycle/page.tsx`
- Create: `components/lifecycle/StageCard.tsx`
- Create: `components/lifecycle/StageDataCard.tsx`
- Create: `__tests__/pages/lifecycle.test.tsx`

**Overview:** Full-screen vertical timeline showing entire NxN buyer journey with interactive stages and supporting metrics.

---

#### Steps 1-10: Create lifecycle components and page

[Similar detailed task breakdown for stage cards, timeline integration, data visualization]

- [ ] **Create StageCard component for each NxN stage**
- [ ] **Create StageDataCard for stage metrics**
- [ ] **Implement ProcessTimeline as full-screen vertical**
- [ ] **Add stage expansion animations (spring)**
- [ ] **Add metrics display per stage**
- [ ] **Implement scroll-triggered stage highlighting**
- [ ] **Write tests for stage interactions**
- [ ] **Test responsive layout on mobile**
- [ ] **Verify build succeeds**
- [ ] **Commit changes**

---

### Task 2.5: Trainer Dashboard (`/app/trainer/page.tsx`)

**Files:**
- Modify: `app/trainer/page.tsx`
- Create: `components/trainer/StatsCards.tsx`
- Create: `components/trainer/SessionTimeline.tsx`
- Create: `components/trainer/QuickActions.tsx`
- Create: `__tests__/pages/trainer.test.tsx`

**Overview:** Trainer dashboard with welcome section, stats cards with animated counters, session timeline, and quick action buttons.

---

#### Steps 1-10: Create trainer components and page

[Similar detailed task breakdown for stats, timeline, actions]

- [ ] **Create StatsCards with AnimatedCounter**
- [ ] **Create SessionTimeline with ProcessTimeline**
- [ ] **Create QuickActions with GlassButton grid**
- [ ] **Implement trainer dashboard page**
- [ ] **Add welcome/greeting section**
- [ ] **Test animations and interactions**
- [ ] **Test data display and formatting**
- [ ] **Write full test suite**
- [ ] **Verify build succeeds**
- [ ] **Commit changes**

---

## Phase 2 Integration Testing

### Task 2.6: Phase 2 Integration Tests

**Files:**
- Create: `__tests__/phase2-page-redesigns.test.ts`

**Overview:** Comprehensive integration tests verifying all 5 pages render correctly, use glass components, and animations work.

---

#### Steps 1-5: Create integration test suite

- [ ] **Create integration test file**
- [ ] **Test all 5 pages render**
- [ ] **Test glass components import correctly**
- [ ] **Test motion presets are applied**
- [ ] **Test responsive design breakpoints**
- [ ] **Run full test suite**
- [ ] **Verify build succeeds**
- [ ] **Commit with final message**

---

## Execution Notes

**Total Phase 2 Tasks**: 6 (5 pages + integration tests)

**Estimated Subagent Calls**: 
- 5 implementers (one per page)
- Potential spec reviewers (if issues found)
- Potential code quality reviewers (if issues found)

**Dependencies**:
- Phase 1 complete (all glass components tested)
- All motion presets available and tested
- Tailwind config with glass tokens
- Global styles with ambient animations

**Test Coverage**:
- Each page has integration tests
- Component tests for reusable sections
- Responsive design verified
- Animation performance checked

**Performance Targets**:
- Pages load in < 2.5s (LCP)
- Animations maintain 60fps
- No cumulative layout shift (CLS < 0.1)
- All animations respect prefers-reduced-motion

**Accessibility**:
- WCAG AA compliance verified
- Keyboard navigation tested
- Focus indicators visible
- ARIA labels on interactive elements

---

**Spec Reference**: docs/superpowers/specs/2026-04-17-glassmorphism-redesign-spec.md

**Phase 1 Reference**: docs/superpowers/plans/2026-04-17-glassmorphism-implementation-plan.md

**Execution Method**: superpowers:subagent-driven-development (recommended) for rapid iteration and quality gates
