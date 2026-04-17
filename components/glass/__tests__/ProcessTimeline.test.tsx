import { render, screen } from '@testing-library/react';
import { ProcessTimeline } from '../ProcessTimeline';

describe('ProcessTimeline', () => {
  const stages = [
    { id: '1', label: 'Discovery', description: 'Find opportunities' },
    { id: '2', label: 'Qualification', description: 'Assess fit' },
    { id: '3', label: 'Commitment', description: 'Advance sale' },
  ];

  it('renders all stages', () => {
    render(<ProcessTimeline stages={stages} />);
    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('Qualification')).toBeInTheDocument();
    expect(screen.getByText('Commitment')).toBeInTheDocument();
  });

  it('highlights completed stages', () => {
    const { container } = render(
      <ProcessTimeline stages={stages} currentStage={1} />
    );
    const dots = container.querySelectorAll('div[class*="w-12 h-12"]');
    expect(dots[0]).toHaveClass('bg-[#0369A1]');
    expect(dots[1]).toHaveClass('bg-[#0369A1]');
  });

  it('renders in vertical layout when specified', () => {
    const { container } = render(
      <ProcessTimeline stages={stages} vertical={true} />
    );
    const wrapper = container.querySelector('div[class*="flex-col"]');
    expect(wrapper).toHaveClass('flex-col');
  });
});
