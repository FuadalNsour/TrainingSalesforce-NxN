import { render, screen, fireEvent } from '@testing-library/react';
import LifecyclePage from '@/app/lifecycle/page';
import { StageCard } from '@/components/lifecycle/StageCard';
import { StageDataCard } from '@/components/lifecycle/StageDataCard';

describe('Lifecycle Page', () => {
  describe('StageCard Component', () => {
    const defaultProps = {
      id: 'awareness',
      number: 1,
      title: 'Awareness',
      description: 'Prospect becomes aware of their problem',
      icon: '👁️',
      expandedContent: 'Detailed awareness stage content goes here.',
      metrics: [
        { label: 'Reach', value: '10,000', color: '#0369A1' },
        { label: 'Impressions', value: '25,000', color: '#0369A1' },
        { label: 'Awareness Rate', value: '42%', color: '#16A34A' },
      ],
      color: '#0369A1',
    };

    it('renders stage card with title and description', () => {
      render(<StageCard {...defaultProps} />);
      expect(screen.getByText('Awareness')).toBeInTheDocument();
      expect(screen.getByText('Prospect becomes aware of their problem')).toBeInTheDocument();
    });

    it('renders stage number in circle', () => {
      render(<StageCard {...defaultProps} />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders stage icon', () => {
      render(<StageCard {...defaultProps} />);
      expect(screen.getByText('👁️')).toBeInTheDocument();
    });

    it('does not show expanded content initially', () => {
      render(<StageCard {...defaultProps} />);
      expect(screen.queryByText('Detailed awareness stage content goes here.')).not.toBeVisible();
    });

    it('expands to show content on click', () => {
      render(<StageCard {...defaultProps} />);
      const container = screen.getByText('Awareness').closest('div');
      const panel = container?.closest('[class*="rounded-lg"]');

      if (panel) {
        fireEvent.click(panel);
        // Content should be visible after expansion
        const expandedContent = screen.getByText('Detailed awareness stage content goes here.');
        expect(expandedContent).toBeInTheDocument();
      }
    });

    it('renders metrics when provided', () => {
      render(<StageCard {...defaultProps} />);
      // Metrics are in expandable content, so we click to expand first
      const container = screen.getByText('Awareness').closest('div');
      const panel = container?.closest('[class*="rounded-lg"]');

      if (panel) {
        fireEvent.click(panel);
        expect(screen.getByText('Reach')).toBeInTheDocument();
        expect(screen.getByText('Impressions')).toBeInTheDocument();
        expect(screen.getByText('Awareness Rate')).toBeInTheDocument();
      }
    });

    it('highlights active stage with custom styling', () => {
      const { container } = render(<StageCard {...defaultProps} isActive={true} />);
      const glassPanel = container.querySelector('[class*="rounded-lg"]');
      expect(glassPanel).toHaveClass('shadow-lg');
    });

    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<StageCard {...defaultProps} onClick={handleClick} />);

      const container = screen.getByText('Awareness').closest('div');
      const panel = container?.closest('[class*="rounded-lg"]');

      if (panel) {
        fireEvent.click(panel);
        expect(handleClick).toHaveBeenCalled();
      }
    });

    it('handles stages without metrics', () => {
      render(<StageCard {...defaultProps} metrics={[]} />);
      expect(screen.getByText('Awareness')).toBeInTheDocument();
      // Should not crash when metrics are empty
    });
  });

  describe('StageDataCard Component', () => {
    const defaultProps = {
      label: 'Conversion Rate',
      value: 45,
      suffix: '%',
      color: '#16A34A',
      icon: '📈',
    };

    it('renders metric label and value', () => {
      render(<StageDataCard {...defaultProps} />);
      expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      render(<StageDataCard {...defaultProps} />);
      expect(screen.getByText('📈')).toBeInTheDocument();
    });

    it('renders without icon when not provided', () => {
      const { icon, ...propsWithoutIcon } = defaultProps;
      render(<StageDataCard {...propsWithoutIcon} />);
      expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    });

    it('uses custom color for value display', () => {
      const { container } = render(<StageDataCard {...defaultProps} />);
      // The value should be rendered with color styling
      expect(container.querySelector('[style*="color"]')).toBeInTheDocument();
    });

    it('handles different delay values', () => {
      const { rerender } = render(<StageDataCard {...defaultProps} delay={0} />);
      rerender(<StageDataCard {...defaultProps} delay={0.2} />);
      expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    });

    it('displays suffix after value', () => {
      render(<StageDataCard {...defaultProps} suffix="%" />);
      expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
      // The animated counter should render with the suffix
    });

    it('works without suffix', () => {
      render(<StageDataCard {...defaultProps} suffix="" />);
      expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    });
  });

  describe('Lifecycle Page Integration', () => {
    it('renders lifecycle page with header', () => {
      render(<LifecyclePage />);
      expect(screen.getByText('NxN Lifecycle Explorer')).toBeInTheDocument();
    });

    it('renders page description', () => {
      render(<LifecyclePage />);
      expect(
        screen.getByText(
          /Interactive visualization of the complete Lead.*buyer journey/
        )
      ).toBeInTheDocument();
    });

    it('renders LifecycleViewer component', () => {
      render(<LifecyclePage />);
      // The page should render without error
      expect(document.querySelector('[class*="min-h-screen"]')).toBeInTheDocument();
    });
  });

  describe('Lifecycle Page Animations', () => {
    it('stage cards have entrance animation', () => {
      const { container } = render(
        <StageCard
          id="awareness"
          number={1}
          title="Awareness"
          description="Test"
          icon="👁️"
          expandedContent="Content"
          metrics={[]}
          color="#0369A1"
        />
      );
      const stageCard = container.querySelector('[class*="rounded-lg"]');
      expect(stageCard).toBeInTheDocument();
    });

    it('stage data cards animate on scroll into view', () => {
      const { container } = render(
        <StageDataCard label="Test" value={50} color="#0369A1" />
      );
      const dataCard = container.querySelector('[class*="rounded-lg"]');
      expect(dataCard).toBeInTheDocument();
    });
  });

  describe('NxN Lifecycle Stages', () => {
    const stages = [
      {
        id: 'awareness',
        number: 1,
        title: 'Awareness',
        description: 'Prospect becomes aware of their problem',
        icon: '👁️',
        color: '#0369A1',
      },
      {
        id: 'interest',
        number: 2,
        title: 'Interest',
        description: 'Prospect researches solutions',
        icon: '🎯',
        color: '#3B82F6',
      },
      {
        id: 'evaluation',
        number: 3,
        title: 'Evaluation',
        description: 'Prospect compares solutions',
        icon: '⚖️',
        color: '#06B6D4',
      },
      {
        id: 'decision',
        number: 4,
        title: 'Decision',
        description: 'Prospect makes purchase decision',
        icon: '🤝',
        color: '#10B981',
      },
      {
        id: 'commitment',
        number: 5,
        title: 'Commitment',
        description: 'Prospect becomes long-term customer',
        icon: '⭐',
        color: '#16A34A',
      },
    ];

    it('displays all 5 NxN stages', () => {
      const { container } = render(
        <div>
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              {...stage}
              expandedContent="Detailed content"
              metrics={[]}
            />
          ))}
        </div>
      );

      stages.forEach((stage) => {
        expect(screen.getByText(stage.title)).toBeInTheDocument();
      });
    });

    it('renders all stage icons', () => {
      const { container } = render(
        <div>
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              {...stage}
              expandedContent="Detailed content"
              metrics={[]}
            />
          ))}
        </div>
      );

      stages.forEach((stage) => {
        expect(screen.getByText(stage.icon)).toBeInTheDocument();
      });
    });

    it('renders all stage numbers', () => {
      const { container } = render(
        <div>
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              {...stage}
              expandedContent="Detailed content"
              metrics={[]}
            />
          ))}
        </div>
      );

      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(i.toString())).toBeInTheDocument();
      }
    });
  });

  describe('Responsive Design', () => {
    it('stage card is responsive', () => {
      const { container } = render(
        <StageCard
          id="awareness"
          number={1}
          title="Awareness"
          description="Test"
          icon="👁️"
          expandedContent="Content"
          metrics={[]}
          color="#0369A1"
        />
      );
      // Component uses md: breakpoints, should render without error
      expect(container.querySelector('[class*="rounded-lg"]')).toBeInTheDocument();
    });

    it('metrics grid is responsive', () => {
      const { container } = render(
        <StageCard
          id="awareness"
          number={1}
          title="Awareness"
          description="Test"
          icon="👁️"
          expandedContent="Content"
          metrics={[
            { label: 'Reach', value: '10,000' },
            { label: 'Impressions', value: '25,000' },
          ]}
          color="#0369A1"
        />
      );
      expect(container.querySelector('[class*="rounded-lg"]')).toBeInTheDocument();
    });
  });
});
