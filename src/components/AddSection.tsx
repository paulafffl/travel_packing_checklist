import { useState } from 'react';
import {
  listCamping,
  listClothes,
  listEssentials,
  listFood,
  listReadyToGo,
  listSummer,
  listTech,
  listToiletries,
  listWinter,
  listZeroWaste,
} from '../lib/lists';
import AddItem from './AddItem';
import AddList from './AddList';

const AddSection = () => {
  const [listedToiletries, setListedToiletries] = useState(true);
  const [listedZeroWaste, setListedZeroWaste] = useState(false);
  const [listedFood, setListedFood] = useState(false);
  const [listedTech, setListedTech] = useState(false);
  const [listedEssentials, setListedEssentials] = useState(false);
  const [listedReadyToGo, setListedReadyToGo] = useState(false);
  const [listedClothes, setListedClothes] = useState(false);
  const [listedSummer, setListedSummer] = useState(false);
  const [listedWinter, setListedWinter] = useState(false);
  const [listedCamping, setListedCamping] = useState(false);

  return (
    <section className={'scrollbar h-[40vh] overflow-y-auto sm:h-auto'}>
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
        list={listReadyToGo}
        name={'🚪 Ready To Go'}
        listedState={listedReadyToGo}
        listedSetState={setListedReadyToGo}
      />
      <AddList
        list={listClothes}
        name={'👕 Clothes'}
        listedState={listedClothes}
        listedSetState={setListedClothes}
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
        list={listCamping}
        name={'🏕️ Camping'}
        listedState={listedCamping}
        listedSetState={setListedCamping}
      />
      <AddList
        list={listToiletries}
        name={'🛁 Toiletries'}
        listedState={listedToiletries}
        listedSetState={setListedToiletries}
      />
    </section>
  );
};

export default AddSection;
