import { Button } from "react-bootstrap";
import { useTiendaContext } from "src/contextos/Productos";
import cerezas from "src/assets/cerezas.png";
import manzana from "src/assets/manzana.jpeg";

export default function Catalogo() {
  const { productos, setProductos } = useTiendaContext();
  return (
    <>
      <Button 
        onClick={() =>
          setProductos([
            {
              id: 3,
              nombre: "Cerezas",
              descripcion: "No es de ordenador",
              precio: 3,
              descuento: 10,
              foto: cerezas
            },
            {
              id: 4,
              nombre: "Manzana",
              descripcion: "Es para musica",
              precio: 500,
              foto: manzana
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
          <img src={p.foto} alt="foto" />
        </>
      ))}
    </>
  );
}