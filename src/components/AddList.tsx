import { useContext } from 'react';
import { ItemsContext } from '../context';
import Icon from './Icon';

type ItemProps = {
  list: string[];
  name: string;
  listedState: boolean;
  listedSetState: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddList = ({ list, name, listedState, listedSetState }: ItemProps) => {
  const { addList, removeList } = useContext(ItemsContext);
  return (
    <button
      className={`mr-2 mt-3 px-2 py-1 sm:mr-5 sm:mt-4 sm:pl-2 sm:pr-3 ${
        listedState && 'color-palette-red'
      }`}
      aria-label={`Add List for ${name}`}
      onClick={() => {
        if (!listedState) {
          addList(list);
          listedSetState(true);
        } else {
          removeList(list);
          listedSetState(false);
        }
      }}
    >
      <Icon symbol={listedState ? 'remove' : 'add'} />
      <span className="m-0.5 sm:m-1">{name}</span>
    </button>
  );
};

export default AddList;
