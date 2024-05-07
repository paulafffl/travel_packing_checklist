import { useContext, useMemo, useState } from 'react';
import { ItemsContext } from '../context';
import { listNameDisplay } from '../utils/listNameDisplayed';
import Item from './Item';
import Icon from './Icon';
import Modal from './Modal';

const List = ({ listName, packed }: { listName: string; packed: boolean }) => {
  const [modalDeleteAdditionals, setModalDeleteAdditionals] = useState(false);
  const [modalResetList, setModalResetList] = useState('');
  const [itemsShown, setItemsShown] = useState(true);
  const { listsObj, hideList, removeList, resetList } = useContext(ItemsContext);

  const { packedItems, unpackedItems } = useMemo(() => {
    const items = listsObj[listName] || [];
    return {
      packedItems: items.filter((item) => item.packed),
      unpackedItems: items.filter((item) => !item.packed),
    };
  }, [listsObj, listName]);

  const listShown = (packed && packedItems?.length > 0) || (!packed && unpackedItems?.length > 0);

  const listHeading = () => {
    return (
      <div className="mb-1 mt-2 flex items-center justify-between border-b-2 border-slate-300 pb-2">
        <div className="flex items-center">
          <button
            className={`m-0 mr-1 h-5 w-5 p-0.5 px-0.5 sm:mb-0.5 ${
              itemsShown ? 'color-palette-violet' : 'color-palette-green'
            }`}
            title={itemsShown ? 'Hide items' : 'Show items'}
            aria-label={`${itemsShown ? 'Hide' : 'Show'} ${listName}`}
            onClick={() => (itemsShown ? setItemsShown(false) : setItemsShown(true))}
          >
            <Icon symbol={itemsShown ? 'collapse' : 'expand'} />
          </button>
          <span
            className="list-name"
            onClick={() => (itemsShown ? setItemsShown(false) : setItemsShown(true))}
          >
            {listNameDisplay(listName)}
          </span>
        </div>
        <div>
          <button
            title={`Reset ${
              listName !== 'listAdditionals' ? 'list' : 'not allowed in Additionals'
            }`}
            aria-label={`Reset ${
              listName !== 'listAdditionals' ? listName : 'not allowed in Additionals'
            }`}
            aria-disabled={listName === 'listAdditionals'}
            className={`ml-2 bg-white px-0.5 ${
              listName === 'listAdditionals'
                ? ' cursor-default bg-white hover:bg-white'
                : 'hover:bg-indigo-200'
            }`}
            onClick={() => listName !== 'listAdditionals' && setModalResetList(listName)}
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
            title={'Close list'}
            aria-label={`Close "${listName}"`}
            onClick={() =>
              listName === 'listAdditionals' ? setModalDeleteAdditionals(true) : hideList(listName)
            }
          >
            <Icon symbol="close" color={!!modalDeleteAdditionals ? 'grey' : 'red'} />
          </button>
        </div>
      </div>
    );
  };

  const confirmAdditionalsDeletion = () => {
    return (
      <Modal
        message={
          <p>
            Items you created <strong>cannot be restored</strong>, unlike those in the default
            lists. Do you still want to delete {listNameDisplay('listAdditionals')}&nbsp;?
          </p>
        }
        closeAction={() => setModalDeleteAdditionals(false)}
        confirmAction={() => removeList('listAdditionals')}
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
            to reset the list {listNameDisplay(modalResetList)}&nbsp;?
          </p>
        }
        closeAction={() => setModalResetList('')}
        confirmAction={() => resetList(modalResetList)}
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
      {listShown && listHeading()}
      {listShown && itemsShown && (
        <ul className="flex flex-col">
          {packed
            ? packedItems?.map((item) => <Item key={item.id} item={item} listName={listName} />)
            : unpackedItems?.map((item) => <Item key={item.id} item={item} listName={listName} />)}
        </ul>
      )}
    </div>
  );
};

export default List;
