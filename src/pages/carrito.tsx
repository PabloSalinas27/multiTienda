import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import ProductoView from "src/Components/ProductoView";
import { useCarritoContext } from "src/contextos/Carrito";
import { useFiltroContext } from "src/contextos/Filtro";
import { usePedidosContext } from "src/contextos/Pedidos";
import { useTiendaContext } from "src/contextos/Productos";





export default function Carrito() {
    const { productosSeleccionados, setProductosSeleccionados } = useCarritoContext();
    const { productos } = useTiendaContext();
    const { pedidos, setPedidos } = usePedidosContext();
    const total = productosSeleccionados.reduce(
        (acumulado, producto) =>
        acumulado + producto.cantidad * (productos[producto.id]?.precio || 0),
        0
    );
    const handleComprar = () => {
      pedidos.sort((a, b) => b.id - a.id);
      const nuevoPedido = { id: (pedidos[0]?.id || 0) + 1, productos: productosSeleccionados, fecha: new Date().toISOString()};
      pedidos.push(nuevoPedido);
      setPedidos([...pedidos]);
      setProductosSeleccionados([]);
    };
  const { filtro } = useFiltroContext();
  return (
    <Container>
      <Row>
        <Col sm={8}>
          {productosSeleccionados
            .map((p) => productos[p.id])
            .filter((p) => p?.nombre.toLowerCase().match(filtro.toLowerCase()))
            .map((p) => (
              <>
                <ProductoView producto={p} key={p.id} props="alargado"/>
              </>
            ))}
        </Col>
        <Col sm={4}>
          <h2>Total</h2>
          <h2>{total}€</h2>
          <Button onClick={handleComprar}>Comprar</Button>
        </Col>
      </Row>
    </Container>
  );
}
