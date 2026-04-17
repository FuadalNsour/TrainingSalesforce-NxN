import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabFilter, type FilterOption } from '@/components/labs/LabFilter';

describe('LabFilter Component', () => {
  const mockFilters: FilterOption[] = [
    { id: 'beginner', label: 'Beginner', category: 'difficulty', count: 8 },
    { id: 'intermediate', label: 'Intermediate', category: 'difficulty', count: 12 },
    { id: 'advanced', label: 'Advanced', category: 'difficulty', count: 5 },
    { id: 'discovery', label: 'Discovery', category: 'topic' },
    { id: 'commitment', label: 'Commitment', category: 'topic' },
  ];

  it('should render filter buttons for all provided filters', () => {
    const mockOnChange = jest.fn();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('Commitment')).toBeInTheDocument();
  });

  it('should group filters by category (difficulty and topic)', () => {
    const mockOnChange = jest.fn();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    const difficultyHeading = screen.getByText('Difficulty');
    const topicHeading = screen.getByText('Topic');

    expect(difficultyHeading).toBeInTheDocument();
    expect(topicHeading).toBeInTheDocument();
  });

  it('should display filter counts when provided', () => {
    const mockOnChange = jest.fn();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    expect(screen.getByText('(8)')).toBeInTheDocument();
    expect(screen.getByText('(12)')).toBeInTheDocument();
    expect(screen.getByText('(5)')).toBeInTheDocument();
  });

  it('should toggle filter selection when clicked', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    const beginnerButton = screen.getByTestId('filter-beginner');

    await user.click(beginnerButton);

    expect(mockOnChange).toHaveBeenCalledWith([
      expect.objectContaining({ id: 'beginner' }),
    ]);
  });

  it('should support multiple filter selection', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    const beginnerButton = screen.getByTestId('filter-beginner');
    const intermediateButton = screen.getByTestId('filter-intermediate');

    await user.click(beginnerButton);
    await user.click(intermediateButton);

    expect(mockOnChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ id: 'beginner' }),
      expect.objectContaining({ id: 'intermediate' }),
    ]);
  });

  it('should deselect filter when clicked again', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    const beginnerButton = screen.getByTestId('filter-beginner');

    await user.click(beginnerButton);
    await user.click(beginnerButton);

    expect(mockOnChange).toHaveBeenLastCalledWith([]);
  });

  it('should show "Clear all filters" button only when filters are selected', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    expect(screen.queryByTestId('clear-filters')).not.toBeInTheDocument();

    const beginnerButton = screen.getByTestId('filter-beginner');
    await user.click(beginnerButton);

    expect(screen.getByTestId('clear-filters')).toBeInTheDocument();
  });

  it('should clear all filters when "Clear all filters" button is clicked', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    const beginnerButton = screen.getByTestId('filter-beginner');
    const intermediateButton = screen.getByTestId('filter-intermediate');

    await user.click(beginnerButton);
    await user.click(intermediateButton);

    const clearButton = screen.getByTestId('clear-filters');
    await user.click(clearButton);

    expect(mockOnChange).toHaveBeenLastCalledWith([]);
  });

  it('should apply active styles to selected filters', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    const beginnerButton = screen.getByTestId('filter-beginner');

    expect(beginnerButton).toHaveClass('bg-white/15');

    await user.click(beginnerButton);

    expect(beginnerButton).toHaveClass('bg-[#0369A1]');
  });

  it('should handle empty filter list gracefully', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <LabFilter filters={[]} onFilterChange={mockOnChange} />
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(screen.queryByText('Difficulty')).not.toBeInTheDocument();
    expect(screen.queryByText('Topic')).not.toBeInTheDocument();
  });

  it('should accept className prop', () => {
    const mockOnChange = jest.fn();
    const { container } = render(
      <LabFilter
        filters={mockFilters}
        onFilterChange={mockOnChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should have proper data-testid attributes on all filter buttons', () => {
    const mockOnChange = jest.fn();
    render(<LabFilter filters={mockFilters} onFilterChange={mockOnChange} />);

    mockFilters.forEach((filter) => {
      expect(screen.getByTestId(`filter-${filter.id}`)).toBeInTheDocument();
    });
  });
});
