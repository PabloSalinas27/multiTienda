import { createContext, useContext, useState } from "react";

type SesionContextType = {
  token?: string;
  setToken: (arg?: string | undefined) => void;
};

const SesionContext = createContext<SesionContextType>({
  setToken: () => {},
});

export const useSesionContext = () => useContext(SesionContext);

export const SelectedContextProvider = (props: any) => {
  const [token, setToken] = useState<SesionContextType["token"]>();
  return (
    <SesionContext.Provider value={{ token, setToken }}>
      {props.children}
    </SesionContext.Provider>
  );
};