type Item = {
  id: string;
  name: string;
  packed: boolean;
};

type ItemAsObj = {
  [key: string]: Item[];
};

type ListsAsObj = {
  listToiletries: string[];
  listZeroWaste: string[];
  listFood: string[];
  listTech: string[];
  listEssentials: string[];
  listLeaving: string[];
  listClothes: string[];
  listSummer: string[];
  listWinter: string[];
  listCamping: string[];
  listAdditionals: string[];
};
