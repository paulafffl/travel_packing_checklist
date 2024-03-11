import { PropsWithChildren, createContext, useState } from 'react';
import {
  createItem,
  getInitialItems,
  removeItem,
  updateItem,
} from './lib/items';

type ItemsState = {
  items: Item[];
  remove: (id: string) => void;
  update: (id: string, updates: WithoutId) => void;
};

type PartialItem = Partial<Item>;
type WithoutId = Omit<PartialItem, 'id'>;

export const ItemsContext = createContext({} as ItemsState);

const ItemsProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(getInitialItems());

  const remove = (id: string) => {
    setItems(removeItem(items, id));
  };

  const update = (id: string, updates: WithoutId) => {
    setItems(updateItem(items, id, updates));
  };

  const value: ItemsState = {
    items,
    remove,
    update,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};

export default ItemsProvider;
