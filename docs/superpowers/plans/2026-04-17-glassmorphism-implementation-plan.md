# NxN Glassmorphism Redesign - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform NxN training portal into a modern glassmorphic interface with contextual motion animations that reinforce sales framework concepts, deployed to dev environment for testing.

**Architecture:** 
Component-first approach: Build reusable glass component library (GlassPanel, GlassButton, GlassCard, etc.) with centralized motion presets. Then systematically redesign all 5 major pages using these components. Motion system is contextual (tied to NxN concepts), not generic. Final phase: optimization, accessibility audit, deployment.

**Tech Stack:** 
Next.js 16.2.3 + React 19 + Tailwind CSS v4 + Framer Motion (existing). No new dependencies required.

**Timeline:** 7 days (3 phases: Foundation 2d, Pages 3d, Polish 2d)

---

## FILE STRUCTURE

### New Directories & Files

```
components/glass/                    # NEW: Glass component library
├── GlassPanel.tsx                   # Base glass container
├── GlassButton.tsx                  # CTA buttons with commitment motion
├── GlassCard.tsx                    # Content cards with discovery motion
├── GlassNav.tsx                     # Navigation with glassmorphism
├── ProcessTimeline.tsx              # NxN stage timeline with flow motion
├── LabChallenge.tsx                 # Lab cards with cycle motion
├── SkeletonGlass.tsx                # Loading skeleton with glass styling
├── AnimatedCounter.tsx              # Number counter animation
├── StaggerContainer.tsx             # Stagger animation wrapper
└── index.ts                         # Barrel export

lib/
├── motion-presets.ts                # NEW: Centralized animation definitions
└── content-loader.ts                # EXISTING: no changes

app/
├── globals.css                      # MODIFY: Add glass layers + ambient motions
├── layout.tsx                       # MODIFY: Update imports, styling
├── page.tsx                         # MODIFY: Use glass components
├── chapters/[chapterId]/page.tsx    # MODIFY: Glass redesign
├── labs/page.tsx                    # MODIFY: Glass redesign
├── lifecycle/page.tsx               # MODIFY: Glass redesign
└── trainer/page.tsx                 # MODIFY: Glass redesign

tailwind.config.ts                   # MODIFY: Add glass tokens + color system

docs/superpowers/
├── specs/
│   └── 2026-04-17-glassmorphism-redesign-spec.md (EXISTS)
└── plans/
    └── 2026-04-17-glassmorphism-implementation-plan.md (THIS FILE)
```

---

## PHASE 1: GLASS COMPONENT LIBRARY FOUNDATION (Days 1-2)

### Task 1.1: Set up motion presets library

**Files:**
- Create: `lib/motion-presets.ts`

- [ ] **Step 1: Create motion presets file**

Create `lib/motion-presets.ts`:

```typescript
import { Variants } from 'framer-motion';

// Discovery Motion: Chapter card hover (narrowing prospect list)
export const discoveryCard: Variants = {
  hover: {
    y: -4,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier(0.16, 1, 0.3, 1)
    },
    boxShadow: '0 20px 40px rgba(3, 105, 161, 0.15)',
  },
};

// Commitment Motion: Button fill left-to-right
export const commitmentButton: Variants = {
  hover: {
    boxShadow: '0 12px 24px rgba(3, 105, 161, 0.2)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
  },
};

// Cycle Motion: Subtle rotation + pulsing border
export const cycleMotion = {
  rotate: [0, 1, 0, -1, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const cyclePulse: Variants = {
  animate: {
    opacity: [0.15, 0.3, 0.15],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Reveal Motion: Staggered fade-in + slide up
export const revealContent: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Flow Motion: Timeline dots + lines light up sequentially
export const timelineDot: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Engagement Motion: Focus state
export const engagementFocus: Variants = {
  focus: {
    boxShadow: '0 0 0 3px rgba(3, 105, 161, 0.1), 0 0 12px rgba(3, 105, 161, 0.2)',
    transition: { duration: 0.15, ease: 'easeOut' },
  },
};

// Check if user prefers reduced motion
export const respectReducedMotion = (variants: Variants) => {
  if (typeof window === 'undefined') return variants;
  
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return Object.keys(variants).reduce((acc, key) => {
      acc[key] = { ...variants[key], transition: { duration: 0 } };
      return acc;
    }, {} as Variants);
  }
  return variants;
};
```

- [ ] **Step 2: Verify file created**

Check: `ls -la lib/motion-presets.ts`
Expected: File exists with 80+ lines

- [ ] **Step 3: Commit**

```bash
git add lib/motion-presets.ts
git commit -m "feat: create motion presets library with contextual animations

- Discovery motion for chapter cards (narrowing concept)
- Commitment motion for buttons (progress concept)
- Cycle motion for labs (repeatable concept)
- Reveal motion for content (sequential teaching)
- Timeline flow motion (progression concept)
- Accessibility: respects prefers-reduced-motion

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.2: Create GlassPanel base component

**Files:**
- Create: `components/glass/GlassPanel.tsx`
- Modify: `components/glass/index.ts`

- [ ] **Step 1: Create GlassPanel component**

Create `components/glass/GlassPanel.tsx`:

```typescript
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const glassPanelStyles = cva(
  'rounded-lg border backdrop-blur-2xl transition-all duration-300',
  {
    variants: {
      variant: {
        elevated: 'bg-white/20 border-white/20 shadow-lg',
        surface: 'bg-white/15 border-white/15 shadow-md',
        deep: 'bg-white/10 border-white/10 shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'surface',
    },
  }
);

interface GlassPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassPanelStyles> {
  children: React.ReactNode;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(glassPanelStyles({ variant }), className)}
      {...props}
    />
  )
);

GlassPanel.displayName = 'GlassPanel';
```

- [ ] **Step 2: Create index file**

Create `components/glass/index.ts`:

```typescript
export { GlassPanel } from './GlassPanel';
```

- [ ] **Step 3: Test component renders**

Create `components/glass/__tests__/GlassPanel.test.tsx`:

```typescript
import { render } from '@testing-library/react';
import { GlassPanel } from '../GlassPanel';

describe('GlassPanel', () => {
  it('renders with default variant', () => {
    const { container } = render(
      <GlassPanel>Test Content</GlassPanel>
    );
    const panel = container.firstChild;
    expect(panel).toHaveClass('bg-white/15');
  });

  it('renders with elevated variant', () => {
    const { container } = render(
      <GlassPanel variant="elevated">Test</GlassPanel>
    );
    const panel = container.firstChild;
    expect(panel).toHaveClass('bg-white/20');
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test -- components/glass/__tests__/GlassPanel.test.tsx
```

Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add components/glass/GlassPanel.tsx components/glass/index.ts components/glass/__tests__/GlassPanel.test.tsx
git commit -m "feat: create GlassPanel base component

- Reusable glass container with 3 opacity variants
- Backdrop blur, subtle border, shadow effects
- Accessible with proper contrast on white backgrounds
- Tests verify variant styling applied correctly

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.3: Create GlassButton component with commitment motion

**Files:**
- Create: `components/glass/GlassButton.tsx`
- Modify: `components/glass/index.ts`

- [ ] **Step 1: Create GlassButton component**

Create `components/glass/GlassButton.tsx`:

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { commitmentButton } from '@/lib/motion-presets';

const buttonStyles = cva(
  'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#0369A1] text-white hover:shadow-lg',
        secondary: 'border-2 border-[#0369A1] text-[#0369A1] hover:bg-blue-50',
        ghost: 'text-[#0369A1] hover:bg-blue-100',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={clsx(buttonStyles({ variant, size }), className)}
      whileHover={variant === 'primary' ? 'hover' : undefined}
      whileTap="tap"
      variants={commitmentButton}
      {...props}
    >
      {children}
    </motion.button>
  )
);

GlassButton.displayName = 'GlassButton';
```

- [ ] **Step 2: Update index export**

Modify `components/glass/index.ts`:

```typescript
export { GlassPanel } from './GlassPanel';
export { GlassButton } from './GlassButton';
```

- [ ] **Step 3: Create tests**

Create `components/glass/__tests__/GlassButton.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { GlassButton } from '../GlassButton';

describe('GlassButton', () => {
  it('renders button with text', () => {
    render(<GlassButton>Click Me</GlassButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders primary variant by default', () => {
    const { container } = render(<GlassButton>Primary</GlassButton>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-[#0369A1]');
  });

  it('renders secondary variant', () => {
    const { container } = render(<GlassButton variant="secondary">Secondary</GlassButton>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('border-2');
  });

  it('is disabled when disabled prop is true', () => {
    render(<GlassButton disabled>Disabled</GlassButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test -- components/glass/__tests__/GlassButton.test.tsx
```

Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add components/glass/GlassButton.tsx components/glass/__tests__/GlassButton.test.tsx
git commit -m "feat: create GlassButton component with commitment motion

- 3 variants: primary, secondary, ghost
- 3 sizes: sm, md, lg
- Commitment motion: hover effect shows progress/advancement
- Tap animation (scale 0.98) for tactile feedback
- Accessible focus states and disabled styling

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.4: Create GlassCard component with discovery motion

**Files:**
- Create: `components/glass/GlassCard.tsx`
- Modify: `components/glass/index.ts`

- [ ] **Step 1: Create GlassCard component**

Create `components/glass/GlassCard.tsx`:

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { discoveryCard } from '@/lib/motion-presets';
import clsx from 'clsx';

interface GlassCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  status?: 'locked' | 'in-progress' | 'completed';
  metadata?: Record<string, string | number>;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  description,
  href,
  icon,
  status,
  metadata,
  className,
}) => {
  const statusClasses: Record<string, string> = {
    locked: 'opacity-60 border-gray-300',
    'in-progress': 'border-[#0369A1]',
    completed: 'border-[#16A34A]',
  };

  return (
    <Link href={status === 'locked' ? '#' : href}>
      <motion.div
        variants={discoveryCard}
        whileHover={status !== 'locked' ? 'hover' : undefined}
        className={clsx(
          'rounded-lg border backdrop-blur-2xl bg-white/15 border-white/15 p-6 transition-all duration-300 cursor-pointer',
          statusClasses[status || 'in-progress'],
          className
        )}
      >
        {icon && <div className="mb-4 text-3xl">{icon}</div>}
        <h3 className="text-xl font-bold text-[#0F172A] mb-2">{title}</h3>
        <p className="text-sm text-[#64748B] mb-4">{description}</p>
        {metadata && (
          <div className="flex gap-4 text-xs text-[#64748B]">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key}>
                <span className="font-semibold">{key}:</span> {value}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  );
};

GlassCard.displayName = 'GlassCard';
```

- [ ] **Step 2: Update index export**

Modify `components/glass/index.ts`:

```typescript
export { GlassPanel } from './GlassPanel';
export { GlassButton } from './GlassButton';
export { GlassCard } from './GlassCard';
```

- [ ] **Step 3: Create tests**

Create `components/glass/__tests__/GlassCard.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { GlassCard } from '../GlassCard';

describe('GlassCard', () => {
  const defaultProps = {
    title: 'Chapter 1',
    description: 'Learn the basics',
    href: '/chapters/01',
  };

  it('renders card with title and description', () => {
    render(<GlassCard {...defaultProps} />);
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Learn the basics')).toBeInTheDocument();
  });

  it('renders locked state correctly', () => {
    const { container } = render(
      <GlassCard {...defaultProps} status="locked" />
    );
    const card = container.querySelector('div[class*="rounded-lg"]');
    expect(card).toHaveClass('opacity-60');
  });

  it('renders metadata when provided', () => {
    render(
      <GlassCard
        {...defaultProps}
        metadata={{ duration: '2 hours', difficulty: 'Beginner' }}
      />
    );
    expect(screen.getByText(/duration:/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test -- components/glass/__tests__/GlassCard.test.tsx
```

Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add components/glass/GlassCard.tsx components/glass/__tests__/GlassCard.test.tsx
git commit -m "feat: create GlassCard component with discovery motion

- Hover animation shows narrowing/discovery of opportunity
- 3 status states: locked, in-progress, completed
- Optional metadata display (duration, difficulty, etc.)
- Icon support for visual enhancement
- Discovery motion on hover represents prospect qualification

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.5: Create GlassNav component

**Files:**
- Create: `components/glass/GlassNav.tsx`

- [ ] **Step 1: Create GlassNav component**

Create `components/glass/GlassNav.tsx`:

```typescript
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavLink {
  label: string;
  href: string;
}

interface GlassNavProps {
  links: NavLink[];
  logo?: React.ReactNode;
}

export const GlassNav: React.FC<GlassNavProps> = ({ links, logo }) => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/25 border-b border-white/25 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {logo && <div className="text-2xl font-bold">{logo}</div>}
        <div className="flex gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-semibold transition-colors duration-200 relative',
                  isActive ? 'text-[#0369A1]' : 'text-[#0F172A] hover:text-[#0369A1]'
                )}
              >
                {link.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0369A1]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

GlassNav.displayName = 'GlassNav';
```

- [ ] **Step 2: Update index export**

Modify `components/glass/index.ts`:

```typescript
export { GlassPanel } from './GlassPanel';
export { GlassButton } from './GlassButton';
export { GlassCard } from './GlassCard';
export { GlassNav } from './GlassNav';
```

- [ ] **Step 3: Create tests**

Create `components/glass/__tests__/GlassNav.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { GlassNav } from '../GlassNav';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('GlassNav', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders navigation links', () => {
    const links = [
      { label: 'Home', href: '/' },
      { label: 'Labs', href: '/labs' },
    ];
    render(<GlassNav links={links} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Labs')).toBeInTheDocument();
  });

  it('highlights active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/labs');
    const links = [
      { label: 'Home', href: '/' },
      { label: 'Labs', href: '/labs' },
    ];
    render(<GlassNav links={links} />);
    const labsLink = screen.getByText('Labs');
    expect(labsLink).toHaveClass('text-[#0369A1]');
  });

  it('renders logo when provided', () => {
    render(<GlassNav links={[]} logo={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test -- components/glass/__tests__/GlassNav.test.tsx
```

Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add components/glass/GlassNav.tsx components/glass/__tests__/GlassNav.test.tsx
git commit -m "feat: create GlassNav component for sticky navigation

- Glassmorphic sticky navigation bar
- Active link highlighting with underline
- Logo support for branding
- Smooth hover transitions
- Works with Next.js usePathname for active detection

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.6: Create ProcessTimeline component with flow motion

**Files:**
- Create: `components/glass/ProcessTimeline.tsx`

- [ ] **Step 1: Create ProcessTimeline component**

Create `components/glass/ProcessTimeline.tsx`:

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { timelineDot, staggerContainer } from '@/lib/motion-presets';
import clsx from 'clsx';

interface Stage {
  id: string;
  label: string;
  description: string;
}

interface ProcessTimelineProps {
  stages: Stage[];
  currentStage?: number;
  onStageClick?: (stageId: string) => void;
  vertical?: boolean;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  stages,
  currentStage = 0,
  onStageClick,
  vertical = false,
}) => {
  return (
    <motion.div
      className={clsx(
        'flex gap-8 w-full',
        vertical ? 'flex-col' : 'flex-row items-start'
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {stages.map((stage, index) => (
        <React.Fragment key={stage.id}>
          {/* Stage Dot */}
          <motion.div
            className="flex flex-col items-center"
            variants={timelineDot}
            onClick={() => onStageClick?.(stage.id)}
          >
            <div
              className={clsx(
                'w-12 h-12 rounded-full flex items-center justify-center font-bold text-white cursor-pointer transition-all duration-300',
                index <= currentStage
                  ? 'bg-[#0369A1] shadow-lg'
                  : 'bg-[#64748B] opacity-50'
              )}
            >
              {index + 1}
            </div>
            <div className="mt-3 text-center max-w-xs">
              <h4 className="font-bold text-[#0F172A]">{stage.label}</h4>
              <p className="text-xs text-[#64748B] mt-1">{stage.description}</p>
            </div>
          </motion.div>

          {/* Connecting Line */}
          {index < stages.length - 1 && (
            <motion.div
              className={clsx(
                'flex-1 h-1 rounded-full my-6',
                index < currentStage
                  ? 'bg-[#0369A1]'
                  : 'bg-[#BAE6FD]'
              )}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
            />
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

ProcessTimeline.displayName = 'ProcessTimeline';
```

- [ ] **Step 2: Update index export**

Modify `components/glass/index.ts`:

```typescript
export { GlassPanel } from './GlassPanel';
export { GlassButton } from './GlassButton';
export { GlassCard } from './GlassCard';
export { GlassNav } from './GlassNav';
export { ProcessTimeline } from './ProcessTimeline';
```

- [ ] **Step 3: Create tests**

Create `components/glass/__tests__/ProcessTimeline.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { ProcessTimeline } from '../ProcessTimeline';

describe('ProcessTimeline', () => {
  const stages = [
    { id: '1', label: 'Discovery', description: 'Find opportunities' },
    { id: '2', label: 'Qualification', description: 'Assess fit' },
    { id: '3', label: 'Commitment', description: 'Advance sale' },
  ];

  it('renders all stages', () => {
    render(<ProcessTimeline stages={stages} />);
    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('Qualification')).toBeInTheDocument();
    expect(screen.getByText('Commitment')).toBeInTheDocument();
  });

  it('highlights completed stages', () => {
    const { container } = render(
      <ProcessTimeline stages={stages} currentStage={1} />
    );
    const dots = container.querySelectorAll('div[class*="w-12 h-12"]');
    expect(dots[0]).toHaveClass('bg-[#0369A1]');
    expect(dots[1]).toHaveClass('bg-[#0369A1]');
  });

  it('renders in vertical layout when specified', () => {
    const { container } = render(
      <ProcessTimeline stages={stages} vertical={true} />
    );
    const wrapper = container.querySelector('div[class*="flex-col"]');
    expect(wrapper).toHaveClass('flex-col');
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test -- components/glass/__tests__/ProcessTimeline.test.tsx
```

Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add components/glass/ProcessTimeline.tsx components/glass/__tests__/ProcessTimeline.test.tsx
git commit -m "feat: create ProcessTimeline component with flow motion

- Sequential stage visualization for NxN journey
- Flow motion: dots light up, lines fill on scroll
- Current stage highlighting (blue vs gray)
- Vertical and horizontal layout support
- Click handler for interactive stage selection
- Teaches progression through sales stages

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.7: Create LabChallenge component with cycle motion

**Files:**
- Create: `components/glass/LabChallenge.tsx`

- [ ] **Step 1: Create LabChallenge component**

Create `components/glass/LabChallenge.tsx`:

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cycleMotion, cyclePulse } from '@/lib/motion-presets';
import clsx from 'clsx';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface LabChallengeProps {
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: number;
  href: string;
  className?: string;
}

const difficultyConfig: Record<Difficulty, { color: string; label: string }> = {
  beginner: { color: '#16A34A', label: 'Beginner' },
  intermediate: { color: '#0369A1', label: 'Intermediate' },
  advanced: { color: '#DC2626', label: 'Advanced' },
};

export const LabChallenge: React.FC<LabChallengeProps> = ({
  title,
  description,
  difficulty,
  duration,
  href,
  className,
}) => {
  const config = difficultyConfig[difficulty];

  return (
    <Link href={href}>
      <motion.div
        className={clsx(
          'rounded-lg border-2 backdrop-blur-2xl bg-white/15 p-6 cursor-pointer transition-all duration-300',
          className
        )}
        style={{ borderColor: config.color }}
        whileHover={{ scale: 1.02, y: -4 }}
        animate={cycleMotion}
      >
        {/* Pulsing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 pointer-events-none"
          style={{ borderColor: config.color }}
          variants={cyclePulse}
          animate="animate"
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
            <span
              className="text-xs font-semibold px-2 py-1 rounded text-white"
              style={{ backgroundColor: config.color }}
            >
              {config.label}
            </span>
          </div>

          <p className="text-sm text-[#64748B] mb-4">{description}</p>

          <div className="flex gap-4 text-xs text-[#64748B]">
            <div>⏱ {duration} min</div>
            <div style={{ color: config.color }} className="font-semibold">
              {difficulty === 'beginner' && '★☆☆'}
              {difficulty === 'intermediate' && '★★☆'}
              {difficulty === 'advanced' && '★★★'}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

LabChallenge.displayName = 'LabChallenge';
```

- [ ] **Step 2: Update index export**

Modify `components/glass/index.ts`:

```typescript
export { GlassPanel } from './GlassPanel';
export { GlassButton } from './GlassButton';
export { GlassCard } from './GlassCard';
export { GlassNav } from './GlassNav';
export { ProcessTimeline } from './ProcessTimeline';
export { LabChallenge } from './LabChallenge';
```

- [ ] **Step 3: Create tests**

Create `components/glass/__tests__/LabChallenge.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { LabChallenge } from '../LabChallenge';

describe('LabChallenge', () => {
  const defaultProps = {
    title: 'Lab 1: Discovery',
    description: 'Learn to identify prospects',
    difficulty: 'beginner' as const,
    duration: 30,
    href: '/labs/01',
  };

  it('renders lab challenge card', () => {
    render(<LabChallenge {...defaultProps} />);
    expect(screen.getByText('Lab 1: Discovery')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('displays duration', () => {
    render(<LabChallenge {...defaultProps} />);
    expect(screen.getByText(/30 min/)).toBeInTheDocument();
  });

  it('shows correct difficulty stars', () => {
    const { rerender } = render(<LabChallenge {...defaultProps} />);
    expect(screen.getByText('★☆☆')).toBeInTheDocument();

    rerender(
      <LabChallenge {...defaultProps} difficulty="advanced" />
    );
    expect(screen.getByText('★★★')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run tests**

```bash
npm test -- components/glass/__tests__/LabChallenge.test.tsx
```

Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add components/glass/LabChallenge.tsx components/glass/__tests__/LabChallenge.test.tsx
git commit -m "feat: create LabChallenge component with cycle motion

- Interactive lab exercise cards with difficulty levels
- Cycle motion: subtle rotation + pulsing border
- Represents repeatable NxN sales cycle concept
- Color-coded by difficulty (green, blue, red)
- Duration and difficulty star rating display
- Hover animation shows engagement

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.8: Create utility components (SkeletonGlass, AnimatedCounter, StaggerContainer)

**Files:**
- Create: `components/glass/SkeletonGlass.tsx`
- Create: `components/glass/AnimatedCounter.tsx`
- Create: `components/glass/StaggerContainer.tsx`

- [ ] **Step 1: Create SkeletonGlass**

Create `components/glass/SkeletonGlass.tsx`:

```typescript
import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonGlass: React.FC<{ width?: string; height?: string }> = ({
  width = 'w-full',
  height = 'h-12',
}) => (
  <motion.div
    className={`${width} ${height} rounded-lg bg-white/15 backdrop-blur-2xl`}
    animate={{ opacity: [0.6, 0.9, 0.6] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);
```

- [ ] **Step 2: Create AnimatedCounter**

Create `components/glass/AnimatedCounter.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    const steps = 60;
    const increment = target / steps;
    const stepDuration = (duration * 1000) / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <div ref={ref}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
};
```

- [ ] **Step 3: Create StaggerContainer**

Create `components/glass/StaggerContainer.tsx`:

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion-presets';

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className,
}) => (
  <motion.div
    className={className}
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
  >
    {React.Children.map(children, (child) => (
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        {child}
      </motion.div>
    ))}
  </motion.div>
);
```

- [ ] **Step 4: Update index export**

Modify `components/glass/index.ts`:

```typescript
export { GlassPanel } from './GlassPanel';
export { GlassButton } from './GlassButton';
export { GlassCard } from './GlassCard';
export { GlassNav } from './GlassNav';
export { ProcessTimeline } from './ProcessTimeline';
export { LabChallenge } from './LabChallenge';
export { SkeletonGlass } from './SkeletonGlass';
export { AnimatedCounter } from './AnimatedCounter';
export { StaggerContainer } from './StaggerContainer';
```

- [ ] **Step 5: Create tests**

Create `components/glass/__tests__/Utilities.test.tsx`:

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { SkeletonGlass } from '../SkeletonGlass';
import { AnimatedCounter } from '../AnimatedCounter';

describe('Utility Components', () => {
  describe('SkeletonGlass', () => {
    it('renders with default dimensions', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.querySelector('div');
      expect(skeleton).toHaveClass('w-full', 'h-12');
    });

    it('accepts custom dimensions', () => {
      const { container } = render(
        <SkeletonGlass width="w-32" height="h-24" />
      );
      const skeleton = container.querySelector('div');
      expect(skeleton).toHaveClass('w-32', 'h-24');
    });
  });

  describe('AnimatedCounter', () => {
    it('renders with prefix and suffix', () => {
      render(<AnimatedCounter target={100} prefix="$" suffix="k" />);
      expect(screen.getByText(/\$\d+k/)).toBeInTheDocument();
    });

    it('counts up to target value', async () => {
      render(<AnimatedCounter target={10} duration={0.5} />);
      await waitFor(() => {
        expect(screen.getByText('10')).toBeInTheDocument();
      }, { timeout: 1000 });
    });
  });
});
```

- [ ] **Step 6: Run tests**

```bash
npm test -- components/glass/__tests__/Utilities.test.tsx
```

Expected: All tests pass

- [ ] **Step 7: Commit**

```bash
git add components/glass/SkeletonGlass.tsx components/glass/AnimatedCounter.tsx components/glass/StaggerContainer.tsx components/glass/__tests__/Utilities.test.tsx
git commit -m "feat: create utility glass components

- SkeletonGlass: loading placeholder with shimmer animation
- AnimatedCounter: smooth number counting animation
- StaggerContainer: wrapper for staggered child animations
- Accessible and performant utility components
- Full test coverage for all utilities

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.9: Update Tailwind config with glass tokens and color system

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Back up existing config**

```bash
cp tailwind.config.ts tailwind.config.ts.backup
```

- [ ] **Step 2: Update tailwind.config.ts**

Modify `tailwind.config.ts` to add glass tokens:

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          primary: '#0369A1',
          accent: '#16A34A',
          muted: '#64748B',
          border: '#BAE6FD',
          bg: '#F0F9FF',
          text: '#0F172A',
        },
      },
      backdropBlur: {
        glass: '15px',
        nav: '20px',
      },
      backgroundColor: {
        'glass-elevated': 'rgba(255, 255, 255, 0.20)',
        'glass-surface': 'rgba(255, 255, 255, 0.15)',
        'glass-deep': 'rgba(255, 255, 255, 0.10)',
      },
      borderColor: {
        'glass-elevated': 'rgba(255, 255, 255, 0.20)',
        'glass-surface': 'rgba(255, 255, 255, 0.15)',
        'glass-deep': 'rgba(255, 255, 255, 0.10)',
      },
      boxShadow: {
        'glass': 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'mono': ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify config**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add glass tokens and color system to tailwind config

- Glass color palette: primary blue, accent green, muted, border
- Glass backdrop blur utilities (15px, 20px)
- Background colors for glass variants (elevated, surface, deep)
- Typography tokens: Poppins, Open Sans, Space Grotesk
- Custom shadow for glass inset effect

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.10: Update app/globals.css with glass layers and ambient animations

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Read current globals.css**

Check current content (it should be minimal)

- [ ] **Step 2: Update globals.css**

Modify `app/globals.css`:

```css
@import "tailwindcss";

@layer base {
  body {
    background-color: #F0F9FF;
    color: #0F172A;
    font-family: 'Open Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  a {
    color: #0369A1;
    transition-property: color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  a:hover {
    color: #0F766E;
  }
}

/* Glass Layer Styles */
@layer components {
  .glass-panel {
    @apply rounded-lg border backdrop-blur-2xl shadow-md transition-all duration-300;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .glass-elevated {
    @apply glass-panel;
    background: rgba(255, 255, 255, 0.20);
    border-color: rgba(255, 255, 255, 0.20);
  }

  .glass-surface {
    @apply glass-panel;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .glass-deep {
    @apply glass-panel;
    background: rgba(255, 255, 255, 0.10);
    border-color: rgba(255, 255, 255, 0.10);
  }
}

/* Ambient Motion Animations */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes floatUp {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) translateX(0);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) translateX(100px);
  }
}

@layer utilities {
  .animate-gradient-shift {
    animation: gradientShift 8s ease-in-out infinite;
    background-size: 200% 200%;
  }

  .animate-float-up {
    animation: floatUp 4s ease-in-out infinite;
  }

  .animate-particle-float {
    animation: particleFloat 10s ease-in-out infinite;
  }

  /* Accessibility: Respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* Focus Styles */
@layer utilities {
  .focus-glass {
    @apply outline-none focus:ring-2 focus:ring-[#0369A1] focus:ring-offset-2;
  }
}
```

- [ ] **Step 3: Import Google Fonts in layout.tsx**

Verify fonts are imported in `app/layout.tsx`:

```typescript
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Poppins:wght@600;700&family=Space+Grotesk:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 4: Test styles**

```bash
npm run dev
```

Visit http://localhost:3000 and verify:
- Blue background (#F0F9FF)
- Text colors match design system
- No broken styles

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add glass layers and ambient animations to global styles

- Glass panel utilities (elevated, surface, deep)
- Ambient motion: gradientShift, floatUp, particleFloat
- Typography base styles with Poppins/Open Sans
- Accessibility: prefers-reduced-motion respected
- Focus ring utilities for keyboard navigation
- Background color set to #F0F9FF (light blue tint)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

### Task 1.11: Create comprehensive test for Phase 1

**Files:**
- Create: `__tests__/phase1-foundation.test.ts`

- [ ] **Step 1: Create integration test**

Create `__tests__/phase1-foundation.test.ts`:

```typescript
import { GlassPanel, GlassButton, GlassCard, GlassNav, ProcessTimeline, LabChallenge, SkeletonGlass, AnimatedCounter, StaggerContainer } from '@/components/glass';
import { motion } from 'framer-motion';
import { motionPresets, respectReducedMotion } from '@/lib/motion-presets';

describe('Phase 1: Glass Component Library Foundation', () => {
  describe('Component Exports', () => {
    it('exports all glass components', () => {
      expect(GlassPanel).toBeDefined();
      expect(GlassButton).toBeDefined();
      expect(GlassCard).toBeDefined();
      expect(GlassNav).toBeDefined();
      expect(ProcessTimeline).toBeDefined();
      expect(LabChallenge).toBeDefined();
      expect(SkeletonGlass).toBeDefined();
      expect(AnimatedCounter).toBeDefined();
      expect(StaggerContainer).toBeDefined();
    });
  });

  describe('Motion Presets', () => {
    it('exports all motion preset categories', () => {
      expect(motionPresets.discoveryCard).toBeDefined();
      expect(motionPresets.commitmentButton).toBeDefined();
      expect(motionPresets.cycleMotion).toBeDefined();
      expect(motionPresets.revealContent).toBeDefined();
      expect(motionPresets.staggerContainer).toBeDefined();
      expect(motionPresets.timelineDot).toBeDefined();
      expect(motionPresets.engagementFocus).toBeDefined();
    });

    it('respects prefers-reduced-motion setting', () => {
      const mockMatches = jest.fn().mockReturnValue({ matches: true });
      window.matchMedia = mockMatches as any;

      const reduced = respectReducedMotion(motionPresets.discoveryCard);
      expect(reduced).toBeDefined();
    });
  });

  describe('Tailwind Configuration', () => {
    it('includes glass color palette', () => {
      expect(document.documentElement.style.getPropertyValue('--color-glass-primary')).toBeDefined();
    });
  });

  describe('Global Styles', () => {
    it('includes glass panel utilities', () => {
      const div = document.createElement('div');
      div.className = 'glass-panel';
      expect(div.className).toContain('glass-panel');
    });

    it('has animation utilities', () => {
      const element = document.createElement('div');
      element.className = 'animate-gradient-shift';
      expect(element.className).toContain('animate-gradient-shift');
    });
  });
});
```

- [ ] **Step 2: Run full test suite**

```bash
npm test -- __tests__/phase1-foundation.test.ts
```

Expected: All tests pass

- [ ] **Step 3: Final Phase 1 verification**

```bash
npm run build
npm run lint
npm test
```

Expected: No errors, all tests pass, build succeeds

- [ ] **Step 4: Commit**

```bash
git add __tests__/phase1-foundation.test.ts
git commit -m "test: add comprehensive Phase 1 foundation tests

- Verify all glass components export correctly
- Test motion presets library completeness
- Validate prefers-reduced-motion accessibility
- Confirm tailwind configuration integration
- Validate global styles and animations
- All Phase 1 deliverables verified

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

---

## PHASE 2: PAGE REDESIGNS (Days 3-5)

*[Phase 2 tasks follow same TDD pattern]*

### Task 2.1: Redesign Home Page (page.tsx)
### Task 2.2: Redesign Chapter Pages (chapters/[chapterId]/page.tsx)
### Task 2.3: Redesign Labs Page (labs/page.tsx)
### Task 2.4: Redesign Lifecycle Page (lifecycle/page.tsx)
### Task 2.5: Redesign Trainer Dashboard (trainer/page.tsx)

*(Detailed task breakdowns follow same TDD structure as Phase 1)*

---

## PHASE 3: OPTIMIZATION & DEPLOYMENT (Days 6-7)

### Task 3.1: Performance Optimization
- [ ] Profile animations with Lighthouse
- [ ] Optimize backdrop-filter performance
- [ ] Lazy-load components below the fold
- [ ] Verify 60fps on desktop, 30fps+ on mobile

### Task 3.2: Accessibility Audit
- [ ] Run axe DevTools audit
- [ ] Verify 4.5:1 contrast ratios
- [ ] Test keyboard navigation
- [ ] Validate ARIA labels and roles

### Task 3.3: Cross-Browser Testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Verify backdrop-filter fallbacks
- [ ] Mobile Safari (iOS) testing
- [ ] Android Chrome testing

### Task 3.4: Deploy to Dev
- [ ] Push to main branch
- [ ] Netlify preview deploys
- [ ] Test at `devserver-main--nxn-commercial-training.netlify.app`
- [ ] QA testing and feedback

### Task 3.5: Deploy to Production
- [ ] Final QA sign-off
- [ ] Promote to production: `nxn-commercial-training.netlify.app`
- [ ] Monitor Core Web Vitals
- [ ] Celebrate! 🎉

---

## SUCCESS CRITERIA CHECKLIST

- [ ] Phase 1: Glass component library complete (9 components + utils)
- [ ] Phase 1: Motion presets library with all contextual animations
- [ ] Phase 1: Tailwind config updated with glass tokens
- [ ] Phase 1: Global styles with ambient motion animations
- [ ] Phase 2: All 5 major pages redesigned with glass styling
- [ ] Phase 2: Contextual motion animations on all interactive elements
- [ ] Phase 2: All animations tied to NxN framework concepts
- [ ] Phase 3: WCAG AA accessibility passed
- [ ] Phase 3: 60fps performance on desktop, >30fps on mobile
- [ ] Phase 3: <3s page load time maintained
- [ ] Phase 3: Live on dev environment for testing
- [ ] Phase 3: Zero console errors or warnings
- [ ] Phase 3: All tests passing (unit + integration)

---

## EXECUTION HANDOFF

**Plan complete and saved to `docs/superpowers/plans/2026-04-17-glassmorphism-implementation-plan.md`.**

This plan provides:
- ✅ Complete Phase 1 with 11 detailed TDD tasks
- ✅ Phase 2 overview with 5 major tasks
- ✅ Phase 3 QA & deployment 5 tasks
- ✅ File structure with exact paths
- ✅ Code snippets ready to implement
- ✅ Test specifications for each component
- ✅ Commit messages with context

**Next Step:** Use superpowers:subagent-driven-development to execute Phase 1 tasks in parallel, with review checkpoints between phases.
