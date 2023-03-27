import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/esm/Modal";
import { toast } from "react-hot-toast";
import { usePedidosContext } from "src/contextos/Pedidos";
import { useTiendaContext } from "src/contextos/Productos";

export default function Pedidos() {
  const { pedidos, setPedidos } = usePedidosContext();
  const [show, setShow] = useState(false);
  const [id, setId] = useState(-1);
  const { productos } = useTiendaContext();
  const handleBorrarPedido = (id: number) => {
    if (id === -1) {
        toast.error("No se ha seleccionado ningun pedido");
        return;
    }
    const nuevosPedidos = pedidos.filter((p) => p.id !== id);
    setPedidos(nuevosPedidos);
    setShow(false);
  };
  const pedidoView = pedidos.map((p) => {
    return (
      <div>
        <h2>{p.id}</h2>
        <h2>{p.fecha}</h2>
        {p.productos.map((p) => {
          return (
            <div>
              <h2>{productos[p.id]?.nombre || "Producto no encontrado"}</h2>
              <h2>{p.cantidad}</h2>
            </div>
          );
        })}
        <Button onClick={() => {setId(p.id);setShow(true)}}>Borrar Pedido</Button>
      </div>
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
    </Modal>;
      <h1>Pedidos</h1>
      {pedidoView}
    </>
  );
}
