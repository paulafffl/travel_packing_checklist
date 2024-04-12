type Item = {
  id: string;
  name: string;
  packed: boolean;
};

type ListsObj = {
  [key: string]: Item[];
};

type ListsNames = {
  listToiletries: string[];
  listZeroWaste: string[];
  listFood: string[];
  listDevices: string[];
  listEssentials: string[];
  listLeaving: string[];
  listClothes: string[];
  listSummer: string[];
  listWinter: string[];
  listCamping: string[];
  listAdditionals: string[];
};
