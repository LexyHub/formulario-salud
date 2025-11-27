import { useGlobalStore } from "@/store/useGlobalStore";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function OriginMiddleware() {
  const [searchParams] = useSearchParams();
  const { setOrigen } = useGlobalStore();
  const navigate = useNavigate();

  useEffect(() => {
    const rawOrigen = searchParams.get("origen");

    const origenFinal =
      rawOrigen === "referido" || rawOrigen === "mindy" ? rawOrigen : "normal";

    setOrigen(origenFinal);

    navigate("/datos-personales", { replace: true });
  }, [searchParams, setOrigen, navigate]);

  return null;
}
