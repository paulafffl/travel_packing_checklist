import { v4 as id } from 'uuid';

const getStoredLists = (): ItemAsObj => {
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
  let storedItems: ItemAsObj = storedItemsJSON ? JSON.parse(storedItemsJSON) : {};

  storedItems.hasOwnProperty(listName)
    ? storedItems[listName].push(newItem)
    : (storedItems[listName] = [newItem]);
  localStorage.setItem('listsObj', JSON.stringify(storedItems));

  return newItem;
};

export const readLists = (): ItemAsObj => {
  return getStoredLists();
};

export const updateLists = (items: ItemAsObj) => {
  localStorage.setItem('listsObj', JSON.stringify(items));
};

export const updateItem = (items: ItemAsObj, id: string, updates: Partial<Item>) => {
  const updatedItems: ItemAsObj = {};
  Object.entries(items).forEach(([list, itemList]) => {
    updatedItems[list] = itemList.map((item) => (item.id === id ? { ...item, ...updates } : item));
  });
  updateLists(updatedItems);
  return updatedItems;
};

export const deleteList = async (items: ItemAsObj, listName: string) => {
  const updatedItems: ItemAsObj = { ...items };
  if (listName in updatedItems) {
    delete updatedItems[listName];
    updateLists(updatedItems);
  }
  return updatedItems;
};

export const deleteItem = (items: ItemAsObj, id: string) => {
  const updatedItems: ItemAsObj = {};
  Object.entries(items).forEach(([list, itemList]) => {
    updatedItems[list] = itemList.filter((item) => item.id !== id);
  });
  updateLists(updatedItems);
  return updatedItems;
};
