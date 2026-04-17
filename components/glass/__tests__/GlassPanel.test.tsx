import React from 'react';
import { render } from '@testing-library/react';
import { GlassPanel } from '../GlassPanel';

describe('GlassPanel', () => {
  it('renders with default variant', () => {
    const { container } = render(
      <GlassPanel>Test Content</GlassPanel>
    );
    const panel = container.firstChild;
    expect(panel).toHaveClass('bg-white/15');
  });

  it('renders with elevated variant', () => {
    const { container } = render(
      <GlassPanel variant="elevated">Test</GlassPanel>
    );
    const panel = container.firstChild;
    expect(panel).toHaveClass('bg-white/20');
  });

  it('renders with deep variant', () => {
    const { container } = render(
      <GlassPanel variant="deep">Test</GlassPanel>
    );
    const panel = container.firstChild;
    expect(panel).toHaveClass('bg-white/10');
  });

  it('renders children', () => {
    const { container } = render(
      <GlassPanel>Test Content</GlassPanel>
    );
    expect(container).toHaveTextContent('Test Content');
  });

  it('accepts additional className', () => {
    const { container } = render(
      <GlassPanel className="p-8">Test</GlassPanel>
    );
    const panel = container.firstChild as HTMLElement;
    expect(panel.className).toContain('p-8');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<GlassPanel ref={ref}>Test</GlassPanel>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has correct display name', () => {
    expect(GlassPanel.displayName).toBe('GlassPanel');
  });
});
