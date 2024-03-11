import { v4 as id } from 'uuid';

export const createItem = (name: string): Item => {
  return {
    id: id(),
    name,
    packed: false,
  };
};

let items = [
  '⛺ Tent',
  '🛌 Sleeping Bag',
  '➖ Insulating Mat',
  '🔨 Hammer',
  '🔦 Solar light/flashlight',
  '🚿 Solar shower',
  '🪝 Hook',
  '🪣 Water container',
  '🔶 Travel Towel',
  '🧻 Toilet Roll',
  '🐜 Insect repellent',
  '🥾 Wellie',
  '🧦 Wellie Socks',
  '🌧️ Poncho',
  '👖 Waterproof trousers',
  '🎒 Waterproof Bag',
  '🔌 3 USB Socket',
  '✨ Biodegradable Glitter',
  '🎟️ Festival Ticket',
  '💵 Cash',
  '🍴 Cutlery',
  '🍱 Bento box',
  '🥤 Straw',
  '🧽 Sponge',
  '🧼 Cloth',
  '🍵 Mug',
  '😷 Facemask',
  '🧂 Seasonings',
].map(createItem);

export const getInitialItems = (): Item[] => {
  return items;
};

export const updateItem = (
  items: Item[],
  id: string,
  updates: Partial<Item>,
) => {
  return items.map((item) => {
    if (item.id === id) return { ...item, ...updates };
    return item;
  });
};

export const removeItem = (items: Readonly<Item[]>, id: string) => {
  return items.filter((item) => {
    return item.id !== id;
  });
};
