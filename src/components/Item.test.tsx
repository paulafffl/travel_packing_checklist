import React from 'react';
import { render, fireEvent, waitFor, getByRole } from '@testing-library/react';
import Item from './Item';

// Mock the useContext hook and the ItemsContext
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

const mockContextValue = {
  listIsShown: jest.fn(),
  showList: jest.fn(),
  hideList: jest.fn(),
  updateAsObj: jest.fn(),
  removeItemAsObj: jest.fn(),
};

describe('Item component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (React.useContext as jest.Mock).mockReturnValue(mockContextValue); // Type assertion
  });

  test('renders item correctly', () => {
    const item = { id: '1', name: 'Test Item', packed: false };
    const { getByRole, getByText } = render(<Item item={item} />);

    expect(getByText(item.name)).toBeInTheDocument();
    expect(getByRole('checkbox', { name: item.name })).toBeInTheDocument(); // Use getByRole
  });

  test('handles checkbox change', async () => {
    const item = { id: '1', name: 'Test Item', packed: false };
    const { getByRole } = render(<Item item={item} />);

    fireEvent.click(getByRole('checkbox', { name: item.name }));
    await waitFor(() => {
      expect(mockContextValue.updateAsObj).toHaveBeenCalledWith(item.id, { packed: true });
    });
  });

  test('renders input change', () => {
    const item = { id: '1', name: 'Test Item', packed: false };
    const { getByDisplayValue } = render(<Item item={item} />);
    const inputElement = getByDisplayValue(item.name);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(item.name);

    fireEvent.change(inputElement, { target: { value: 'New Item Name' } });
    expect(mockContextValue.updateAsObj).toHaveBeenCalledWith(item.id, { name: 'New Item Name' });
  });

  test('handles item removal', () => {
    const item = { id: '1', name: 'Test Item', packed: false };
    const { getByLabelText } = render(<Item item={item} />);

    fireEvent.click(getByLabelText(`Delete "${item.name}"`));
    expect(mockContextValue.removeItemAsObj).toHaveBeenCalledWith(item.id);
  });
});
