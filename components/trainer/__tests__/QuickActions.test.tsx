import { render, screen, fireEvent } from '@testing-library/react';
import { QuickActions, type QuickAction } from '../QuickActions';

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

// Mock GlassButton
jest.mock('@/components/glass/GlassButton', () => ({
  GlassButton: ({ children, className, ...props }: any) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

// Mock GlassPanel
jest.mock('@/components/glass/GlassPanel', () => ({
  GlassPanel: ({ children, className, ...props }: any) => (
    <div className={`glass-panel ${className || ''}`} {...props}>
      {children}
    </div>
  ),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe('QuickActions', () => {
  const mockActions: QuickAction[] = [
    {
      id: 'action-1',
      label: 'Start New Session',
      icon: '▶',
      onClick: jest.fn(),
      color: 'primary',
    },
    {
      id: 'action-2',
      label: 'View Reports',
      icon: '📊',
      href: '/trainer/reports',
      color: 'secondary',
    },
    {
      id: 'action-3',
      label: 'Message Team',
      icon: '💬',
      onClick: jest.fn(),
      color: 'secondary',
    },
    {
      id: 'action-4',
      label: 'Create Assignment',
      icon: '📝',
      href: '/trainer/assignments/new',
      color: 'secondary',
    },
  ];

  it('should render quick action buttons', () => {
    render(<QuickActions actions={mockActions} variant="inline" />);

    expect(screen.getByText('Start New Session')).toBeInTheDocument();
    expect(screen.getByText('View Reports')).toBeInTheDocument();
    expect(screen.getByText('Message Team')).toBeInTheDocument();
    expect(screen.getByText('Create Assignment')).toBeInTheDocument();
  });

  it('should render all action buttons in a grid', () => {
    const { container } = render(<QuickActions actions={mockActions} variant="inline" />);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(4);
  });

  it('should display action icons', () => {
    render(<QuickActions actions={mockActions} variant="inline" />);

    expect(screen.getByText('▶')).toBeInTheDocument();
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByText('💬')).toBeInTheDocument();
    expect(screen.getByText('📝')).toBeInTheDocument();
  });

  it('should handle onClick for button actions', () => {
    const mockOnClick = mockActions[0].onClick as jest.Mock;
    render(<QuickActions actions={mockActions} variant="inline" />);

    const button = screen.getByText('Start New Session').closest('button');
    if (button) {
      fireEvent.click(button);
    }

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render links for href actions', () => {
    render(<QuickActions actions={mockActions} variant="inline" />);

    const reportLink = screen.getByText('View Reports').closest('a');
    expect(reportLink).toHaveAttribute('href', '/trainer/reports');

    const assignmentLink = screen.getByText('Create Assignment').closest('a');
    expect(assignmentLink).toHaveAttribute('href', '/trainer/assignments/new');
  });

  it('should render card variant with glass panel', () => {
    render(<QuickActions actions={mockActions} variant="card" />);

    expect(screen.getByText('Start New Session')).toBeInTheDocument();
    expect(screen.getByText('View Reports')).toBeInTheDocument();
  });

  it('should render empty when no actions provided', () => {
    const { container } = render(<QuickActions actions={[]} variant="inline" />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should have aria labels on buttons', () => {
    render(<QuickActions actions={mockActions} variant="inline" />);

    const startButton = screen.getByRole('button', { name: /Start New Session/i });
    expect(startButton).toHaveAttribute('aria-label', 'Start New Session');
  });
});
