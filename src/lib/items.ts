import { v4 as id } from 'uuid';

const getStoredItemsAsObj = (): ItemAsObj => {
  const storedItems = localStorage.getItem('itemsAsObj');
  return storedItems ? JSON.parse(storedItems) : {};
};

export const createItem = (name: string, listName: string): Item => {
  const newItem = {
    id: id(),
    name,
    packed: false,
  };

  const storedItemsJSON = localStorage.getItem('itemsAsObj');
  let storedItems: ItemAsObj = storedItemsJSON ? JSON.parse(storedItemsJSON) : {};

  storedItems.hasOwnProperty(listName)
    ? storedItems[listName].push(newItem)
    : (storedItems[listName] = [newItem]);
  localStorage.setItem('itemsAsObj', JSON.stringify(storedItems));

  return newItem;
};

export const getInitialItems = (): ItemAsObj => {
  return getStoredItemsAsObj();
};

const saveItemsToLocalStorageAsObj = (items: ItemAsObj) => {
  localStorage.setItem('itemsAsObj', JSON.stringify(items));
};

export const updateItem = (items: ItemAsObj, id: string, updates: Partial<Item>) => {
  const updatedItems: ItemAsObj = {};
  Object.entries(items).forEach(([list, itemList]) => {
    updatedItems[list] = itemList.map((item) => (item.id === id ? { ...item, ...updates } : item));
  });
  saveItemsToLocalStorageAsObj(updatedItems);
  return updatedItems;
};

export const deleteItem = (items: ItemAsObj, id: string) => {
  const updatedItems: ItemAsObj = {};
  Object.entries(items).forEach(([list, itemList]) => {
    updatedItems[list] = itemList.filter((item) => item.id !== id);
  });
  saveItemsToLocalStorageAsObj(updatedItems);
  return updatedItems;
};

export const deleteItems = async (items: ItemAsObj, listName: string) => {
  const updatedItems: ItemAsObj = { ...items };
  if (listName in updatedItems) {
    delete updatedItems[listName];
    saveItemsToLocalStorageAsObj(updatedItems);
  }
  return updatedItems;
};
