import { render, screen } from '@testing-library/react';
import { GlassNav } from '../GlassNav';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('GlassNav', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders navigation links', () => {
    const links = [
      { label: 'Home', href: '/' },
      { label: 'Labs', href: '/labs' },
    ];
    render(<GlassNav links={links} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Labs')).toBeInTheDocument();
  });

  it('highlights active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/labs');
    const links = [
      { label: 'Home', href: '/' },
      { label: 'Labs', href: '/labs' },
    ];
    render(<GlassNav links={links} />);
    const labsLink = screen.getByText('Labs');
    expect(labsLink).toHaveClass('text-[#0369A1]');
  });

  it('renders logo when provided', () => {
    render(<GlassNav links={[]} logo={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });
});
