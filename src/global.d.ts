type Item = {
  id: string;
  name: string;
  packed: boolean;
};

type ItemAsObj = {
  [key: string]: Item[];
};
