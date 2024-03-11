import { useContext, useState } from 'react';
import { ItemsContext } from '../context';

const NewItem = () => {
  const { add } = useContext(ItemsContext);
  const [newItem, setNewItem] = useState('');
  return (
    <section>
      <form
        id="new-item"
        onSubmit={(e) => {
          e.preventDefault();
          add(newItem);
          setNewItem('');
        }}
      >
        <input
          id="new-item-name"
          type="search"
          placeholder="New Item"
          value={newItem}
          autoFocus
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          id="new-item-submit"
          aria-label={`Add ${newItem}`}
          type="submit"
          disabled={!newItem}
        >
          + Add
        </button>
      </form>
    </section>
  );
};

export default NewItem;
