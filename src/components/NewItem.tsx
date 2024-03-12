import { useContext, useState } from 'react';
import { ItemsContext } from '../context';

const NewItem = () => {
  const { add } = useContext(ItemsContext);
  const [newItem, setNewItem] = useState('');
  return (
    <section>
      <form
        id="new-item"
        className="flex flex-col sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          add(newItem);
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
          className="px-2 py-1 text-xs"
          aria-label={`Add ${newItem}`}
          type="submit"
          disabled={!newItem}
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add
        </button>
      </form>
    </section>
  );
};

export default NewItem;
