import { createContext, useContext, useState } from "react"
export type ProductoCarrito = {
  producto: string;
  cantidad: number;
  id: number;
};
export type Carrito = {
  productosSeleccionados: ProductoCarrito[];
  setProductosSeleccionados: (productos: ProductoCarrito[]) => void;
};
export const CarritoContext = createContext<Carrito>({ productosSeleccionados:[] , setProductosSeleccionados: () => {}});
export const useCarritoContext = () => useContext(CarritoContext);

export const CarritoContextProvider = (props: any) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState< ProductoCarrito[] >([]);
  return (
    <CarritoContext.Provider value={{ productosSeleccionados, setProductosSeleccionados}}>
      {props.children}
    </CarritoContext.Provider>
  );
};