import clsx from 'clsx';
import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import Icon from './Icon';

type ItemProps = {
  item: Item;
};

const Item = ({ item }: ItemProps) => {
  const [editing, setEditing] = useState(false);
  const { update, removeItem } = useContext(ItemsContext);
  const [visible, setVisible] = useState(true);

  const handleCheckboxChange = () => {
    setVisible(false);
    setTimeout(() => update(item.id, { packed: !item.packed }), 300);
  };

  return (
    <li className="flex items-center">
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
          'overflow-scroll',
          editing ? 'mx-2' : 'border-white bg-white',
          visible ? 'opacity-100' : 'opacity-0',
        )}
        size={item.name.length}
        onKeyDown={(e) => e.key === 'Enter' && setEditing(!editing)}
        onChange={(event) => update(item.id, { name: event.target.value })}
      />
      <div className="g'py-0 text-sm', ap-2 ml-auto flex">
        <button
          className={`px-1.5 text-xs ${!editing && 'color-palette-green'}`}
          aria-label={`Edit "${item.name}"`}
          onClick={() => setEditing(!editing)}
        >
          <Icon symbol={editing ? 'save' : 'edit'} />
        </button>
        <button
          className="color-palette-red ml-2 px-1.5 text-xs"
          aria-label={`Delete "${item.name}"`}
          onClick={() => removeItem(item.id)}
        >
          <Icon symbol="delete" />
        </button>
      </div>
    </li>
  );
};

export default Item;
