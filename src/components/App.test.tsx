import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ItemsContext } from '../context'; // Assuming this is the correct path to your context

const mockContextValue = {
  listsObj: {},
  listIsShown: jest.fn(),
  showList: jest.fn(),
  hideList: jest.fn(),
  packedItemsAsObj: jest.fn(),
  unpackedItemsAsObj: jest.fn(),
  addItemAsObj: jest.fn(),
  addListAsObj: jest.fn(),
  removeItemAsObj: jest.fn(),
  removeListAsObj: jest.fn(),
  addedListAsObj: jest.fn(),
  updateAsObj: jest.fn(),
  packAllItemsAsObj: jest.fn(),
  unpackAllItemsAsObj: jest.fn(),
};

test('renders page title', () => {
  render(
    <ItemsContext.Provider value={mockContextValue}>
      <App />
    </ItemsContext.Provider>,
  );
  const headerElement = screen.getByText(/travel packing/i);
  expect(headerElement).toBeInTheDocument();
});
