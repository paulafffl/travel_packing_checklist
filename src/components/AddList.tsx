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
      className={`mt-3 flex-grow sm:mt-4 ${listShown && 'color-button-activated'}`}
      aria-label={`Add ${listName}`}
      onClick={handleClick}
    >
      <span>
        {listShown ? '-' : '+'}&nbsp;{listNameDisplay(listName)}
      </span>
    </button>
  );
};

export default AddList;
