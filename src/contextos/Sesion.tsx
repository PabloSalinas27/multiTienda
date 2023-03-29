import { createContext, useContext, useState } from "react";

type SesionContextType = {
  sesion?: { id: string; token: string };
  setSesion: (sesion?: SesionContextType["sesion"]) => void;
};

const SesionContext = createContext<SesionContextType>({
  setSesion: () => {},
  sesion: undefined,
});

export const useSesionContext = () => useContext(SesionContext);

export const LoginContextProvider = (props: any) => {
  const [sesion, setSesion] = useState<SesionContextType["sesion"]>();
  return (
    <SesionContext.Provider value={{ sesion, setSesion }}>
      {props.children}
    </SesionContext.Provider>
  );
};
