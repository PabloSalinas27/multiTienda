import { Button, Card } from "react-bootstrap";
import { ProductoCarrito, useCarritoContext } from "src/contextos/Carrito";
import { Producto } from "src/contextos/Productos";
import manzana from "src/assets/manzana.jpeg";

export default function ProductoView({ producto , props}: { producto: Producto , props: "alargado" | "tarjeta"}) {
  const { productosSeleccionados, setProductosSeleccionados } =
    useCarritoContext();

  const al = props === "alargado";
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
        >Menos </Button>
        <a style={{margin: "2em"}}>{prd.cantidad} ud.</a>
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
      <Card style={al ? { width: '18rem' } : {width: '30rem'}}>
        <Card.Img  variant="top" src={producto.foto || manzana} />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>{producto.descripcion}</Card.Text>
          <Card.Text>{producto.precio} €</Card.Text>
          {buttons}
        </Card.Body>
      </Card>
    </>
  );
}
