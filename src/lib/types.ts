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

export type Dial = {
  label: string;
  code: string;
}

export interface PersonalData {
  nombres: string;
  apellidos: string;
  rut: string;
  region: string;
  comuna: string;
  domicilio: string;
}

export interface Contact {
  celular: string;
  correo: string;
  isapre: string;
}

export type GlobalState = {
  personalData: Partial<PersonalData>;
  contactData: Partial<Contact>;
  isReferido: boolean;
}
