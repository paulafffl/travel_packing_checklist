import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import toast, { Toaster } from 'react-hot-toast';
import Icon from './Icon';
import {
  listCamping,
  listClothes,
  listEssentials,
  listFood,
  listLeaving,
  listSummer,
  listTech,
  listToiletries,
  listWinter,
  listZeroWaste,
} from '../lib/lists';

const AddItem = () => {
  const { addItem } = useContext(ItemsContext);
  const [newItem, setNewItem] = useState('');

  const existingInList = () => {
    const lists = {
      listCamping,
      listClothes,
      listEssentials,
      listFood,
      listLeaving,
      listSummer,
      listTech,
      listToiletries,
      listWinter,
      listZeroWaste,
    };

    for (const [listName, list] of Object.entries(lists)) {
      const match = list.find((item) => {
        const itemWithoutEmoji = item.toLowerCase().slice(2).trim();
        const trimmedInput = newItem.toLowerCase().trim();
        return itemWithoutEmoji.startsWith(trimmedInput);
      });
      if (match) {
        const listNAME = listName.substring(4).toUpperCase(); // Name of the array without "list"
        toast(
          `👋 This already exists in ${listNAME}. \n➕\u00A0Add the  list to see it and more! 👀`,
          {
            position: 'bottom-center',
          },
        );
        return listNAME;
      }
    }
    return false;
  };

  return (
    <form
      id="new-item"
      className="mb-1 flex w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!existingInList()) {
          addItem(newItem);
          setNewItem('');
        }
      }}
    >
      <Toaster />
      <input
        id="new-item-name"
        className="w-full overflow-scroll"
        type="search"
        placeholder="New Item"
        value={newItem}
        autoFocus
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        id="new-item-submit"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        aria-label={`Add Item ${newItem}`}
        type="submit"
        disabled={!newItem}
      >
        <Icon symbol="add" />
        <span className="ml-1 hidden sm:block">Add</span>
      </button>
    </form>
  );
};

export default AddItem;
