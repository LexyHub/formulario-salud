import countriesData from "@lib/data/countries.json";
import regionsData from "@lib/data/regions.json";
import type { Country, RegionsMap } from "@/types/georef.type";
import { useMemo } from "react";

export function useGeoData() {
  const countries = useMemo(() => countriesData as Country[], []);
  const regions = useMemo(() => regionsData as RegionsMap, []);

  const countryOptions = useMemo(
    () =>
      countries.map((c) => ({
        label: c.country,
        value: c.code,
      })),
    [countries]
  );

  const regionOptions = useMemo(
    () =>
      Object.entries(regions).map(([key, region]) => ({
        label: region.nombre,
        value: key,
      })),
    [regions]
  );

  const getCommunesByRegion = (regionKey: string) =>
    regions[regionKey]?.comunas ?? [];

  const getComunaOptions = (regionKey: string) =>
    getCommunesByRegion(regionKey).map((c) => ({
      label: c,
      value: c,
    }));

  return {
    countries,
    regions,
    countryOptions,
    regionOptions,
    getCommunesByRegion,
    getComunaOptions,
  };
}
