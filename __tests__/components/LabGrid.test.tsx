import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabGrid } from '@/components/labs/LabGrid';

describe('LabGrid Component', () => {
  const mockLabs = [
    {
      id: 'lab-1',
      title: 'Lab 1',
      description: 'Description 1',
      difficulty: 'beginner' as const,
      duration: 30,
      topics: ['Discovery'],
      rating: 4,
      href: '/labs/lab-1',
    },
    {
      id: 'lab-2',
      title: 'Lab 2',
      description: 'Description 2',
      difficulty: 'intermediate' as const,
      duration: 45,
      topics: ['Commitment'],
      rating: 5,
      href: '/labs/lab-2',
    },
    {
      id: 'lab-3',
      title: 'Lab 3',
      description: 'Description 3',
      difficulty: 'advanced' as const,
      duration: 60,
      topics: ['Advanced'],
      rating: 3,
      href: '/labs/lab-3',
    },
  ];

  it('should render all labs in the grid', () => {
    const mockOnCardClick = jest.fn();
    render(
      <LabGrid labs={mockLabs} onCardClick={mockOnCardClick} />
    );

    expect(screen.getByText('Lab 1')).toBeInTheDocument();
    expect(screen.getByText('Lab 2')).toBeInTheDocument();
    expect(screen.getByText('Lab 3')).toBeInTheDocument();
  });

  it('should display lab descriptions', () => {
    const mockOnCardClick = jest.fn();
    render(
      <LabGrid labs={mockLabs} onCardClick={mockOnCardClick} />
    );

    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('Description 3')).toBeInTheDocument();
  });

  it('should display duration for each lab', () => {
    const mockOnCardClick = jest.fn();
    render(
      <LabGrid labs={mockLabs} onCardClick={mockOnCardClick} />
    );

    expect(screen.getByText(/30 min/)).toBeInTheDocument();
    expect(screen.getByText(/45 min/)).toBeInTheDocument();
    expect(screen.getByText(/60 min/)).toBeInTheDocument();
  });

  it('should render the correct number of grid columns', () => {
    const mockOnCardClick = jest.fn();
    const { container } = render(
      <LabGrid labs={mockLabs} onCardClick={mockOnCardClick} />
    );

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('should call onCardClick when a lab card is clicked', async () => {
    const mockOnCardClick = jest.fn();
    const user = userEvent.setup();
    render(
      <LabGrid labs={mockLabs} onCardClick={mockOnCardClick} />
    );

    const labCard = screen.getByTestId('lab-card-lab-1');
    await user.click(labCard);

    expect(mockOnCardClick).toHaveBeenCalledWith(mockLabs[0]);
  });

  it('should display empty state when no labs provided', () => {
    const mockOnCardClick = jest.fn();
    render(
      <LabGrid labs={[]} onCardClick={mockOnCardClick} />
    );

    expect(
      screen.getByText(/No labs match your filters/)
    ).toBeInTheDocument();
  });

  it('should show loading skeleton when isLoading is true', () => {
    const mockOnCardClick = jest.fn();
    const { container } = render(
      <LabGrid labs={[]} onCardClick={mockOnCardClick} isLoading={true} />
    );

    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(6);
  });

  it('should have data-testid attributes for each lab card', () => {
    const mockOnCardClick = jest.fn();
    render(
      <LabGrid labs={mockLabs} onCardClick={mockOnCardClick} />
    );

    mockLabs.forEach((lab) => {
      expect(screen.getByTestId(`lab-card-${lab.id}`)).toBeInTheDocument();
    });
  });

  it('should accept custom className prop', () => {
    const mockOnCardClick = jest.fn();
    const { container } = render(
      <LabGrid
        labs={mockLabs}
        onCardClick={mockOnCardClick}
        className="custom-class"
      />
    );

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('custom-class');
  });

  it('should not call onCardClick if callback not provided', async () => {
    const user = userEvent.setup();
    render(
      <LabGrid labs={mockLabs} />
    );

    const labCard = screen.getByTestId('lab-card-lab-1');
    await user.click(labCard);

    // Should not throw error
    expect(labCard).toBeInTheDocument();
  });

  it('should update grid when labs array changes', () => {
    const mockOnCardClick = jest.fn();
    const { rerender } = render(
      <LabGrid labs={mockLabs} onCardClick={mockOnCardClick} />
    );

    expect(screen.getByText('Lab 1')).toBeInTheDocument();

    const newLabs = [mockLabs[0]];
    rerender(
      <LabGrid labs={newLabs} onCardClick={mockOnCardClick} />
    );

    expect(screen.getByText('Lab 1')).toBeInTheDocument();
    expect(screen.queryByText('Lab 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Lab 3')).not.toBeInTheDocument();
  });

  it('should display proper gap between cards', () => {
    const mockOnCardClick = jest.fn();
    const { container } = render(
      <LabGrid labs={mockLabs} onCardClick={mockOnCardClick} />
    );

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('gap-6');
  });
});
