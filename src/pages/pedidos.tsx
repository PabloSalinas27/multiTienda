import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { toast } from "react-hot-toast";
import { Pedido, usePedidosContext } from "src/contextos/Pedidos";
import { useTiendaContext } from "src/contextos/Productos";
import { ProductoCarrito } from "src/contextos/Carrito";
import Accordion from "react-bootstrap/Accordion";

export default function Pedidos() {
  const { pedidos, deletePedido } = usePedidosContext();
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const { productos } = useTiendaContext();
  const calcularTotal = (p: ProductoCarrito[]) =>
    p.reduce(
      (acumulado, producto) =>
        acumulado + producto.cantidad * (productos[producto.id]?.precio || 0),
      0
    );
  const handleBorrarPedido = (id: string) => {
    if (pedidos[id] === undefined) {
      toast.error("No se ha seleccionado ningun pedido");
      return;
    }
    deletePedido(id);
    setShow(false);
  };
  const pedidoView = Object.entries(pedidos).map(([id, p]) => {
    return (
      <Accordion.Item key={p.id} eventKey={p.id.toString()}>
        <Accordion.Header>
          <h3>
            Numero de pedido: {p.id}. Fecha del pedido:{" "}
            {new Date(p.fecha).toLocaleDateString()}. Total:{" "}
            {calcularTotal(p.productos)}€
          </h3>
        </Accordion.Header>
        <Accordion.Body>
          <div>
            <i>Repartir a: </i>
            <i>
              {p.datosReparto.direccion}, {p.datosReparto.ciudad}
              {` (CP: ${p.datosReparto.codigoPostal})`}
            </i>
          </div>
          <div>
            <i>Contacto: </i>
            <i>{p.datosReparto.correoElectronico + " ("}</i>
            <i>{p.datosReparto.apellidos},</i>
            <i>{" " + p.datosReparto.nombre + ")"}</i>
          </div>
          {p.productos.map((prod) => {
            return (
              <div key={p.id.toString() + prod.id.toString()}>
                <h4>
                  {productos[prod.id]?.nombre || "Producto no encontrado"}
                </h4>
                <h4>{prod.cantidad}</h4>
              </div>
            );
          })}
          <Button
            variant="danger"
            style={{ maxWidth: "20em" }}
            onClick={() => {
              setId(id);
              setShow(true);
            }}
          >
            Borrar Pedido
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    );
  });
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirma la cancelacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Atras
          </Button>
          <Button variant="danger" onClick={() => handleBorrarPedido(id)}>
            Borrar
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Pedidos</h1>
      <Accordion>{pedidoView}</Accordion>
    </>
  );
}
