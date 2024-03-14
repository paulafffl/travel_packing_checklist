import clsx from 'clsx';
import { useContext, useState } from 'react';
import { ItemsContext } from '../context';

type ItemProps = {
  item: Item;
};

const Item = ({ item }: ItemProps) => {
  const [editing, setEditing] = useState(false);
  const { update, removeItem } = useContext(ItemsContext);

  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={item.packed}
        id={`checkbox-item-${item.id}`}
        onKeyDown={(e) => e.key === 'Enter' && update(item.id, { packed: !item.packed })}
        onChange={() => update(item.id, { packed: !item.packed })}
      />
      <label
        htmlFor={`checkbox-item-${item.id}`}
        className={clsx({ hidden: editing })}
        onKeyDown={(e) => e.key === 'Enter' && update(item.id, { packed: !item.packed })}
        tabIndex={0}
      >
        {item.name}
      </label>
      <input
        value={item.name}
        id={`checkbox-editing-${item.id}`}
        className={clsx('overflow-scroll', { hidden: !editing })}
        size={item.name.length}
        onChange={(event) => update(item.id, { name: event.target.value })}
      />
      <div className="g'py-0 text-sm', ap-2 ml-auto flex">
        <button
          className={`button-with-icon ml-2 px-1.5 py-1 text-xs ${
            !editing && 'bg-teal-400 hover:bg-teal-500'
          }`}
          aria-label={`Edit "${item.name}"`}
          onClick={() => setEditing(!editing)}
        >
          <span className="material-symbols-outlined text-sm">{editing ? 'save' : 'edit'}</span>
        </button>
        <button
          className="button-with-icon ml-2 bg-rose-400  px-1.5 py-1 text-xs hover:bg-rose-500"
          aria-label={`Delete "${item.name}"`}
          onClick={() => removeItem(item.id)}
        >
          <span className="material-symbols-outlined text-sm">delete</span>{' '}
        </button>
      </div>
    </li>
  );
};

export default Item;
