import { useForm } from "@hooks/useForm";
import { useGeoData } from "@hooks/useGeoData";
import { PersonalDataScheme } from "@lib/schemes/personal-data.scheme";
import type { PersonalData } from "@/types/global-context.type";
import { LexySalud } from "@assets/images";
import CircularProgress from "@components/ui/CircularProgress";
import { ChevronRight } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormFields from "./FormFields";
import { useGlobalContext } from "@/contexts/GlobalContext";

export default function DatosPersonales() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsReferido, state, setPersonalData } = useGlobalContext();
  const { regionOptions, getComunaOptions } = useGeoData();
  const { form, setField, errors, validate, hasErrors } = useForm<PersonalData>(
    {
      nombres: "",
      apellidos: "",
      rut: "",
      region: "",
      comuna: "",
      domicilio: "",
    },
    PersonalDataScheme
  );

  useEffect(() => {
    if (location.search === "?referido" && !state.isReferido) {
      setIsReferido(true);
    }
  }, [location.search, state.isReferido, setIsReferido]);

  const comunaOptions = useMemo(
    () => getComunaOptions(form.region),
    [form.region, getComunaOptions]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validate();
    if (!result.success) {
      return;
    }
    setPersonalData(result.data);
    navigate("/contacto-isapre");
  };

  return (
    <main className='grid grid-rows-[auto_1fr_auto] xl:flex xl:items-center xl:justify-center min-h-dvh h-fit w-dvw bg-lexy-bg-secondary'>
      <header className='flex flex-col items-center justify-center bg-lexy-azul-marino xl:hidden'>
        <div className='py-2'>
          <img src={LexySalud} alt='Lexy salud' className='w-28 h-fit' />
        </div>
        <div className='grid grid-cols-[auto_1fr] items-center gap-x-4 px-6 py-4'>
          <CircularProgress
            progress={state.isReferido ? 33 : 50}
            className='size-16'
            emptyClass='text-lexy-menta'
            fillClass='text-lexy-menta-oscuro'>
            <div className='text-sm font-semibold leading-5 text-white space-x-0.5'>
              <span className='text-lexy-menta-oscuro'>1</span>
              <span>/</span>
              <span>{state.isReferido ? "3" : "2"}</span>
            </div>
          </CircularProgress>
          <div>
            <h4 className='text-white text-sm font-medium leading-5 mb-2'>
              Únete a los miles que han mejorado su cobertura en{" "}
              <span className='text-lexy-menta-oscuro'>Salud Mental</span>
            </h4>
            <span className='text-lexy-text-disabled text-xs leading-[18px]'>
              Siguiente: Contacto e Isapre
            </span>
          </div>
        </div>
      </header>
      <section className='px-6 pt-6 pb-16 xl:hidden'>
        <h1 className='text-lexy-primary text-lg font-medium leading-7 mb-4'>
          Datos Personales
        </h1>
        <form
          onSubmit={handleSubmit}
          id='datospersonales-mobile'
          className='space-y-6'>
          <FormFields
            form={form}
            errors={errors}
            setField={setField}
            regionOptions={regionOptions}
            comunaOptions={comunaOptions}
          />
        </form>
      </section>
      <footer className='px-6 py-4 border-t border-t-lexy-gray bg-white xl:hidden'>
        <button
          type='submit'
          disabled={hasErrors()}
          form='datospersonales-mobile'
          className='flex items-center justify-center w-full rounded-sm gap-x-2 bg-lexy-primary py-2.5 px-6 font-medium leading-6 text-white cursor-pointer'>
          Siguiente
          <ChevronRight className='w-5 h-5' />
        </button>
      </footer>

      <section className='hidden xl:grid grid-cols-[auto_1fr] h-[500px] w-full max-w-5xl'>
        <aside className='px-8 py-12 flex flex-col space-y-12 bg-lexy-bg-terciary rounded-l-2xl max-w-[350px] shadow-lexy-table'>
          <section className='text-white'>
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
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center bg-lexy-menta-oscuro text-white'>
                <span>01</span>
              </div>
              <span className='text-white font-medium leading-6'>
                Datos personales
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='rounded-full size-10 p-2.5 flex items-center justify-center border-2 border-lexy-border-input text-lexy-border-input'>
                <span className='leading-6 font-medium'>02</span>
              </div>
              <span className='text-lexy-border-input font-medium leading-6'>
                Contacto e Isapre
              </span>
            </div>
            {state.isReferido && (
              <div className='flex items-center space-x-2'>
                <div className='rounded-full size-10 p-2.5 flex items-center justify-center border-2 border-lexy-border-input text-lexy-border-input'>
                  <span className='leading-6 font-medium'>03</span>
                </div>
                <span className='text-lexy-border-input font-medium leading-6'>
                  Referido
                </span>
              </div>
            )}
          </section>
        </aside>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-between bg-white px-8 py-12 rounded-r-2xl shadow-lexy-table w-full'>
          <FormFields
            form={form}
            errors={errors}
            setField={setField}
            regionOptions={regionOptions}
            comunaOptions={comunaOptions}
          />

          <button
            type='submit'
            disabled={hasErrors()}
            className='flex items-center justify-center self-end w-fit rounded-sm gap-x-2 bg-lexy-primary not-disabled:hover:bg-lexy-primary/80 disabled:bg-lexy-primary/40 disabled:cursor-not-allowed transition-all py-2.5 px-6 font-medium leading-6 text-white cursor-pointer'>
            Siguiente
            <ChevronRight className='w-5 h-5' />
          </button>
        </form>
      </section>
    </main>
  );
}
