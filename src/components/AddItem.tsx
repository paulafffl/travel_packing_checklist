import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
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
import { listNameDisplay } from '../utils/listNameDisplayed';
import toast from '../utils/toast';

const AddItem = () => {
  const { addItemAsObj, listsObj } = useContext(ItemsContext);
  const [toastOpen, setToastOpen] = useState('');
  const [newItem, setNewItem] = useState('');

  const existingInList = () => {
    const listAdditionals = listsObj['listAdditionals']?.map((item) => item.name);
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
      listAdditionals,
    };
    for (const [listName, list] of Object.entries(lists)) {
      const match = list?.find((item) => {
        const nameToBeMatched =
          listName === 'listAdditionals'
            ? item.toLowerCase().trim()
            : item.toLowerCase().slice(2).trim(); // Removes emojis included in default lists items
        const trimmedInput = newItem.toLowerCase().trim();
        return nameToBeMatched.startsWith(trimmedInput);
      });
      if (match) {
        setToastOpen(listName);
        setTimeout(() => setToastOpen(''), 3000);
        return listName;
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
      {toastOpen &&
        toast(
          <p>
            👋 Item already exists in {listNameDisplay(toastOpen)}
            <br />
            {!Object.keys(listsObj).length ? 'Open that  list to see it and more! 👀' : ''}
          </p>,
        )}
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
