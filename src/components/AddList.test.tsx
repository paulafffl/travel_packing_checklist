import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ItemsContext } from '../context';
import AddList from './AddList';
import { mockContextValue } from '../setupTests';

describe('AddList component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList list={['item1', 'item2']} name="Test List" listedState={false} />
      </ItemsContext.Provider>,
    );

    expect(getByText('Test List')).toBeInTheDocument();
  });

  test('invokes addListAsObj when not listed', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList list={['item1', 'item2']} name="Test List" listedState={false} />
      </ItemsContext.Provider>,
    );

    fireEvent.click(getByText('Test List'));

    expect(mockContextValue.addListAsObj).toHaveBeenCalledWith(['item1', 'item2'], 'listName');
  });
});
