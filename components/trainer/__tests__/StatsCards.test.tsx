import { render, screen } from '@testing-library/react';
import { StatsCards, type StatItem } from '../StatsCards';

// Mock framer-motion - properly exclude motion-specific props
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, whileHover, whileTap, variants, initial, animate, whileInView, viewport, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock GlassPanel
jest.mock('@/components/glass/GlassPanel', () => ({
  GlassPanel: ({ children, className, ...props }: any) => (
    <div className={`glass-panel ${className || ''}`} {...props}>
      {children}
    </div>
  ),
}));

// Mock AnimatedCounter
jest.mock('@/components/glass/AnimatedCounter', () => ({
  AnimatedCounter: ({ target, suffix = '' }: any) => <>{target}{suffix}</>,
}));

describe('StatsCards', () => {
  const mockStats: StatItem[] = [
    {
      id: 'stat-1',
      label: 'Active Learners',
      value: 248,
      trend: 12,
      color: 'green',
    },
    {
      id: 'stat-2',
      label: 'Total Sessions',
      value: 42,
      trend: 8,
      color: 'green',
    },
    {
      id: 'stat-3',
      label: 'Avg Rating',
      value: 48,
      trend: -3,
      suffix: '/50',
      color: 'red',
    },
  ];

  it('should render stat cards', () => {
    render(<StatsCards stats={mockStats} />);

    expect(screen.getByText('Active Learners')).toBeInTheDocument();
    expect(screen.getByText('Total Sessions')).toBeInTheDocument();
    expect(screen.getByText('Avg Rating')).toBeInTheDocument();
  });

  it('should render stat values', () => {
    const { container } = render(<StatsCards stats={mockStats} />);

    // Check that values are present
    expect(screen.getByText('248')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    // Check content with regex for values that might be split
    expect(container.textContent).toMatch(/248/);
    expect(container.textContent).toMatch(/42/);
    expect(container.textContent).toMatch(/48/);
  });

  it('should display trend indicators', () => {
    render(<StatsCards stats={mockStats} />);

    // Should have trend indicators
    const trendTexts = screen.getAllByText('↑');
    expect(trendTexts.length).toBeGreaterThan(0);
  });

  it('should render suffix for values', () => {
    render(<StatsCards stats={mockStats} />);

    // The suffix should be rendered with the value
    expect(screen.getByText(/\/50/)).toBeInTheDocument();
  });

  it('should render empty when no stats', () => {
    const { container } = render(<StatsCards stats={[]} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render correct number of cards', () => {
    const { container } = render(<StatsCards stats={mockStats} />);

    // Each stat card should render
    const cardLabels = screen.getAllByText(/Active Learners|Total Sessions|Avg Rating/);
    expect(cardLabels.length).toBe(3);
  });
});
