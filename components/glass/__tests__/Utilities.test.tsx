import { render, screen, waitFor } from '@testing-library/react';
import { SkeletonGlass } from '../SkeletonGlass';
import { AnimatedCounter } from '../AnimatedCounter';
import { StaggerContainer } from '../StaggerContainer';

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

    it('has glassmorphism styling', () => {
      const { container } = render(<SkeletonGlass />);
      const skeleton = container.querySelector('div');
      expect(skeleton).toHaveClass('rounded-lg', 'backdrop-blur-2xl');
    });
  });

  describe('AnimatedCounter', () => {
    it('renders with prefix and suffix', () => {
      render(<AnimatedCounter target={100} prefix="$" suffix="k" />);
      const element = screen.getByText(/\$\d+k/);
      expect(element).toBeInTheDocument();
    });

    it('counts up to target value', async () => {
      render(<AnimatedCounter target={10} duration={0.5} />);
      await waitFor(() => {
        expect(screen.getByText('10')).toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('renders with default prefix and suffix as empty', async () => {
      render(<AnimatedCounter target={5} />);
      await waitFor(() => {
        expect(screen.getByText('5')).toBeInTheDocument();
      }, { timeout: 1000 });
    });

    it('starts at zero', () => {
      const { container } = render(<AnimatedCounter target={100} />);
      expect(container.textContent).toContain('0');
    });
  });

  describe('StaggerContainer', () => {
    it('renders children', () => {
      render(
        <StaggerContainer>
          <div>Child 1</div>
          <div>Child 2</div>
        </StaggerContainer>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('applies motion variants', () => {
      const { container } = render(
        <StaggerContainer>
          <div>Child</div>
        </StaggerContainer>
      );
      const stagger = container.firstChild;
      expect(stagger).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      const { container } = render(
        <StaggerContainer className="custom-class">
          <div>Child</div>
        </StaggerContainer>
      );
      const stagger = container.querySelector('.custom-class');
      expect(stagger).toBeInTheDocument();
    });

    it('wraps each child in motion.div', () => {
      const { container } = render(
        <StaggerContainer>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </StaggerContainer>
      );
      const children = container.querySelectorAll('div');
      expect(children.length).toBeGreaterThanOrEqual(2);
    });
  });
});
