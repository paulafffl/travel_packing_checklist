import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import List from './ListsSection';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';

const mockContextValueWithLists = {
  ...mockContextValue,
  listsObj: {
    list1: [{ id: '1', name: 'Item 1', packed: true }],
    list2: [{ id: '2', name: 'Item 2', packed: false }],
  },
};

test('counts items correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <List title="Packed Items" />
    </ItemsContext.Provider>,
  );

  expect(screen.getByText('( 1 out of 2 )')).toBeInTheDocument();
});

test('button "Pack all items" correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <List title="Unpacked Items" />
    </ItemsContext.Provider>,
  );

  const packButton = screen.getByText('Pack all items');
  fireEvent.click(packButton);

  expect(mockContextValue.packAllItemsAsObj).toHaveBeenCalledTimes(1);
});

test('button "Unpack all items" correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <List title="Packed Items" />
    </ItemsContext.Provider>,
  );

  const unpackButton = screen.getByText('Unpack all items');
  fireEvent.click(unpackButton);

  expect(mockContextValue.unpackAllItemsAsObj).toHaveBeenCalledTimes(1);
});
