import { createContext, useContext, useReducer, type ReactNode } from "react";
import type {
  GlobalState,
  PersonalData,
  Contact,
} from "@/types/global-context.type";

type Action =
  | { type: "SET_PERSONAL_DATA"; payload: Partial<PersonalData> }
  | { type: "SET_CONTACT_DATA"; payload: Partial<Contact> }
  | { type: "SET_IS_REFERIDO"; payload: boolean }
  | { type: "RESET" };

const initialState: GlobalState = {
  personalData: {},
  contactData: {},
  isReferido: false,
};

function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case "SET_PERSONAL_DATA":
      return {
        ...state,
        personalData: { ...state.personalData, ...action.payload },
      };
    case "SET_CONTACT_DATA":
      return {
        ...state,
        contactData: { ...state.contactData, ...action.payload },
      };
    case "SET_IS_REFERIDO":
      return { ...state, isReferido: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const GlobalContext = createContext<{
  state: GlobalState;
  setPersonalData: (data: Partial<PersonalData>) => void;
  setContactData: (data: Partial<Contact>) => void;
  setIsReferido: (value: boolean) => void;
  reset: () => void;
} | null>(null);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPersonalData = (data: Partial<PersonalData>) =>
    dispatch({ type: "SET_PERSONAL_DATA", payload: data });

  const setContactData = (data: Partial<Contact>) =>
    dispatch({ type: "SET_CONTACT_DATA", payload: data });

  const setIsReferido = (value: boolean) =>
    dispatch({ type: "SET_IS_REFERIDO", payload: value });

  const reset = () => dispatch({ type: "RESET" });

  return (
    <GlobalContext.Provider
      value={{ state, setPersonalData, setContactData, setIsReferido, reset }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext debe usarse dentro de GlobalProvider");
  return context;
}
