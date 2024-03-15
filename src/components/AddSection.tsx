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
  const { addedList } = useContext(ItemsContext);
  const [listedToiletries, setListedToiletries] = useState(addedList(listToiletries));
  const [listedZeroWaste, setListedZeroWaste] = useState(addedList(listZeroWaste));
  const [listedFood, setListedFood] = useState(addedList(listFood));
  const [listedTech, setListedTech] = useState(addedList(listTech));
  const [listedEssentials, setListedEssentials] = useState(addedList(listEssentials));
  const [listedLeaving, setListedLeaving] = useState(addedList(listLeaving));
  const [listedClothes, setListedClothes] = useState(addedList(listClothes));
  const [listedSummer, setListedSummer] = useState(addedList(listSummer));
  const [listedWinter, setListedWinter] = useState(addedList(listWinter));
  const [listedCamping, setListedCamping] = useState(addedList(listCamping));

  return (
    <section className={'h-[44vh] overflow-y-auto sm:h-auto'}>
      <h2> ADD ITEMS </h2>
      <AddItem />
      <AddList
        list={listZeroWaste}
        name={'💚 Zero Waste'}
        listedState={listedZeroWaste}
        listedSetState={setListedZeroWaste}
      />
      <AddList
        list={listFood}
        name={'🍎 Food'}
        listedState={listedFood}
        listedSetState={setListedFood}
      />
      <AddList
        list={listTech}
        name={'💻 Tech'}
        listedState={listedTech}
        listedSetState={setListedTech}
      />
      <AddList
        list={listEssentials}
        name={'🎒 Essentials'}
        listedState={listedEssentials}
        listedSetState={setListedEssentials}
      />
      <AddList
        list={listClothes}
        name={'👕 Clothes'}
        listedState={listedClothes}
        listedSetState={setListedClothes}
      />
      <AddList
        list={listLeaving}
        name={'🚪 Leaving'}
        listedState={listedLeaving}
        listedSetState={setListedLeaving}
      />
      <AddList
        list={listSummer}
        name={'🌞 Summer'}
        listedState={listedSummer}
        listedSetState={setListedSummer}
      />
      <AddList
        list={listWinter}
        name={'❄️ Winter'}
        listedState={listedWinter}
        listedSetState={setListedWinter}
      />
      <AddList
        list={listToiletries}
        name={'🛁 Toiletries'}
        listedState={listedToiletries}
        listedSetState={setListedToiletries}
      />
      <AddList
        list={listCamping}
        name={'🏕️ Camping'}
        listedState={listedCamping}
        listedSetState={setListedCamping}
      />
    </section>
  );
};

export default AddSection;
