import { render, screen } from '@testing-library/react';
import { GlassButton } from '../GlassButton';

describe('GlassButton', () => {
  it('renders button with text', () => {
    render(<GlassButton>Click Me</GlassButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders primary variant by default', () => {
    const { container } = render(<GlassButton>Primary</GlassButton>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-[#0369A1]');
  });

  it('renders secondary variant', () => {
    const { container } = render(<GlassButton variant="secondary">Secondary</GlassButton>);
    const button = container.querySelector('button');
    expect(button).toHaveClass('border-2');
  });

  it('is disabled when disabled prop is true', () => {
    render(<GlassButton disabled>Disabled</GlassButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
