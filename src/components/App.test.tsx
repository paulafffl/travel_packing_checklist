import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';

describe('App component', () => {
  test('renders header', () => {
    render(
      <ItemsContext.Provider value={mockContextValue}>
        <App />
      </ItemsContext.Provider>,
    );
    const headerElement = screen.getByText(/travel packing/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders main', () => {
    render(
      <ItemsContext.Provider value={mockContextValue}>
        <App />
      </ItemsContext.Provider>,
    );
    const sectionAddItems = screen.getByText(/^add items$/i);
    expect(sectionAddItems).toBeInTheDocument();

    const sectionPackedItems = screen.getByText(/^packed items$/i);
    expect(sectionPackedItems).toBeInTheDocument();

    const sectionUnpackedItems = screen.getByText(/^unpacked items$/i);
    expect(sectionUnpackedItems).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(
      <ItemsContext.Provider value={mockContextValue}>
        <App />
      </ItemsContext.Provider>,
    );
    const footerCredit = screen.getByText(/^paula lima$/i);
    expect(footerCredit).toBeInTheDocument();
  });
});
