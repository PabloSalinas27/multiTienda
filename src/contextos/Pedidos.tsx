import { createContext, useContext, useEffect, useState } from "react";
import { ProductoCarrito } from "./Carrito";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSesionContext } from "./Sesion";
export type Pedido = {
  id: number;
  fecha: string;
  productos: ProductoCarrito[];
  datosReparto: DatosReparto;
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
  pedidos:  {[k: string]: Pedido };
  addPedido: (pedido: Pedido) => void;
  deletePedido: (idPedido: string) => void;
};
const PedidosContext = createContext<Pedidos>({
  pedidos: {},
  addPedido: () => {},
  deletePedido: () => {},
});
export const usePedidosContext = () => useContext(PedidosContext);

export const PedidosContextProvider = (props: any) => {
  const { sesion } = useSesionContext();
  const [pedidos, setPedidos] = useState<Pedidos["pedidos"]>({});
  useEffect(() => {
    if (sesion) {
      axios
        .get(
          `https://dsm23-b0103-default-rtdb.europe-west1.firebasedatabase.app/users/${sesion?.id}.json?auth=${sesion?.token}`
        )
        .then((response) => {
          if (response.data === null) {
            setPedidos({});
            return;
          }
          const { pedidos, ...resto } = response.data;
          setPedidos(
            resto as Pedidos['pedidos']|| {}
          );
        })
        .catch((e) => {
          console.error(e);
          toast.error("Ha habido un error cargando sus pedidos");
        });
    } else {
      setPedidos({});
    }
  }, [sesion]);
  // set pedidos se encarga de, llamar a la api para persistir los datos. Luego actualiza pedidos con los nuevos datos
  // dependiendo de si ha salido bien o no.
  const addPedido = (pedidoNuevo: Pedido) => {
    axios
      .post(
        `https://dsm23-b0103-default-rtdb.europe-west1.firebasedatabase.app/users/${sesion?.id}.json?auth=${sesion?.token}`,
        pedidoNuevo
      )
      .then((response) => {
        setPedidos({...pedidos, [response.data.name]: pedidoNuevo});
        toast.success("El pedido se ha insertado en la base de datos");
      })
      .catch((error) => {
        console.error(error);
        toast.error("No se puede crear el pedido");
      });
  };
  const deletePedido = (idPedido: string) => {
    axios
      .delete(
        `https://dsm23-b0103-default-rtdb.europe-west1.firebasedatabase.app/users/${sesion?.id}/${idPedido}.json?auth=${sesion?.token}`
      )
      .then((response) => {

        const { [idPedido]: _, ...resto } = pedidos;
        setPedidos(resto);
        toast.success("El pedido se ha eliminado de la base de datos");
      })
      .catch((error) => {
        console.error(error);
        toast.error("No se puede borrar el pedido");
      });
  };
  return (
    <PedidosContext.Provider value={{ pedidos, addPedido, deletePedido }}>
      {props.children}
    </PedidosContext.Provider>
  );
};
