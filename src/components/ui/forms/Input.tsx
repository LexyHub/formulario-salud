import { formatRut } from "@/lib/utils";
import clsx from "clsx";
import { CircleX } from "lucide-react";
import type { ChangeEvent } from "react";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  id: string;
  label?: string;
  error?: string;
  required?: boolean;
  value: string;
  className?: string;
  onChange: (value: string) => void;
};

export default function Input({
  id,
  label,
  error,
  required,
  value,
  onChange,
  className,
  type,
  ...props
}: Props) {
  const isInvalid = Boolean(error);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const regex = /^\d*\.?\d*$/;
      if (!regex.test(e.target.value)) {
        return;
      }
    } else if (type === "rut") {
      // allow digits, dots and hyphen and K/k while typing
      const regex = /^[0-9kK.\-]*$/;
      if (!regex.test(e.target.value)) {
        return;
      }
    }
    onChange(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (type === "rut") {
      const formatted = formatRut(e.target.value);
      onChange(formatted);
    }

    // // call original onBlur if provided in props
    // const origOnBlur = (props as any).onBlur as
    //   | React.FocusEventHandler<HTMLInputElement>
    //   | undefined;
    // if (origOnBlur) origOnBlur(e);
  };

  return (
    <div className='flex flex-col items-start justify-start gap-y-2 text-sm md:text-base text-lexy-text'>
      <label
        htmlFor={id}
        className='flex items-start font-medium text-lexy-text leading-5 w-full'>
        {label}
        {required && <span className='ml-1 text-[#008F8F]'>*</span>}
      </label>
      <div
        className={clsx(
          "border border-lexy-border-input rounded-sm transition-colors px-4 py-2 h-10 w-full",
          className,
          {
            "border-lexy-danger": isInvalid,
            "bg-lexy-input-filled": value && value !== "",
            "bg-lexy-input-disabled": props.disabled,
          }
        )}>
        <input
          aria-describedby={isInvalid ? `${id}-error` : undefined}
          className='bg-transparent outline-none border-none w-full placeholder:text-lexy-text-secondary text-sm md:text-base placeholder:text-sm placeholder:md:text-base leading-5'
          id={id}
          value={value}
          onChange={handleChange}
          type='text'
          {...props}
          onBlur={handleBlur}
        />
      </div>
      {isInvalid && (
        <div className='flex items-center gap-x-1 text-sm leading-5 text-lexy-danger'>
          <CircleX className='w-4 h-4' />
          <span id={`${id}-error`}>{error}</span>
        </div>
      )}
    </div>
  );
}
