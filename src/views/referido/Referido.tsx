import { LexySalud } from "@/assets/images";
import CircularProgress from "@/components/ui/CircularProgress";
import Input from "@/components/forms/Input";
import clsx from "clsx";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "@/store/useGlobalStore";
import { uploadData, validarCodigoReferido } from "@/services/data.service";
import type { GlobalState } from "@/types/global-context.type";
import { Loading } from "@/components/ui/Loading";

export default function Referido() {
  const navigate = useNavigate();
  const [referCode, setReferCode] = useState<string>("");
  const [codeState, setCodeState] = useState<string>("");
  const {
    personalData,
    contactData,
    origen,
    setCodigoReferido,
    codigo_referido,
  } = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [validating, setValidating] = useState(false);
  const [validatingError, setValidatingError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidating(true);
    setCodeState("");
    setValidatingError("");
    try {
      const response = await validarCodigoReferido(referCode);
      if (response.es_valido) {
        setCodeState("valido");
        setCodigoReferido(referCode);
      } else {
        setCodeState("error");
      }
    } catch (error) {
      setValidatingError("Error al validar el código. Intenta nuevamente.");
      console.error("Error al validar el código referido:", error);
    } finally {
      setValidating(false);
    }
  };

  const completaFormulario = async () => {
    const data: GlobalState = {
      personalData: personalData,
      contactData: contactData,
      origen: origen,
      codigo_referido: codigo_referido ?? "",
    };
    try {
      setLoading(true);
      const response = await uploadData(data);
      setLoading(false);
      if (response.status !== "success") {
        throw new Error("Error en la respuesta del servidor");
      }

      navigate(response.es_lead_nuevo ? "/completo" : "/bienvenido-de-vuelta");
    } catch (error) {
      console.error("Error al subir los datos:", error);
      setUploadError("Error al subir los datos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='grid grid-rows-[auto_1fr_auto] xl:flex xl:items-center xl:justify-center min-h-dvh h-fit w-dvw font-archivo bg-lexy-bg-secondary'>
      <header className='flex flex-col items-center justify-center bg-lexy-azul-marino xl:hidden'>
        <div className='py-2'>
          <img src={LexySalud} alt='Lexy salud' className='w-28 h-fit' />
        </div>
        <div className='grid grid-cols-[auto_1fr] items-center gap-x-4 px-6 py-4'>
          <CircularProgress
            progress={100}
            className='size-16'
            emptyClass='text-lexy-menta'
            fillClass='text-lexy-menta-oscuro'>
            <div className='text-sm font-semibold leading-5 text-white space-x-0.5'>
              <span className='text-lexy-menta-oscuro'>3</span>
              <span>/</span>
              <span>3</span>
            </div>
          </CircularProgress>
          <div>
            <h4 className='text-white text-sm font-medium leading-5 mb-2'>
              Únete a los miles que han mejorado su cobertura en{" "}
              <span className='text-lexy-menta-oscuro'>Salud Mental</span>
            </h4>
          </div>
        </div>
      </header>
      <section className='px-6 pt-6 pb-16 xl:hidden'>
        <h1 className='text-lexy-primary text-center text-2xl font-medium leading-9 mb-2'>
          ¡Ya casi estamos listos!
        </h1>
        <p className='text-center leading-6 text-lexy-text-secondary'>
          Si tienes un código de referido, ingrésalo ahora para aplicar tu
          beneficio
        </p>
        <form
          onSubmit={handleSubmit}
          id='formulario'
          className='flex flex-col justify-self-center w-full mt-12 max-w-[250px]'>
          <span className='text-center self-center text-lexy-primary underline mb-4'>
            ¿Tienes un código de referido?
          </span>
          <Input
            id='codigo-referido'
            placeholder='INGRESA TU CÓDIGO'
            className={clsx({
              "border-lexy-success": codeState === "valido",
              "border-lexy-danger": codeState === "error",
            })}
            value={referCode}
            disabled={loading || validating}
            onChange={(val) => setReferCode(val.toUpperCase())}
          />
          {validatingError.length > 0 && (
            <div className='mt-2 grid grid-cols-[auto_1fr] items-center gap-x-1 text-sm leading-5 text-lexy-danger'>
              <CircleX className='w-4 h-4' />
              <span>{validatingError}</span>
            </div>
          )}
          {codeState === "error" && validatingError.length < 1 && (
            <div className='mt-2 grid grid-cols-[auto_1fr] items-center gap-x-1 text-sm leading-5 text-lexy-danger'>
              <CircleX className='w-4 h-4' />
              <span>El código ingresado no es válido</span>
            </div>
          )}
          {codeState === "valido" && validatingError.length < 1 && (
            <div className='mt-2 grid grid-cols-[auto_1fr] items-center gap-x-1 text-sm leading-5 text-lexy-success'>
              <CircleCheck className='w-4 h-4' />
              <span>Codigo de referido aplicado correctamente</span>
            </div>
          )}
          <button
            type='submit'
            disabled={loading || validating}
            className='w-full rounded-sm mt-6 shadow-lexy-table bg-[#4C2EFF] disabled:bg-[#4C2EFF]/50 px-6 py-2.5 leading-6 font-medium text-white cursor-pointer disabled:cursor-not-allowed'>
            {validating ? <Loading message='Validando...' /> : "Aplicar código"}
          </button>
        </form>
      </section>
      <footer className='relative grid grid-cols-2 gap-x-4 px-6 py-4 border-t border-t-lexy-gray bg-white xl:hidden'>
        {uploadError.length > 0 && (
          <div className='absolute self-center justify-self-center flex items-center gap-x-2 -bottom-10 text-lexy-danger'>
            <CircleX className='w-4 h-4' />
            <span>{uploadError}</span>
          </div>
        )}
        <button
          type='button'
          onClick={() => navigate("/contacto-isapre")}
          disabled={loading || validating}
          className='flex items-center justify-center w-full rounded-sm gap-x-2 border-2 border-lexy-primary py-2.5 px-6 font-medium leading-6 text-lexy-primary disabled:cursor-not-allowed'>
          <ChevronLeft className='w-5 h-5' />
          Atrás
        </button>
        <button
          type='button'
          onClick={() => navigate("/completo")}
          disabled={loading || validating}
          className='flex items-center justify-center w-full rounded-sm gap-x-2 bg-lexy-primary py-2.5 px-6 font-medium leading-6 text-white'>
          {loading ? (
            <Loading />
          ) : (
            <>
              Siguiente
              <ChevronRight className='w-5 h-5' />
            </>
          )}
        </button>
      </footer>

      <section className='hidden xl:grid grid-cols-[auto_1fr] h-[500px] w-full max-w-5xl'>
        <aside className='px-8 py-12 flex flex-col space-y-12 bg-lexy-bg-terciary rounded-l-2xl max-w-[350px] shadow-lexy-table'>
          <section className='text-white font-archivo'>
            <img src={LexySalud} alt='Lexy salud' className='w-52' />
            <h3 className='text-2xl font-medium leading-9 mt-8'>
              ¡Mejora tu cobertura en{" "}
              <span className='text-lexy-menta-oscuro'>salud mental</span>!
            </h3>
            <p className='leading-6 font-medium'>
              Únete a miles que han obtenido mayores reembolsos con nosotros.
            </p>
          </section>
          <section className='flex flex-col space-y-4'>
            <div className='flex items-center space-x-2'>
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-lexy-primary text-white'>
                <Check />
              </div>
              <span className='text-white font-medium leading-6'>
                Datos personales
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-lexy-primary text-white'>
                <Check />
              </div>
              <span className='text-white font-medium leading-6'>
                Contacto e Isapre
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-lexy-primary text-white'>
                <span>03</span>
              </div>
              <span className='text-white font-medium leading-6'>Referido</span>
            </div>
          </section>
        </aside>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-between bg-white px-8 py-12 rounded-r-2xl shadow-lexy-table w-full'>
          <section>
            <h1 className='text-lexy-primary text-center text-2xl font-medium leading-9 mb-2'>
              ¡Ya casi estamos listos!
            </h1>
            <p className='text-center leading-6 text-lexy-text-secondary'>
              Si tienes un código de referido, ingrésalo ahora para aplicar tu
              beneficio
            </p>
            <div className='flex flex-col justify-self-center w-full mt-12 max-w-[250px]'>
              <span className='text-center self-center text-lexy-primary underline mb-4'>
                ¿Tienes un código de referido?
              </span>
              <Input
                id='codigo-referido'
                placeholder='INGRESA TU CÓDIGO'
                className={clsx({
                  "border-lexy-success": codeState === "valido",
                  "border-lexy-danger": codeState === "error",
                })}
                value={referCode}
                disabled={loading || validating}
                onChange={(val) => setReferCode(val.toUpperCase())}
              />
              {validatingError.length > 0 && (
                <div className='mt-2 grid grid-cols-[auto_1fr] items-center gap-x-1 text-sm leading-5 text-lexy-danger'>
                  <CircleX className='w-4 h-4' />
                  <span>{validatingError}</span>
                </div>
              )}
              {codeState === "error" && validatingError.length < 1 && (
                <div className='mt-2 flex items-center gap-x-1 text-sm leading-5 text-lexy-danger'>
                  <CircleX className='w-4 h-4' />
                  <span>El código ingresado no es válido</span>
                </div>
              )}
              {codeState === "valido" && validatingError.length < 1 && (
                <div className='mt-2 flex items-center gap-x-1 text-sm leading-5 text-lexy-success'>
                  <CircleCheck className='w-4 h-4' />
                  <span>Codigo de referido aplicado correctamente</span>
                </div>
              )}
              <button
                type='submit'
                disabled={loading || validating}
                className='w-full rounded-sm mt-6 shadow-lexy-table bg-[#4C2EFF] disabled:bg-[#4C2EFF]/50 px-6 py-2.5 leading-6 font-medium text-white cursor-pointer disabled:cursor-not-allowed'>
                {validating ? (
                  <Loading message='Validando...' />
                ) : (
                  "Aplicar código"
                )}
              </button>
            </div>
          </section>
          <section className='relative grid grid-cols-2 justify-between'>
            {uploadError.length > 0 && (
              <div className='absolute self-center justify-self-center flex items-center gap-x-2 -bottom-10 text-lexy-danger'>
                <CircleX className='w-4 h-4' />
                <span>{uploadError}</span>
              </div>
            )}
            <button
              type='button'
              onClick={() => navigate("/contacto-isapre")}
              disabled={loading || validating}
              className='flex items-center justify-center w-fit rounded-sm gap-x-2 border-2 border-lexy-primary py-2.5 px-6 font-medium leading-6 text-lexy-primary cursor-pointer disabled:cursor-not-allowed'>
              <ChevronLeft className='w-5 h-5' />
              Atrás
            </button>
            <button
              type='button'
              onClick={completaFormulario}
              disabled={loading || validating}
              className='flex items-center justify-center justify-self-end w-fit rounded-sm gap-x-2 bg-lexy-primary not-disabled:hover:bg-lexy-primary/80 disabled:bg-lexy-primary/40 disabled:cursor-not-allowed transition-all py-2.5 px-6 font-medium leading-6 text-white cursor-pointer'>
              {loading ? (
                <Loading />
              ) : (
                <>
                  Siguiente
                  <ChevronRight className='w-5 h-5' />
                </>
              )}
            </button>
          </section>
        </form>
      </section>
    </main>
  );
}
