import { Check, ChevronDown, CircleX } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import clsx from "clsx";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = Omit<React.InputHTMLAttributes<HTMLSelectElement>, "onChange"> & {
  id: string;
  label?: string;
  notFound: string;
  error?: string;
  required?: boolean;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function SearchableSelect({
  id,
  label,
  notFound,
  placeholder,
  error,
  required,
  value,
  options,
  onChange,
  ...props
}: Props) {
  const isInvalid = Boolean(error);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-start justify-start gap-y-2 text-sm md:text-base font-archivo text-lexy-text">
      <label
        htmlFor={id}
        className="flex items-start font-medium text-lexy-text leading-5 w-full"
      >
        {label}
        {required && <span className="ml-1 text-[#008F8F]">*</span>}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={props.disabled} asChild>
          <button
            role="combobox"
            aria-expanded={open}
            className={clsx(
              "flex items-center justify-between disabled:bg-lexy-input-disabled border border-lexy-border-input rounded-sm transition-colors px-4 py-2 h-10 w-full",
              {
                "bg-lexy-input-filled": value !== ""
              }
            )}
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronDown className="opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput placeholder={placeholder} className="h-9 w-full" />
            <CommandList className="w-full">
              <CommandEmpty className="px-4 py-2 text-sm md:text-base">{notFound}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className="border-y border-y-lexy-border-input/20 text-lexy-text-secondary py-1 rounded-none text-sm md:text-base leading-6"
                  >
                    {option.label}
                    <Check
                      className={clsx("ml-auto", {
                        "opacity-0": value !== option.value,
                        "opacity-100": value === option.value,
                      })}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {isInvalid && (
        <div className="flex items-center gap-x-1 text-sm leading-5 text-lexy-danger">
          <CircleX className="w-4 h-4" />
          <span id={`${id}-error`}>{error}</span>
        </div>
      )}
    </div>
  );
}
