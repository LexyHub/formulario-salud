import { create } from "zustand";
import type {
  GlobalState,
  PersonalData,
  Contact,
} from "@/types/global-context.type";

interface GlobalStore extends GlobalState {
  setPersonalData: (data: Partial<PersonalData>) => void;
  setContactData: (data: Partial<Contact>) => void;
  setOrigen: (origen: GlobalState["origen"]) => void;
  setCodigoReferido: (codigo_referido: GlobalState["codigo_referido"]) => void;
  reset: () => void;
}

const initialState: GlobalState = {
  personalData: {},
  contactData: {},
  origen: null,
  codigo_referido: "",
};

export const useGlobalStore = create<GlobalStore>((set) => ({
  ...initialState,

  setPersonalData: (payload) =>
    set((state) => ({
      personalData: { ...state.personalData, ...payload },
    })),

  setContactData: (payload) =>
    set((state) => ({
      contactData: { ...state.contactData, ...payload },
    })),

  setOrigen: (payload) => set(() => ({ origen: payload })),

  setCodigoReferido: (payload) => set(() => ({ codigo_referido: payload })),

  reset: () => set(initialState),
}));
