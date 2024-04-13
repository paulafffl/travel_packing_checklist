import React from 'react';
import { render } from '@testing-library/react';
import AddSection from './AddSection';
import { ItemsContext } from '../context';
import { mockContextValue } from '../setupTests';

describe('AddSection component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddSection />
      </ItemsContext.Provider>,
    );

    expect(getByText('ADD ITEMS')).toBeInTheDocument();

    expect(getByText(/Reusables/i)).toBeInTheDocument();
    expect(getByText(/Snacks/i)).toBeInTheDocument();
    expect(getByText(/Devices/i)).toBeInTheDocument();
    expect(getByText(/Essentials/i)).toBeInTheDocument();
    expect(getByText(/Clothes/i)).toBeInTheDocument();
    expect(getByText(/Leaving/i)).toBeInTheDocument();
    expect(getByText(/Summer/i)).toBeInTheDocument();
    expect(getByText(/Winter/i)).toBeInTheDocument();
    expect(getByText(/Toiletries/i)).toBeInTheDocument();
    expect(getByText(/Camping/i)).toBeInTheDocument();
  });
});
