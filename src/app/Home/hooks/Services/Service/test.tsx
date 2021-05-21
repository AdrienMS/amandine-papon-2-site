import React from 'react';
import { render, screen } from '@testing-library/react';
import Service from './service';

test('renders learn react link', () => {
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});