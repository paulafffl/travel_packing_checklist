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
        <AddList
          listName={'listEssentials'}
          name={'🎒 Essentials'}
          listedState={addedListAsObj('listEssentials')}
        />
        <AddList listName={'listTech'} name={'⚡ Tech'} listedState={addedListAsObj('listTech')} />
        <AddList
          listName={'listZeroWaste'}
          name={'💚 Zero Waste'}
          listedState={addedListAsObj('listZeroWaste')}
        />
        <AddList listName={'listFood'} name={'🍎 Food'} listedState={addedListAsObj('listFood')} />
        <AddList
          listName={'listClothes'}
          name={'👕 Clothes'}
          listedState={addedListAsObj('listClothes')}
        />
        <AddList
          listName={'listToiletries'}
          name={'🛁 Toiletries'}
          listedState={addedListAsObj('listToiletries')}
        />
        <AddList
          listName={'listLeaving'}
          name={'🚪 Leaving'}
          listedState={addedListAsObj('listLeaving')}
        />
        <AddList
          listName={'listCamping'}
          name={'🏕️ Camping'}
          listedState={addedListAsObj('listCamping')}
        />

        <AddList
          listName={'listWinter'}
          name={'❄️ Winter'}
          listedState={addedListAsObj('listWinter')}
        />
        <AddList
          listName={'listSummer'}
          name={'☀️ Summer'}
          listedState={addedListAsObj('listSummer')}
        />
      </div>
      <AddItem />
    </section>
  );
};

export default AddSection;
