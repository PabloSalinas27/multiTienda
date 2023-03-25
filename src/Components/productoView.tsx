import { Button, Card } from "react-bootstrap";
import { ProductoCarrito, useCarritoContext } from "src/contextos/Carrito";
import { Producto } from "src/contextos/Productos";
import manzana from "src/assets/manzana.jpeg";

export default function ProductoView({ producto }: { producto: Producto }) {
  const { productosSeleccionados, setProductosSeleccionados } =
    useCarritoContext();

  const prd = productosSeleccionados.find((p) => p.id === producto.id);
  let buttons;
  if (!prd || prd.cantidad < 1) {
    buttons = (
      <Button
        variant="primary"
        onClick={() =>
          setProductosSeleccionados([
            ...productosSeleccionados,
            { cantidad: 1, id: producto.id },
          ])
        }
      >
        Añadir producto
      </Button>
    );
  } else {
    buttons = (
      <>
        <Button variant="primary"
          onClick={() => {
            prd.cantidad--;
            setProductosSeleccionados([...productosSeleccionados.filter(p => p.cantidad > 0)]);
          }}
        >Menos</Button>
        <a >{prd.cantidad}</a>
        <Button
          variant="primary"
          onClick={() => {
            prd.cantidad++;
            setProductosSeleccionados([...productosSeleccionados]);
          }}
        >
          Mas
        </Button>
      </>
    );
  }

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={producto.foto || manzana} />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>{producto.descripcion}</Card.Text>
          {buttons}
        </Card.Body>
      </Card>
    </>
  );
}
