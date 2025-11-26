import Isapres from "@lib/data/isapres.json";
import { useMemo } from "react";

export function useIsapres() {
  const isapresOption = useMemo(() => {
    const mapped = Isapres.map((isapre) => ({
      label: isapre.nombre,
      value: isapre.nombre,
    }));
    return [...mapped, { label: "Otra", value: "otra" }];
  }, []);

  const getIsapreByName = (name: string) => {
    return Isapres.find((isapre) => isapre.nombre === name);
  };

  return { isapresOption, getIsapreByName };
}
