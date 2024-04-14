import AddItem from './AddItem';
import AddList from './AddList';

const AddSection = () => {
  return (
    <section className={'max-h-[60vh] overflow-y-auto sm:h-auto'}>
      <h2> ADD ITEMS </h2>
      <p>{'📝 Add group of items with lists below'}</p>
      <div className="grid grid-cols-2 gap-x-3 md:grid-cols-5">
        <AddList listName={'listEssentials'} />
        <AddList listName={'listReusables'} />
        <AddList listName={'listDevices'} />
        <AddList listName={'listSnacks'} />
        <AddList listName={'listClothes'} />
        <AddList listName={'listToiletries'} />
        <AddList listName={'listLeaving'} />
        <AddList listName={'listCamping'} />
        <AddList listName={'listWinter'} />
        <AddList listName={'listSummer'} />
      </div>
      <AddItem />
    </section>
  );
};

export default AddSection;
