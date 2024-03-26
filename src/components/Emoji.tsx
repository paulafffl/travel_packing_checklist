import React from 'react';

type EmojiList = {
  [key: string]: string;
};

const listEmojis: EmojiList = {
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
    <span role="img" aria-label={name} className={'ml-1 p-0'}>
      {listEmojis[name]}
    </span>
  );
};

export default Emoji;
