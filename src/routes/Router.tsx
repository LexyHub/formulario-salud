import Referido from "@/views/referido/Referido";
import Bienvenido from "@views/bienvenida/Bienvenida";
import Completo from "@views/completo/Completo";
import Contacto from "@views/contacto/Contacto";
import DatosPersonales from "@views/datos-personales/DatosPersonales";
import NoEncontrado from "@views/no-encontrado/NoEncontrado";
import { Navigate, createBrowserRouter } from "react-router-dom";
import OriginMiddleware from "./Origin.middleware";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OriginMiddleware />,
    children: [
      {
        index: true,
        element: <Navigate to='/datos-personales' replace />,
      },
      {
        path: "datos-personales",
        element: <DatosPersonales />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "contacto-isapre",
            element: <Contacto />,
          },
          {
            path: "referido",
            element: <Referido />,
          },
          {
            path: "completo",
            element: <Completo />,
          },
        ],
      },
      {
        path: "bienvenido-de-vuelta",
        element: <Bienvenido />,
      },
      {
        path: "*",
        element: <NoEncontrado />,
      },
    ],
  },
]);
