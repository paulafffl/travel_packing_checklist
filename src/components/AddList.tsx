import { useContext } from 'react';
import { ItemsContext } from '../context';
import { listNameDisplay } from '../utils/listNameDisplayed';

const AddList = ({ listName = 'listName' }: { listName: string }) => {
  const { addListAsObj, listAdded, showList, hideList, listShown } = useContext(ItemsContext);
  const handleClick = () => {
    if (listShown(listName)) {
      hideList(listName);
    } else {
      listAdded(listName) ? showList(listName) : addListAsObj(listName);
    }
  };
  return (
    <button
      className={`mt-3 flex-grow px-2 py-0.5 sm:mt-4 ${
        listShown(listName) && 'color-button-activated'
      }`}
      aria-label={`Add ${listName}`}
      onClick={handleClick}
    >
      {listShown(listName) ? '-' : '+'}
      <span className="m-0.5 sm:m-1"> {listNameDisplay(listName)}</span>
    </button>
  );
};

export default AddList;
