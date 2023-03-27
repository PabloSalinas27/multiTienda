import { useCarritoContext } from "src/contextos/Carrito";
import { useTiendaContext } from "src/contextos/Productos";

export default function FormularioPedido() {
  const { productosSeleccionados } = useCarritoContext();
  const { productos } = useTiendaContext();
  const total = productosSeleccionados.reduce(
    (acumulado, producto) =>
      acumulado + producto.cantidad * (productos[producto.id]?.precio || 0),
    0
  );
  return (
    <div className="bottom">
      <h2>Resumen pedido</h2>
      <a>Productos: {Object.keys(productos).length}</a>
      <a>Productos seleccionados: {productosSeleccionados.length}</a>
      <a>Total: {total}</a>
    </div>
  );
}
