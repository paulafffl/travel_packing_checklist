import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddItem from './AddItem';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';

describe('AddItem component', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddItem />
      </ItemsContext.Provider>,
    );

    expect(getByPlaceholderText('Or create new item here')).toBeInTheDocument();
  });

  test('updates input value correctly', () => {
    const { getByPlaceholderText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddItem />
      </ItemsContext.Provider>,
    );

    const input = getByPlaceholderText('Or create new item here');

    fireEvent.change(input, { target: { value: 'Test item' } });

    expect(input).toHaveValue('Test item');
  });

  test('invokes addItem when form is submitted with new item', async () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddItem />
      </ItemsContext.Provider>,
    );

    const input = getByPlaceholderText('Or create new item here');
    fireEvent.change(input, { target: { value: 'Test item' } });

    const submitButton = getByLabelText(/Add/);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockContextValue.addItem).toHaveBeenCalledWith('Test item');
    });
  });
});
