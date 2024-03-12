import { useContext } from 'react';
import { ItemsContext } from '../context';
import Item from './Item';

type ItemsProps = {
  items: Item[];
  title: string;
};

const List = ({ title, items }: ItemsProps) => {
  const { packAllItems, unpackAllItems, totalItems } = useContext(ItemsContext);
  const packed = title === 'Packed Items';
  return (
    <section className="w-full">
      <h2>
        {title}
        {packed && (
          <span className="text-slate-400">
            {` (${items.length} / ${totalItems})`}
          </span>
        )}
      </h2>
      <ul className="flex flex-col">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
      {items.length === 0 ? (
        <p className="mt-2 text-slate-500">
          {packed
            ? '🎒 Tick off items to see them here'
            : "👜 All packed, you're ready for your next travel! 🙌"}
        </p>
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
