import { PropsWithChildren, createContext, useState } from 'react';
import { createItem, readLists, updateItem, deleteItem, deleteList } from './lib/items';
import { listsAsObj } from './lib/listsAsObj';

export type ItemsState = {
  listsObj: ItemAsObj;
  listsShown: string[];
  listsWithItemsShown: string[];
  showItems: (listName: string) => void;
  hideItems: (listName: string) => void;
  showList: (listName: string) => void;
  hideList: (listName: string) => void;
  addItem: (name: string, listName?: string) => void;
  addList: (listName: string, listObject?: {}) => void;
  listAdded: (listName: string) => boolean;
  resetList: (listName: string) => void;
  removeItem: (id: string, listName: string) => void;
  removeList: (id: string) => void;
  changeItem: (id: string, updates: WithoutId) => void;
  packAllItems: () => void;
  unpackAllItems: () => void;
};

type PartialItem = Partial<Item>;
type WithoutId = Omit<PartialItem, 'id'>;

export const ItemsContext = createContext({} as ItemsState);

const ItemsProvider = ({ children }: PropsWithChildren) => {
  const [listsObj, setListsObj] = useState(readLists());
  const [listsShown, setListsShown] = useState<string[]>(['listAdditionals']);
  const [listsWithItemsShown, setListsWithItemsShown] = useState<string[]>([]);

  const addItem = (name: string, listName = 'listAdditionals') => {
    const newItem = createItem(name, listName);
    setListsObj((prevObj) => {
      const updatedList = [...(prevObj[listName] || []), newItem];
      const reorderedObj = {
        [listName]: updatedList,
        ...Object.entries(prevObj)
          .filter(([key]) => key !== listName)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
      };
      return reorderedObj;
    });
    setListsShown([...listsShown, 'listAdditionals']);
    setListsWithItemsShown([...listsWithItemsShown, 'listAdditionals']);
  };

  const addList = (listName: string, listsObject = listsObj) => {
    const names = listsAsObj[listName as keyof ListsAsObj];
    const newItemsAsObj = names.map((item) => createItem(item, listName));
    setListsObj({ [listName]: newItemsAsObj, ...listsObject });
    showList(listName);
  };

  const listAdded = (listName: string) => {
    return listsObj.hasOwnProperty(listName);
  };

  const showItems = (listName: string) => {
    setListsWithItemsShown([...listsWithItemsShown, listName]);
  };

  const hideItems = (listName: string) => {
    setListsWithItemsShown(listsWithItemsShown.filter((name) => name !== listName));
  };

  const showList = (listName: string) => {
    setListsShown([...listsShown, listName]);
    setListsWithItemsShown([...listsWithItemsShown, listName]);
  };

  const hideList = (listName: string) => {
    setListsShown(listsShown.filter((name) => name !== listName));
  };

  const removeItem = async (id: string, listName: string) => {
    let updatedListsObj = {};
    if (listsObj[listName].length === 1) {
      setListsShown(listsShown.filter((name) => name !== listName));
      updatedListsObj = await deleteList(listsObj, listName);
    } else {
      updatedListsObj = deleteItem(listsObj, id);
    }
    setListsObj(updatedListsObj);
  };

  const removeList = async (listName: string) => {
    const updatedListsObj = await deleteList(listsObj, listName);
    setListsObj(updatedListsObj);
  };

  const resetList = async (listName: string) => {
    const updatedListsObj = await deleteList(listsObj, listName);
    setListsObj(updatedListsObj);
    addList(listName, updatedListsObj);
  };

  const changeItem = (id: string, updates: WithoutId) => {
    setListsObj(updateItem(listsObj, id, updates));
  };

  const packAllItems = () => {
    const updatedItems: ItemAsObj = {};
    Object.entries(listsObj).forEach(([list, itemList]) => {
      updatedItems[list] = itemList.map((item) => ({ ...item, packed: true }));
    });
    setListsObj(updatedItems);
  };

  const unpackAllItems = () => {
    const updatedItems: ItemAsObj = {};
    Object.entries(listsObj).forEach(([list, itemList]) => {
      updatedItems[list] = itemList.map((item) => ({ ...item, packed: false }));
    });
    setListsObj(updatedItems);
  };

  const value: ItemsState = {
    listsObj,
    listsShown,
    listsWithItemsShown,
    showItems,
    hideItems,
    showList,
    hideList,
    addItem,
    addList,
    listAdded,
    removeItem,
    removeList,
    resetList,
    changeItem,
    packAllItems,
    unpackAllItems,
  };
  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};

export default ItemsProvider;
