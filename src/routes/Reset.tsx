import { Navigate } from "react-router-dom";

export default function Reset() {
  localStorage.removeItem("completo")
    
  return <Navigate to="/datos-personales" replace />;
}
