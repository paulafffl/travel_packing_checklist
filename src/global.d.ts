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
  listSnacks: string[];
  listDevices: string[];
  listEssentials: string[];
  listLeaving: string[];
  listClothes: string[];
  listSummer: string[];
  listWinter: string[];
  listCamping: string[];
  listAdditionals: string[];
};
