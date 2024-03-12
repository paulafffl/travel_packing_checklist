import { PropsWithChildren, createContext, useState } from 'react';
import {
  createItem,
  getInitialItems,
  removeItem,
  updateItem,
} from './lib/items';

type ItemsState = {
  items: Item[];
  totalItems: number;
  packedItems: Item[];
  unpackedItems: Item[];
  add: (name: string) => void;
  remove: (id: string) => void;
  update: (id: string, updates: WithoutId) => void;
  packAllItems: () => void;
  unpackAllItems: () => void;
};

type PartialItem = Partial<Item>;
type WithoutId = Omit<PartialItem, 'id'>;

export const ItemsContext = createContext({} as ItemsState);

const ItemsProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(getInitialItems());

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed);
  const unpackedItems = items.filter((item) => !item.packed);

  const add = (name: string) => {
    const item = createItem(name);
    setItems([...items, item]);
  };

  const remove = (id: string) => {
    setItems(removeItem(items, id));
  };

  const update = (id: string, updates: WithoutId) => {
    setItems(updateItem(items, id, updates));
  };

  const packAllItems = () => {
    return setItems(items.map((item) => ({ ...item, packed: true })));
  };

  const unpackAllItems = () => {
    return setItems(items.map((item) => ({ ...item, packed: false })));
  };

  const value: ItemsState = {
    items,
    totalItems,
    unpackedItems,
    packedItems,
    add,
    remove,
    update,
    packAllItems,
    unpackAllItems,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};

export default ItemsProvider;
