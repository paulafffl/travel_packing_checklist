import { v4 as id } from 'uuid';

export const createItem = (name: string): Item => {
  return {
    id: id(),
    name,
    packed: false,
  };
};

let items = [
  'Shirts',
  'Trousers',
  'Shorts / Skirt',
  'Jumpsuit / Dress',
  'Coat / Jacket',
  'Underwear',
  'Tops',
  'Socks',
  'Pyjamas',
  'Exercise Clothes',
].map(createItem);

export const getInitialItems = (): Item[] => {
  return items;
};
