import { useContext } from 'react';
import { ItemsContext } from '../context';

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
      className="button-with-icon mr-5 mt-4 py-1 pl-2 pr-3"
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
      <span className="material-symbols-outlined mr-1 text-base font-bold">
        {!listedState ? 'add' : 'delete'}
      </span>
      {name}
    </button>
  );
};

export default AddList;
