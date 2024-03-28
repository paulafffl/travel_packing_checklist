import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import {
  listCamping,
  listClothes,
  listEssentials,
  listFood,
  listLeaving,
  listSummer,
  listTech,
  listToiletries,
  listWinter,
  listZeroWaste,
} from '../lib/lists';
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
          list={listEssentials}
          listName={'listEssentials'}
          name={'🎒 Essentials'}
          listedState={addedListAsObj('listEssentials')}
        />
        <AddList
          list={listTech}
          listName={'listTech'}
          name={'⚡ Tech'}
          listedState={addedListAsObj('listTech')}
        />
        <AddList
          list={listZeroWaste}
          listName={'listZeroWaste'}
          name={'💚 Zero Waste'}
          listedState={addedListAsObj('listZeroWaste')}
        />
        <AddList
          list={listFood}
          listName={'listFood'}
          name={'🍎 Food'}
          listedState={addedListAsObj('listFood')}
        />
        <AddList
          list={listClothes}
          listName={'listClothes'}
          name={'👕 Clothes'}
          listedState={addedListAsObj('listClothes')}
        />
        <AddList
          list={listToiletries}
          listName={'listToiletries'}
          name={'🛁 Toiletries'}
          listedState={addedListAsObj('listToiletries')}
        />
        <AddList
          list={listLeaving}
          listName={'listLeaving'}
          name={'🚪 Leaving'}
          listedState={addedListAsObj('listLeaving')}
        />
        <AddList
          list={listCamping}
          listName={'listCamping'}
          name={'🏕️ Camping'}
          listedState={addedListAsObj('listCamping')}
        />

        <AddList
          list={listWinter}
          listName={'listWinter'}
          name={'❄️ Winter'}
          listedState={addedListAsObj('listWinter')}
        />
        <AddList
          list={listSummer}
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
