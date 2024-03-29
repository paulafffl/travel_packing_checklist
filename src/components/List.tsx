import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import { listNameDisplay } from '../utils/listNameDisplayed';
import Item from './Item';
import Icon from './Icon';
import Modal from './Modal';

const List = ({ list, packed }: { list: string; packed: boolean }) => {
  const [modalDeleteAdditionals, setModalDeleteAdditionals] = useState(false);
  const [modalResetList, setModalResetList] = useState('');
  const {
    listIsShown,
    showList,
    hideList,
    packedItemsAsObj,
    unpackedItemsAsObj,
    removeListAsObj,
    resetListAsObj,
  } = useContext(ItemsContext);

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
              title={listIsShown(listName) ? 'Hide items' : 'Show items'}
              onClick={() => (listIsShown(listName) ? hideList(listName) : showList(listName))}
            >
              <Icon symbol={listIsShown(listName) ? 'collapse' : 'expand'} />
            </button>
            <span className="m-0.5 text-slate-400 sm:m-1">{listNameDisplay(listName)}</span>
          </div>
          <div>
            <button
              className={`ml-2 bg-white px-0.5 ${
                listName === 'listAdditionals' ? 'disabled:bg-white' : 'hover:bg-indigo-200'
              }`}
              aria-label={`Reset "${listName}"`}
              title={'Reset list'}
              disabled={listName === 'listAdditionals'}
              onClick={() => setModalResetList(listName)}
            >
              <Icon
                symbol="reset"
                color={listName === 'listAdditionals' ? 'lightgrey' : 'cornflowerblue'}
              />
            </button>
            <button
              className={`ml-2 bg-white px-0.5 ${
                !!modalDeleteAdditionals ? 'disabled:bg-white' : 'hover:bg-rose-200'
              }`}
              aria-label={`Delete "${listName}"`}
              title={'Remove list'}
              disabled={!!modalDeleteAdditionals}
              onClick={() =>
                listName === 'listAdditionals'
                  ? setModalDeleteAdditionals(true)
                  : removeListAsObj(listName)
              }
            >
              <Icon symbol="close" color={!!modalDeleteAdditionals ? 'grey' : 'red'} />
            </button>
          </div>
        </div>
      );
    }
  };

  const confirmAdditionalsDeletion = () => {
    return (
      <Modal
        message={
          <p>
            Items you created <strong>cannot be restored</strong>, unlike those in the default
            lists. Do you still want to delete {listNameDisplay('listAdditionals')} ?
          </p>
        }
        closeAction={() => setModalDeleteAdditionals(false)}
        confirmAction={() => removeListAsObj('listAdditionals')}
        confirmButton="Delete"
        confirmColor="color-palette-red"
        confirmIcon={<Icon symbol="delete" />}
      />
    );
  };

  const confirmListReset = () => {
    return (
      <Modal
        message={
          <p>
            This will replace any deleted or renamed items with the default ones. Do you still want
            to reset the list {listNameDisplay(modalResetList)} ?
          </p>
        }
        closeAction={() => setModalResetList('')}
        confirmAction={() => resetListAsObj(modalResetList)}
        confirmButton="Reset"
        confirmColor="color-palette-blue"
        confirmIcon={<Icon symbol="reset" />}
      />
    );
  };

  return (
    <div>
      {modalDeleteAdditionals && confirmAdditionalsDeletion()}
      {modalResetList && confirmListReset()}
      {displaySectionName(list)}
      {listIsShown(list) && displaySectionName(list) && (
        <ul className="flex flex-col">
          {packed
            ? packedItemsAsObj(list)?.map((item) => <Item key={item.id} item={item} />)
            : unpackedItemsAsObj(list)?.map((item) => <Item key={item.id} item={item} />)}
        </ul>
      )}
    </div>
  );
};

export default List;
