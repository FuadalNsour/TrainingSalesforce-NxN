import { render, screen, fireEvent } from '@testing-library/react';
import { SessionTimeline, type Session } from '../SessionTimeline';

// Mock framer-motion - properly exclude motion-specific props
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, whileHover, whileTap, variants, initial, animate, whileInView, viewport, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock GlassPanel
jest.mock('@/components/glass/GlassPanel', () => ({
  GlassPanel: ({ children, className, ...props }: any) => (
    <div className={`glass-panel ${className || ''}`} {...props}>
      {children}
    </div>
  ),
}));

describe('SessionTimeline', () => {
  const mockSessions: Session[] = [
    {
      id: 'session-1',
      title: 'NxN Fundamentals',
      date: 'Apr 18, 2026',
      time: '2:00 PM',
      participants: 24,
      status: 'scheduled',
      description: 'Introduction to NxN framework',
    },
    {
      id: 'session-2',
      title: 'Discovery Techniques',
      date: 'Apr 15, 2026',
      time: '10:00 AM',
      participants: 18,
      status: 'completed',
      description: 'Advanced discovery techniques workshop',
    },
    {
      id: 'session-3',
      title: 'Commitment Strategies',
      date: 'Apr 12, 2026',
      participants: 32,
      status: 'completed',
    },
  ];

  it('should render session timeline', () => {
    render(<SessionTimeline sessions={mockSessions} />);

    expect(screen.getByText('NxN Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Discovery Techniques')).toBeInTheDocument();
    expect(screen.getByText('Commitment Strategies')).toBeInTheDocument();
  });

  it('should display session dates', () => {
    const { container } = render(<SessionTimeline sessions={mockSessions} />);

    expect(container.textContent).toMatch(/Apr 18, 2026/);
    expect(container.textContent).toMatch(/Apr 15, 2026/);
    expect(container.textContent).toMatch(/Apr 12, 2026/);
  });

  it('should display participant counts', () => {
    const { container } = render(<SessionTimeline sessions={mockSessions} />);

    expect(container.textContent).toMatch(/24/);
    expect(container.textContent).toMatch(/18/);
    expect(container.textContent).toMatch(/32/);
    expect(container.textContent).toMatch(/participants/i);
  });

  it('should display session status', () => {
    render(<SessionTimeline sessions={mockSessions} />);

    expect(screen.getByText('Scheduled')).toBeInTheDocument();
    expect(screen.getAllByText('Completed')).toHaveLength(2);
  });

  it('should render empty message when no sessions', () => {
    render(<SessionTimeline sessions={[]} />);

    expect(screen.getByText('No sessions scheduled yet.')).toBeInTheDocument();
  });

  it('should call onSessionClick when session is clicked', () => {
    const mockOnClick = jest.fn();
    render(<SessionTimeline sessions={mockSessions} onSessionClick={mockOnClick} />);

    const sessionElement = screen.getByText('NxN Fundamentals').closest('[role="listitem"]');
    if (sessionElement) {
      fireEvent.click(sessionElement);
    }

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should display session time when provided', () => {
    render(<SessionTimeline sessions={mockSessions} />);

    expect(screen.getByText(/at 2:00 PM/)).toBeInTheDocument();
    expect(screen.getByText(/at 10:00 AM/)).toBeInTheDocument();
  });

  it('should display all session list items', () => {
    render(<SessionTimeline sessions={mockSessions} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);
  });
});
