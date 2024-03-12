import { useContext } from 'react';
import { ItemsContext } from '../context';
import Item from './Item';

type ItemsProps = {
  items: Item[];
  title: string;
};

const List = ({ title, items }: ItemsProps) => {
  const { packAllItems, unpackAllItems } = useContext(ItemsContext);
  const packed = title === 'Packed Items';
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
      {items.length === 0 ? (
        <p>{packed ? `${items.length} items` : 'All packed 👜 '}</p>
      ) : (
        <button
          className="my-4 w-full"
          onClick={() => (packed ? unpackAllItems() : packAllItems())}
        >
          <span className="material-symbols-outlined">
            {packed ? 'upload' : 'download'}
          </span>{' '}
          {packed ? 'Unpack all items' : 'Pack all items'}
        </button>
      )}
    </section>
  );
};

export default List;
