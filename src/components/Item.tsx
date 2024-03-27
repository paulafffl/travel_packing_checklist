import clsx from 'clsx';
import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import Icon from './Icon';

const Item = ({ item }: { item: Item }) => {
  const [editing, setEditing] = useState(false);
  const { updateAsObj, removeItemAsObj } = useContext(ItemsContext);
  const [visible, setVisible] = useState(true);

  const handleCheckboxChange = () => {
    setVisible(false);
    setTimeout(() => updateAsObj(item.id, { packed: !item.packed }), 300);
  };

  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={item.packed}
        id={`checkbox-item-${item.id}`}
        className={visible ? 'opacity-100' : 'opacity-0'}
        onKeyDown={(e) => e.key === 'Enter' && handleCheckboxChange()}
        onChange={handleCheckboxChange}
        tabIndex={0}
      />
      <label htmlFor={`checkbox-item-${item.id}`} className={'hidden'}>
        {item.name}
      </label>
      <input
        value={item.name}
        id={`checkbox-editing-${item.id}`}
        className={clsx(
          'overflow-scroll pl-0 focus:pl-2',
          editing ? ' pl-2' : 'border-white bg-white',
          visible ? 'opacity-100' : 'opacity-0',
        )}
        size={item.name.length}
        onKeyDown={(e) => e.key === 'Enter' && setEditing(!editing)}
        onChange={(event) => updateAsObj(item.id, { name: event.target.value })}
      />
      <div className="ml-auto flex gap-y-0">
        <button
          className={`px-1 text-xs ${!editing && 'color-palette-green'}`}
          aria-label={`Edit "${item.name}"`}
          onClick={() => setEditing(!editing)}
        >
          <Icon symbol={editing ? 'save' : 'edit'} />
        </button>
        <button
          className="color-palette-red ml-2 px-1 text-xs"
          aria-label={`Delete "${item.name}"`}
          onClick={() => removeItemAsObj(item.id)}
        >
          <Icon symbol="delete" />
        </button>
      </div>
    </li>
  );
};

export default Item;
