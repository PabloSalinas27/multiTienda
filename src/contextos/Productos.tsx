import { createContext, useContext, useState } from "react"
type Productos = {
  productos: Producto[],
  setProductos: (productos: Producto[]) => void;
};
type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento?: number;
};
const TiendaContext = createContext<Productos>({ productos: [], setProductos: () => {} });
export const useTiendaContext = () => useContext(TiendaContext);
export const TiendaContextProvider = (props: any) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  return (
    <TiendaContext.Provider value={{ productos, setProductos}}>
      {props.children}
    </TiendaContext.Provider>
  );
};