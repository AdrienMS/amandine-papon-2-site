import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from './contact';

test('renders learn react link', () => {
  render(<Contact />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
