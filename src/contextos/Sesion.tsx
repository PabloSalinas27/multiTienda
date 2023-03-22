import { createContext, useContext, useState } from "react";

type SesionContextType = {
  admin: boolean | "sinSesion";
  setAdmin: (arg: boolean | "sinSesion") => void;
};

const SesionContext = createContext<SesionContextType>({
  admin: "sinSesion",
  setAdmin: () => {},
});

export const useSesionContext = () => useContext(SesionContext);

export const SelectedContextProvider = (props: any) => {
  const [admin, setAdmin] = useState<SesionContextType["admin"]>("sinSesion");
  return (
    <SesionContext.Provider value={{ admin, setAdmin }}>
      {props.children}
    </SesionContext.Provider>
  );
};