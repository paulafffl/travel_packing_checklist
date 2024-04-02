import { PropsWithChildren, createContext, useState } from 'react';
import {
  createItemAsObj,
  getInitialItemsAsObj,
  updateItemAsObj,
  deleteItemAsObj,
  deleteItemsAsObj,
} from './lib/items';
import { listsAsObj } from './lib/listsAsObj';

export type ItemsState = {
  listsObj: ItemAsObj;
  listsShown: string[];
  listItemsShown: (listName: string) => boolean;
  showListItems: (listName: string) => void;
  hideListItems: (listName: string) => void;
  hideList: (listName: string) => void;
  packedItemsAsObj: (list: string) => Item[];
  unpackedItemsAsObj: (list: string) => Item[];
  addItemAsObj: (name: string, listName?: string) => void;
  addListAsObj: (listName: string, listObject?: {}) => void;
  resetListAsObj: (listName: string) => void;
  removeItemAsObj: (id: string, listName: string) => void;
  removeListAsObj: (id: string) => void;
  updateAsObj: (id: string, updates: WithoutId) => void;
  packAllItemsAsObj: () => void;
  unpackAllItemsAsObj: () => void;
};

type PartialItem = Partial<Item>;
type WithoutId = Omit<PartialItem, 'id'>;

export const ItemsContext = createContext({} as ItemsState);

const ItemsProvider = ({ children }: PropsWithChildren) => {
  const [listsObj, setListsObj] = useState(getInitialItemsAsObj());
  const [listsShown, setListsShown] = useState<string[]>(['listAdditionals']);
  const [listsWithItemsShown, setListsWithItemsShown] = useState<string[]>([]);

  const packedItemsAsObj = (list: string) => listsObj[list]?.filter((item) => item.packed);
  const unpackedItemsAsObj = (list: string) => listsObj[list]?.filter((item) => !item.packed);

  const addItemAsObj = (name: string, listName = 'listAdditionals') => {
    const newItem = createItemAsObj(name, listName);
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

  const addListAsObj = (listName: string, listsObject = listsObj) => {
    const names = listsAsObj[listName as keyof ListsAsObj];
    const newItemsAsObj = names.map((item) => createItemAsObj(item, listName));
    setListsObj({ [listName]: newItemsAsObj, ...listsObject });
    setListsShown([...listsShown, listName]);
    setListsWithItemsShown([...listsWithItemsShown, listName]);
  };

  const listItemsShown = (listName: string) => {
    return listsWithItemsShown.includes(listName);
  };

  const showListItems = (listName: string) => {
    setListsWithItemsShown([...listsWithItemsShown, listName]);
  };

  const hideListItems = (listName: string) => {
    setListsWithItemsShown(listsWithItemsShown.filter((name) => name !== listName));
  };

  const hideList = (listName: string) => {
    setListsShown(listsShown.filter((name) => name !== listName));
  };

  const removeItemAsObj = async (id: string, listName: string) => {
    let updatedListsObj = {};
    if (listsObj[listName].length === 1) {
      setListsShown(listsShown.filter((name) => name !== listName));
      updatedListsObj = await deleteItemsAsObj(listsObj, listName);
    } else {
      updatedListsObj = deleteItemAsObj(listsObj, id);
    }
    setListsObj(updatedListsObj);
  };

  const removeListAsObj = async (listName: string) => {
    const updatedListsObj = await deleteItemsAsObj(listsObj, listName);
    setListsObj(updatedListsObj);
  };

  const resetListAsObj = async (listName: string) => {
    const updatedListsObj = await deleteItemsAsObj(listsObj, listName);
    setListsObj(updatedListsObj);
    addListAsObj(listName, updatedListsObj);
  };

  const updateAsObj = (id: string, updates: WithoutId) => {
    setListsObj(updateItemAsObj(listsObj, id, updates));
  };

  const packAllItemsAsObj = () => {
    const updatedItems: ItemAsObj = {};
    Object.entries(listsObj).forEach(([list, itemList]) => {
      updatedItems[list] = itemList.map((item) => ({ ...item, packed: true }));
    });
    setListsObj(updatedItems);
  };

  const unpackAllItemsAsObj = () => {
    const updatedItems: ItemAsObj = {};
    Object.entries(listsObj).forEach(([list, itemList]) => {
      updatedItems[list] = itemList.map((item) => ({ ...item, packed: false }));
    });
    setListsObj(updatedItems);
  };

  const value: ItemsState = {
    listsObj,
    listsShown,
    listItemsShown,
    showListItems,
    hideListItems,
    hideList,
    unpackedItemsAsObj,
    packedItemsAsObj,
    addItemAsObj,
    addListAsObj,
    removeItemAsObj,
    removeListAsObj,
    resetListAsObj,
    updateAsObj,
    packAllItemsAsObj,
    unpackAllItemsAsObj,
  };
  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};

export default ItemsProvider;
