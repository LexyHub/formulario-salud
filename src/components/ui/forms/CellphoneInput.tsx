import { useCountryDials } from "@/hooks/useCountryDials";
import clsx from "clsx";
import { Check, ChevronDown, CircleX } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { ReactCountryFlag as Flag } from "react-country-flag"

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
};

export default function CellphoneInput({
  id,
  label,
  error,
  required,
  value,
  onChange,
  ...props
}: Props) {
  const isInvalid = Boolean(error);
  const { dialsAsOption } = useCountryDials({ minified: true });
  const [open, setOpen] = useState<boolean>(false);
  const [dialCode, setDialCode] = useState<string>("+56");
  const [flagCode, setFlagCode] = useState<string>("CL");
  const [number, setNumber] = useState<string>("");
  const changeRef = useRef(onChange)

  useEffect(() => {
    if (dialCode && number) {
      changeRef.current(`${dialCode} ${number}`);
    }
  }, [dialCode, number]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, "").slice(0, 10);
    setNumber(onlyNums);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-y-2 text-sm md:text-base font-archivo text-lexy-text">
      <label
        htmlFor={id}
        className="flex items-start font-medium text-lexy-text leading-5 w-full"
      >
        {label}
        {required && <span className="ml-1 text-[#008F8F]">*</span>}
      </label>
      <div className="grid grid-cols-[auto_1fr] w-full space-x-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger disabled={props.disabled} defaultValue="+56" asChild>
            <button
              role="combobox"
              aria-expanded={open}
              className={clsx(
                "flex items-center w-fit disabled:bg-lexy-input-disabled border border-lexy-border-input rounded-sm transition-colors px-4 py-2 h-10",
                {
                  "bg-lexy-input-filled": dialCode !== "",
                }
              )}
            >
              <Flag className="rounded-full mr-1.5" style={{ height: "18px", width: "18px", objectFit: "cover" }} countryCode={flagCode} svg />
              {dialCode ? dialCode : "+56"}
              <ChevronDown className="opacity-50 ml-2" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command className="w-full">
              <CommandInput placeholder="+56" className="h-9 w-full" />
              <CommandList className="w-full">
                <CommandEmpty className="px-4 py-2 text-sm md:text-base">
                  No se encontró el código
                </CommandEmpty>
                <CommandGroup>
                  {dialsAsOption.map((option) => (
                    <CommandItem
                      key={option.label}
                      value={option.value}
                      onSelect={() => {
                        setDialCode(option.value);
                        setFlagCode(option.label.toUpperCase())
                        setOpen(false);
                      }}
                      className="border-y border-y-lexy-border-input/20 text-lexy-text-secondary py-1 rounded-none text-sm md:text-base leading-6"
                    >
                      {option.value} ({option.label})
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
        <div
          className={clsx(
            "border border-lexy-border-input rounded-sm transition-colors px-4 py-2 h-10 w-full",
            {
              "border-lexy-danger": isInvalid,
              "bg-lexy-input-filled": number && number !== "",
              "bg-lexy-input-disabled": props.disabled,
            }
          )}
        >
          <input
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? `${id}-error` : undefined}
            className="bg-transparent outline-none placeholder:text-lexy-text-disabled font-archivo text-sm leading-5 w-full"
            id={id}
            value={number}
            onChange={handleInputChange}
            inputMode="numeric"
            type="text"
            {...props}
          />
        </div>
      </div>
      {isInvalid && (
        <div className="flex items-center gap-x-1 text-sm leading-5 text-lexy-danger">
          <CircleX className="w-4 h-4" />
          <span id={`${id}-error`}>{error}</span>
        </div>
      )}
    </div>
  );
}
