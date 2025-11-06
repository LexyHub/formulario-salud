// router.tsx
import Referido from "@/views/referido/Referido";
import Bienvenido from "@views/bienvenida/Bienvenida";
import Completo from "@views/completo/Completo";
import Contacto from "@views/contacto/Contacto";
import DatosPersonales from "@views/datos-personales/DatosPersonales";
import NoEncontrado from "@views/no-encontrado/NoEncontrado";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RedirectIfReturning from "./RedirectIfReturning";
import Reset from "./Reset";

export const router = createBrowserRouter([
  {
    element: <RedirectIfReturning />,
    children: [
      {
        path: "/",
        element: <Navigate to="/datos-personales" replace />,
      },
      {
        path: "/datos-personales",
        element: <DatosPersonales />,
      },
      {
        path: "/contacto-isapre",
        element: <Contacto />,
      },
      {
        path: "/referido",
        element: <Referido />,
      },
      {
        path: "/completo",
        element: <Completo />,
      },
    ],
  },
  {
    path: "/bienvenido-de-vuelta",
    element: <Bienvenido />,
  },
  {
    path: "/reset",
    element: <Reset />
  },
  {
    path: "*",
    element: <NoEncontrado />,
  },
]);
