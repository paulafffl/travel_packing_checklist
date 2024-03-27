import React from 'react';

type EmojiList = {
  [key: string]: string;
};

export const listEmojis: EmojiList = {
  listZeroWaste: '💚',
  listFood: '🍎',
  listTech: '⚡',
  listEssentials: '🎒',
  listClothes: '👕',
  listLeaving: '🚪',
  listSummer: '☀️',
  listWinter: '❄️',
  listToiletries: '🛁',
  listCamping: '🏕️',
  listAdditionals: '📝',
};

const Emoji = ({ name }: { name: string }) => {
  return (
    <span role="img" aria-label={name} className={'m-0 ml-1 mr-0.5 p-0'}>
      {listEmojis[name]}
    </span>
  );
};

export default Emoji;
