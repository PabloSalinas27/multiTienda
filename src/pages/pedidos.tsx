import Container from "react-bootstrap/esm/Container";
import ProductoView from "src/Components/productoView";
import { useCarritoContext } from "src/contextos/Carrito";
import { useFiltroContext } from "src/contextos/Filtro";
import { useTiendaContext } from "src/contextos/Productos";

export default function Pedidos() {
  const { productosSeleccionados } = useCarritoContext();
  const { productos } = useTiendaContext();
  const { filtro } = useFiltroContext();
  return (
    <Container className="row">
      {productosSeleccionados.map(p => productos[p.id])
        .filter(p => p?.nombre.toLowerCase().match(filtro.toLowerCase()))
        .map((p) => (
          <>
            <ProductoView producto={p} key={p.id} />
          </>
        ))}
    </Container>
  );
}