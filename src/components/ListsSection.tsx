import { useContext, useMemo, useState } from 'react';
import { ItemsContext } from '../context';
import List from './List';
import Icon from './Icon';
import Modal from './Modal';

const ListsSection = ({ title, totalItems }: { title: string; totalItems: number }) => {
  const [modalPackAll, setModalPackAll] = useState(false);
  const [modalUnpackAll, setModalUnpackAll] = useState(false);
  const [modalStartNewTrip, setModalStartNewTrip] = useState(false);
  const { listsObj, listsShown, packAllItems, unpackAllItems, startNewTrip } =
    useContext(ItemsContext);
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

  const confirmStartNewTrip = () => {
    return (
      <Modal
        message={
          <p>
            This will unpack all items and close the default lists.
            <br />
            <br />
            To reset deleted or renamed items, you must ⟲&nbsp;Reset each list individually.
          </p>
        }
        closeAction={() => setModalStartNewTrip(false)}
        confirmAction={() => startNewTrip()}
        confirmButton="Start"
        confirmColor="color-palette-black"
        confirmIcon={<Icon symbol="start" />}
      />
    );
  };

  const shouldShowPackAllButton = !packed && totalItemsPerSection !== 0;

  const shouldShowUnpackAllButton =
    packed && totalItemsPerSection !== 0 && totalItemsPerSection !== totalItems;

  const shouldShowStartNewTripButton =
    packed && totalItemsPerSection !== 0 && totalItemsPerSection === totalItems;

  return (
    <section className="section-list w-full">
      <h2>{title}</h2>
      {(shouldShowPackAllButton || shouldShowUnpackAllButton) && (
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
      {shouldShowStartNewTripButton && (
        <div className="mb-2.5 flex items-center border-b-2 border-black bg-white pb-3">
          <button
            className={'mr-2 h-7 min-w-7 bg-black px-0 text-xs'}
            title="Start your next trip"
            aria-label="Start your next trip"
            onClick={() => setModalStartNewTrip(true)}
          >
            <Icon symbol="start" />
          </button>
          <span className="m-0.5 mr-1">🏁</span>
          <span className="mr-1 font-bold uppercase text-slate-500">Start your next trip</span>
        </div>
      )}
      {Object.keys(listsObj).map(
        (list) =>
          listsShown.includes(list) && <List listName={list} packed={packed} key={title + list} />,
      )}
      {totalItemsPerSection === 0 && <p className="textWithEmoji">{displayMessage()}</p>}
      {modalPackAll && confirmPackAll()}
      {modalUnpackAll && confirmUnpackAll()}
      {modalStartNewTrip && confirmStartNewTrip()}
    </section>
  );
};

export default ListsSection;
