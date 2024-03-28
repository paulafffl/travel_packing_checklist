import { useContext } from 'react';
import { ItemsContext } from '../context';
import Item from './Item';
import Emoji from './Emoji';
import Icon from './Icon';
import toast, { Toaster } from 'react-hot-toast';

const List = ({ list, packed }: { list: string; packed: boolean }) => {
  const { listIsShown, showList, hideList, packedItemsAsObj, unpackedItemsAsObj, removeListAsObj } =
    useContext(ItemsContext);

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
            onClick={() =>
              listName === 'listAdditionals'
                ? toast(
                    (t) => (
                      <div className="text-center">
                        <p>
                          Items you created <b>can't be restored</b> like the ones in the default
                          lists. Do you still want to delete {`📝\u00A0Additionals`}?
                        </p>
                        <br />
                        <div className="mb-2 flex w-full gap-4">
                          <button
                            className="color-palette-green flex-grow"
                            onClick={() => {
                              toast.dismiss(t.id);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="color-palette-red flex-grow"
                            onClick={() => {
                              removeListAsObj(listName);
                              toast.dismiss(t.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ),
                    {
                      duration: 9000,
                      position: 'bottom-center',
                    },
                  )
                : removeListAsObj(listName)
            }
          >
            <Icon symbol="close" color={'red'} />
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <div>
        {displaySectionName(list)}
        {listIsShown(list) && displaySectionName(list) && (
          <ul className="flex flex-col">
            {packed
              ? packedItemsAsObj(list)?.map((item) => <Item key={item.id} item={item} />)
              : unpackedItemsAsObj(list)?.map((item) => <Item key={item.id} item={item} />)}
          </ul>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default List;
