import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import Icon from './Icon';

const AddItem = () => {
  const { addItem } = useContext(ItemsContext);
  const [newItem, setNewItem] = useState('');

  return (
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
        aria-label={`Add Item ${newItem}`}
        type="submit"
        disabled={!newItem}
      >
        <Icon symbol="add" />
        <span className="ml-1">Add</span>
      </button>
    </form>
  );
};

export default AddItem;
