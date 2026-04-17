import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabModal } from '@/components/labs/LabModal';

describe('LabModal Component', () => {
  const mockLab = {
    id: 'lab-1',
    title: 'Test Lab',
    description: 'Lab description',
    difficulty: 'beginner' as const,
    duration: 30,
    rating: 4,
    topics: ['Discovery', 'Sales'],
    fullDescription: 'This is the full description of the lab.',
    instructions: [
      'Step 1: Read the scenario',
      'Step 2: Think through the problem',
      'Step 3: Provide your answer',
    ],
    requirements: [
      'Understanding of NxN framework',
      'Sales experience',
    ],
    resources: [
      { title: 'NxN Guide', url: 'https://example.com/guide' },
      { title: 'Sales Framework', url: 'https://example.com/framework' },
    ],
  };

  it('should not render when isOpen is false', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <LabModal isOpen={false} lab={mockLab} onClose={mockOnClose} />
    );

    expect(screen.queryByText('Test Lab')).not.toBeInTheDocument();
  });

  it('should render lab title when isOpen is true', () => {
    const mockOnClose = jest.fn();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    expect(screen.getByText('Test Lab')).toBeInTheDocument();
  });

  it('should render lab difficulty badge with correct color', () => {
    const mockOnClose = jest.fn();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    const badge = screen.getByText('Beginner');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: '#16A34A' });
  });

  it('should display duration and rating information', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    expect(screen.getByText(/30 minutes/)).toBeInTheDocument();
    const stars = container.querySelectorAll('.text-yellow-500');
    expect(stars.length).toBe(5);
  });

  it('should render full description', () => {
    const mockOnClose = jest.fn();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    expect(screen.getByText('This is the full description of the lab.')).toBeInTheDocument();
  });

  it('should render topics section with all topics', () => {
    const mockOnClose = jest.fn();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
  });

  it('should render instructions section with numbered steps', () => {
    const mockOnClose = jest.fn();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Step 1: Read the scenario')).toBeInTheDocument();
    expect(screen.getByText('Step 2: Think through the problem')).toBeInTheDocument();
    expect(screen.getByText('Step 3: Provide your answer')).toBeInTheDocument();
  });

  it('should render requirements section', () => {
    const mockOnClose = jest.fn();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    expect(screen.getByText('Requirements')).toBeInTheDocument();
    expect(screen.getByText('Understanding of NxN framework')).toBeInTheDocument();
    expect(screen.getByText('Sales experience')).toBeInTheDocument();
  });

  it('should render resources section with links', () => {
    const mockOnClose = jest.fn();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    expect(screen.getByText('Resources')).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/guide');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/framework');
  });

  it('should call onClose when close button is clicked', async () => {
    const mockOnClose = jest.fn();
    const user = userEvent.setup();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    const closeButton = screen.getByTestId('modal-close-button');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onClose when backdrop is clicked', async () => {
    const mockOnClose = jest.fn();
    const user = userEvent.setup();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    const backdrop = screen.getByTestId('modal-backdrop');
    await user.click(backdrop);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not call onClose when modal content is clicked', async () => {
    const mockOnClose = jest.fn();
    const user = userEvent.setup();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    const modalContent = screen.getByTestId('modal-content');
    await user.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should close modal when Escape key is pressed', async () => {
    const mockOnClose = jest.fn();
    render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should prevent scroll when modal is open', () => {
    const mockOnClose = jest.fn();
    const originalOverflow = document.body.style.overflow;

    const { rerender } = render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <LabModal isOpen={false} lab={mockLab} onClose={mockOnClose} />
    );

    expect(document.body.style.overflow).toBe('unset');
    document.body.style.overflow = originalOverflow;
  });

  it('should handle lab without optional fields', () => {
    const mockOnClose = jest.fn();
    const minimalLab = {
      id: 'lab-min',
      title: 'Minimal Lab',
      description: 'Description only',
      difficulty: 'intermediate' as const,
      duration: 45,
    };

    render(
      <LabModal isOpen={true} lab={minimalLab} onClose={mockOnClose} />
    );

    expect(screen.getByText('Minimal Lab')).toBeInTheDocument();
    expect(screen.queryByText('Topics')).not.toBeInTheDocument();
    expect(screen.queryByText('Instructions')).not.toBeInTheDocument();
    expect(screen.queryByText('Requirements')).not.toBeInTheDocument();
    expect(screen.queryByText('Resources')).not.toBeInTheDocument();
  });

  it('should render correct difficulty colors for all difficulties', () => {
    const mockOnClose = jest.fn();

    const difficulties = [
      { difficulty: 'beginner' as const, expectedColor: '#16A34A' },
      { difficulty: 'intermediate' as const, expectedColor: '#0369A1' },
      { difficulty: 'advanced' as const, expectedColor: '#DC2626' },
    ];

    difficulties.forEach(({ difficulty, expectedColor }) => {
      const { unmount } = render(
        <LabModal
          isOpen={true}
          lab={{ ...mockLab, difficulty }}
          onClose={mockOnClose}
        />
      );

      const badge = screen.getByText(
        difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
      );
      expect(badge).toHaveStyle({ backgroundColor: expectedColor });

      unmount();
    });
  });

  it('should render with proper modal layout structure', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <LabModal isOpen={true} lab={mockLab} onClose={mockOnClose} />
    );

    const backdrop = screen.getByTestId('modal-backdrop');
    const modalContent = screen.getByTestId('modal-content');

    expect(backdrop).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
  });

  it('should return null when lab is null and isOpen is true', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <LabModal isOpen={true} lab={null} onClose={mockOnClose} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render resources without urls as text', () => {
    const mockOnClose = jest.fn();
    const labWithTextResources = {
      ...mockLab,
      resources: [
        { title: 'Internal Resource' },
        { title: 'External Resource', url: 'https://example.com' },
      ],
    };

    render(
      <LabModal isOpen={true} lab={labWithTextResources} onClose={mockOnClose} />
    );

    expect(screen.getByText('Internal Resource')).toBeInTheDocument();
    const externalLink = screen.getByText(/External Resource/);
    expect(externalLink).toBeInTheDocument();
    expect(externalLink.tagName).toBe('A');
  });
});
