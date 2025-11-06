import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRut(rut: string): string {
  const clean = rut.replace(/\./g, "").replace(/-/g, "").toLowerCase();

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formattedBody}-${dv}`;
}

export function isValidRut(rut: string): boolean {
  const clean = rut.replace(/\./g, "").replace(/-/g, "").toLowerCase();
  if (clean.length < 2) return false;

  const body = clean.slice(0, -1);
  const dvInput = clean.slice(-1);

  if (!/^\d+$/.test(body)) return false;

  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const dvCalcNum = 11 - (sum % 11);
  let dvCalc: string;
  if (dvCalcNum === 11) dvCalc = "0";
  else if (dvCalcNum === 10) dvCalc = "k";
  else dvCalc = dvCalcNum.toString();

  return dvCalc === dvInput;
}

export function formatPhone(raw: string) {
  if (!raw) return "";
  // target format: x xxxx xxxx (1 + 4 + 4)
  const a = raw.slice(0, 1);
  const b = raw.slice(1, 5);
  const c = raw.slice(5, 9);

  if (!b) return a;
  if (!c) return `${a} ${b}`;
  return `${a} ${b} ${c}`;
}
