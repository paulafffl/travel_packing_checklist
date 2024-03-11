import Item from './Item';

type ItemsProps = {
  items: Item[];
  title: string;
};

const List = ({ title, items }: ItemsProps) => {
  const countMsg =
    title === 'Unpacked Items' ? 'All packed 👜 ' : `${items.length} items`;
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
      {items.length === 0 && <p>{countMsg}</p>}
    </section>
  );
};

export default List;
