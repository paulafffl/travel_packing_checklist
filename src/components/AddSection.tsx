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
      <AddItem />
      <p className="mt-4 text-slate-500">{'Or add group of items from lists below'}</p>
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
        list={listTech}
        listName={'listTech'}
        name={'⚡ Tech'}
        listedState={addedListAsObj('listTech')}
      />
      <AddList
        list={listEssentials}
        listName={'listEssentials'}
        name={'🎒 Essentials'}
        listedState={addedListAsObj('listEssentials')}
      />
      <AddList
        list={listClothes}
        listName={'listClothes'}
        name={'👕 Clothes'}
        listedState={addedListAsObj('listClothes')}
      />
      <AddList
        list={listLeaving}
        listName={'listLeaving'}
        name={'🚪 Leaving'}
        listedState={addedListAsObj('listLeaving')}
      />
      <AddList
        list={listSummer}
        listName={'listSummer'}
        name={'☀️ Summer'}
        listedState={addedListAsObj('listSummer')}
      />
      <AddList
        list={listWinter}
        listName={'listWinter'}
        name={'❄️ Winter'}
        listedState={addedListAsObj('listWinter')}
      />
      <AddList
        list={listToiletries}
        listName={'listToiletries'}
        name={'🛁 Toiletries'}
        listedState={addedListAsObj('listToiletries')}
      />
      <AddList
        list={listCamping}
        listName={'listCamping'}
        name={'🏕️ Camping'}
        listedState={addedListAsObj('listCamping')}
      />
    </section>
  );
};

export default AddSection;
