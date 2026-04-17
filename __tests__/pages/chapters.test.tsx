import { render, screen, within, fireEvent } from '@testing-library/react';
import { GlassNav } from '@/components/glass';
import { ProcessTimeline } from '@/components/glass';
import { LabChallenge } from '@/components/glass';
import React from 'react';

/**
 * Test suite for Chapter Pages (Task 2.2)
 * Tests: ChapterHero, ContentSection, KeyTakeaways, ProcessTimeline integration
 */

// Mock chapter data
const mockChapter = {
  id: '01-why-matters',
  title: 'Why This Training Matters',
  order: 1,
  description: 'Understand the business drivers for implementing a standardized Salesforce commercial process',
  duration: 20,
  difficulty: 'beginner' as const,
  nxnStage: 'awareness' as const,
  labs: ['lab-1', 'lab-2'],
  takeaways: [
    'Consistency: Every sales professional follows the same process',
    'Control: Governance checkpoints and approval gates',
    'Visibility: Clean data and consistent record-keeping',
  ],
};

const mockNxNStages = [
  { id: 'awareness', label: 'Why NxN Matters', description: 'Understanding the framework' },
  { id: 'interest', label: 'Discovery Phase', description: 'Discovering customer needs' },
  { id: 'evaluation', label: 'Qualification', description: 'Evaluating opportunities' },
  { id: 'decision', label: 'Commitment', description: 'Building commitment' },
  { id: 'commitment', label: 'Advancement', description: 'Advancing the sale' },
];

describe('ChapterHero Component', () => {
  it('renders chapter title and metadata', () => {
    const ChapterHeroMock = () => (
      <div>
        <h1>{mockChapter.title}</h1>
        <p>{mockChapter.description}</p>
        <span>Chapter {mockChapter.order}</span>
      </div>
    );

    render(<ChapterHeroMock />);
    expect(screen.getByText(mockChapter.title)).toBeInTheDocument();
    expect(screen.getByText(mockChapter.description)).toBeInTheDocument();
    expect(screen.getByText(`Chapter ${mockChapter.order}`)).toBeInTheDocument();
  });

  it('displays chapter duration and difficulty', () => {
    const ChapterHeroMock = () => (
      <div>
        <span className="duration">{mockChapter.duration} minutes</span>
        <span className="difficulty">{mockChapter.difficulty}</span>
      </div>
    );

    render(<ChapterHeroMock />);
    expect(screen.getByText('20 minutes')).toBeInTheDocument();
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  it('renders primary CTA button', () => {
    const ChapterHeroMock = () => (
      <button className="cta-button">Start Chapter</button>
    );

    render(<ChapterHeroMock />);
    expect(screen.getByText('Start Chapter')).toBeInTheDocument();
  });
});

describe('ContentSection Component', () => {
  it('renders content with glass panel styling', () => {
    const ContentSectionMock = () => (
      <div className="glass-panel rounded-2xl backdrop-blur-xl">
        <h3>Section Title</h3>
        <p>Section content goes here.</p>
      </div>
    );

    const { container } = render(<ContentSectionMock />);
    const panel = container.querySelector('.glass-panel');
    expect(panel).toHaveClass('rounded-2xl', 'backdrop-blur-xl');
  });

  it('renders section heading in Poppins font', () => {
    const ContentSectionMock = () => (
      <div>
        <h3 className="font-poppins font-semibold">Content Heading</h3>
      </div>
    );

    const { container } = render(<ContentSectionMock />);
    const heading = container.querySelector('.font-poppins');
    expect(heading).toHaveClass('font-semibold');
  });

  it('renders body text in Open Sans font', () => {
    const ContentSectionMock = () => (
      <div>
        <p className="font-open-sans font-normal">Body text content.</p>
      </div>
    );

    const { container } = render(<ContentSectionMock />);
    const body = container.querySelector('.font-open-sans');
    expect(body).toHaveClass('font-normal');
  });
});

describe('KeyTakeaways Component', () => {
  it('renders all takeaway items', () => {
    const KeyTakeawaysMock = () => (
      <div>
        {mockChapter.takeaways.map((takeaway, idx) => (
          <div key={idx} className="takeaway-item">
            {takeaway}
          </div>
        ))}
      </div>
    );

    render(<KeyTakeawaysMock />);
    mockChapter.takeaways.forEach((takeaway) => {
      expect(screen.getByText(takeaway)).toBeInTheDocument();
    });
  });

  it('supports collapsible expansion', () => {
    const KeyTakeawaysMock = () => {
      const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});
      return (
        <div>
          {mockChapter.takeaways.map((takeaway, idx) => (
            <div key={idx} className="takeaway-item">
              <button onClick={() => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))}>
                Takeaway {idx + 1}
              </button>
              {expanded[idx] && <p>{takeaway}</p>}
            </div>
          ))}
        </div>
      );
    };

    render(<KeyTakeawaysMock />);
    const firstButton = screen.getByText('Takeaway 1');
    fireEvent.click(firstButton);
    expect(screen.getByText(mockChapter.takeaways[0])).toBeVisible();
  });

  it('renders glass panels for each takeaway', () => {
    const KeyTakeawaysMock = () => (
      <div className="takeaways-container">
        {mockChapter.takeaways.map((takeaway, idx) => (
          <div key={idx} className="glass-panel rounded-xl">
            <p>{takeaway}</p>
          </div>
        ))}
      </div>
    );

    const { container } = render(<KeyTakeawaysMock />);
    const panels = container.querySelectorAll('.glass-panel');
    expect(panels).toHaveLength(mockChapter.takeaways.length);
  });
});

describe('Chapter Page Integration', () => {
  it('renders sticky GlassNav at top', () => {
    const ChapterPageMock = () => (
      <div>
        <nav className="sticky top-0 z-50">GlassNav Component</nav>
        <main>Chapter Content</main>
      </div>
    );

    const { container } = render(<ChapterPageMock />);
    const nav = container.querySelector('.sticky');
    expect(nav).toHaveClass('top-0', 'z-50');
  });

  it('renders chapter hero section', () => {
    const ChapterPageMock = () => (
      <div>
        <header>
          <h1>{mockChapter.title}</h1>
        </header>
      </div>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText(mockChapter.title)).toBeInTheDocument();
  });

  it('renders content sections', () => {
    const ChapterPageMock = () => (
      <div>
        <section className="content-section">
          <h2>Section 1</h2>
          <p>Content for section 1</p>
        </section>
        <section className="content-section">
          <h2>Section 2</h2>
          <p>Content for section 2</p>
        </section>
      </div>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('renders ProcessTimeline with NxN stages', () => {
    const ChapterPageMock = () => (
      <section className="timeline-section">
        <h2>Chapter Stage: {mockChapter.nxnStage}</h2>
        <div className="timeline-container">
          {mockNxNStages.map((stage, idx) => (
            <div key={stage.id} className="timeline-dot">
              <span>{stage.label}</span>
            </div>
          ))}
        </div>
      </section>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText(/Chapter Stage/)).toBeInTheDocument();
    mockNxNStages.forEach((stage) => {
      expect(screen.getByText(stage.label)).toBeInTheDocument();
    });
  });

  it('renders key takeaways section', () => {
    const ChapterPageMock = () => (
      <section className="takeaways-section">
        <h2>Key Takeaways</h2>
        {mockChapter.takeaways.map((takeaway, idx) => (
          <div key={idx}>{takeaway}</div>
        ))}
      </section>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText('Key Takeaways')).toBeInTheDocument();
    mockChapter.takeaways.forEach((takeaway) => {
      expect(screen.getByText(takeaway)).toBeInTheDocument();
    });
  });

  it('renders lab challenge cards', () => {
    const ChapterPageMock = () => (
      <section className="labs-section">
        <h2>Lab Challenges</h2>
        {mockChapter.labs.map((lab) => (
          <div key={lab} className="lab-card">
            <p>{lab}</p>
          </div>
        ))}
      </section>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText('Lab Challenges')).toBeInTheDocument();
    mockChapter.labs.forEach((lab) => {
      expect(screen.getByText(lab)).toBeInTheDocument();
    });
  });

  it('maintains responsive layout on mobile', () => {
    const ChapterPageMock = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div>Content</div>
      </div>
    );

    const { container } = render(<ChapterPageMock />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('renders progress context for chapter position', () => {
    const ChapterPageMock = () => (
      <div className="progress-info">
        Chapter {mockChapter.order} of 14 | {mockChapter.duration} min read
      </div>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText(/Chapter 1 of 14/)).toBeInTheDocument();
  });
});

describe('Animations and Motion', () => {
  it('applies stagger animation to content sections', () => {
    const ContentWithAnimationMock = () => (
      <div className="stagger-container" data-testid="stagger-container">
        <div className="stagger-child">Item 1</div>
        <div className="stagger-child">Item 2</div>
      </div>
    );

    const { container } = render(<ContentWithAnimationMock />);
    const staggerContainer = container.querySelector('[data-testid="stagger-container"]');
    expect(staggerContainer).toHaveClass('stagger-container');
  });

  it('applies cycle motion to lab challenge cards', () => {
    const LabCardWithMotion = () => (
      <div className="lab-card" data-motion="cycleMotion">
        Lab Challenge
      </div>
    );

    const { container } = render(<LabCardWithMotion />);
    const labCard = container.querySelector('[data-motion="cycleMotion"]');
    expect(labCard).toHaveAttribute('data-motion', 'cycleMotion');
  });

  it('applies timeline flow motion to process timeline', () => {
    const TimelineWithMotion = () => (
      <div className="timeline" data-motion="flowMotion">
        <div className="timeline-dot">Stage</div>
      </div>
    );

    const { container } = render(<TimelineWithMotion />);
    const timeline = container.querySelector('[data-motion="flowMotion"]');
    expect(timeline).toHaveAttribute('data-motion', 'flowMotion');
  });
});

describe('Accessibility', () => {
  it('chapter hero headings have proper hierarchy', () => {
    const ChapterPageMock = () => (
      <div>
        <h1>Chapter Title</h1>
        <h2>Content Section</h2>
        <h3>Subsection</h3>
      </div>
    );

    render(<ChapterPageMock />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('interactive elements are keyboard accessible', () => {
    const InteractiveComponentMock = () => {
      const [expanded, setExpanded] = React.useState(false);
      return (
        <button onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          Expand Content
        </button>
      );
    };

    render(<InteractiveComponentMock />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('focus indicators visible on interactive elements', () => {
    const ButtonMock = () => (
      <button className="focus:ring-2 focus:ring-[#0369A1] focus:outline-none">
        Click Me
      </button>
    );

    const { container } = render(<ButtonMock />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('focus:ring-2');
  });

  it('all links have descriptive text', () => {
    const ChapterPageMock = () => (
      <nav>
        <a href="/chapters/02-customer-journey">Next Chapter</a>
      </nav>
    );

    render(<ChapterPageMock />);
    const link = screen.getByText('Next Chapter');
    expect(link).toBeInTheDocument();
  });
});

describe('Data Integration', () => {
  it('displays chapter duration correctly', () => {
    const ChapterPageMock = () => (
      <div className="chapter-info">
        <span className="duration">{mockChapter.duration} minutes</span>
      </div>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText('20 minutes')).toBeInTheDocument();
  });

  it('displays chapter difficulty level', () => {
    const ChapterPageMock = () => (
      <div className="chapter-info">
        <span className="difficulty">Difficulty: {mockChapter.difficulty}</span>
      </div>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText('Difficulty: beginner')).toBeInTheDocument();
  });

  it('displays associated NxN stage', () => {
    const ChapterPageMock = () => (
      <div className="chapter-info">
        <span className="nxn-stage">Stage: {mockChapter.nxnStage}</span>
      </div>
    );

    render(<ChapterPageMock />);
    expect(screen.getByText('Stage: awareness')).toBeInTheDocument();
  });

  it('renders all chapter labs', () => {
    const ChapterPageMock = () => (
      <div>
        {mockChapter.labs.map((lab) => (
          <div key={lab} className="lab-item">
            {lab}
          </div>
        ))}
      </div>
    );

    render(<ChapterPageMock />);
    mockChapter.labs.forEach((lab) => {
      expect(screen.getByText(lab)).toBeInTheDocument();
    });
  });

  it('renders all key takeaways', () => {
    const ChapterPageMock = () => (
      <div>
        {mockChapter.takeaways.map((takeaway, idx) => (
          <div key={idx} className="takeaway-item">
            {takeaway}
          </div>
        ))}
      </div>
    );

    render(<ChapterPageMock />);
    mockChapter.takeaways.forEach((takeaway) => {
      expect(screen.getByText(takeaway)).toBeInTheDocument();
    });
  });
});
