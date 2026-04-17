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
