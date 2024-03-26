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
  listsAsObj: ItemAsObj;
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
  const [listsAsObj, setItemsAsObj] = useState(getInitialItemsAsObj());

  const packedItemsAsObj = (list: string) => listsAsObj[list]?.filter((item) => item.packed);
  const unpackedItemsAsObj = (list: string) => listsAsObj[list]?.filter((item) => !item.packed);

  const addItemAsObj = (name: string, listName = 'listAdditionals') => {
    const newItem = createItemAsObj(name, listName);
    setItemsAsObj((prevObj) => ({
      ...prevObj,
      [listName]: [...(prevObj[listName] || []), newItem],
    }));
  };

  const addListAsObj = (names: string[], listName: string) => {
    const newItemsAsObj = names.map((item) => createItemAsObj(item, listName));
    setItemsAsObj({ [listName]: newItemsAsObj, ...listsAsObj });
  };

  const addedListAsObj = (listName: string) => {
    return listsAsObj.hasOwnProperty(listName);
  };

  const removeItemAsObj = (id: string) => {
    setItemsAsObj(deleteItemAsObj(listsAsObj, id));
  };

  const removeListAsObj = (listName: string) => {
    setItemsAsObj(deleteItemsAsObj(listsAsObj, listName));
  };

  const updateAsObj = (id: string, updates: WithoutId) => {
    setItemsAsObj(updateItemAsObj(listsAsObj, id, updates));
  };

  const packAllItemsAsObj = () => {
    const updatedItems: ItemAsObj = {};
    Object.entries(listsAsObj).forEach(([list, itemList]) => {
      updatedItems[list] = itemList.map((item) => ({ ...item, packed: true }));
    });
    setItemsAsObj(updatedItems);
  };

  const unpackAllItemsAsObj = () => {
    const updatedItems: ItemAsObj = {};
    Object.entries(listsAsObj).forEach(([list, itemList]) => {
      updatedItems[list] = itemList.map((item) => ({ ...item, packed: false }));
    });
    setItemsAsObj(updatedItems);
  };

  const value: ItemsState = {
    listsAsObj,
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
