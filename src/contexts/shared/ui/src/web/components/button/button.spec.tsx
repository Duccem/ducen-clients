import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';
describe('Button', () => {
  it('should render', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeTruthy();
  });
});