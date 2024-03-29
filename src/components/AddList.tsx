import { useContext } from 'react';
import { ItemsContext } from '../context';
import { listNameDisplay } from '../utils/listNameDisplayed';

type ItemProps = {
  listName: string;
  listedState: boolean;
};

const AddList = ({ listName = 'listName', listedState }: ItemProps) => {
  const { addListAsObj, removeListAsObj } = useContext(ItemsContext);
  return (
    <button
      className={`mt-3 flex-grow px-1 py-0.5 sm:mt-4 ${listedState && 'color-button-activated'}`}
      aria-label={`Add ${listName}`}
      onClick={() => (!listedState ? addListAsObj(listName) : removeListAsObj(listName))}
    >
      {listedState ? '-' : '+'}
      <span className="m-0.5 sm:m-1"> {listNameDisplay(listName)}</span>
    </button>
  );
};

export default AddList;
