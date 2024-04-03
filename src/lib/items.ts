import { v4 as id } from 'uuid';
import { getStoredLists, getStoredShownList, storeItem, storeLists } from './storage';

export const createItem = (name: string, listName: string): Item => {
  const newItem = {
    id: id(),
    name,
    packed: false,
  };
  storeItem(newItem, listName);
  return newItem;
};

export const readListsShown = (): [] => {
  return getStoredShownList();
};

export const readLists = (): ListsObj => {
  return getStoredLists();
};

export const updateItem = (items: ListsObj, id: string, updates: Partial<Item>) => {
  const updatedItems: ListsObj = {};
  Object.entries(items).forEach(([list, itemList]) => {
    updatedItems[list] = itemList.map((item) => (item.id === id ? { ...item, ...updates } : item));
  });
  storeLists(updatedItems);
  return updatedItems;
};

export const deleteList = async (items: ListsObj, listName: string) => {
  const updatedItems: ListsObj = { ...items };
  if (listName in updatedItems) {
    delete updatedItems[listName];
    storeLists(updatedItems);
  }
  return updatedItems;
};

export const deleteItem = (items: ListsObj, id: string) => {
  const updatedItems: ListsObj = {};
  Object.entries(items).forEach(([list, itemList]) => {
    updatedItems[list] = itemList.filter((item) => item.id !== id);
  });
  storeLists(updatedItems);
  return updatedItems;
};
