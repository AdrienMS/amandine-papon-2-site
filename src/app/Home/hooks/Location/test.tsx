import React from 'react';
import { render, screen } from '@testing-library/react';
import Location from './location';

test('renders learn react link', () => {
  render(<Location />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
