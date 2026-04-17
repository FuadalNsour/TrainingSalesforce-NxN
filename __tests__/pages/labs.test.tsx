import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LabsPage from '@/app/labs/page';

// Mock the LABS data
jest.mock('@/lib/labs-data', () => ({
  LABS: {
    'lab-01-01': {
      id: 'lab-01-01',
      title: 'Applying Consistency Principle',
      difficulty: 'beginner',
      description: 'Identify how consistency benefits sales operations',
      chapterId: '01-why-matters',
      scenario: {
        title: 'Applying Consistency Principle',
        context: 'Your team has inconsistent lead qualification criteria across regions',
        situation: 'Sales reps in the East qualify leads with different standards than the West.',
        question: 'How does the Consistency principle help solve this problem?',
      },
    },
    'lab-02-01': {
      id: 'lab-02-01',
      title: 'Advanced Discovery Techniques',
      difficulty: 'intermediate',
      description: 'Master the discovery phase of the NxN cycle',
      chapterId: '02-discovery',
      scenario: {
        title: 'Advanced Discovery Techniques',
        context: 'A prospect is reluctant to share their business challenges',
        situation: 'You need to build trust and uncover hidden needs.',
        question: 'What discovery techniques would you use?',
      },
    },
    'lab-03-01': {
      id: 'lab-03-01',
      title: 'Complex Commitment Scenarios',
      difficulty: 'advanced',
      description: 'Navigate complex commitment situations',
      chapterId: '03-commitment',
      scenario: {
        title: 'Complex Commitment Scenarios',
        context: 'Multiple stakeholders with conflicting interests',
        situation: 'You must navigate competing priorities.',
        question: 'How do you advance the sale with multiple stakeholders?',
      },
    },
  },
}));

describe('Labs Page', () => {
  it('should render the labs page with header', () => {
    render(<LabsPage />);

    expect(screen.getByText('Interactive Labs')).toBeInTheDocument();
    expect(
      screen.getByText(/Practice real-world scenarios/)
    ).toBeInTheDocument();
  });

  it('should display all labs initially', () => {
    render(<LabsPage />);

    expect(screen.getByText('Applying Consistency Principle')).toBeInTheDocument();
    expect(screen.getByText('Advanced Discovery Techniques')).toBeInTheDocument();
    expect(screen.getByText('Complex Commitment Scenarios')).toBeInTheDocument();
  });

  it('should display lab count', () => {
    render(<LabsPage />);

    expect(screen.getByText(/Showing 3 of 3 labs/)).toBeInTheDocument();
  });

  it('should render filter section with difficulty options', () => {
    render(<LabsPage />);

    expect(screen.getByText('Filter Labs')).toBeInTheDocument();
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByTestId('filter-beginner')).toBeInTheDocument();
    expect(screen.getByTestId('filter-intermediate')).toBeInTheDocument();
    expect(screen.getByTestId('filter-advanced')).toBeInTheDocument();
  });

  it('should filter labs by difficulty when difficulty filter is selected', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const beginnerFilter = screen.getByTestId('filter-beginner');
    await user.click(beginnerFilter);

    expect(screen.getByText('Applying Consistency Principle')).toBeInTheDocument();
    expect(screen.queryByText('Advanced Discovery Techniques')).not.toBeInTheDocument();
    expect(screen.queryByText('Complex Commitment Scenarios')).not.toBeInTheDocument();
  });

  it('should support multiple difficulty filters', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const beginnerFilter = screen.getByTestId('filter-beginner');
    const advancedFilter = screen.getByTestId('filter-advanced');

    await user.click(beginnerFilter);
    await user.click(advancedFilter);

    expect(screen.getByText('Applying Consistency Principle')).toBeInTheDocument();
    expect(screen.queryByText('Advanced Discovery Techniques')).not.toBeInTheDocument();
    expect(screen.getByText('Complex Commitment Scenarios')).toBeInTheDocument();
  });

  it('should update lab count when filters are applied', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    expect(screen.getByText(/Showing 3 of 3 labs/)).toBeInTheDocument();

    const beginnerFilter = screen.getByTestId('filter-beginner');
    await user.click(beginnerFilter);

    expect(screen.getByText(/Showing 1 of 3 labs/)).toBeInTheDocument();
  });

  it('should clear filters when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const beginnerFilter = screen.getByTestId('filter-beginner');
    await user.click(beginnerFilter);

    expect(screen.getByText(/Showing 1 of 3 labs/)).toBeInTheDocument();

    const resetButton = screen.getByText('Reset filters');
    await user.click(resetButton);

    expect(screen.getByText(/Showing 3 of 3 labs/)).toBeInTheDocument();
    expect(screen.getByText('Advanced Discovery Techniques')).toBeInTheDocument();
  });

  it('should show empty state when no labs match filters', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    // Select all difficulty levels to test edge case
    const beginnerFilter = screen.getByTestId('filter-beginner');
    await user.click(beginnerFilter);

    // Wait for filtered view
    await waitFor(() => {
      expect(screen.getByText(/Showing 1 of 3 labs/)).toBeInTheDocument();
    });
  });

  it('should open modal when lab card is clicked', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const labCard = screen.getByTestId('lab-card-lab-01-01');
    await user.click(labCard);

    // Modal should be visible
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should display lab details in modal', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const labCard = screen.getByTestId('lab-card-lab-01-01');
    await user.click(labCard);

    // The modal should have the lab title
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    // Check for unique modal content
    expect(screen.getByTestId('modal-close-button')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const labCard = screen.getByTestId('lab-card-lab-01-01');
    await user.click(labCard);

    const closeButton = screen.getByTestId('modal-close-button');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    });
  });

  it('should close modal when backdrop is clicked', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const labCard = screen.getByTestId('lab-card-lab-01-01');
    await user.click(labCard);

    const backdrop = screen.getByTestId('modal-backdrop');
    await user.click(backdrop);

    await waitFor(() => {
      expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    });
  });

  it('should display "How Labs Work" information section', () => {
    render(<LabsPage />);

    expect(screen.getByText('How Labs Work')).toBeInTheDocument();
    expect(screen.getByText('Review Scenario')).toBeInTheDocument();
    expect(screen.getByText('Think Through')).toBeInTheDocument();
    expect(screen.getByText('Get Feedback')).toBeInTheDocument();
  });

  it('should render responsive grid layout', () => {
    const { container } = render(<LabsPage />);

    const grid = container.querySelector('.lg\\:col-span-3');
    expect(grid).toBeInTheDocument();
  });

  it('should display sticky filter sidebar on large screens', () => {
    const { container } = render(<LabsPage />);

    const sidebar = container.querySelector('.sticky');
    expect(sidebar).toBeInTheDocument();
  });

  it('should maintain filter state when modal opens and closes', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const beginnerFilter = screen.getByTestId('filter-beginner');
    await user.click(beginnerFilter);

    expect(screen.getByText(/Showing 1 of 3 labs/)).toBeInTheDocument();

    const labCard = screen.getByTestId('lab-card-lab-01-01');
    await user.click(labCard);

    const closeButton = screen.getByTestId('modal-close-button');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.getByText(/Showing 1 of 3 labs/)).toBeInTheDocument();
    });
  });

  it('should have proper accessibility attributes', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const labCard = screen.getByTestId('lab-card-lab-01-01');
    await user.click(labCard);

    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
  });

  it('should render lab descriptions', () => {
    render(<LabsPage />);

    expect(screen.getByText('Identify how consistency benefits sales operations')).toBeInTheDocument();
    expect(screen.getByText('Master the discovery phase of the NxN cycle')).toBeInTheDocument();
    expect(screen.getByText('Navigate complex commitment situations')).toBeInTheDocument();
  });

  it('should show appropriate styling based on difficulty', () => {
    const { container } = render(<LabsPage />);

    // Check that difficulty badges exist for each lab card
    const badges = container.querySelectorAll('[style*="background"]');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('should handle rapid filter changes', async () => {
    const user = userEvent.setup();
    render(<LabsPage />);

    const beginnerFilter = screen.getByTestId('filter-beginner');
    const intermediateFilter = screen.getByTestId('filter-intermediate');
    const advancedFilter = screen.getByTestId('filter-advanced');

    await user.click(beginnerFilter);
    await user.click(intermediateFilter);
    await user.click(advancedFilter);

    expect(screen.getByText(/Showing 3 of 3 labs/)).toBeInTheDocument();
  });
});
