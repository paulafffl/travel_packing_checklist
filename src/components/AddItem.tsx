import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import toast, { Toaster } from 'react-hot-toast';
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
  const { addItemAsObj } = useContext(ItemsContext);
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
        );
        return listNAME;
      }
    }
    return false;
  };

  return (
    <form
      id="new-item"
      className="mb-1 mt-5 flex w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!existingInList()) {
          addItemAsObj(newItem);
          setNewItem('');
        }
      }}
    >
      <Toaster />
      <input
        id="new-item-name"
        className="flex-grow overflow-scroll"
        type="search"
        placeholder="Or create new item here"
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
        <span>
          {`+\u00A0Add`} <span className="hidden sm:inline">New Item</span>
        </span>
      </button>
    </form>
  );
};

export default AddItem;
