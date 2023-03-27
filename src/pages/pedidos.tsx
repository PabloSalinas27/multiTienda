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
      <div key={p.id}>
        <h2>Numero de pedido: {p.id}</h2>
        <h2>Fecha del pedido: {new Date(p.fecha).toLocaleDateString()}</h2>
        <div>
          <a>Repartir a: </a>
          <a>
            {p.datosReparto.direccion}, {p.datosReparto.ciudad} 
             {` (CP: ${p.datosReparto.codigoPostal})`}
          </a>
        </div>
        <div>
          <a>Contacto: </a>
          <a>{p.datosReparto.correoElectronico + " ("}</a>
          <a>{p.datosReparto.apellidos},</a>
          <a>{" " + p.datosReparto.nombre + ")"}</a>
        </div>
        {p.productos.map((prod) => {
          return (
            <div key={p.id.toString() + prod.id.toString()}>
              <h2>{productos[prod.id]?.nombre || "Producto no encontrado"}</h2>
              <h2>{prod.cantidad}</h2>
            </div>
          );
        })}
        <Button
          onClick={() => {
            setId(p.id);
            setShow(true);
          }}
        >
          Borrar Pedido
        </Button>
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
      </Modal>
      <h1>Pedidos</h1>
      {pedidoView}
    </>
  );
}
