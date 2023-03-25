import { useSesionContext } from "../contextos/Sesion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Container, Row } from "react-bootstrap";

export default function Login() {
  const { admin, setAdmin } = useSesionContext();
  const [message, setMessage] = useState(null);
  const url = import.meta.env.LOGIN_BASE_URL;
  const onSubmit = async (ev: any) => {
    console.log(admin, url);
    //ev.preventDefault();
    const form = ev.target;
    const formData = new FormData(form);
    const res = await axios.get(url ,{ params: formData });
    setAdmin(res.data);

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setAdmin(data.admin);
        } else if (response.status == 400) {
          toast.error("Introduzca correctamente usuario y contraseña");
          setAdmin("sinSesion");
        } else if (response.status == 401) {
          toast.error("Acceso denegado");
          setAdmin("sinSesion");
        } else {
          toast.error("Problema en el servidor");
          setAdmin("sinSesion");
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status && response.data) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col">
        <Form className="flex flex-col gap-5" method="post" onSubmit={onSubmit}>
            <Row className="justify-content-md-center">
          <Container style={{maxWidth: '30em'}} className="row">
          <h1 className="self-center">Inicio de sesion</h1>

          {message && (
            <div className="alert">
              <p>{message}</p>
            </div>
          )}

          <input className="form-control me-2" name="username" type="text" placeholder="Nombre de usuario" />
          <input className="form-control me-2" name="password" type="password" placeholder="Contraseña" />
          <Button >Iniciar sesión</Button>
          </Container>
          </Row>
        </Form>
      </div>
    </div>
  );
}
