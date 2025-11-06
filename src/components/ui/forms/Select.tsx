import { CircleX } from "lucide-react";
import {
  BaseSelect,
  BaseSelectContent,
  BaseSelectGroup,
  BaseSelectItem,
  BaseSelectLabel,
  BaseSelectTrigger,
  BaseSelectValue,
} from "../base-select";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Option = {
  label: string;
  value: string;
};

type Props = Omit<React.InputHTMLAttributes<HTMLSelectElement>, "onChange"> & {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  value: string;
  options: Option[];
  className?: string;
  onChange: (value: string) => void;
};

export default function Select({
  id,
  label,
  placeholder,
  error,
  required,
  value,
  options,
  className = "",
  onChange,
}: Props) {
  const isInvalid = Boolean(error);
  const finalClass = twMerge(
    "outline-none border rounded-sm transition-colors text-sm md:text-base px-4 py-2 min-h-[40px] bg-lexy-input-bg w-full",
    className
  );

  return (
    <div className='flex flex-col items-start justify-start gap-y-2 text-sm md:text-base font-archivo text-lexy-text'>
      <label
        htmlFor={id}
        className='flex items-start font-medium text-lexy-text leading-5 w-full'>
        <span className='flex items-start font-medium text-lexy-text-primary'>
          {label}
          {required && (
            <span className='ml-1 text-lexy-brand-primary select-none'>*</span>
          )}
        </span>
      </label>
      <BaseSelect required={required} onValueChange={onChange} value={value}>
        <BaseSelectTrigger
          className={clsx(finalClass, {
            "border-lexy-border-input text-lexy-label-field focus-within:border-lexy-brand-primary":
              !isInvalid,
            "border-lexy-danger text-lexy-danger": isInvalid,
            "bg-lexy-input-filled": value !== "",
            "text-[#666666]": !value || value === "",
          })}>
          <BaseSelectValue
            className='placeholder:text-lexy-text-secondary'
            placeholder={placeholder}
          />
        </BaseSelectTrigger>
        <BaseSelectContent
          id={id}
          className='outline-none border border-lexy-border-input text-lexy-label-field rounded-xs transition-colors bg-white w-full'>
          <BaseSelectGroup>
            <BaseSelectLabel>{label}</BaseSelectLabel>
            {options.map((option) => (
              <BaseSelectItem key={option.value} value={option.value}>
                {option.label}
              </BaseSelectItem>
            ))}
          </BaseSelectGroup>
        </BaseSelectContent>
      </BaseSelect>
      {isInvalid && (
        <div className='flex items-center gap-x-1 text-sm leading-5 text-lexy-danger'>
          <CircleX className='w-4 h-4' />
          <span id={`${id}-error`}>{error}</span>
        </div>
      )}
    </div>
  );
}
