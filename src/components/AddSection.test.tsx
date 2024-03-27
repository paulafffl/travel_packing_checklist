import React from 'react';
import { render } from '@testing-library/react';
import AddSection from './AddSection';
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

describe('AddSection component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <ItemsContext.Provider value={mockContextValue}>
        <AddSection />
      </ItemsContext.Provider>,
    );

    expect(getByText('ADD ITEMS')).toBeInTheDocument();

    expect(getByText('💚 Zero Waste')).toBeInTheDocument();
    expect(getByText('🍎 Food')).toBeInTheDocument();
    expect(getByText('⚡ Tech')).toBeInTheDocument();
    expect(getByText('🎒 Essentials')).toBeInTheDocument();
    expect(getByText('👕 Clothes')).toBeInTheDocument();
    expect(getByText('🚪 Leaving')).toBeInTheDocument();
    expect(getByText('☀️ Summer')).toBeInTheDocument();
    expect(getByText('❄️ Winter')).toBeInTheDocument();
    expect(getByText('🛁 Toiletries')).toBeInTheDocument();
    expect(getByText('🏕️ Camping')).toBeInTheDocument();
  });
});
