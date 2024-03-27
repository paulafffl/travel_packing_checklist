import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ItemsContext } from '../context';
import AddList from './AddList';

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

describe('AddList component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList list={['item1', 'item2']} name="Test List" listedState={false} />
      </ItemsContext.Provider>,
    );

    // Ensure that the button is rendered with the correct name
    expect(getByText('Test List')).toBeInTheDocument();
  });

  test('invokes addListAsObj when not listed', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList list={['item1', 'item2']} name="Test List" listedState={false} />
      </ItemsContext.Provider>,
    );

    // Click the button
    fireEvent.click(getByText('Test List'));

    // Ensure that addListAsObj is called with the correct arguments
    expect(mockContextValue.addListAsObj).toHaveBeenCalledWith(['item1', 'item2'], 'listName');
  });
});
