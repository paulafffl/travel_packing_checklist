import Item from './Item';

type ItemsProps = {
  items: Item[];
};

const List = ({ items }: ItemsProps) => {
  return (
    <section>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
};

export default List;
