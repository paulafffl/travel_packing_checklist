import { v4 as id } from 'uuid';

export const createItem = (name: string): Item => {
  const newItem = {
    id: id(),
    name,
    packed: false,
  };

  // Retrieve existing items from local storage, or initialize an empty array if none exist
  const existingItemsJson = localStorage.getItem('items');
  let existingItems: Item[] = [];
  if (existingItemsJson) {
    existingItems = JSON.parse(existingItemsJson);
  }

  const updatedItems = [...existingItems, newItem];
  localStorage.setItem('items', JSON.stringify(updatedItems));

  return newItem;
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

const saveItemsToLocalStorage = (items: Item[]) => {
  localStorage.setItem('items', JSON.stringify(items));
};

export const updateItem = (
  items: Item[],
  id: string,
  updates: Partial<Item>,
) => {
  const updatedItems = items.map((item) => {
    if (item.id === id) return { ...item, ...updates };
    return item;
  });
  saveItemsToLocalStorage(updatedItems);
  return updatedItems;
};

export const removeItem = (items: Readonly<Item[]>, id: string) => {
  const updatedItems = items.filter((item) => item.id !== id);
  saveItemsToLocalStorage(updatedItems);
  return updatedItems;
};
