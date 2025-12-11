import { useGlobalStore } from "@/store/useGlobalStore";
import { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function OriginMiddleware() {
  const [searchParams] = useSearchParams();
  const { origen, setOrigen } = useGlobalStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (origen) return;

    const rawOrigen = searchParams.get("origen");
    const origenFinal =
      rawOrigen === "referidos" || rawOrigen === "mindy"
        ? rawOrigen
        : "general";

    setOrigen(origenFinal);
  }, [origen, searchParams, setOrigen]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/datos-personales", { replace: true });
    }
  }, [location.pathname, navigate]);

  return <Outlet />;
}
