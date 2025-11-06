import { Navigate, Outlet } from "react-router-dom";

export default function RedirectIfReturning() {
  const isReturning = localStorage.getItem("completo");

  if (isReturning) {
    return <Navigate to="/bienvenido-de-vuelta" replace />;
  }

  return <Outlet />;
}
