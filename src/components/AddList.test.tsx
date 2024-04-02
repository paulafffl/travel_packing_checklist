import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddList from './AddList';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';

const mockContextValueWithListShown = {
  ...mockContextValue,
  listShown: () => true,
};

const mockContextValueWithListAdded = {
  ...mockContextValue,
  listAdded: () => true,
};

describe('AddList component', () => {
  test('renders correctly list initial state - hidden and not added', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList listName="listFood" />
      </ItemsContext.Provider>,
    );

    const addButton = getByText('+');

    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('+');
    expect(getByText('🍎')).toBeInTheDocument();
  });

  test('renders correctly list is shown', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValueWithListShown}>
        <AddList listName="listFood" />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByText('-'));

    expect(mockContextValue.hideList).toHaveBeenCalledWith('listFood');
  });

  test('calls addListAsObj when list is hidden and not added yet', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList listName="listFood" />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByText('+'));

    expect(mockContextValue.addListAsObj).toHaveBeenCalledWith('listFood');
  });

  test('calls showList when list is hidden but already added', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValueWithListAdded}>
        <AddList listName="listFood" />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByText('+'));

    expect(mockContextValue.showList).toHaveBeenCalledWith('listFood');
  });

  test('calls hideList when list is shown and already added', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValueWithListShown}>
        <AddList listName="listFood" />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByText('-'));

    expect(mockContextValue.hideList).toHaveBeenCalledWith('listFood');
  });
});
