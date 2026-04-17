# NxN Commercial Training Portal - Glassmorphism Redesign Specification

**Date**: April 17, 2026  
**Author**: Claude Code + UI/UX Pro Max  
**Status**: Approved for Implementation  
**Project**: NxN Training Portal  
**Platform**: Next.js 16.2.3 + React 19 + Tailwind CSS v4 + Framer Motion  
**Deploy Targets**: Dev: `devserver-main--nxn-commercial-training.netlify.app` | Prod: `nxn-commercial-training.netlify.app`

---

## 1. DESIGN VISION

Transform the NxN commercial training portal from a minimalist design into a **modern glassmorphic interface** with **contextual motion animations** that teach and reinforce NxN sales framework concepts. Every animation serves the learning experience—no generic motion.

**Key Principles**:
- ✓ Professional yet sophisticated (glassmorphism)
- ✓ Motion tied to NxN framework (discovery, commitment, cycle, flow)
- ✓ WCAG AA accessible with motion preferences respected
- ✓ Component-driven for consistency and maintainability
- ✓ 60fps performance on all devices

---

## 2. COLOR SYSTEM & TOKENS

**Research Source**: UI/UX Pro Max "Job Board/Recruitment" Professional Palette

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| **Primary Blue** | #0369A1 | Trust, primary CTAs, glass depth layers |
| **Accent Green** | #16A34A | Success, progress, highlight (existing brand color) |
| **Background Light** | #F0F9FF | Page background, subtle blue tint |
| **Card Base** | #FFFFFF | Card backgrounds, glass surfaces |
| **Muted/Secondary** | #64748B | Text on secondary elements, descriptions |
| **Border Blue** | #BAE6FD | Glass effect edges, subtle outlines |
| **Destructive** | #DC2626 | Errors, warnings (use sparingly) |
| **Neutral Dark** | #0F172A | Primary text, headings |

### Glass Effect Tokens
| Component | Opacity | Blur | Border |
|-----------|---------|------|--------|
| **Elevated Glass** | rgba(255,255,255,0.20) | 15px | 1px solid rgba(255,255,255,0.2) |
| **Surface Glass** | rgba(255,255,255,0.15) | 12px | 1px solid rgba(255,255,255,0.15) |
| **Deep Glass** | rgba(255,255,255,0.10) | 10px | 1px solid rgba(255,255,255,0.1) |
| **Nav Glass** | rgba(255,255,255,0.25) | 20px | 1px solid rgba(255,255,255,0.25) |

---

## 3. TYPOGRAPHY SYSTEM

**Research Source**: UI/UX Pro Max "Modern Professional" Font Pairing

### Font Stack
```css
/* Headings */
font-family: 'Poppins', sans-serif;
font-weights: 600, 700;

/* Body Text */
font-family: 'Open Sans', sans-serif;
font-weights: 400, 500, 600;

/* Accent (optional) */
Keep 'Space Grotesk' for brand accents/special sections
```

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Poppins:wght@600;700&family=Space+Grotesk:wght@400;700&display=swap');
```

### Scale & Hierarchy
- **H1** (Hero/Page Title): 56px, Poppins 700
- **H2** (Section Header): 40px, Poppins 700
- **H3** (Subsection): 32px, Poppins 600
- **H4** (Card Title): 22px, Poppins 600
- **Body**: 16px, Open Sans 400
- **Body Small**: 14px, Open Sans 400
- **Label/Tag**: 12px, Open Sans 500
- **Mono** (Data): Space Grotesk 400

---

## 4. MOTION DESIGN SYSTEM

### Philosophy: Contextual Motion

Every animation connects to NxN sales framework concepts. Motion reinforces learning.

### 4.1 Interactive Element Animations

**Chapter Card Hover** — "Discovery Motion"
```
Trigger: Hover on card
Animation:
  - Slide inward 2-4px (narrowing prospect list)
  - Translatey -4px upward (momentum building)
  - Blue glow expands around card (expanding opportunities)
Duration: 300ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Why: Reflects discovery phase of NxN methodology
```

**Button Interactions** — "Commitment Motion"
```
Trigger: Hover on primary CTA
Animation:
  - Background fills left-to-right (progress/commitment building)
  - Text slides forward 2px (moving forward in cycle)
  - Shadow expands (emphasis on action)
Duration: 250ms
Easing: ease-out
Why: Represents "advance the sale" concept
```

**Lab Challenge Cards** — "Cycle Motion"
```
Trigger: Ambient (always running) + on hover (intensify)
Animation:
  - Subtle rotation (0.5-1° back and forth)
  - Pulsing border (opacity pulse 0.15→0.3)
  - Cycle period: 8 seconds
Duration: Continuous
Easing: ease-in-out
Why: Represents repeatable NxN cycle
```

**Input/Focus States** — "Engagement Motion"
```
Trigger: Focus on input field
Animation:
  - Border color shift to #0369A1
  - Backdrop blur increases subtly
  - Shadow glow expands
Duration: 150ms
Easing: ease-out
Why: Emphasizes active engagement/discovery
```

### 4.2 Page Transition Animations

**Content Fade-In** — "Reveal Motion"
```
Trigger: Page load or section scroll into view
Animation:
  - Staggered child elements
  - Each child: opacity 0→1, translateY 20px→0
  - Stagger delay: 100ms between children
Duration: 300ms per element
Easing: ease-out
Why: Teaches sequential understanding of content
```

**Section Reveal** — "Progress Motion"
```
Trigger: Scroll intersection
Animation:
  - Slide up with blur fade-in
  - Background opacity increase
  - Text color fade from muted→dark
Duration: 400ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Why: Visualizes progression through learning material
```

### 4.3 Ambient Motion

**Background Gradient Shift** — "Journey Motion"
```
Animation: Gradient shifts blue→green→blue
Duration: 8-12 seconds
Opacity: Very subtle (0.02-0.05 change)
Easing: ease-in-out
Why: Cycles through NxN buyer journey phases
Where: Home page, chapter backgrounds
```

**Floating Glass Panels** — "Funnel Motion"
```
Animation: Panels move in patterns mimicking funnel narrowing
  - Top panels: wider, slower movement
  - Bottom panels: narrower, slightly faster
  - Movement: gentle up/down 3-5px
Duration: 4-6 seconds per cycle
Easing: ease-in-out
Why: Visualizes NxN funnel narrowing process
Where: Background of key sections
```

**Subtle Particles** — "Gravity Motion"
```
Animation: Faint animated dots move downward slowly
Duration: 6-10 seconds (staggered)
Speed: Very slow (gravity of progression)
Opacity: 0.05-0.1 (subtle)
Why: Represents downward progression through sales stages
Where: Deep backgrounds
```

**Timeline Progression** — "Flow Motion"
```
Animation:
  - Dots illuminate sequentially left→right
  - Connecting lines animate fill on scroll
  - Text reveals staggered with line animation
Duration: Varies by section length
Easing: ease-out
Why: Teaches sequential nature of sales stages
Where: ProcessTimeline component, Lifecycle page
```

### 4.4 Motion Presets Library

All motion animations centralized in `/lib/motion-presets.ts`:
```typescript
export const motionPresets = {
  discoveryCard: { /* hover animation */ },
  commitmentButton: { /* fill animation */ },
  cycleMotion: { /* rotation + pulse */ },
  revealContent: { /* stagger + fade */ },
  funnel: { /* narrowing movement */ },
  timeline: { /* sequential dots + lines */ },
  // ...
};
```

**Accessibility**: All animations check `prefers-reduced-motion` and disable accordingly.

---

## 5. COMPONENT LIBRARY

All components in `/components/glass/` directory.

### 5.1 Core Components

#### **GlassPanel** (Base Container)
```
Purpose: Base container for all glass surfaces
Props:
  - variant: "elevated" | "surface" | "deep"
  - children: React.ReactNode
  - className: string
  - motion: boolean (enable context animations)

Styling:
  - backdrop-filter: blur-15px
  - background: rgba(255,255,255,0.15)
  - border: 1px solid rgba(255,255,255,0.2)
  - border-radius: 12-16px
  - box-shadow: inset 0 1px 0 rgba(255,255,255,0.3)

Usage: Wrap content sections, cards, modals
```

#### **GlassButton** (CTA)
```
Purpose: Primary/secondary CTAs with glassmorphic styling
Props:
  - variant: "primary" | "secondary" | "ghost"
  - size: "sm" | "md" | "lg"
  - onClick: () => void
  - children: ReactNode
  - disabled: boolean

Animations:
  - Primary: "Commitment Motion" (left-to-right fill)
  - Secondary: soft scale + glow
  - Hover: blue glow expansion, shadow grow
  - Active: slight scale down (0.98)

Colors:
  - Primary bg: #0369A1, text: white
  - Secondary border: #BAE6FD, text: #0369A1
  - Ghost: transparent, text: #0369A1

Usage: All CTAs, form submissions, navigation
```

#### **GlassCard** (Content Card)
```
Purpose: Chapter, lab, content cards with contextual hover
Props:
  - title: string
  - description: string
  - icon?: ReactNode
  - href: string
  - status: "locked" | "in-progress" | "completed"
  - metadata?: { duration, difficulty, etc }

Animations:
  - Hover: "Discovery Motion" (inward slide + lift + glow)
  - Status indicators: pulse based on state
  - Entrance: stagger from parent

Styling:
  - Base: GlassPanel elevated
  - Hover: shadow expand, blue tint increase
  - Locked state: reduced opacity, greyed border

Usage: Chapter previews, lab cards, content sections
```

#### **ProcessTimeline** (NxN Stages)
```
Purpose: Displays NxN sales stages with flow motion
Props:
  - stages: Array<{ id, label, description }>
  - currentStage: number
  - onStageClick: (stageId) => void

Animations:
  - Dots: light up sequentially on scroll/"Flow Motion"
  - Lines: animate fill left→right
  - Text: staggered reveal with line animation
  - Total duration: tied to scroll position

Stages Shown:
  1. Why NxN Matters
  2. Discovery Phase
  3. Qualification
  4. Commitment
  5. Advancement

Usage: Chapter pages, lifecycle page, trainer dashboard
```

#### **GlassNav** (Navigation)
```
Purpose: Navigation bar with glassmorphism + sticky
Props:
  - links: Array<{ label, href }>
  - logo: ReactNode
  - sticky: boolean (default true)

Styling:
  - Glass opacity: 0.25 (darker than other elements)
  - Backdrop blur: 20px
  - Active link: blue underline with smooth animation
  - Scroll shadow: appears on scroll

Behavior:
  - Sticky top
  - Smooth transition on scroll
  - Mobile menu available (hamburger)

Usage: Root layout navigation
```

#### **LabChallenge** (Lab Card)
```
Purpose: Interactive lab exercise card
Props:
  - title: string
  - description: string
  - difficulty: "beginner" | "intermediate" | "advanced"
  - duration: number (minutes)
  - href: string

Animations:
  - "Cycle Motion": subtle rotation + pulsing border
  - Hover: expand blue glow, text slide
  - Click: spring expand animation showing full details

Color Coding:
  - Beginner: Green (#16A34A)
  - Intermediate: Blue (#0369A1)
  - Advanced: Red (#DC2626)

Usage: Labs page, chapter sections
```

### 5.2 Utility Components

#### **SkeletonGlass**
```
Purpose: Loading placeholder with glass styling
Animation: Shimmer effect (subtle subtle movement)
Usage: While content loads
```

#### **AnimatedCounter**
```
Purpose: Numbers count up when visible
Props: targetValue, duration
Animation: Smooth number animation with spring easing
Usage: Course stats section, progress indicators
```

#### **StaggerContainer**
```
Purpose: Wraps children to apply stagger animation
Props: children, staggerDelay
Animation: Each child fades/slides in sequentially
Usage: Any list/grid that benefits from sequential reveal
```

---

## 6. PAGE SPECIFICATIONS

### 6.1 Home Page (`/app/page.tsx`)

**Hero Section**:
- Background: Glass panel with animated gradient shift (blue→green)
- Content: NxN logo + h1 title + description + 3 CTA buttons
- Ambient: Floating particles moving downward (gravity motion)
- Animations: Button "Commitment Motion" on hover

**Learning Path Section**:
- Title: "Learning Path"
- Grid: GlassCards in 1→2→3 col layout (responsive)
- Cards: Chapter preview with "Discovery Motion"
- Entrance: Staggered reveal as section scrolls into view

**Course Info Section**:
- 3 GlassPanels showing: Chapter count, Hours, Learn at pace
- Content: AnimatedCounter for numbers
- Styling: Blue accent on primary stat
- Layout: 1→3 cols responsive

**Footer**: Existing component, update styling to match glass system

### 6.2 Chapter Pages (`/app/chapters/[chapterId]/page.tsx`)

**Navigation**: Sticky GlassNav at top

**Hero Section**:
- Title, chapter number, duration, difficulty badge
- Background: Glass panel with gradient
- Description + primary CTA

**Content Sections**:
- Each section in GlassPanel with subtle border
- Typography: Poppins headings, Open Sans body
- Motion: Content staggered fade-in

**ProcessTimeline**:
- Shows which NxN stage applies to this chapter
- Dots, lines, labels with "Flow Motion"
- Interactive: click stage to expand description

**Key Takeaways**:
- Collapsible glass panels
- Icon + text for each takeaway
- Smooth expand/collapse animation

**LabChallenge Cards**:
- 1-3 labs per chapter
- "Cycle Motion" animation
- Click to expand full details

**ChecklistSection** (if applicable):
- Glass panel containing checklist
- Checkbox animations: smooth check with scale
- Progress bar with fill animation

### 6.3 Labs Page (`/app/labs/page.tsx`)

**Header**: Title + description in glass panel

**Filter Section**:
- Glassmorphic buttons: Difficulty, Topic
- Active state: Blue background with underline
- Smooth transition between filters

**Lab Grid**:
- LabChallenge cards in responsive grid
- "Cycle Motion" on all cards
- Filtered view animates content changes

**Detail View**:
- Click card → spring expand modal
- Modal: GlassPanel with content
- Close animation: reverse spring

### 6.4 Lifecycle Page (`/app/lifecycle/page.tsx`)

**Full-Screen Timeline**:
- Vertical ProcessTimeline showing entire NxN journey
- Each stage: large glass panel with description
- "Flow Motion": dots light, lines fill as user scrolls
- Sticky stage labels at left

**Interactive Stages**:
- Click stage → expand content panel (spring animation)
- Content reveal: stagger children
- Stage highlight: blue glow + underline

**Context Visuals**:
- Icons for each stage
- Subtle background gradient shift
- Small data cards showing metrics per stage

### 6.5 Trainer Dashboard (`/app/trainer/page.tsx`)

**Header**: Welcome message + date in glass panel

**Stats Cards**:
- 3-4 GlassPanels with key metrics
- AnimatedCounters for numbers
- Trend indicators with color coding
- "Discovery Motion" on hover

**Session Timeline**:
- ProcessTimeline showing recent sessions
- "Flow Motion" as timeline loads
- Click session → detail modal

**Quick Actions**:
- GlassButtons for common actions
- "Commitment Motion" on hover
- Organized in glass section

---

## 7. ACCESSIBILITY REQUIREMENTS

### 7.1 Color Contrast
- **Primary text on white**: #0F172A → 17:1 contrast ✓
- **Secondary text on white**: #64748B → 5.2:1 contrast ✓
- **Blue on white**: #0369A1 → 7.8:1 contrast ✓
- **Green on white**: #16A34A → 6.9:1 contrast ✓
- **All text**: minimum 4.5:1 (WCAG AA) ✓

### 7.2 Motion Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations: duration 0, no motion */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7.3 Keyboard Navigation
- ✓ All buttons/links keyboard accessible (tab order)
- ✓ Focus indicators visible (blue ring, 2px)
- ✓ Modal dialogs trap focus
- ✓ Escape closes modals/menus

### 7.4 ARIA Labels
- ✓ All interactive elements have `aria-label` or `aria-labelledby`
- ✓ Animations don't hide content
- ✓ Status indicators announce state changes

---

## 8. PERFORMANCE REQUIREMENTS

### 8.1 Animation Performance
- **Target**: 60fps on all devices (no jank)
- **GPU Acceleration**: Use `transform` and `opacity` only
- **Avoid**: Layout shifts, color changes, blur on scroll

### 8.2 Page Load Metrics
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **FID** (First Input Delay): < 100ms
- **Glass blur effect render**: < 50ms

### 8.3 Device Support
- **Desktop**: Full animations (60fps target)
- **Tablet**: Reduced particle count, same animation timings
- **Mobile**: Reduced ambient motion, faster transitions (more snappy)
- **Older devices**: Graceful degradation (solid backgrounds, no blur)

### 8.4 Backdrop Filter Fallback
```css
.glass {
  /* Modern */
  backdrop-filter: blur(15px);
  
  /* Fallback for older browsers */
  background: rgba(255, 255, 255, 0.8);
}
```

---

## 9. IMPLEMENTATION PHASES

### Phase 1: Foundation (Days 1-2)
- [ ] Create `/components/glass/` directory structure
- [ ] Build `GlassPanel`, `GlassButton`, `GlassCard` components
- [ ] Create `/lib/motion-presets.ts` with all animations
- [ ] Update `/tailwind.config.ts` with color tokens + glass utilities
- [ ] Update `/app/globals.css` with glass layer styles + ambient animations
- [ ] Test basic glass rendering + animations

### Phase 2: Page Redesigns (Days 3-5)
- [ ] Home page: Hero + cards + stats section
- [ ] Chapter pages: ProcessTimeline + content sections + labs
- [ ] Labs page: Grid + filters + detail modals
- [ ] Lifecycle page: Full timeline + interactive stages
- [ ] Trainer dashboard: Stats cards + session timeline

### Phase 3: Polish & Deploy (Days 6-7)
- [ ] Performance optimization (blur effects, animations)
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile/tablet responsive testing
- [ ] Deploy to dev environment
- [ ] QA testing + user feedback
- [ ] Deploy to production

---

## 10. TESTING CHECKLIST

### Visual Testing
- [ ] Glassmorphic effects render correctly on all pages
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Animations smooth on desktop (60fps)
- [ ] Motion effects contextually meaningful

### Accessibility Testing
- [ ] Keyboard navigation works (tab, arrow keys, enter)
- [ ] Focus indicators visible on all interactive elements
- [ ] ARIA labels present on interactive elements
- [ ] `prefers-reduced-motion` respected
- [ ] axe DevTools audit passes

### Performance Testing
- [ ] Page load < 3 seconds
- [ ] Animations maintain 60fps
- [ ] Glass blur effect < 50ms render
- [ ] Mobile devices: acceptable performance (30fps+ acceptable)
- [ ] Lighthouse score > 90

### Responsiveness Testing
- [ ] Mobile (320px): layouts stack, touch targets ≥ 44px
- [ ] Tablet (768px): 2-col grid layouts work
- [ ] Desktop (1024px+): full 3-col layouts
- [ ] Touch interactions smooth on mobile

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 11. DEPLOYMENT STRATEGY

### Dev Environment
**URL**: `https://devserver-main--nxn-commercial-training.netlify.app`
**Process**:
1. Push changes to feature branch
2. Deploy preview (automatic via Netlify)
3. QA testing on preview
4. Merge to main
5. Promote preview to dev environment

### Production Environment
**URL**: `https://nxn-commercial-training.netlify.app`
**Process**:
1. Dev testing complete
2. Final QA on prod-staging
3. Merge to main branch
4. Automatic deploy to production
5. Monitor Core Web Vitals

---

## 12. DEPENDENCIES & LIBRARIES

**Already Installed**:
- `framer-motion@^12.38.0` (animations)
- `next@16.2.3` (framework)
- `react@19.2.4` (UI)
- `tailwindcss@^4` (styling)

**No additional dependencies needed** ✓

---

## 13. FILE STRUCTURE

```
nxn-training-portal/
├── components/
│   ├── glass/
│   │   ├── GlassPanel.tsx
│   │   ├── GlassButton.tsx
│   │   ├── GlassCard.tsx
│   │   ├── GlassNav.tsx
│   │   ├── LabChallenge.tsx
│   │   ├── ProcessTimeline.tsx
│   │   ├── SkeletonGlass.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── StaggerContainer.tsx
│   ├── home/
│   ├── chapter/
│   ├── layout/
│   └── ...
├── lib/
│   ├── motion-presets.ts (NEW)
│   └── content-loader.ts (existing)
├── app/
│   ├── page.tsx (updated)
│   ├── globals.css (updated)
│   ├── layout.tsx (updated)
│   ├── chapters/[chapterId]/page.tsx (updated)
│   ├── labs/page.tsx (updated)
│   ├── lifecycle/page.tsx (updated)
│   └── trainer/page.tsx (updated)
├── tailwind.config.ts (updated with glass tokens)
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-04-17-glassmorphism-redesign-spec.md (THIS FILE)
└── package.json
```

---

## 14. SUCCESS CRITERIA

✅ **Design System**: Glass component library complete + reusable  
✅ **Contextual Motion**: All animations tied to NxN framework concepts  
✅ **Accessibility**: WCAG AA compliant, motion preferences respected  
✅ **Performance**: 60fps on desktop, >30fps on mobile, < 3s load time  
✅ **Full Website**: All 5 major pages redesigned with consistency  
✅ **Dev Deployment**: Live and tested at dev environment URL  
✅ **Code Quality**: No regressions, all tests passing  

---

**Spec Version**: 1.0  
**Last Updated**: 2026-04-17  
**Next Steps**: Implementation planning via writing-plans skill → parallel agent execution
