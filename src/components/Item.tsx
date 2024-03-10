type ItemProps = {
  item: Item;
};

const Item = ({ item }: ItemProps) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        id={item.id}
        onChange={() => alert('Temporary')}
      />
      <label htmlFor={item.id}>{item.name}</label>
    </li>
  );
};

export default Item;
