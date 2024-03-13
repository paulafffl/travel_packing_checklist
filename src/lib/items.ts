import { v4 as id } from 'uuid';
import { listDefault } from './lists';

export const createDefaultItems = (): Item[] => {
  return listDefault.map((name) => ({
    id: id(),
    name,
    packed: false,
  }));
};

const getStoredItems = (): Item[] => {
  const storedItems = localStorage.getItem('items');
  return storedItems ? JSON.parse(storedItems) : createDefaultItems();
};

export const createItem = (name: string): Item => {
  const newItem = {
    id: id(),
    name,
    packed: false,
  };

  const storedItems = getStoredItems();
  const updatedItems = [...storedItems, newItem];
  localStorage.setItem('items', JSON.stringify(updatedItems));

  return newItem;
};

export const getInitialItems = (): Item[] => {
  return getStoredItems();
};

const saveItemsToLocalStorage = (items: Item[]) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const updateItem = (items: Item[], id: string, updates: Partial<Item>) => {
  const updatedItems = items.map((item) => {
    if (item.id === id) return { ...item, ...updates };
    return item;
  });
  saveItemsToLocalStorage(updatedItems);
  return updatedItems;
};

export const removeItem = (items: Readonly<Item[]>, id: string) => {
  const updatedItems = items.filter((item) => item.id !== id);
  saveItemsToLocalStorage(updatedItems);
  return updatedItems;
};
