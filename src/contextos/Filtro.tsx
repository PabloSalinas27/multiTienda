import { createContext, useContext, useState } from "react";
export type Filtro = {
  filtro: string;
  setFiltro: (productos: string) => void;
};
const FiltroContext = createContext<Filtro>({filtro: "", setFiltro: () => {}});
export const useFiltroContext = () => useContext(FiltroContext);

export const FiltroContextProvider = (props: any) => {
  const [filtro , setFiltro] = useState("");
   return (
    <FiltroContext.Provider
      value={{ filtro, setFiltro }}
    >
      {props.children}
    </FiltroContext.Provider>
  );
};
