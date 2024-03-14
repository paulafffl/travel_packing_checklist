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
      className="mt-4 px-2 py-1"
      aria-label={`Add List for SUMMER`}
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
      {name} LIST
    </button>
  );
};

export default AddList;
