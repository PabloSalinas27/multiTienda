import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import cerezas from "src/assets/cerezas.png";
import manzana from "src/assets/manzana.jpeg";

type Productos = {
  productos: {[k: number]: Producto};
  setProductos: (productos: {[k: number]: Producto}) => void;
};
export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento?: number;
  foto?: string;
};
const mockProductos = { 
  3: {
    id: 3,
    nombre: "Cerezas",
    descripcion: "No es de ordenador",
    precio: 3,
    descuento: 10,
    foto: cerezas,
  },
  4: {
    id: 4,
    nombre: "Manzana",
    descripcion: "Es para musica",
    precio: 500,
    foto: manzana,
  },
};
const TiendaContext = createContext<Productos>({
  productos: [],
  setProductos: () => {},
});
export const useTiendaContext = () => useContext(TiendaContext);
export const TiendaContextProvider =  (props: any) => {
  
  const [productos, setProductos] = useState<{[k: number]: Producto}>({});
  useEffect(() => {
  axios.get(import.meta.env.VITE_FIREBASE_URL + "/catalogo.json")
    .then((response) =>  setProductos(response.data))}, [])
  return (
    <TiendaContext.Provider
      value={{ productos, setProductos }}
    >
      {props.children}
    </TiendaContext.Provider>
  );
};

/*
usuario: { contra: string, pedidos: [pedidos], esAdmin: boolean, datosPersonales: DatosReparto }
*/