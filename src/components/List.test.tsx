import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import List from './List';
import { ItemsContext } from '../context';

const mockContextValue = {
  listsObj: {
    list1: [{ id: '1', name: 'Item 1', packed: true }],
    list2: [{ id: '2', name: 'Item 2', packed: false }],
  },
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

test('counts items correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValue}>
      <List title="Packed Items" />
    </ItemsContext.Provider>,
  );

  expect(screen.getByText('( 1 out of 2 )')).toBeInTheDocument();
});

test('button "Pack all items" correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValue}>
      <List title="Unpacked Items" />
    </ItemsContext.Provider>,
  );

  const packButton = screen.getByText('Pack all items');
  fireEvent.click(packButton);

  expect(mockContextValue.packAllItemsAsObj).toHaveBeenCalledTimes(1);
});

test('button "Unpack all items" correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValue}>
      <List title="Packed Items" />
    </ItemsContext.Provider>,
  );

  const unpackButton = screen.getByText('Unpack all items');
  fireEvent.click(unpackButton);

  expect(mockContextValue.unpackAllItemsAsObj).toHaveBeenCalledTimes(1);
});
