import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import { listSummer } from '../lib/lists';

const NewItem = () => {
  const { addItem, addList, removeList } = useContext(ItemsContext);
  const [newItem, setNewItem] = useState('');
  const [listedSummer, setListedSummer] = useState(false);
  return (
    <section>
      <form
        id="new-item"
        className="flex flex-col sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          addItem(newItem);
          setNewItem('');
        }}
      >
        <input
          id="new-item-name"
          className="mb-2 flex-grow sm:mb-0 sm:mr-2"
          type="search"
          placeholder="New Item"
          value={newItem}
          autoFocus
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          id="new-item-submit"
          className="px-2 py-1"
          aria-label={`Add Item ${newItem}`}
          type="submit"
          disabled={!newItem}
        >
          <span className="material-symbols-outlined text-base font-bold">add</span>
          Add
        </button>
      </form>
      <button
        className="mt-4 px-2 py-1"
        aria-label={`Add List for SUMMER`}
        onClick={() => {
          if (!listedSummer) {
            addList(listSummer);
            setListedSummer(true);
          } else {
            removeList(listSummer);
            setListedSummer(false);
          }
        }}
      >
        <span className="material-symbols-outlined mr-1 text-base font-bold">
          {!listedSummer ? 'add' : 'delete'}
        </span>
        🌞 SUMMER LIST
      </button>
    </section>
  );
};

export default NewItem;
