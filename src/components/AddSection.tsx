import { useContext } from 'react';
import { ItemsContext } from '../context';
import AddItem from './AddItem';
import AddList from './AddList';

const AddSection = () => {
  const { addedListAsObj } = useContext(ItemsContext);

  return (
    <section className={'max-h-[60vh] overflow-y-auto sm:h-auto'}>
      <h2> ADD ITEMS </h2>
      <p>{'📝 Add group of items with lists below'}</p>
      <div className="flex flex-wrap gap-x-3 sm:justify-between">
        <AddList listName={'listEssentials'} listedState={addedListAsObj('listEssentials')} />
        <AddList listName={'listTech'} listedState={addedListAsObj('listTech')} />
        <AddList listName={'listZeroWaste'} listedState={addedListAsObj('listZeroWaste')} />
        <AddList listName={'listFood'} listedState={addedListAsObj('listFood')} />
        <AddList listName={'listClothes'} listedState={addedListAsObj('listClothes')} />
        <AddList listName={'listToiletries'} listedState={addedListAsObj('listToiletries')} />
        <AddList listName={'listLeaving'} listedState={addedListAsObj('listLeaving')} />
        <AddList listName={'listCamping'} listedState={addedListAsObj('listCamping')} />
        <AddList listName={'listWinter'} listedState={addedListAsObj('listWinter')} />
        <AddList listName={'listSummer'} listedState={addedListAsObj('listSummer')} />
      </div>
      <AddItem />
    </section>
  );
};

export default AddSection;
