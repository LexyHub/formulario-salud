import type { Dial } from '@/lib/types';
import fullDialsJson from '@lib/data/phone-dials.full.json';
import minifiedDialsJson from '@lib/data/phone-dials.min.json';
import { useMemo } from 'react';

const fullDials = fullDialsJson as Dial[];
const minifiedDials = minifiedDialsJson as Dial[];

interface Props {
  minified?: boolean;
}

export function useCountryDials({ minified }: Props) {
  const dials = useMemo(() => {
    return minified ? minifiedDials : fullDials;
  }, [minified]);

  const dialsAsOption = useMemo(() => {
    return dials.map(d => ({
      label: d.label,
      value: d.code,
    }));
  }, [dials]);

  return { dials, dialsAsOption };
}
