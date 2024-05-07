import { useContext, useMemo } from 'react';
import { ItemsContext } from '../context';
import List from './List';

const ListsSection = ({ title, totalItems }: { title: string; totalItems: number }) => {
  const { listsObj, listsShown, packAllItems, unpackAllItems } = useContext(ItemsContext);
  const packed = title === 'Packed Items';

  const listsShowing = listsShown.map((listKey) => listsObj[listKey] || []);

  const totalItemsPerSection = useMemo(() => {
    alert('useMemo');
    return listsShowing.flatMap((list) => list.filter((item) => item.packed === (packed === true)))
      .length;
  }, [listsObj, listsShown]);

  const suitcaseEmoji = (
    <img src="./logoEmoji.png" alt="Packing Icon" className="inline-block h-4 pr-0.5 sm:h-5" />
  );

  const displayMessage = () => {
    if (packed) {
      return totalItems > 0 ? (
        <>{suitcaseEmoji} Pack items to see them here</>
      ) : (
        '👆 First add items to be packed'
      );
    } else {
      return totalItems > 0
        ? '🎉 All packed and ready to travel!'
        : '🏁 Start a checklist from items above';
    }
  };

  return (
    <section className="section-list w-full">
      <h2>
        {title}
        {totalItems > 0 && (
          <span className="font-normal lowercase text-slate-600">{` (${totalItemsPerSection} out of ${totalItems})`}</span>
        )}
      </h2>
      {Object.keys(listsObj).map(
        (list) =>
          listsShown.includes(list) && <List listName={list} packed={packed} key={title + list} />,
      )}
      {totalItemsPerSection === 0 ? (
        <p className="textWithEmoji">{displayMessage()}</p>
      ) : (
        <button
          className="color-palette-green my-4 mb-0 w-full sm:mb-2"
          onClick={() => (packed ? unpackAllItems() : packAllItems())}
        >
          <span className="emojiStyle mr-1">{packed ? '🧺' : suitcaseEmoji}</span>
          {packed ? 'Unpack all items' : 'Pack all items'}
        </button>
      )}
    </section>
  );
};

export default ListsSection;
