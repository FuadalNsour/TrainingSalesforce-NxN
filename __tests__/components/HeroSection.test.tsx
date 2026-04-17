import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/home/HeroSection';

describe('HeroSection', () => {
  const props = {
    title: 'Master Commercial Training',
    description: 'Learn the NxN framework',
    primaryCta: { label: 'Start Learning', href: '/chapters' },
  };

  it('renders hero with title and description', () => {
    render(<HeroSection {...props} />);
    expect(screen.getByText('Master Commercial Training')).toBeInTheDocument();
    expect(screen.getByText('Learn the NxN framework')).toBeInTheDocument();
  });

  it('renders primary CTA button', () => {
    render(<HeroSection {...props} />);
    expect(screen.getByText('Start Learning')).toBeInTheDocument();
  });

  it('renders secondary and tertiary CTAs when provided', () => {
    render(
      <HeroSection
        {...props}
        secondaryCta={{ label: 'Browse Labs', href: '/labs' }}
        tertiaryCta={{ label: 'Learn More', href: '/lifecycle' }}
      />
    );
    expect(screen.getByText('Browse Labs')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders NxN badge', () => {
    render(<HeroSection {...props} />);
    expect(screen.getByText('NxN Commercial Training')).toBeInTheDocument();
  });
});
