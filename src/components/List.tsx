import Item from './Item';

type ItemsProps = {
  items: Item[];
};

const List = ({ items }: ItemsProps) => {
  return (
    <section className="w-full bg-white p-8">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default List;
