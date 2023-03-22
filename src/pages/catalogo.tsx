import { Button } from "react-bootstrap";
import { useTiendaContext } from "../contextos/Productos";

export default function Catalogo() {
  const { productos, setProductos } = useTiendaContext();
  return (
    <>
      <Button 
        onClick={() =>
          setProductos([
            {
              id: 3,
              nombre: "Raton",
              descripcion: "No es de ordenador",
              precio: 3,
              descuento: 10,
            },
            {
              id: 4,
              nombre: "Teclado",
              descripcion: "Es para musica",
              precio: 500,
            },
          ])
        } >anadir</Button>

      <Button onClick={() => setProductos([])}>quitar uno</Button>
      {productos.map((p) => (
        <>
          <h5>{p.nombre}</h5>
          <h5>{p.descripcion}</h5>
          <h5>{p.precio}$</h5>
          <h5>{p.descuento}%</h5>
        </>
      ))}
    </>
  );
}