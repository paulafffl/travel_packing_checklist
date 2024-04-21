import { listNameEmoji } from './listNameEmoji';

export const listNameDisplay = (name: string) => {
  const listName = name?.substring(4).toUpperCase();
  return (
    <>
      <span role="img" aria-label={name} className={'m-0 mr-0.2 p-0'}>
        {listNameEmoji[name]}
      </span>
      &nbsp;<span className="font-bold">{listName}</span>
    </>
  );
};
