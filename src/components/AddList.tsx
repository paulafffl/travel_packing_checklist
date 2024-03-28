import { useContext } from 'react';
import { ItemsContext } from '../context';

type ItemProps = {
  list: string[];
  name: string;
  listedState: boolean;
  listName?: string;
};

const AddList = ({ list, name, listedState, listName = 'listName' }: ItemProps) => {
  const { addListAsObj, removeListAsObj } = useContext(ItemsContext);
  return (
    <button
      className={`mt-3 flex-grow px-1 py-0.5 sm:mt-4 ${listedState && 'color-button-activated'}`}
      aria-label={`Add List for ${name}`}
      onClick={() => (!listedState ? addListAsObj(list, listName) : removeListAsObj(listName))}
    >
      {listedState ? '-' : '+'}
      <span className="m-0.5 sm:m-1">{name}</span>
    </button>
  );
};

export default AddList;
