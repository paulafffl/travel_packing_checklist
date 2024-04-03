import { useContext } from 'react';
import { ItemsContext } from '../context';
import { listNameDisplay } from '../utils/listNameDisplayed';

const AddList = ({ listName = 'listName' }: { listName: string }) => {
  const { addList, listAdded, showList, hideList, listsShown } = useContext(ItemsContext);
  const listShown = () => listsShown.includes(listName);
  const handleClick = () => {
    if (listShown()) {
      hideList(listName);
    } else {
      listAdded(listName) ? showList(listName) : addList(listName);
    }
  };
  return (
    <button
      className={`mt-3 flex-grow px-2 py-0.5 sm:mt-4 ${listShown() && 'color-button-activated'}`}
      aria-label={`Add ${listName}`}
      onClick={handleClick}
    >
      {listShown() ? '-' : '+'}
      <span className="m-0.5 sm:m-1"> {listNameDisplay(listName)}</span>
    </button>
  );
};

export default AddList;
