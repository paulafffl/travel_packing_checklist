import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddItem from './AddItem';
import { ItemsContext } from '../context';

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

describe('AddItem component', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddItem />
      </ItemsContext.Provider>,
    );

    // Ensure that the input and submit button are rendered
    expect(getByPlaceholderText('Type new item here')).toBeInTheDocument();
    expect(getByLabelText(/Add Item/)).toBeInTheDocument();
  });

  test('updates input value correctly', () => {
    const { getByPlaceholderText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddItem />
      </ItemsContext.Provider>,
    );

    const input = getByPlaceholderText('Type new item here');

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: 'Test item' } });

    // Ensure that the input value is updated correctly
    expect(input).toHaveValue('Test item');
  });

  test('invokes addItemAsObj when form is submitted with new item', async () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddItem />
      </ItemsContext.Provider>,
    );

    const input = getByPlaceholderText('Type new item here');
    const submitButton = getByLabelText(/Add Item/);

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: 'Test item' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Ensure that addItemAsObj is called with the correct argument
    await waitFor(() => {
      expect(mockContextValue.addItemAsObj).toHaveBeenCalledWith('Test item');
    });
  });
});
