import React from 'react';
import { render } from '@testing-library/react';
import { ItemsContext } from '../context';
import AddList from './AddList';
import { mockContextValue } from '../setupTests';

describe('AddList component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddList name="Test List" listedState={false} />
      </ItemsContext.Provider>,
    );

    expect(getByText('Test List')).toBeInTheDocument();
  });
});
