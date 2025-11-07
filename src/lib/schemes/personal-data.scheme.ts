import { z } from "zod";
import { formatRut, isValidRut } from "../utils";

export const PersonalDataScheme = z.object({
  nombres: z.string().nonempty("Ingresa un nombre"),
  apellidos: z.string().nonempty("Ingresa tus apellidos"),
  rut: z
    .string()
    .nonempty("Ingresa tus apellidos")
    .transform((rut) => formatRut(rut))
    .refine((rut) => isValidRut(rut), "El RUT ingresado no es válido"),
  region: z.string().nonempty("Ingresa una región válida"),
  comuna: z.string().nonempty("Ingresa una comuna válida"),
  domicilio: z.string().nonempty("Ingresa un domicilio válido"),
});
