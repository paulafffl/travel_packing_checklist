import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddList from './AddList';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';

describe('AddList component', () => {
  test('renders correctly when not listed', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList listedState={false} listName="listFood" />
      </ItemsContext.Provider>,
    );

    const addButton = getByText('+');

    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent('+');
    expect(getByText('🍎')).toBeInTheDocument();
  });

  test('renders correctly when listed', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList listedState={true} listName="listFood" />
      </ItemsContext.Provider>,
    );

    const removeButton = getByText('-');

    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveTextContent('-');
    expect(getByText('🍎')).toBeInTheDocument();
  });

  test('calls addListAsObj when not listed and clicked', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList listedState={false} listName="listFood" />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByText('+'));

    expect(mockContextValue.addListAsObj).toHaveBeenCalledWith('listFood');
  });

  test('calls removeListAsObj when listed and clicked', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList listedState={true} listName="listFood" />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByText('-'));

    expect(mockContextValue.removeListAsObj).toHaveBeenCalledWith('listFood');
  });
});
