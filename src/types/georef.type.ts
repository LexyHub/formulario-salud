export type Country = {
  code: string;
  country: string;
};

export type Region = {
  nombre: string;
  numeral: string;
  comunas: string[];
};

export type RegionsMap = {
  [key: string]: Region;
};
