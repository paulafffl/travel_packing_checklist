import clsx from 'clsx';
import { useContext, useState } from 'react';
import { ItemsContext } from '../context';

type ItemProps = {
  item: Item;
};

const Item = ({ item }: ItemProps) => {
  const [editing, setEditing] = useState(false);
  const { update } = useContext(ItemsContext);

  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={item.packed}
        id={`checkbox-item-${item.id}`}
        onChange={() => update(item.id, { packed: !item.packed })}
      />
      <label
        htmlFor={`checkbox-item-${item.id}`}
        className={clsx({ hidden: editing })}
      >
        {item.name}
      </label>
      <input
        value={item.name}
        id={`checkbox-editing-${item.id}`}
        className={clsx({ hidden: !editing })}
        onChange={(event) => update(item.id, { name: event.target.value })}
      />
      <div className="g'py-0 text-sm', ap-2 ml-auto flex">
        <button
          className="px-2 py-0 text-xs"
          aria-label={`Edit "${item.name}"`}
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Save' : 'Rename'}
        </button>
      </div>
    </li>
  );
};

export default Item;
