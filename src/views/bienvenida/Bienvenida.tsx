import { HandHeart } from "lucide-react";

export default function Bienvenido() {
  return (
    <main className='grid grid-rows-[1fr_auto] xl:flex xl:items-center xl:justify-center min-h-dvh h-fit w-dvw bg-white xl:bg-lexy-bg-secondary'>
      <section className='flex flex-col items-center justify-center px-6 xl:max-w-3xl xl:w-full xl:space-y-9'>
        <div className='flex flex-col items-center justify-center space-y-4 xl:space-y-0'>
          <HandHeart className='text-lexy-primary size-[68px] xl:size-[145px]' />
          <h1 className='text-center text-lexy-text text-xl xl:text-[32px] font-semibold leading-8 xl:leading-12'>
            ¡Nos alegra verte de nuevo!
          </h1>
          <p className='text-center text-lexy-text-secondary text-sm xl:text-2xl leading-5 xl:leading-9 mb-6'>
            Vemos que ya nos contactaste previamente para tu evaluación de
            cobertura
          </p>
          <p className='text-center text-lexy-primary text-sm xl:text-2xl leading-5 xl:leading-9'>
            Si deseas continuar, escríbenos por WhatsApp y te acompañamos en el
            proceso
          </p>
        </div>
        <div className='hidden xl:flex xl:flex-col xl:max-w-sm xl:w-full'>
          <button
            type='button'
            className='cursor-pointer border-2 bg-lexy-primary hover:bg-lexy-primary/80 transition-all w-full max-w-sm px-6 py-2.5 flex items-center justify-center text-white font-medium leading-6 rounded-sm'>
            <svg
              className='size-6 mr-2'
              viewBox='0 0 24 25'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M19.05 5.41005C18.1331 4.48416 17.0411 3.75002 15.8376 3.25042C14.634 2.75081 13.3431 2.49574 12.04 2.50005C6.58005 2.50005 2.13005 6.95005 2.13005 12.4101C2.13005 14.1601 2.59005 15.8601 3.45005 17.3601L2.05005 22.5001L7.30005 21.1201C8.75005 21.9101 10.38 22.3301 12.04 22.3301C17.5 22.3301 21.9501 17.8801 21.9501 12.4201C21.9501 9.77005 20.92 7.28005 19.05 5.41005ZM12.04 20.6501C10.56 20.6501 9.11005 20.2501 7.84005 19.5001L7.54005 19.3201L4.42005 20.1401L5.25005 17.1001L5.05005 16.7901C4.2276 15.4771 3.79097 13.9593 3.79005 12.4101C3.79005 7.87005 7.49005 4.17005 12.03 4.17005C14.23 4.17005 16.3 5.03005 17.85 6.59005C18.6177 7.35392 19.226 8.2626 19.6397 9.26338C20.0534 10.2642 20.2642 11.3371 20.26 12.4201C20.2801 16.9601 16.58 20.6501 12.04 20.6501ZM16.56 14.4901C16.31 14.3701 15.09 13.7701 14.87 13.6801C14.64 13.6001 14.48 13.5601 14.31 13.8001C14.14 14.0501 13.67 14.6101 13.53 14.7701C13.39 14.9401 13.24 14.9601 12.99 14.8301C12.74 14.7101 11.94 14.4401 11 13.6001C10.26 12.9401 9.77005 12.1301 9.62005 11.8801C9.48005 11.6301 9.60005 11.5001 9.73005 11.3701C9.84005 11.2601 9.98005 11.0801 10.1 10.9401C10.22 10.8001 10.27 10.6901 10.35 10.5301C10.43 10.3601 10.39 10.2201 10.33 10.1001C10.27 9.98005 9.77005 8.76005 9.57005 8.26005C9.37005 7.78005 9.16005 7.84005 9.01005 7.83005H8.53005C8.36005 7.83005 8.10005 7.89005 7.87005 8.14005C7.65005 8.39005 7.01005 8.99005 7.01005 10.2101C7.01005 11.4301 7.90005 12.6101 8.02005 12.7701C8.14005 12.9401 9.77005 15.4401 12.25 16.5101C12.84 16.7701 13.3 16.9201 13.66 17.0301C14.25 17.2201 14.79 17.1901 15.22 17.1301C15.7 17.0601 16.69 16.5301 16.89 15.9501C17.1 15.3701 17.1 14.8801 17.03 14.7701C16.96 14.6601 16.81 14.6101 16.56 14.4901Z'
                fill='white'
              />
            </svg>
            Contactar por WhatsApp
          </button>
        </div>
      </section>
      <footer className='w-full px-6 py-4 flex flex-col border-t border-t-[#E6E6E6] space-y-4 bg-white xl:hidden'>
        <button
          type='button'
          className='cursor-pointer border-2 bg-lexy-primary w-full px-6 py-2.5 flex items-center justify-center text-white font-medium leading-6 rounded-sm'>
          <svg
            className='size-6 mr-2'
            viewBox='0 0 24 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M19.05 5.41005C18.1331 4.48416 17.0411 3.75002 15.8376 3.25042C14.634 2.75081 13.3431 2.49574 12.04 2.50005C6.58005 2.50005 2.13005 6.95005 2.13005 12.4101C2.13005 14.1601 2.59005 15.8601 3.45005 17.3601L2.05005 22.5001L7.30005 21.1201C8.75005 21.9101 10.38 22.3301 12.04 22.3301C17.5 22.3301 21.9501 17.8801 21.9501 12.4201C21.9501 9.77005 20.92 7.28005 19.05 5.41005ZM12.04 20.6501C10.56 20.6501 9.11005 20.2501 7.84005 19.5001L7.54005 19.3201L4.42005 20.1401L5.25005 17.1001L5.05005 16.7901C4.2276 15.4771 3.79097 13.9593 3.79005 12.4101C3.79005 7.87005 7.49005 4.17005 12.03 4.17005C14.23 4.17005 16.3 5.03005 17.85 6.59005C18.6177 7.35392 19.226 8.2626 19.6397 9.26338C20.0534 10.2642 20.2642 11.3371 20.26 12.4201C20.2801 16.9601 16.58 20.6501 12.04 20.6501ZM16.56 14.4901C16.31 14.3701 15.09 13.7701 14.87 13.6801C14.64 13.6001 14.48 13.5601 14.31 13.8001C14.14 14.0501 13.67 14.6101 13.53 14.7701C13.39 14.9401 13.24 14.9601 12.99 14.8301C12.74 14.7101 11.94 14.4401 11 13.6001C10.26 12.9401 9.77005 12.1301 9.62005 11.8801C9.48005 11.6301 9.60005 11.5001 9.73005 11.3701C9.84005 11.2601 9.98005 11.0801 10.1 10.9401C10.22 10.8001 10.27 10.6901 10.35 10.5301C10.43 10.3601 10.39 10.2201 10.33 10.1001C10.27 9.98005 9.77005 8.76005 9.57005 8.26005C9.37005 7.78005 9.16005 7.84005 9.01005 7.83005H8.53005C8.36005 7.83005 8.10005 7.89005 7.87005 8.14005C7.65005 8.39005 7.01005 8.99005 7.01005 10.2101C7.01005 11.4301 7.90005 12.6101 8.02005 12.7701C8.14005 12.9401 9.77005 15.4401 12.25 16.5101C12.84 16.7701 13.3 16.9201 13.66 17.0301C14.25 17.2201 14.79 17.1901 15.22 17.1301C15.7 17.0601 16.69 16.5301 16.89 15.9501C17.1 15.3701 17.1 14.8801 17.03 14.7701C16.96 14.6601 16.81 14.6101 16.56 14.4901Z'
              fill='white'
            />
          </svg>
          Contactar por WhatsApp
        </button>
      </footer>
    </main>
  );
}
