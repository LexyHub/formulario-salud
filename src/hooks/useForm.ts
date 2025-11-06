import { useReducer, useState } from "react";
import type { ZodSchema } from "zod";

export function useForm<T>(initialState: T, schema?: ZodSchema<T>) {
  type Action<K extends keyof T = keyof T> = { field: K; value: T[K] };

  function reducer(state: T, action: Action): T {
    return { ...state, [action.field]: action.value };
  }

  const [form, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setField = <K extends keyof T>(field: K, value: T[K]) => {
    dispatch({ field, value });

    if (schema) {
      const result = schema.safeParse({ ...form, [field]: value });
      if (!result.success) {
        const issue = result.error.issues.find((i) => i.path[0] === field);
        setErrors((prev) => ({
          ...prev,
          [field]: issue ? issue.message : undefined,
        }));
      } else {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy[field];
          return copy;
        });
      }
    }
  };

  const validate = () => {
    if (!schema) return { success: true as const, data: form };

    const result = schema.safeParse(form);
    if (!result.success) {
      const zodErrors: Partial<Record<keyof T, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof T;
        zodErrors[field] = issue.message;
      });
      setErrors(zodErrors);
      return { success: false as const, errors: zodErrors };
    }
    setErrors({});
    return { success: true as const, data: result.data };
  };

  const hasErrors = () => {
    return Object.values(errors).some(Boolean)
  }

  return { form, setField, errors, validate, hasErrors };
}
