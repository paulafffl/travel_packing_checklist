import { listNameEmoji } from './listNameEmoji';

export const listNameDisplay = (name: string) => {
  const listName = name?.substring(4).toUpperCase();
  const displayName = listName === 'ZEROWASTE' ? 'ZERO WASTE' : listName;
  return (
    <>
      <span role="img" aria-label={name} className={'m-0 p-0'}>
        {listNameEmoji[name]}
      </span>
      &nbsp;<span className="font-bold">{displayName}</span>
    </>
  );
};
