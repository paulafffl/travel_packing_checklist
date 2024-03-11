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
    <li>
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
      <div>
        <button
          aria-label={`Rename-${item.name}`}
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Update' : 'Rename'}
        </button>
      </div>
    </li>
  );
};

export default Item;
