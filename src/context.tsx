import { PropsWithChildren, createContext, useState } from 'react';
import {
  createItemAsObj,
  getInitialItemsAsObj,
  updateItemAsObj,
  deleteItemAsObj,
  deleteItemsAsObj,
} from './lib/items';
import toast, { Toaster } from 'react-hot-toast';
import { listsAsObj } from './lib/listsAsObj';

export type ItemsState = {
  listsObj: ItemAsObj;
  listIsShown: (listName: string) => boolean;
  showList: (listName: string) => void;
  hideList: (listName: string) => void;
  packedItemsAsObj: (list: string) => Item[];
  unpackedItemsAsObj: (list: string) => Item[];
  addItemAsObj: (name: string, listName?: string) => void;
  addListAsObj: (listName: string, listObject?: {}) => void;
  resetListAsObj: (listName: string) => void;
  removeItemAsObj: (id: string) => void;
  removeListAsObj: (listName: string) => void;
  addedListAsObj: (listName: string) => boolean;
  updateAsObj: (id: string, updates: WithoutId) => void;
  packAllItemsAsObj: () => void;
  unpackAllItemsAsObj: () => void;
};

type PartialItem = Partial<Item>;
type WithoutId = Omit<PartialItem, 'id'>;

export const ItemsContext = createContext({} as ItemsState);

const ItemsProvider = ({ children }: PropsWithChildren) => {
  const [listsObj, setListsObj] = useState(getInitialItemsAsObj());
  const [listsShown, setListsShown] = useState<string[]>([]);

  const packedItemsAsObj = (list: string) => listsObj[list]?.filter((item) => item.packed);
  const unpackedItemsAsObj = (list: string) => listsObj[list]?.filter((item) => !item.packed);

  const addItemAsObj = (name: string, listName = 'listAdditionals') => {
    const newItem = createItemAsObj(name, listName);
    toast('👍 Item added to your Additionals List', {
      position: 'bottom-center',
    });
    setListsObj((prevObj) => ({
      ...prevObj,
      [listName]: [...(prevObj[listName] || []), newItem],
    }));
  };

  const addListAsObj = (listName: string, listsObject = listsObj) => {
    const names = listsAsObj[listName as keyof ListsAsObj];
    const newItemsAsObj = names.map((item) => createItemAsObj(item, listName));
    setListsObj({ [listName]: newItemsAsObj, ...listsObject });
    setListsShown([...listsShown, listName]);
  };

  const addedListAsObj = (listName: string) => {
    return listsObj.hasOwnProperty(listName);
  };

  const listIsShown = (listName: string) => {
    return listsShown.includes(listName);
  };

  const showList = (listName: string) => {
    setListsShown([...listsShown, listName]);
  };

  const hideList = (listName: string) => {
    setListsShown(listsShown.filter((name) => name !== listName));
  };

  const removeItemAsObj = (id: string) => {
    setListsObj(deleteItemAsObj(listsObj, id));
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
    listIsShown,
    showList,
    hideList,
    unpackedItemsAsObj,
    packedItemsAsObj,
    addItemAsObj,
    addListAsObj,
    removeItemAsObj,
    removeListAsObj,
    resetListAsObj,
    addedListAsObj,
    updateAsObj,
    packAllItemsAsObj,
    unpackAllItemsAsObj,
  };
  return (
    <ItemsContext.Provider value={value}>
      {children} <Toaster />
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
