import AddItem from './AddItem';
import AddList from './AddList';

const AddSection = () => {
  return (
    <section className={'max-h-[60vh] overflow-y-auto sm:h-auto'}>
      <h2> ADD ITEMS </h2>
      <p>{'📝 Add group of items with lists below'}</p>
      <div className="flex flex-wrap gap-x-3 sm:justify-between">
        <AddList listName={'listEssentials'} />
        <AddList listName={'listTech'} />
        <AddList listName={'listZeroWaste'} />
        <AddList listName={'listFood'} />
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
