import React from 'react';
import { render, screen } from '@testing-library/react';
import Companies from './companies';

test('renders learn react link', () => {
  render(<Companies />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
