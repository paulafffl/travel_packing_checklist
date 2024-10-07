import { useContext, useState } from 'react';
import { ItemsContext } from '../context';
import Icon from './Icon';
import Modal from './Modal';
import { listNameDisplay } from '../utils/listNameDisplayed';
import { listEmojis } from '../utils/listEmojis';

const Item = ({ item, listName }: { item: Item; listName: string }) => {
  const [editing, setEditing] = useState(false);
  const { changeItem, removeItem } = useContext(ItemsContext);
  const [visible, setVisible] = useState(true);
  const [checked, setChecked] = useState(item.packed);
  const [modalDeleteItem, setModalDeleteItem] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    setVisible(false);
    setTimeout(() => changeItem(item.id, { packed: !item.packed }), 300);
  };

  const confirmItemDeletion = () => {
    return (
      <Modal
        message={
          listName === 'listAdditionals' ? (
            <p>
              Are you sure you want to delete? Created items <strong>cannot be restored</strong>
            </p>
          ) : (
            <p>
              Are you sure you want to delete? To restore this item, you'll need to reset the whole{' '}
              {listNameDisplay(listName)} list
            </p>
          )
        }
        closeAction={() => setModalDeleteItem(false)}
        confirmAction={() => removeItem(item.id, listName)}
        confirmButton="Delete"
        confirmColor="color-palette-red"
        confirmIcon={<Icon symbol="delete" />}
      />
    );
  };

  return (
    <>
      {modalDeleteItem && confirmItemDeletion()}
      <li
        className={`my-1 flex items-center gap-1 
        ${visible ? 'uncheckingCheckbox' : 'checkingCheckbox'}`}
      >
        <button
          role="checkbox"
          id={`checkbox-item-${item.id}`}
          className={`mr-2 h-7 min-w-7 px-0 text-xs 
          ${checked ? 'color-palette-amber' : 'border-2 border-amber-300'}
        `}
          onKeyDown={(e) => e.key === 'Enter' && handleCheckboxChange()}
          onClick={handleCheckboxChange}
          tabIndex={0}
          title={`${checked ? 'Uncheck' : 'Check'}`}
          aria-label={`${checked ? 'Uncheck' : 'Check'} ${item.name}`}
        >
          <Icon symbol="check" />
        </button>
        <label htmlFor={`checkbox-item-${item.id}`} className={'screen-readers-only'}>
          {item.name}
        </label>
        {listEmojis[item.name.toLowerCase()] && (
          <span role="img" aria-hidden="true">
            {listEmojis[item.name.toLowerCase()]}
          </span>
        )}
        <input
          value={item.name}
          id={`label-item-${item.id}`}
          className={`mr-1 w-full pl-0 focus:pl-2
          ${editing ? 'ml-0 pl-2 focus:pl-2' : 'border-white bg-white'}`}
          size={item.name.length}
          onClick={() => setEditing(true)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(!editing)}
          onChange={(event) => changeItem(item.id, { name: event.target.value })}
        />
        <label htmlFor={`label-item-${item.id}`} className={'screen-readers-only'}>
          Item Name:
        </label>
        <div className="ml-auto flex gap-y-0">
          <button
            className={`h-7 w-7 px-1 text-xs ${
              editing ? 'color-palette-violet' : 'color-palette-green'
            }`}
            title={`${editing ? 'Save' : 'Edit'}`}
            aria-label={`${editing ? 'Save' : 'Edit'} ${item.name}`}
            onClick={() => setEditing(!editing)}
          >
            <Icon symbol={editing ? 'save' : 'edit'} />
          </button>
          <button
            className="color-palette-red ml-2 h-7 w-7 px-1 text-xs"
            title={'Delete'}
            aria-label={`Delete ${item.name}`}
            onClick={() => setModalDeleteItem(true)}
          >
            <Icon symbol="delete" />
          </button>
        </div>
      </li>
    </>
  );
};

export default Item;
