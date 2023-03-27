import { createContext, useContext, useState } from "react";
import { ProductoCarrito } from "./Carrito";
export type Pedido = {
  id: number;
  fecha: string;
  productos: ProductoCarrito[];
  datosReparto: DatosReparto
};
export type DatosReparto = {
  nombre: string;
  apellidos: string;
  direccion: string;
  ciudad: string;
  codigoPostal: number;
  correoElectronico: string;
};
export type Pedidos = {
  pedidos: Pedido[];
  setPedidos: (productos: Pedido[]) => void;
};
const PedidosContext = createContext<Pedidos>({
  pedidos: [],
  setPedidos: () => {},
});
export const usePedidosContext = () => useContext(PedidosContext);

export const PedidosContextProvider = (props: any) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  return (
    <PedidosContext.Provider value={{ pedidos, setPedidos }}>
      {props.children}
    </PedidosContext.Provider>
  );
};
