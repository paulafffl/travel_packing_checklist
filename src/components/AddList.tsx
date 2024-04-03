import { useContext } from 'react';
import { ItemsContext } from '../context';
import { listNameDisplay } from '../utils/listNameDisplayed';

const AddList = ({ listName = 'listName' }: { listName: string }) => {
  const { addList, showList, hideList, listsShown, listsAdded } = useContext(ItemsContext);
  const listShown = listsShown.includes(listName);
  const listAdded = listsAdded.includes(listName);
  const handleClick = () => {
    if (listShown) {
      hideList(listName);
    } else {
      listAdded ? showList(listName) : addList(listName);
    }
  };
  return (
    <button
      className={`mt-3 flex-grow px-2 py-0.5 sm:mt-4 ${listShown && 'color-button-activated'}`}
      aria-label={`Add ${listName}`}
      onClick={handleClick}
    >
      {listShown ? '-' : '+'}
      <span className="m-0.5 sm:m-1"> {listNameDisplay(listName)}</span>
    </button>
  );
};

export default AddList;
