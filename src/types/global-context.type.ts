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
};
