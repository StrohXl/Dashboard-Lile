"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type ContextLayoutSchema = {
  theme: "dark" | "light";
  setTheme: Dispatch<SetStateAction<"dark" | "light">>;
};

const UseContextLayout = createContext<ContextLayoutSchema | undefined>(
  undefined
);

export function ContextLayout({
  children,
  themeCookie,
}: {
  children: ReactNode;
  themeCookie: "dark" | "light";
}) {
  const [theme, setTheme] = useState<"dark" | "light">(themeCookie);

  return (
    <UseContextLayout.Provider
      value={{
        setTheme,
        theme,
      }}
    >
      {children}
    </UseContextLayout.Provider>
  );
}

export function useContextLayout() {
  const context = useContext(UseContextLayout);
  if (!context) {
    throw new Error("useContextLayout debe usarse dentro de UseContextLayout");
  }
  return context;
}
