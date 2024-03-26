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
      className={`mr-2 mt-3 px-2 sm:mr-5 sm:mt-4 sm:pl-2 sm:pr-3 ${
        listedState && 'color-palette-red'
      }`}
      aria-label={`Add List for ${name}`}
      onClick={() => (!listedState ? addListAsObj(list, listName) : removeListAsObj(listName))}
    >
      <Icon symbol={listedState ? 'remove' : 'add'} />
      <span className="m-0.5 sm:m-1">{name}</span>
    </button>
  );
};

export default AddList;
