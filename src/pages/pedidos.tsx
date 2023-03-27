import { usePedidosContext } from "src/contextos/Pedidos";
import { useTiendaContext } from "src/contextos/Productos";


export default function Pedidos(){
    const { pedidos, setPedidos } = usePedidosContext();
    const { productos } = useTiendaContext();
    const pedidoView = pedidos.map((p) => {
        return(
            <div>
                <h2>{p.id}</h2>
                <h2>{p.fecha}</h2>
                {p.productos.map((p) => {
                    return(
                        <div>
                            <h2>{(productos[p.id]?.nombre || "Producto no encontrado")}</h2>
                            <h2>{p.cantidad}</h2>
                        </div>
                    );
                })
                }
            </div>
        );
    });
    return(<>
    <h1>Pedidos</h1>
    {pedidoView}
    </>);
}