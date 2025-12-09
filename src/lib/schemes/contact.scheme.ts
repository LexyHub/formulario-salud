import { z } from "zod";

export const ContactScheme = z.object({
  celular: z
    .string()
    .nonempty("El número de teléfono es obligatorio")
    .transform((val) => {
      const out = val.replace(/\s+/g, "");

      if (out.startsWith("+56")) {
        const numeroSinPrefijo = out.slice(3);

        if (numeroSinPrefijo.startsWith("1")) {
          return out;
        }

        if (numeroSinPrefijo.length === 8) {
          return `+569${numeroSinPrefijo}`;
        }
      }

      return out;
    }),

  correo: z
    .email("Formato de correo electrónico inválido")
    .nonempty("El correo electrónico es obligatorio"),

  isapre: z.string().nonempty("La Isapre es obligatoria"),
});
