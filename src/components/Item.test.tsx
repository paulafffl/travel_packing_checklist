import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Item from './Item';
import { mockContextValue } from '../setupTests';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('Item component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (React.useContext as jest.Mock).mockReturnValue(mockContextValue);
  });

  test('renders item correctly', () => {
    const item = { id: '1', name: 'Test Item', packed: false };
    const { getByRole, getByText } = render(<Item item={item} listName="listName" />);

    expect(getByText(item.name)).toBeInTheDocument();
    expect(getByRole('checkbox', { name: item.name })).toBeInTheDocument();
  });

  test('handles checkbox change', async () => {
    const item = { id: '1', name: 'Test Item', packed: false };
    const { getByRole } = render(<Item item={item} listName="listName" />);

    fireEvent.click(getByRole('checkbox', { name: item.name }));

    await waitFor(() => {
      expect(mockContextValue.changeItem).toHaveBeenCalledWith(item.id, { packed: true });
    });
  });

  test('renders input change', () => {
    const item = { id: '1', name: 'Test Item', packed: false };
    const { getByDisplayValue } = render(<Item item={item} listName="listName" />);
    const inputElement = getByDisplayValue(item.name);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(item.name);

    fireEvent.change(inputElement, { target: { value: 'New Item Name' } });

    expect(mockContextValue.changeItem).toHaveBeenCalledWith(item.id, { name: 'New Item Name' });
  });

  test('handles item removal', () => {
    const item = { id: '1', name: 'Test Item', packed: false };
    const { getByLabelText } = render(<Item item={item} listName="listName" />);

    fireEvent.click(getByLabelText(`Delete "${item.name}"`));

    expect(mockContextValue.removeItem).toHaveBeenCalledWith(item.id, 'listName');
  });
});
