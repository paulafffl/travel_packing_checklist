import { PropsWithChildren, createContext, useState } from 'react';
import {
  createItemAsObj,
  getInitialItemsAsObj,
  updateItemAsObj,
  deleteItemAsObj,
  deleteItemsAsObj,
} from './lib/items';
import toast, { Toaster } from 'react-hot-toast';

type ItemsState = {
  listsObj: ItemAsObj;
  packedItemsAsObj: (list: string) => Item[];
  unpackedItemsAsObj: (list: string) => Item[];
  addItemAsObj: (name: string, listName?: string) => void;
  addListAsObj: (names: string[], listName: string) => void;
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

  const packedItemsAsObj = (list: string) => listsObj[list]?.filter((item) => item.packed);
  const unpackedItemsAsObj = (list: string) => listsObj[list]?.filter((item) => !item.packed);

  const addItemAsObj = (name: string, listName = 'listAdditionals') => {
    const newItem = createItemAsObj(name, listName);
    toast('👇 Item added to your Additionals List', {
      position: 'bottom-center',
    });
    setListsObj((prevObj) => ({
      ...prevObj,
      [listName]: [...(prevObj[listName] || []), newItem],
    }));
  };

  const addListAsObj = (names: string[], listName: string) => {
    const newItemsAsObj = names.map((item) => createItemAsObj(item, listName));
    setListsObj({ [listName]: newItemsAsObj, ...listsObj });
  };

  const addedListAsObj = (listName: string) => {
    return listsObj.hasOwnProperty(listName);
  };

  const removeItemAsObj = (id: string) => {
    setListsObj(deleteItemAsObj(listsObj, id));
  };

  const removeListAsObj = (listName: string) => {
    setListsObj(deleteItemsAsObj(listsObj, listName));
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
    unpackedItemsAsObj,
    packedItemsAsObj,
    addItemAsObj,
    addListAsObj,
    removeItemAsObj,
    removeListAsObj,
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
