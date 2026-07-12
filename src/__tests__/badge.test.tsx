import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('renders badge text correctly', () => {
    render(<Badge>New Component</Badge>);
    expect(screen.getByText('New Component')).toBeInTheDocument();
  });

  it('applies standard styles by default', () => {
    render(<Badge>Default Badge</Badge>);
    const badgeElement = screen.getByText('Default Badge');
    expect(badgeElement).toHaveClass('bg-fuchsia-600');
  });
});
