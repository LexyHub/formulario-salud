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

export default function Referido() {
  const navigate = useNavigate();
  const [referCode, setReferCode] = useState<string>("");
  const [codeState, setCodeState] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (referCode.toUpperCase() === "TEST123") {
      setCodeState("valido");
    } else {
      setCodeState("error");
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
            onChange={(val) => setReferCode(val.toUpperCase())}
          />
          {codeState === "error" && (
            <div className='mt-2 grid grid-cols-[auto_1fr] items-center gap-x-1 text-sm leading-5 text-lexy-danger'>
              <CircleX className='w-4 h-4' />
              <span>El código ingresado no es válido (prueba con test123)</span>
            </div>
          )}
          {codeState === "valido" && (
            <div className='mt-2 grid grid-cols-[auto_1fr] items-center gap-x-1 text-sm leading-5 text-lexy-success'>
              <CircleCheck className='w-4 h-4' />
              <span>Codigo de referido aplicado correctamente</span>
            </div>
          )}
          <button
            type='submit'
            className='w-full rounded-sm mt-6 shadow-lexy-table bg-[#4C2EFF] px-6 py-2.5 leading-6 font-medium text-white'>
            Aplicar código
          </button>
        </form>
      </section>
      <footer className='grid grid-cols-2 gap-x-4 px-6 py-4 border-t border-t-lexy-gray bg-white xl:hidden'>
        <button
          type='button'
          onClick={() => navigate("/contacto-isapre")}
          className='flex items-center justify-center w-full rounded-sm gap-x-2 border-2 border-lexy-primary py-2.5 px-6 font-medium leading-6 text-lexy-primary'>
          <ChevronLeft className='w-5 h-5' />
          Atrás
        </button>
        <button
          type='button'
          onClick={() => navigate("/completo")}
          className='flex items-center justify-center w-full rounded-sm gap-x-2 bg-lexy-primary py-2.5 px-6 font-medium leading-6 text-white'>
          Siguiente
          <ChevronRight className='w-5 h-5' />
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
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-[#008282] text-white'>
                <Check />
              </div>
              <span className='text-white font-medium leading-6'>
                Datos personales
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-[#008282] text-white'>
                <Check />
              </div>
              <span className='text-white font-medium leading-6'>
                Contacto e Isapre
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-[#008282] text-white'>
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
            <div className='flex flex-col justify-self-center w-full mt-[48px] max-w-[250px]'>
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
                onChange={(val) => setReferCode(val.toUpperCase())}
              />
              {codeState === "error" && (
                <div className='mt-2 flex items-center gap-x-1 text-sm leading-5 text-lexy-danger'>
                  <CircleX className='w-4 h-4' />
                  <span>El código ingresado no es válido</span>
                </div>
              )}
              {codeState === "valido" && (
                <div className='mt-2 flex items-center gap-x-1 text-sm leading-5 text-lexy-success'>
                  <CircleCheck className='w-4 h-4' />
                  <span>El código ingresado no es válido</span>
                </div>
              )}
              <button
                type='submit'
                className='w-full rounded-sm mt-6 shadow-lexy-table bg-[#4C2EFF] px-6 py-2.5 leading-6 font-medium text-white cursor-pointer'>
                Aplicar código
              </button>
            </div>
          </section>
          <section className='grid grid-cols-2 justify-between'>
            <button
              type='button'
              onClick={() => navigate("/contacto-isapre")}
              className='flex items-center justify-center w-fit rounded-sm gap-x-2 border-2 border-lexy-primary py-2.5 px-6 font-medium leading-6 text-lexy-primary cursor-pointer'>
              <ChevronLeft className='w-5 h-5' />
              Atras
            </button>
            <button
              type='button'
              onClick={() => navigate("/completo")}
              className='flex items-center justify-center justify-self-end w-fit rounded-sm gap-x-2 bg-lexy-primary not-disabled:hover:bg-lexy-primary/80 disabled:bg-lexy-primary/40 disabled:cursor-not-allowed transition-all py-2.5 px-6 font-medium leading-6 text-white cursor-pointer'>
              Siguiente
              <ChevronRight className='w-5 h-5' />
            </button>
          </section>
        </form>
      </section>
    </main>
  );
}
