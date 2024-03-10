import { PropsWithChildren, createContext, useState } from 'react';
import { getInitialItems } from './lib/items';

type ItemsState = {
  items: Item[];
};

export const ItemsContext = createContext({} as ItemsState);

const ItemsProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(getInitialItems());

  const value: ItemsState = {
    items,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};

export default ItemsProvider;
