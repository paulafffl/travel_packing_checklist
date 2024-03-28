import { useContext } from 'react';
import { ItemsContext } from '../context';
import List from './List';

const ListsSection = ({ title }: { title: string }) => {
  const { listsObj, packAllItemsAsObj, unpackAllItemsAsObj } = useContext(ItemsContext);
  const packed = title === 'Packed Items';

  const countItemsInList = () =>
    Object.values(listsObj).flatMap((list) =>
      list.filter((item) => item.packed === (packed === true)),
    ).length;

  const countItemsInTotal = () =>
    Object.values(listsObj).reduce((sum, list) => sum + list.length, 0);

  const displayMessage = () => {
    if (packed) {
      return countItemsInTotal() > 0
        ? '📦 Pack items to see them here'
        : '👆 First add items to be packed';
    } else {
      return countItemsInTotal() > 0
        ? '📦 All packed and ready to travel! 🙌'
        : '🏁 Start a checklist from items above';
    }
  };

  return (
    <section className="section-list w-full">
      <h2>
        {title}
        {countItemsInTotal() > 0 && (
          <span className="lowercase text-slate-400">{` ( ${countItemsInList()} out of ${countItemsInTotal()} )`}</span>
        )}
      </h2>
      {Object.keys(listsObj).map((list) => (
        <List list={list} packed={packed} />
      ))}
      {countItemsInList() === 0 ? (
        <p>{displayMessage()}</p>
      ) : (
        <button
          className="my-4 mb-0 w-full sm:mb-2"
          onClick={() => (packed ? unpackAllItemsAsObj() : packAllItemsAsObj())}
        >
          <span>{packed ? '🧺' : '📦'}</span>
          <span className="ml-1">{packed ? 'Unpack all items' : 'Pack all items'}</span>
        </button>
      )}
    </section>
  );
};

export default ListsSection;
