import { useContext } from "react";
import { CarritoContext } from "../contextos/Carrito";
import { useTiendaContext } from "../contextos/Productos";

export default function Footer() {
    const { productosSeleccionados } = useContext(CarritoContext);
    const { productos } = useTiendaContext();
    const total = productosSeleccionados.reduce(
        (acumulado, producto) =>
        acumulado + producto.cantidad * (productos[producto.id]?.precio || 0),
        0
    );
    return (
        <footer>
            <h2>Footer</h2>
            <a>Productos: {productos.length}</a>
            <a>Productos seleccionados: {productosSeleccionados.length}</a>
            <a>Total: {total}</a>
        </footer>
    );
}