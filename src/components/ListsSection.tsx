import { useContext, useMemo, useState } from 'react';
import { ItemsContext } from '../context';
import List from './List';
import Icon from './Icon';
import Modal from './Modal';

const ListsSection = ({ title, totalItems }: { title: string; totalItems: number }) => {
  const [modalPackAll, setModalPackAll] = useState(false);
  const [modalUnpackAll, setModalUnpackAll] = useState(false);
  const { listsObj, listsShown, packAllItems, unpackAllItems } = useContext(ItemsContext);
  const packed = title === 'Packed Items';

  const totalItemsPerSection = useMemo(() => {
    const listsShowing = listsShown.map((listKey) => listsObj[listKey] || []);
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

  const confirmPackAll = () => {
    return (
      <Modal
        message={<p>Are you sure you want to pack all items at once?</p>}
        closeAction={() => setModalPackAll(false)}
        confirmAction={() => packAllItems()}
        confirmButton="Pack"
        confirmColor="color-palette-green"
        confirmIcon={<Icon symbol="check" />}
      />
    );
  };

  const confirmUnpackAll = () => {
    return (
      <Modal
        message={<p>Are you sure you want to unpack all items at once?</p>}
        closeAction={() => setModalUnpackAll(false)}
        confirmAction={() => unpackAllItems()}
        confirmButton="Unpack"
        confirmColor="color-palette-green"
        confirmIcon={<Icon symbol="check" />}
      />
    );
  };

  return (
    <section className="section-list w-full">
      <h2>{title}</h2>
      {totalItemsPerSection !== 0 && (
        <div className="mb-2.5 flex items-center border-b-2 border-amber-300 bg-white pb-3">
          <button
            className={`mr-2 h-7 min-w-7 px-0 text-xs 
              ${packed ? 'color-palette-amber' : 'border-2 border-amber-300'}
            `}
            title={packed ? 'Unpack all items' : 'Pack all items'}
            aria-label={packed ? 'Unpack all items' : 'Pack all items'}
            onClick={() => (packed ? setModalUnpackAll(true) : setModalPackAll(true))}
          >
            <Icon symbol="check" />
          </button>
          <span className="m-0.5 mr-1">{packed ? '🧺' : suitcaseEmoji}</span>
          <span className="mr-1 font-bold uppercase text-slate-500">
            {packed ? 'Unpack all' : 'Pack all'}
          </span>
          {totalItems > 0 && (
            <span className="font-normal lowercase text-slate-600">{` (${totalItemsPerSection} out of ${totalItems})`}</span>
          )}
        </div>
      )}
      {Object.keys(listsObj).map(
        (list) =>
          listsShown.includes(list) && <List listName={list} packed={packed} key={title + list} />,
      )}
      {totalItemsPerSection === 0 && <p className="textWithEmoji">{displayMessage()}</p>}
      {modalPackAll && confirmPackAll()}
      {modalUnpackAll && confirmUnpackAll()}
    </section>
  );
};

export default ListsSection;
