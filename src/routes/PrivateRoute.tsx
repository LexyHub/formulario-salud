import { useGlobalStore } from "@/store/useGlobalStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { origen } = useGlobalStore();

  if (!origen) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
