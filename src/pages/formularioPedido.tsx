import { useState } from "react";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCarritoContext } from "src/contextos/Carrito";
import { DatosReparto, usePedidosContext } from "src/contextos/Pedidos";
import { useTiendaContext } from "src/contextos/Productos";

export default function FormularioPedido() {
  const { productosSeleccionados, setProductosSeleccionados } =
    useCarritoContext();
  const { pedidos, setPedidos } = usePedidosContext();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState<DatosReparto>({
    nombre: "",
    apellidos: "",
    direccion: "",
    ciudad: "",
    codigoPostal: 0,
    correoElectronico: "",
  });
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
      datosReparto: formulario,
    };
    pedidos.push(nuevoPedido);
    setPedidos([...pedidos]);
    setProductosSeleccionados([]);
    navigate("/gracias");
  };
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    console.log(console.log(form));
    if (form.checkValidity() === true) {
      handleComprar();
    }
    setValidated(true);
  };
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      style={{ textAlign: "left" }}
    >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombre"
            onChange={(e) =>
              setFormulario({ ...formulario, nombre: e.target.value })
            }
          />
          <Form.Control.Feedback>Correcto</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Apellidos"
            onChange={(e) =>
              setFormulario({ ...formulario, apellidos: e.target.value })
            }
          />
          <Form.Control.Feedback>Correcto</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  correoElectronico: e.target.value,
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              Introduzca un correo valido
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Direccion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Direccion"
            required
            onChange={(e) =>
              setFormulario({ ...formulario, direccion: e.target.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            Introduzca una direccion
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ciudad"
            required
            onChange={(e) =>
              setFormulario({ ...formulario, ciudad: e.target.value })
            }
          />
          <Form.Control.Feedback type="invalid">
            Introduzca una ciudad
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Codigo Postal</Form.Label>
          <Form.Control
            type="number"
            placeholder="Codigo postal"
            required
            onChange={(e) =>
              setFormulario({
                ...formulario,
                codigoPostal: parseInt(e.target.value),
              })
            }
          />
          <Form.Control.Feedback type="invalid">
            Introducir un código postal válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Aceptar términos y condiciones"
          feedback="Debes aceptar los términos y condiciones."
          feedbackType="invalid"
          title="Podemos vender tus datos de forma indisriminada a todo el mundo"
        />
      </Form.Group>
      <Button type="submit">Finalizar</Button>
    </Form>
  );
}
