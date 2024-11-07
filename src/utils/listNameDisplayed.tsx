import { listNameEmoji } from './listNameEmoji';

export const listNameDisplay = (name: string) => {
  const listName = name?.substring(4).toUpperCase();
  return (
    <>
      <span role="img" aria-hidden="true" className="emojiStyle">
        {listNameEmoji[name]}
      </span>
      &nbsp;<span className="font-bold">{listName}</span>
    </>
  );
};
