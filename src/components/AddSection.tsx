import { useState } from 'react';
import { listSummer, listWinter, listZeroWaste } from '../lib/lists';
import AddItem from './AddItem';
import AddList from './AddList';

const AddSection = () => {
  const [listedSummer, setListedSummer] = useState(false);
  const [listedWinter, setListedWinter] = useState(false);
  const [listedZeroWaste, setListedZeroWaste] = useState(false);

  return (
    <section>
      <h2> ADD ITEMS </h2>
      <AddItem />
      <AddList
        list={listSummer}
        name={'🌞 SUMMER'}
        listedState={listedSummer}
        listedSetState={setListedSummer}
      />
      <AddList
        list={listWinter}
        name={'❄️ WINTER'}
        listedState={listedWinter}
        listedSetState={setListedWinter}
      />
      <AddList
        list={listZeroWaste}
        name={'♻️ ZeroWaste'}
        listedState={listedZeroWaste}
        listedSetState={setListedZeroWaste}
      />
    </section>
  );
};

export default AddSection;
