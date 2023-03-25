import { createContext, useContext, useState } from "react";
export type ProductoCarrito = {
  cantidad: number;
  id: number;
};
export type Carrito = {
  productosSeleccionados: ProductoCarrito[];
  setProductosSeleccionados: (productos: ProductoCarrito[]) => void;
};
const CarritoContext = createContext<Carrito>({
  productosSeleccionados: [],
  setProductosSeleccionados: () => {},
});
export const useCarritoContext = () => useContext(CarritoContext);

export const CarritoContextProvider = (props: any) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    ProductoCarrito[]
  >([]);
  return (
    <CarritoContext.Provider
      value={{ productosSeleccionados, setProductosSeleccionados }}
    >
      {props.children}
    </CarritoContext.Provider>
  );
};
