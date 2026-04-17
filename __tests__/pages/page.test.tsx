import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the content loader
jest.mock('@/lib/content-loader', () => ({
  loadCourseMetadata: jest.fn().mockResolvedValue({
    title: 'NxN Salesforce Commercial Process Training',
    description: 'Learn the complete NxN Salesforce commercial customer lifecycle and process discipline',
    duration: 385,
    audience: ['sales', 'account-manager', 'crm', 'leadership'],
    version: '2.0',
    lastUpdated: '2026-04-13',
    chapters: [
      {
        id: '01-why-matters',
        title: 'Why This Training Matters',
        order: 1,
        duration: 20,
      },
      {
        id: '02-customer-journey',
        title: 'The Full Customer Journey',
        order: 2,
        duration: 25,
      },
      {
        id: '03-roles',
        title: 'Roles in the Process',
        order: 3,
        duration: 15,
      },
    ],
  }),
}));

describe('Home Page', () => {
  it('renders hero section with title', async () => {
    const { container } = render(await Home());
    expect(screen.getByText('Master the NxN Framework')).toBeInTheDocument();
  });

  it('renders learning path section', async () => {
    const { container } = render(await Home());
    expect(screen.getByText('Your Learning Path')).toBeInTheDocument();
  });

  it('renders course info section', async () => {
    const { container } = render(await Home());
    expect(screen.getByText('Course Overview')).toBeInTheDocument();
  });

  it('renders all CTA buttons', async () => {
    const { container } = render(await Home());
    expect(screen.getByText('Start Learning')).toBeInTheDocument();
    expect(screen.getByText('Explore Labs')).toBeInTheDocument();
    expect(screen.getByText('View Timeline')).toBeInTheDocument();
  });

  it('renders hero description', async () => {
    const { container } = render(await Home());
    expect(
      screen.getByText('Learn proven commercial training techniques to accelerate sales success')
    ).toBeInTheDocument();
  });
});
