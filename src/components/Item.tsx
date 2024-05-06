import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import Icon from './Icon';

const Item = ({ item, listName }: { item: Item; listName: string }) => {
  const [editing, setEditing] = useState(false);
  const { changeItem, removeItem } = useContext(ItemsContext);
  const [visible, setVisible] = useState(true);

  const handleCheckboxChange = () => {
    setVisible(false);
    setTimeout(() => changeItem(item.id, { packed: !item.packed }), 300);
  };

  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={item.packed || !visible}
        id={`checkbox-item-${item.id}`}
        className={visible ? 'opacity-100' : 'opacity-0'}
        onKeyDown={(e) => e.key === 'Enter' && handleCheckboxChange()}
        onChange={handleCheckboxChange}
        tabIndex={0}
      />
      <label htmlFor={`checkbox-item-${item.id}`} className={'screen-readers-only'}>
        {`checkbox-item-${item.id}`}
      </label>
      <input
        value={item.name}
        id={`label-item-${item.id}`}
        className={`w-full pl-0 focus:pl-2
          ${editing ? ' pl-2' : 'border-white bg-white'},
          ${visible ? 'opacity-100' : 'opacity-0'}`}
        size={item.name.length}
        onKeyDown={(e) => e.key === 'Enter' && setEditing(!editing)}
        onChange={(event) => changeItem(item.id, { name: event.target.value })}
      />
      <label htmlFor={`label-item-${item.id}`} className={'screen-readers-only'}>
        {`label-item-${item.id}`}
      </label>
      <div className="ml-auto flex gap-y-0">
        <button
          className={`h-6 px-1 text-xs ${editing ? 'color-palette-violet' : 'color-palette-green'}`}
          title={`${editing ? 'Save' : 'Edit'}`}
          aria-label={`${editing ? 'Save' : 'Edit'} "${item.name}"`}
          onClick={() => setEditing(!editing)}
        >
          <Icon symbol={editing ? 'save' : 'edit'} />
        </button>
        <button
          className="color-palette-red ml-2 h-6 px-1 text-xs"
          title={'Delete'}
          aria-label={`Delete "${item.name}"`}
          onClick={() => removeItem(item.id, listName)}
        >
          <Icon symbol="delete" />
        </button>
      </div>
    </li>
  );
};

export default Item;
