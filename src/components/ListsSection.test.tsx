import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';
import ListsSection from './ListsSection';

const mockContextValueWithLists = {
  ...mockContextValue,
  listsObj: {
    listFood: [{ id: '1', name: 'Item 1', packed: true }],
    listTech: [{ id: '2', name: 'Item 2', packed: false }],
  },
  listsShown: ['listFood', 'listTech'],
};

test('counts items correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <ListsSection title="Packed Items" />
    </ItemsContext.Provider>,
  );

  expect(screen.getByText('( 1 out of 2 )')).toBeInTheDocument();
});

test('button "Pack all items" correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <ListsSection title="Unpacked Items" />
    </ItemsContext.Provider>,
  );

  const packButton = screen.getByText('Pack all items');
  fireEvent.click(packButton);

  expect(mockContextValue.packAllItemsAsObj).toHaveBeenCalledTimes(1);
});

test('button "Unpack all items" correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <ListsSection title="Packed Items" />
    </ItemsContext.Provider>,
  );

  const unpackButton = screen.getByText('Unpack all items');
  fireEvent.click(unpackButton);

  expect(mockContextValue.unpackAllItemsAsObj).toHaveBeenCalledTimes(1);
});
