import Input from "@/components/ui/forms/Input"
import SearchableSelect from "@/components/ui/forms/SearchableSelect"
import type { PersonalData } from "@/lib/types"

// Por el bien del principio DRY descompuse esto en un componente aparte, ya que manejo dos forms distintos en vista mobile y desktop.
type Props = {
    form: PersonalData
    errors: Record<string, string | undefined>
    setField: (field: keyof PersonalData, value: string) => void
    regionOptions: { label: string; value: string }[]
    comunaOptions: { label: string; value: string }[]
}

export default function FormFields({ form, errors, setField, regionOptions, comunaOptions }: Props) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input id="nombres" label="Nombres" placeholder="Ingresa todos tus nombres" required error={errors.nombres} value={form.nombres} onChange={(val) => setField("nombres", val)} />
        <Input id="apellidos" label="Apellidos" placeholder="Ingresa todos tus apellidos" required error={errors.apellidos} value={form.apellidos} onChange={(val) => setField("apellidos", val)} />
        <Input id="rut" label="RUT" placeholder="RUT sin puntos y con guión" required error={errors.rut} value={form.rut} onChange={(val) => setField("rut", val)} />
        <SearchableSelect id="region" label="Región" placeholder="Seleccione" required notFound="No se ha encontrado la región indicada" options={regionOptions} error={errors.region} value={form.region} onChange={(val) => setField("region", val)} />
        <SearchableSelect id="comuna" label="Comuna" placeholder="Seleccione" required disabled={form.region === ""} notFound="No se ha encontrado la comuna indicada" options={comunaOptions} error={errors.comuna} value={form.comuna} onChange={(val) => setField("comuna", val)} />
        <Input id="domicilio" label="Domicilio" placeholder="Calle y número (Ej: C.5 Los Cóndores)" required disabled={form.comuna === ""} error={errors.domicilio} value={form.domicilio} onChange={(val) => setField("domicilio", val)} />
      </div>
    )
  }
  