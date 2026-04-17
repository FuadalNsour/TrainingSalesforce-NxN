import { render, screen } from '@testing-library/react';
import { CourseInfoSection } from '@/components/home/CourseInfoSection';

describe('CourseInfoSection', () => {
  it('renders course overview section', () => {
    render(<CourseInfoSection totalChapters={3} totalHours={9} />);
    expect(screen.getByText('Course Overview')).toBeInTheDocument();
  });

  it('renders chapter stat label', () => {
    render(<CourseInfoSection totalChapters={3} totalHours={9} />);
    expect(screen.getByText('Chapters')).toBeInTheDocument();
  });

  it('renders learning hours stat label', () => {
    render(<CourseInfoSection totalChapters={3} totalHours={9} />);
    expect(screen.getByText('Learning Hours')).toBeInTheDocument();
  });

  it('renders completion rate stat label', () => {
    render(<CourseInfoSection totalChapters={3} totalHours={9} />);
    expect(screen.getByText('Complete at Your Pace')).toBeInTheDocument();
  });

  it('renders with custom completion rate', () => {
    render(<CourseInfoSection totalChapters={5} totalHours={12} completionRate={50} />);
    expect(screen.getByText('Complete at Your Pace')).toBeInTheDocument();
  });

  it('renders stat panels in grid layout', () => {
    const { container } = render(<CourseInfoSection totalChapters={3} totalHours={9} />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
  });
});
