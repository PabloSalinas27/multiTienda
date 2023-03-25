import { Button, Container } from "react-bootstrap";
import { useTiendaContext } from "src/contextos/Productos";
import { useCarritoContext } from "src/contextos/Carrito";
import ProductoView from "src/Components/productoView";
import { useFiltroContext } from "src/contextos/Filtro";

export default function Catalogo() {
  const { productos } = useTiendaContext();
  const { filtro } = useFiltroContext();
  return (
    <Container className="row">
      {Object.values(productos)
        .filter((p) => p.nombre.toLowerCase().match(filtro.toLowerCase()))
        .map((p) => (
          <>
            <ProductoView producto={p} key={p.id} />
          </>
        ))}
    </Container>
  );
}
