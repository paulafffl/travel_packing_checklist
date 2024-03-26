import { useContext } from 'react';
import { ItemsContext } from '../context';
import Item from './Item';
import Emoji from './Emoji';

const List = ({ title }: { title: string }) => {
  const { listsObj, packAllItemsAsObj, unpackAllItemsAsObj, packedItemsAsObj, unpackedItemsAsObj } =
    useContext(ItemsContext);
  const packed = title === 'Packed Items';

  const countItemsInList = () =>
    Object.values(listsObj).flatMap((list) =>
      list.filter((item) => item.packed === (packed === true)),
    ).length;

  const countItemsInTotal = () =>
    Object.values(listsObj).reduce((sum, list) => sum + list.length, 0);

  const displayMessage = () => {
    let messageDisplayed = '';
    if (packed) {
      messageDisplayed = '🎒 Tick off items to see them here';
    }
    if (!packed) {
      messageDisplayed =
        countItemsInTotal() > 0
          ? "👜 All packed, you're ready for your next travel! 🙌"
          : '📝 Start a checklist from items above';
    }
    return messageDisplayed;
  };

  const displaySectionName = (list: string) => {
    const packedItems = packedItemsAsObj(list);
    const unpackedItems = unpackedItemsAsObj(list);
    if ((packed && packedItems?.length > 0) || (!packed && unpackedItems?.length > 0)) {
      return (
        <p className={'mb-1 mt-3 border-b-2 border-slate-300 pb-1 font-bold text-primary-500'}>
          {list.substring(4).toUpperCase()}
          <Emoji name={list} />
        </p>
      );
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
        <div key={list}>
          {displaySectionName(list)}
          <ul className="flex flex-col">
            {packed
              ? packedItemsAsObj(list)?.map((item) => <Item key={item.id} item={item} />)
              : unpackedItemsAsObj(list)?.map((item) => <Item key={item.id} item={item} />)}
          </ul>
        </div>
      ))}
      {countItemsInList() === 0 ? (
        <p className="mt-0 text-slate-500 sm:mt-2">{displayMessage()}</p>
      ) : (
        <button
          className="my-4 mb-0 w-full sm:mb-2"
          onClick={() => (packed ? unpackAllItemsAsObj() : packAllItemsAsObj())}
        >
          <span>{packed ? '🧺' : '👜'}</span>
          <span className="ml-1">{packed ? 'Unpack all items' : 'Pack all items'}</span>
        </button>
      )}
    </section>
  );
};

export default List;
