import { useContext } from 'react';
import { ItemsContext } from '../context';
import List from './List';

const ListsSection = ({ title }: { title: string }) => {
  const { listsObj, listsShown, packAllItems, unpackAllItems } = useContext(ItemsContext);
  const packed = title === 'Packed Items';

  const listsShowing = listsShown.map((listKey) => listsObj[listKey] || []);

  const countItemsInSection = () => {
    return listsShowing.flatMap((list) => list.filter((item) => item.packed === (packed === true)))
      .length;
  };

  const countItemsInTotal = () => {
    return listsShowing.reduce((sum, list) => sum + list.length, 0);
  };

  const displayMessage = () => {
    if (packed) {
      return countItemsInTotal() > 0
        ? 'Pack items to see them here'
        : '👆 First add items to be packed';
    } else {
      return countItemsInTotal() > 0
        ? 'All packed and ready to travel! 🙌'
        : '🏁 Start a checklist from items above';
    }
  };

  return (
    <section className="section-list w-full">
      <h2>
        {title}
        {countItemsInTotal() > 0 && (
          <span className="font-normal lowercase text-slate-500">{` ( ${countItemsInSection()} out of ${countItemsInTotal()} )`}</span>
        )}
      </h2>
      {Object.keys(listsObj).map(
        (list) =>
          listsShown.includes(list) && <List listName={list} packed={packed} key={title + list} />,
      )}
      {countItemsInSection() === 0 ? (
        <p>
          {countItemsInTotal() > 0 && (
            <span className="inline-block align-middle">
              <img
                src="./logoEmoji.png"
                alt="packing icon"
                className="mr-1 h-auto max-h-5 py-0.2 pb-0.5"
              />
            </span>
          )}
          {displayMessage()}
        </p>
      ) : (
        <button
          className="my-4 mb-0 w-full sm:mb-2"
          onClick={() => (packed ? unpackAllItems() : packAllItems())}
        >
          <span className="inline-block align-bottom">
            {packed ? (
              '🧺'
            ) : (
              <img src="./logoEmoji.png" alt="packing icon" className="h-auto max-h-5 py-0.2" />
            )}
          </span>
          <span className="ml-1">{packed ? 'Unpack all items' : 'Pack all items'}</span>
        </button>
      )}
    </section>
  );
};

export default ListsSection;