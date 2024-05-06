export const getStoredShownList = (): [] => {
  const storedItems = localStorage.getItem('listsShown');
  return storedItems ? JSON.parse(storedItems) : [];
};

export const getStoredLists = (): ListsObj => {
  const storedItems = localStorage.getItem('listsObj');
  return storedItems ? JSON.parse(storedItems) : {};
};

export const storeListsShown = (items: []) => {
  localStorage.setItem('listsShown', JSON.stringify(items));
};

export const storeLists = (items: ListsObj) => {
  localStorage.setItem('listsObj', JSON.stringify(items));
};

export const storeItem = (newItem: Item, listName = 'listAdditionals') => {
  const storedItemsJSON = localStorage.getItem('listsObj');
  let storedItems: ListsObj = storedItemsJSON ? JSON.parse(storedItemsJSON) : {};

  storedItems.hasOwnProperty(listName)
    ? storedItems[listName].push(newItem)
    : (storedItems[listName] = [newItem]);
  localStorage.setItem('listsObj', JSON.stringify(storedItems));
};
