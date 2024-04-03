import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';
import List from './List';

const mockContextValueWithLists = {
  ...mockContextValue,
  listsObj: {
    listName: [
      { id: '1', name: 'Item 1', packed: true },
      { id: '2', name: 'Item 2', packed: false },
    ],
    listAdditionals: [
      { id: '1', name: 'Item 1', packed: true },
      { id: '2', name: 'Item 2', packed: false },
    ],
  },
};

const mockContextValueWithListShown = {
  ...mockContextValueWithLists,
  listsWithItemsShown: ['listName', 'listAdditionals'],
};

describe('List component', () => {
  test('renders section name correctly when items are shown', () => {
    const { getByText, getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithListShown}>
        <List list="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    expect(getByText('NAME')).toBeInTheDocument();
    expect(getByTitle('Hide items')).toBeInTheDocument();
  });

  test('renders section name correctly when items are hidden', () => {
    const { getByText, getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List list="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    expect(getByText('NAME')).toBeInTheDocument();
    expect(getByTitle('Show items')).toBeInTheDocument();
  });

  test('calls hideListItems when collapse button is clicked', () => {
    const { getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithListShown}>
        <List list="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByTitle('Hide items'));
    expect(mockContextValueWithLists.hideListItems).toHaveBeenCalledWith('listName');
  });

  test('calls resetListAsObj when reset button is clicked', () => {
    const { getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List list="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByTitle('Reset list'));
    fireEvent.click(getByTitle('Confirm modal action'));
    expect(mockContextValueWithLists.resetListAsObj).toHaveBeenCalledWith('listName');
  });

  test('calls hideList when close button is clicked and its not listAdditionals', () => {
    const { getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List list="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByTitle('Close list'));
    expect(mockContextValueWithLists.hideList).toHaveBeenCalledWith('listName');
  });

  test('calls removeListAsObj when close button is clicked and it is listAdditionals', () => {
    const { getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List list="listAdditionals" packed={true} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByTitle('Close list'));
    fireEvent.click(getByTitle('Confirm modal action'));
    expect(mockContextValueWithLists.removeListAsObj).toHaveBeenCalledWith('listAdditionals');
  });
});
