import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import Icon from './Icon';
import { listEmojis } from '../utils/listEmojis';

const Item = ({ item, listName }: { item: Item; listName: string }) => {
  const [editing, setEditing] = useState(false);
  const { changeItem, removeItem } = useContext(ItemsContext);
  const [visible, setVisible] = useState(true);
  const [checked, setChecked] = useState(item.packed);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    setVisible(false);
    setTimeout(() => changeItem(item.id, { packed: !item.packed }), 300);
  };

  return (
    <li className="my-1 flex items-center gap-1">
      <button
        role="checkbox"
        id={`checkbox-item-${item.id}`}
        className={`mr-2 h-7 min-w-7 px-0 text-xs 
          ${checked ? 'color-palette-amber' : 'border-2 border-amber-300'}
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}
        onKeyDown={(e) => e.key === 'Enter' && handleCheckboxChange()}
        onClick={handleCheckboxChange}
        tabIndex={0}
        title={`${checked ? 'Uncheck' : 'Check'}`}
        aria-label={`${checked ? 'Uncheck' : 'Check'} ${item.name}`}
      >
        <Icon symbol="check" />
      </button>
      <label htmlFor={`checkbox-item-${item.id}`} className={'screen-readers-only'}>
        {item.name}
      </label>
      {listEmojis[item.name.toLowerCase()] && (
        <span
          role="img"
          aria-hidden="true"
          className={`emojiStyle ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          {listEmojis[item.name.toLowerCase()]}
        </span>
      )}
      <input
        value={item.name}
        id={`label-item-${item.id}`}
        className={`mr-1 w-full pl-0 focus:pl-2
          ${editing ? 'ml-0 pl-2 focus:pl-2' : 'border-white bg-white'},
          ${visible ? 'opacity-100' : 'opacity-0'}`}
        size={item.name.length}
        onClick={() => setEditing(true)}
        onKeyDown={(e) => e.key === 'Enter' && setEditing(!editing)}
        onChange={(event) => changeItem(item.id, { name: event.target.value })}
      />
      <label htmlFor={`label-item-${item.id}`} className={'screen-readers-only'}>
        Item Name:
      </label>
      <div className="ml-auto flex gap-y-0">
        <button
          className={`h-7 w-7 px-1 text-xs ${
            editing ? 'color-palette-violet' : 'color-palette-green'
          }`}
          title={`${editing ? 'Save' : 'Edit'}`}
          aria-label={`${editing ? 'Save' : 'Edit'} ${item.name}`}
          onClick={() => setEditing(!editing)}
        >
          <Icon symbol={editing ? 'save' : 'edit'} />
        </button>
        <button
          className="color-palette-red ml-2 h-7 w-7 px-1 text-xs"
          title={'Delete'}
          aria-label={`Delete ${item.name}`}
          onClick={() => removeItem(item.id, listName)}
        >
          <Icon symbol="delete" />
        </button>
      </div>
    </li>
  );
};

export default Item;
