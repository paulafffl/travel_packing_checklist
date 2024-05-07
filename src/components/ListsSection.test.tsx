import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';
import ListsSection from './ListsSection';

const mockContextValueWithLists = {
  ...mockContextValue,
  listsObj: {
    listSnacks: [{ id: '1', name: 'Item 1', packed: true }],
    listDevices: [{ id: '2', name: 'Item 2', packed: false }],
  },
  listsShown: ['listSnacks', 'listDevices'],
};

test('counts items correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <ListsSection title="Packed Items" totalItems={10} />
    </ItemsContext.Provider>,
  );

  expect(screen.getByText('(1 out of 10)')).toBeInTheDocument();
});

test('button "Pack all items" correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <ListsSection title="Unpacked Items" totalItems={10} />
    </ItemsContext.Provider>,
  );

  const packButton = screen.getByText('Pack all items');
  fireEvent.click(packButton);

  expect(mockContextValue.packAllItems).toHaveBeenCalledTimes(1);
});

test('button "Unpack all items" correctly', () => {
  render(
    <ItemsContext.Provider value={mockContextValueWithLists}>
      <ListsSection title="Packed Items" totalItems={10} />
    </ItemsContext.Provider>,
  );

  const unpackButton = screen.getByText('Unpack all items');
  fireEvent.click(unpackButton);

  expect(mockContextValue.unpackAllItems).toHaveBeenCalledTimes(1);
});
