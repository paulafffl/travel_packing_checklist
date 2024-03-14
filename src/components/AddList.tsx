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
      className="mr-5 mt-4 py-1 pl-2 pr-3"
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
      <span className="ml-1">{name}</span>
    </button>
  );
};

export default AddList;
