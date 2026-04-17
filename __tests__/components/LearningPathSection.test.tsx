import { render, screen } from '@testing-library/react';
import { LearningPathSection } from '@/components/home/LearningPathSection';

describe('LearningPathSection', () => {
  const mockChapters = [
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

  it('renders learning path section with title', () => {
    render(<LearningPathSection chapters={mockChapters} />);
    expect(screen.getByText('Your Learning Path')).toBeInTheDocument();
  });

  it('renders chapter cards', () => {
    render(<LearningPathSection chapters={mockChapters} />);
    expect(screen.getByText('Introduction to NxN')).toBeInTheDocument();
    expect(screen.getByText('Discovery Phase')).toBeInTheDocument();
    expect(screen.getByText('Commitment Building')).toBeInTheDocument();
  });

  it('renders chapter descriptions', () => {
    render(<LearningPathSection chapters={mockChapters} />);
    expect(screen.getByText('Learn the fundamentals of the NxN sales framework')).toBeInTheDocument();
    expect(screen.getByText('Master prospect discovery techniques')).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<LearningPathSection chapters={mockChapters} />);
    expect(
      screen.getByText('Master the NxN framework through structured chapters, each building on the previous.')
    ).toBeInTheDocument();
  });
});
