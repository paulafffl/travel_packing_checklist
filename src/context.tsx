import { PropsWithChildren, createContext, useState } from 'react';
import { createItem, getInitialItems, updateItem, deleteItems } from './lib/items';
import toast, { Toaster } from 'react-hot-toast';

type ItemsState = {
  items: Item[];
  totalItems: number;
  packedItems: Item[];
  unpackedItems: Item[];
  addItem: (name: string) => void;
  addList: (names: string[]) => void;
  removeItem: (id: string) => void;
  removeList: (ids: string[]) => void;
  addedList: (names: string[]) => boolean;
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

  const addItem = (name: string) => {
    const item = createItem(name);
    setItems([item, ...items]);
  };

  const addList = (names: string[]) => {
    const newItems = names.map((name) => createItem(name));
    setItems([...newItems, ...items]);
  };

  const addedList = (names: string[]) => {
    return names.every((name) => items.find((item) => item.name === name));
  };

  const removeItem = (id: string) => {
    setItems(deleteItems(items, id));
  };

  const removeList = (names: string[]) => {
    const itemsToRemove = items.filter((item) => names.includes(item.name));
    const ids = itemsToRemove.map((item) => item.id);
    setItems(deleteItems(items, ids));
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
    addItem,
    addList,
    removeItem,
    removeList,
    addedList,
    update,
    packAllItems,
    unpackAllItems,
  };
  return (
    <ItemsContext.Provider value={value}>
      {children} <Toaster />
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
