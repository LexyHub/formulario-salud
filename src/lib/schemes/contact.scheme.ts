import { z } from "zod";

export const ContactScheme = z.object({
  celular: z.string().nonempty("El número de teléfono es obligatorio"),
  correo: z
    .email("Formato de correo electrónico inválido")
    .nonempty("El correo electrónico es obligatorio"),
  isapre: z.string().nonempty("La Isapre es obligatoria"),
});
