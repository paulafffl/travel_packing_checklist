import { useContext } from 'react';
import { ItemsContext } from '../context';
import Icon from './Icon';

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
      className={'mt-3 flex-grow px-2 py-0.5 sm:mt-4'}
      disabled={listedState}
      aria-label={`Add List for ${name}`}
      onClick={() => (!listedState ? addListAsObj(list, listName) : removeListAsObj(listName))}
    >
      +<span className="m-0.5 sm:m-1">{name}</span>
    </button>
  );
};

export default AddList;
