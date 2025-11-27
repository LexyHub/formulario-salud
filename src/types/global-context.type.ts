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
  origen: "referido" | "mindy" | "normal" | null;
  codigo_referido: string;
};
