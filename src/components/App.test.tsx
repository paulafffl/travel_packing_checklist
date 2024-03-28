import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';

test('renders page title', () => {
  render(
    <ItemsContext.Provider value={mockContextValue}>
      <App />
    </ItemsContext.Provider>,
  );
  const headerElement = screen.getByText(/travel packing/i);
  expect(headerElement).toBeInTheDocument();
});
