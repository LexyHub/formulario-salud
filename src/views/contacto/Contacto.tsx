import { LexySalud } from "@/assets/images";
import CircularProgress from "@/components/ui/CircularProgress";
import { useForm } from "@/hooks/useForm";
import { ContactScheme } from "@/lib/schemes/contact.scheme";
import type { Contact } from "@/types/global-context.type";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormFields from "./FormFields";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { cn } from "@/lib/utils";

export default function Contacto() {
  const navigate = useNavigate();
  const { state, setContactData } = useGlobalContext();
  const { form, setField, errors, validate, hasErrors } = useForm<Contact>(
    {
      celular: "",
      correo: "",
      isapre: "",
    },
    ContactScheme
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate();
    if (!result.success) {
      return;
    }
    setContactData(result.data);
    navigate(state.isReferido ? "/referido" : "/completo");
  };

  return (
    <main className='grid grid-rows-[auto_1fr_auto] xl:flex xl:items-center xl:justify-center min-h-dvh h-fit w-dvw font-archivo bg-lexy-bg-secondary'>
      <header className='flex flex-col items-center justify-center bg-lexy-azul-marino xl:hidden'>
        <div className='py-2'>
          <img src={LexySalud} alt='Lexy salud' className='w-28 h-fit' />
        </div>
        <div className='grid grid-cols-[auto_1fr] items-center gap-x-4 px-6 py-4'>
          <CircularProgress
            progress={state.isReferido ? 50 : 100}
            className='size-16'
            emptyClass='text-lexy-menta'
            fillClass='text-lexy-menta-oscuro'>
            <div className='text-sm font-semibold leading-5 text-white space-x-0.5'>
              <span className='text-lexy-menta-oscuro'>2</span>
              <span>/</span>
              <span>{state.isReferido ? "3" : "2"}</span>
            </div>
          </CircularProgress>
          <div>
            <h4 className='text-white text-sm font-medium leading-5 mb-2'>
              Únete a los miles que han mejorado su cobertura en{" "}
              <span className='text-lexy-menta-oscuro'>Salud Mental</span>
            </h4>
            {state.isReferido && (
              <span className='text-lexy-text-disabled text-xs leading-[18px]'>
                Siguiente: Referido
              </span>
            )}
          </div>
        </div>
      </header>
      <section className='px-6 pt-6 pb-16 xl:hidden'>
        <h1 className='text-lexy-primary text-lg font-medium leading-7 mb-4'>
          Contacto e Isapre
        </h1>
        <form onSubmit={handleSubmit} id='formulario' className='space-y-6'>
          <FormFields form={form} errors={errors} setField={setField} />
        </form>
      </section>
      <footer className='grid grid-cols-2 gap-x-4 px-6 py-4 border-t border-t-lexy-gray bg-white xl:hidden'>
        <button
          type='button'
          onClick={() => navigate("/datos-personales")}
          className='flex items-center justify-center w-full rounded-sm gap-x-2 border-2 border-lexy-primary py-2.5 px-6 font-medium leading-6 text-lexy-primary'>
          <ChevronLeft className='w-5 h-5' />
          Atrás
        </button>
        <button
          type='submit'
          form='formulario'
          disabled={hasErrors()}
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
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-lexy-primary text-white'>
                <Check />
              </div>
              <span className='text-white font-medium leading-6'>
                Datos personales
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-lexy-primary text-white'>
                <span>02</span>
              </div>
              <span className='text-white font-medium leading-6'>
                Contacto e Isapre
              </span>
            </div>
            {state.isReferido && (
              <div className='flex items-center space-x-2'>
                <div
                  className={cn(
                    "rounded-full size-10 p-2.5 flex items-center justify-center",
                    {
                      "bg-lexy-primary text-white": !state.isReferido,
                      "border-2 border-lexy-border-input text-lexy-border-input":
                        state.isReferido,
                    }
                  )}>
                  <span>03</span>
                </div>
                <span className='text-white font-medium leading-6'>
                  Referido
                </span>
              </div>
            )}
          </section>
        </aside>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-between bg-white px-8 py-12 rounded-r-2xl shadow-lexy-table w-full'>
          <FormFields form={form} errors={errors} setField={setField} />

          <section className='grid grid-cols-2 justify-between'>
            <button
              type='button'
              onClick={() => navigate("/datos-personales")}
              className='flex items-center justify-center w-fit rounded-sm gap-x-2 border-2 border-lexy-primary py-2.5 px-6 font-medium leading-6 text-lexy-primary cursor-pointer'>
              <ChevronLeft className='w-5 h-5' />
              Atras
            </button>
            <button
              type='submit'
              disabled={hasErrors()}
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
