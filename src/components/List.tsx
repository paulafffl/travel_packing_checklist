import Item from './Item';

type ItemsProps = {
  items: Item[];
};

const List = ({ items }: ItemsProps) => {
  return (
    <ul>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default List;
