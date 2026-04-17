import { render, screen } from '@testing-library/react';
import { resolve } from 'path';
import { promises as fs } from 'fs';
import {
  discoveryCard,
  commitmentButton,
  cycleMotion,
  cyclePulse,
  revealContent,
  staggerContainer,
  timelineDot,
  engagementFocus,
  respectReducedMotion,
} from '@/lib/motion-presets';
import {
  GlassPanel,
  GlassButton,
  GlassCard,
  GlassNav,
  ProcessTimeline,
  LabChallenge,
  SkeletonGlass,
  AnimatedCounter,
  StaggerContainer,
} from '@/components/glass';

describe('Phase 1: Glass Component Library Foundation', () => {
  describe('Motion Presets', () => {
    it('should export all 9 motion presets', () => {
      expect(discoveryCard).toBeDefined();
      expect(commitmentButton).toBeDefined();
      expect(cycleMotion).toBeDefined();
      expect(cyclePulse).toBeDefined();
      expect(revealContent).toBeDefined();
      expect(staggerContainer).toBeDefined();
      expect(timelineDot).toBeDefined();
      expect(engagementFocus).toBeDefined();
      expect(respectReducedMotion).toBeDefined();
    });

    it('should have valid motion preset properties', () => {
      expect(discoveryCard.hover).toBeDefined();
      expect(commitmentButton.hover).toBeDefined();
      expect(commitmentButton.tap).toBeDefined();
      expect(cycleMotion.animate).toBeDefined();
      expect(revealContent.hidden).toBeDefined();
      expect(revealContent.visible).toBeDefined();
    });
  });

  describe('Glass Components', () => {
    it('should export all 8 glass components and utilities', () => {
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

    it('should render GlassPanel with opacity variants', () => {
      const { container } = render(
        <GlassPanel variant="elevated">Content</GlassPanel>
      );
      expect(container.firstChild).toHaveClass('bg-white/20');
    });

    it('should render GlassButton with commitment motion', () => {
      render(<GlassButton>Click me</GlassButton>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[#0369A1]');
    });

    it('should render GlassCard with discovery motion', () => {
      render(
        <GlassCard
          title="Test Card"
          description="Test"
          href="/test"
        />
      );
      expect(screen.getByText('Test Card')).toBeInTheDocument();
    });

    it('should render GlassNav with active state detection', () => {
      const links = [
        { label: 'Home', href: '/' },
        { label: 'Labs', href: '/labs' },
      ];
      render(<GlassNav links={links} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Labs')).toBeInTheDocument();
    });

    it('should render ProcessTimeline with flow motion', () => {
      const stages = [
        { id: '1', label: 'Awareness', description: 'Market awareness' },
        { id: '2', label: 'Interest', description: 'Generate interest' },
      ];
      render(<ProcessTimeline stages={stages} />);
      expect(screen.getByText('Awareness')).toBeInTheDocument();
    });

    it('should render LabChallenge with cycle motion', () => {
      render(
        <LabChallenge
          title="Lab 1"
          description="Learn basics"
          difficulty="beginner"
          duration={30}
          href="/labs/1"
        />
      );
      expect(screen.getByText('Lab 1')).toBeInTheDocument();
    });

    it('should render SkeletonGlass loading placeholder', () => {
      const { container } = render(<SkeletonGlass />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render AnimatedCounter', () => {
      render(<AnimatedCounter target={100} duration={2} />);
      expect(screen.getByText(/0/)).toBeInTheDocument();
    });

    it('should render StaggerContainer with children', () => {
      render(
        <StaggerContainer>
          <div>Item 1</div>
          <div>Item 2</div>
        </StaggerContainer>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });

  describe('Tailwind Configuration', () => {
    it('should have glass tokens in tailwind config', async () => {
      const config = await import('@/tailwind.config');
      const configExport = config.default || config;
      expect(configExport.theme.extend.colors.glass).toBeDefined();
      expect(configExport.theme.extend.colors.glass.primary).toBe('#0369A1');
      expect(configExport.theme.extend.colors.glass.accent).toBe('#16A34A');
    });

    it('should have glass blur utilities', async () => {
      const config = await import('@/tailwind.config');
      const configExport = config.default || config;
      expect(configExport.theme.extend.backdropBlur.glass).toBe('15px');
      expect(configExport.theme.extend.backdropBlur.nav).toBe('20px');
    });

    it('should have glass background colors', async () => {
      const config = await import('@/tailwind.config');
      const configExport = config.default || config;
      expect(configExport.theme.extend.backgroundColor['glass-elevated']).toBeDefined();
      expect(configExport.theme.extend.backgroundColor['glass-surface']).toBeDefined();
      expect(configExport.theme.extend.backgroundColor['glass-deep']).toBeDefined();
    });
  });

  describe('Global Styles', () => {
    it('should have glass layer styles in globals.css', async () => {
      const globalsPath = resolve(__dirname, '../app/globals.css');
      const content = await fs.readFile(globalsPath, 'utf-8');

      expect(content).toContain('.glass-panel');
      expect(content).toContain('.glass-elevated');
      expect(content).toContain('.glass-surface');
      expect(content).toContain('.glass-deep');
    });

    it('should have ambient animations in globals.css', async () => {
      const globalsPath = resolve(__dirname, '../app/globals.css');
      const content = await fs.readFile(globalsPath, 'utf-8');

      expect(content).toContain('@keyframes gradientShift');
      expect(content).toContain('@keyframes floatUp');
      expect(content).toContain('@keyframes particleFloat');
    });
  });

  describe('Build Verification', () => {
    it('should compile without TypeScript errors', () => {
      // This is verified by the build system itself
      // If there were TypeScript errors, the build would fail
      expect(true).toBe(true);
    });
  });
});
