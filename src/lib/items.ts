import { v4 as id } from 'uuid';

const getStoredLists = (): ListsObj => {
  const storedItems = localStorage.getItem('listsObj');
  return storedItems ? JSON.parse(storedItems) : {};
};

export const createItem = (name: string, listName: string): Item => {
  const newItem = {
    id: id(),
    name,
    packed: false,
  };

  const storedItemsJSON = localStorage.getItem('listsObj');
  let storedItems: ListsObj = storedItemsJSON ? JSON.parse(storedItemsJSON) : {};

  storedItems.hasOwnProperty(listName)
    ? storedItems[listName].push(newItem)
    : (storedItems[listName] = [newItem]);
  localStorage.setItem('listsObj', JSON.stringify(storedItems));

  return newItem;
};

export const readLists = (): ListsObj => {
  return getStoredLists();
};

export const updateLists = (items: ListsObj) => {
  localStorage.setItem('listsObj', JSON.stringify(items));
};

export const updateItem = (items: ListsObj, id: string, updates: Partial<Item>) => {
  const updatedItems: ListsObj = {};
  Object.entries(items).forEach(([list, itemList]) => {
    updatedItems[list] = itemList.map((item) => (item.id === id ? { ...item, ...updates } : item));
  });
  updateLists(updatedItems);
  return updatedItems;
};

export const deleteList = async (items: ListsObj, listName: string) => {
  const updatedItems: ListsObj = { ...items };
  if (listName in updatedItems) {
    delete updatedItems[listName];
    updateLists(updatedItems);
  }
  return updatedItems;
};

export const deleteItem = (items: ListsObj, id: string) => {
  const updatedItems: ListsObj = {};
  Object.entries(items).forEach(([list, itemList]) => {
    updatedItems[list] = itemList.filter((item) => item.id !== id);
  });
  updateLists(updatedItems);
  return updatedItems;
};
