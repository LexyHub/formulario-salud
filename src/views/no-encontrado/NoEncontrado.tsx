import { Vector404 } from '@assets/images';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NoEncontrado() {
    const navigate = useNavigate();

    return (
        <main className="flex items-center justify-center w-dvw h-dvh font-archivo bg-lexy-bg-platform px-6 md:px-44">
            <section className="flex flex-col items-center justify-center gap-y-4 md:gap-y-0">
                <img src={Vector404} className="w-32 md:w-96 md:mb-8" />
                <h1 className="text-lexy-text-primary text-xl md:text-3xl font-semibold leading-8 md:leading-14 md:mb-4 text-center">
                ¡Oh no! No encontramos lo que buscas :(
                </h1>
                <button
                    type="button"
                    onClick={() => navigate('/bienvenida')}
                    className="flex items-center justify-center self-end w-full bg-lexy-brand-primary px-4 py-2.5 text-white md:text-xl rounded-sm shadow-lexy-button font-semibold cursor-pointer hover:opacity-75 transition-all"
                >
                    <ChevronLeft className="mr-2 md:w-8 md:h-8" />
                    Volver
                </button>
            </section>
        </main>
    )
}