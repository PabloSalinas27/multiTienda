import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/esm/Modal";
import Row from "react-bootstrap/esm/Row";
import toast from "react-hot-toast";
import ProductoView from "src/Components/ProductoView";
import { useCarritoContext } from "src/contextos/Carrito";
import { useFiltroContext } from "src/contextos/Filtro";
import { usePedidosContext } from "src/contextos/Pedidos";
import { useTiendaContext } from "src/contextos/Productos";

export default function Carrito() {
  const { productosSeleccionados, setProductosSeleccionados } =
    useCarritoContext();
  const { productos } = useTiendaContext();
  const { pedidos, setPedidos } = usePedidosContext();
  const [ show, setShow ] = useState(false);
  const total = productosSeleccionados.reduce(
    (acumulado, producto) =>
      acumulado + producto.cantidad * (productos[producto.id]?.precio || 0),
    0
  );
  const handleComprar = () => {
    if (productosSeleccionados.length === 0) {
      toast.error("No hay productos seleccionados");
      return;
    }
    pedidos.sort((a, b) => b.id - a.id);
    const nuevoPedido = {
      id: (pedidos[0]?.id || 0) + 1,
      productos: productosSeleccionados,
      fecha: new Date().toISOString(),
    };
    pedidos.push(nuevoPedido);
    setPedidos([...pedidos]);
    setProductosSeleccionados([]);
    setShow(false);
  };
  const { filtro } = useFiltroContext();
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirma la cancelacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esto le llevara a la pagina de datos de reparto</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Atras
          </Button>
          <Button variant="primary" onClick={handleComprar}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row>
          <Col sm={8}>
            {productosSeleccionados
              .map((p) => productos[p.id])
              .filter((p) =>
                p?.nombre.toLowerCase().match(filtro.toLowerCase())
              )
              .map((p) => (
                <>
                  <ProductoView producto={p} key={p.id} props="alargado" />
                </>
              ))}
          </Col>
          <Col sm={4}>
            <h2>Total</h2>
            <h2>{total}€</h2>
            <Button onClick={() => setShow(true)}>Comprar</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
