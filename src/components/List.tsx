import { useContext } from 'react';
import { ItemsContext } from '../context';
import Item from './Item';
import Emoji from './Emoji';
import Icon from './Icon';

const List = ({ title }: { title: string }) => {
  const {
    listsObj,
    listIsShown,
    showList,
    hideList,
    packAllItemsAsObj,
    unpackAllItemsAsObj,
    packedItemsAsObj,
    unpackedItemsAsObj,
    removeListAsObj,
  } = useContext(ItemsContext);
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
        ? '👜 Pack items to see them here'
        : '👆 First add items to be packed';
    } else {
      return countItemsInTotal() > 0
        ? '👜 All packed and ready to travel! 🙌'
        : '🏁 Start a checklist from items above';
    }
  };

  const displaySectionName = (listName: string) => {
    const packedItems = packedItemsAsObj(listName);
    const unpackedItems = unpackedItemsAsObj(listName);
    if ((packed && packedItems?.length > 0) || (!packed && unpackedItems?.length > 0)) {
      return (
        <div className="mb-1 mt-2 flex items-center justify-between border-b-2 border-slate-300 pb-2">
          <div className="flex items-center">
            <button
              className={`m-0 mr-1 h-5 w-5 p-0.5 px-0.5 sm:mb-0.5 ${
                listIsShown(listName) && 'color-palette-green'
              }`}
              aria-label={`Add List for ${listName}`}
              onClick={() => (listIsShown(listName) ? hideList(listName) : showList(listName))}
            >
              <Icon symbol={listIsShown(listName) ? 'collapse' : 'expand'} />
            </button>
            <Emoji name={listName} />
            <span className="m-0.5 font-bold text-slate-400 sm:m-1">
              {listName.substring(4).toUpperCase()}
            </span>
          </div>
          <button
            className="ml-2 bg-white px-0.5 hover:bg-rose-200"
            aria-label={`Delete "${listName}"`}
            onClick={() => removeListAsObj(listName)}
          >
            <Icon symbol="close" color={'red'} />
          </button>
        </div>
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
          {listIsShown(list) && displaySectionName(list) && (
            <ul className="flex flex-col">
              {packed
                ? packedItemsAsObj(list)?.map((item) => <Item key={item.id} item={item} />)
                : unpackedItemsAsObj(list)?.map((item) => <Item key={item.id} item={item} />)}
            </ul>
          )}
        </div>
      ))}
      {countItemsInList() === 0 ? (
        <p>{displayMessage()}</p>
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
