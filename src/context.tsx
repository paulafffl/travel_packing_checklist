import { PropsWithChildren, createContext, useState } from 'react';
import {
  createItem,
  readLists,
  readListsShown,
  updateItem,
  deleteItem,
  deleteList,
} from './lib/items';
import { storeLists, storeListsShown } from './lib/storage';
import { listsAsObj } from './lib/listsAsObj';

export type ItemsState = {
  listsObj: ListsObj;
  listsShown: string[];
  listsWithItemsShown: string[];
  listsAdded: string[];
  addList: (listName: string, listObject?: {}) => void;
  addItem: (itemName: string, listName?: string) => void;
  showList: (listName: string) => void;
  hideList: (listName: string) => void;
  removeList: (id: string) => void;
  removeItem: (id: string, listName: string) => void;
  resetList: (listName: string) => void;
  changeItem: (id: string, updates: WithoutId) => void;
  packAllItems: () => void;
  unpackAllItems: () => void;
};

type PartialItem = Partial<Item>;
type WithoutId = Omit<PartialItem, 'id'>;

export const ItemsContext = createContext({} as ItemsState);

const ItemsProvider = ({ children }: PropsWithChildren) => {
  const [listsObj, setListsObj] = useState(() => readLists());
  const [listsShown, setListsShown] = useState<string[]>(() => readListsShown());
  const [listsWithItemsShown, setListsWithItemsShown] = useState<string[]>([]);
  const listsAdded = Object.keys(listsObj);

  const updateObjWithList = (listName: string, updatedList?: Item[], listsObject = listsObj) => {
    const list = updatedList ? updatedList : listsObject[listName];
    const objWithListOnTop = {
      [listName]: list,
      ...Object.entries(listsObject)
        .filter(([key]) => key !== listName)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    };
    setListsObj(objWithListOnTop);
    storeLists(objWithListOnTop);
    if (!listsShown.includes(listName)) {
      const updatedListsShown = [...listsShown, listName];
      setListsShown(updatedListsShown);
      storeListsShown(updatedListsShown as []);
      setListsWithItemsShown([...listsWithItemsShown, listName]);
    }
  };

  const addList = (listName: string, listsObject = listsObj) => {
    const itemsNames = listsAsObj[listName as keyof ListsNames];
    const newList = itemsNames.map((item) => createItem(item, listName));
    updateObjWithList(listName, newList, listsObject);
  };

  const addItem = (itemName: string, listName = 'listAdditionals') => {
    const newItem = createItem(itemName, listName);
    const updatedList = [...(listsObj[listName] || []), newItem];
    updateObjWithList(listName, updatedList);
  };

  const showList = (listName: string) => {
    updateObjWithList(listName);
    const updatedList = [...listsShown, listName];
    storeListsShown(updatedList as []);
    setListsShown(updatedList);
  };

  const hideList = (listName: string) => {
    const updatedList = listsShown.filter((name: string) => name !== listName);
    storeListsShown(updatedList as []);
    setListsShown(updatedList);
  };

  const removeList = async (listName: string) => {
    const updatedListsObj = await deleteList(listsObj, listName);
    setListsObj(updatedListsObj);
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

  const resetList = async (listName: string) => {
    const updatedListsObj = await deleteList(listsObj, listName);
    setListsObj(updatedListsObj);
    addList(listName, updatedListsObj);
  };

  const changeItem = (id: string, updates: WithoutId) => {
    setListsObj(updateItem(listsObj, id, updates));
  };

  const packAllItems = () => {
    const updatedItems: ListsObj = {};
    Object.entries(listsObj).forEach(([list, itemList]) => {
      if (listsShown.includes(list)) {
        updatedItems[list] = itemList.map((item) => ({ ...item, packed: true }));
      }
    });
    storeLists(updatedItems);
    setListsObj(updatedItems);
  };

  const unpackAllItems = () => {
    const updatedItems: ListsObj = {};
    Object.entries(listsObj).forEach(([list, itemList]) => {
      if (listsShown.includes(list)) {
        updatedItems[list] = itemList.map((item) => ({ ...item, packed: false }));
      }
    });
    storeLists(updatedItems);
    setListsObj(updatedItems);
  };

  const value: ItemsState = {
    listsObj,
    listsShown,
    listsWithItemsShown,
    listsAdded,
    addList,
    addItem,
    showList,
    hideList,
    removeList,
    removeItem,
    resetList,
    changeItem,
    packAllItems,
    unpackAllItems,
  };
  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};

export default ItemsProvider;
