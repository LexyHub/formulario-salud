import CellphoneInput from "@/components/forms/CellphoneInput";
import Select from "@/components/forms/Select";
import Input from "@/components/forms/Input";
import type { Contact } from "@/types/global-context.type";
import { isapres } from "./options";
import { useState } from "react";

type Props = {
  form: Contact;
  errors: Record<string, string | undefined>;
  setField: (field: keyof Contact, value: string) => void;
};

export default function FormFields({ form, errors, setField }: Props) {
  const [rawIsapre, setRawIsapre] = useState<string>("");

  const handleIsapreSelect = (v: string) => {
    if (v !== "otra") setField("isapre", v);
    setRawIsapre(v);
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <CellphoneInput
        id='numero-telefono'
        label='Celular'
        placeholder='9 1234 5678'
        required
        error={errors.celular}
        value={form.celular}
        onChange={(val) => setField("celular", val)}
      />
      <Input
        id='email'
        label='Correo electrónico'
        placeholder='ejemplo@correo.cl'
        required
        error={errors.correo}
        value={form.correo}
        onChange={(val) => setField("correo", val)}
      />
      <Select
        id='raw-isapre'
        label='Isapre'
        placeholder='Seleccione'
        required
        error={rawIsapre === "otra" ? "" : errors.isapre}
        value={rawIsapre}
        onChange={handleIsapreSelect}
        options={isapres}
      />
      {rawIsapre === "otra" && (
        <Input
          id='isapre'
          label='Especifica tu Isapre'
          placeholder='Ej: ABC Isapre'
          required
          error={errors.isapre}
          value={form.isapre}
          onChange={(val) => setField("isapre", val)}
        />
      )}
    </div>
  );
}
