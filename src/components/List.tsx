import Item from './Item';

const List = () => {
  const item = {
    id: 'string',
    name: 'string',
    packed: true,
  };
  return (
    <ul>
      <Item {...item} />
    </ul>
  );
};

export default List;
