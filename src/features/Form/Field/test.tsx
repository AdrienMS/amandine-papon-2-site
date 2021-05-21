import React from 'react';
import { render, screen } from '@testing-library/react';
import Field from '.';

test('renders learn react link', () => {
  // render(<Field />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
