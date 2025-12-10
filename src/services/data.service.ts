import type { GlobalState } from "@/types/global-context.type";

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = import.meta.env.VITE_TEST_URL;

export type UPLOAD_RESPONSE = {
  correlation_id: string;
  es_lead_nuevo: boolean;
  event_id: string;
  event_type: string;
  lead_id: string;
  message: string;
  status: string;
};

export async function uploadData(data: GlobalState): Promise<UPLOAD_RESPONSE> {
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
  const url = API_URL + "/formulario-salud-mental";

  try {
    const response = await fetch(url, {
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

type VALIDAR_CODIGO_RESPONSE = {
  codigo_referido: string;
  es_valido: boolean;
  mensaje?: string;
};

export async function validarCodigoReferido(
  codigo: string
): Promise<VALIDAR_CODIGO_RESPONSE> {
  const url = API_URL + `/validar-codigo-referido/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ codigo_referido: codigo }),
    });
    if (!response.ok) {
      throw new Error(
        `Error en la petición: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al validar el código referido:", error);
    throw error;
  }
}
