import type { GlobalState } from "@/types/global-context.type";

const API_URL = import.meta.env.VITE_API_URL;

export async function uploadData(data: GlobalState) {
  const payload = {
    id_llenado: crypto.randomUUID(),
    formulario_origen: data.origen,
    nombre: data.personalData.nombres,
    apellidos: data.personalData.apellidos,
    rut: data.personalData.rut,
    email: data.contactData.correo,
    celular: data.contactData.celular,
    region: data.personalData.region,
    comuna: data.personalData.comuna,
    direccion: data.personalData.domicilio,
    isapre: data.contactData.isapre,
    fecha_recepcion: new Date().toISOString().split("T")[0],
    codigo_referido: data.codigo_referido ?? "",
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(
        `Error en la petición: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al subir los datos:", error);
    throw error;
  }
}
