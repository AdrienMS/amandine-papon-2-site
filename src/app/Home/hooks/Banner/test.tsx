import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from './banner';

test('renders learn react link', () => {
  render(<Banner />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
