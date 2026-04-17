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
