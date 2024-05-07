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
      { id: '3', name: 'Item 3', packed: true },
      { id: '4', name: 'Item 4', packed: false },
    ],
  },
};

describe('List component', () => {
  test('renders section name correctly when items are shown', () => {
    const { getByText, getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List listName="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    expect(getByText('NAME')).toBeInTheDocument();
    expect(getByTitle(/Hide/)).toBeInTheDocument();
  });

  test('renders section name correctly when items are hidden', () => {
    const { getByText, getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List listName="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByTitle(/Hide/));
    expect(getByText('NAME')).toBeInTheDocument();
    expect(getByTitle(/Show/)).toBeInTheDocument();
  });

  test('calls hideItems when collapse button is clicked', () => {
    const { getByTitle, getByLabelText } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List listName="listName" packed={true} />
      </ItemsContext.Provider>,
    );
    const item1 = getByLabelText('label-item-1');
    fireEvent.click(getByTitle(/Hide/));
    expect(item1).not.toBeInTheDocument();
  });

  test('calls resetList when reset button is clicked', () => {
    const { getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List listName="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByTitle('Reset list'));
    fireEvent.click(getByTitle('Confirm modal action'));
    expect(mockContextValueWithLists.resetList).toHaveBeenCalledWith('listName');
  });

  test('calls hideList when close button is clicked and its not listAdditionals', () => {
    const { getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List listName="listName" packed={true} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByTitle('Close list'));
    expect(mockContextValueWithLists.hideList).toHaveBeenCalledWith('listName');
  });

  test('calls removeList when close button is clicked and it is listAdditionals', () => {
    const { getByTitle } = render(
      <ItemsContext.Provider value={mockContextValueWithLists}>
        <List listName="listAdditionals" packed={true} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByTitle('Close list'));
    fireEvent.click(getByTitle('Confirm modal action'));
    expect(mockContextValueWithLists.removeList).toHaveBeenCalledWith('listAdditionals');
  });
});
