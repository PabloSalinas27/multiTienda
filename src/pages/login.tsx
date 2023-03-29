import { useSesionContext } from "../contextos/Sesion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { sesion, setSesion } = useSesionContext();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [registro, setRegistro] = useState(false);
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0ejEh_3FKLicl0Y_8vChVzIaEVuDbUUA";
  const urlRegistro =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0ejEh_3FKLicl0Y_8vChVzIaEVuDbUUA";
  const navigate = useNavigate();
  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const authData = {
      email: email,
      password: pass,
      returnSecureToken: true,
    };
    try {
      const res = await axios.post(registro ? urlRegistro : url, authData);
      setSesion({ id: res.data.localId, token: res.data.idToken });
      toast.success(`El usuario se ha ${registro ? "creado" : "logueado"} correctamente`);
      navigate("/");
    } catch {
      console.log("error");
      toast.error("Ha ocurrido un error");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col">
        <Form
          className="flex flex-col gap-5"
          method="post"
          onSubmit={(ev) => Promise.resolve(onSubmit(ev))}
        >
          <Row className="justify-content-md-center">
            <Container style={{ maxWidth: "30em" }} className="row">
              <h1 className="self-center">{registro? "Registro" : "Inicio de sesión"}</h1>
              <input
                className="form-control me-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Nombre de usuario"
              />
              <input
                className="form-control me-2"
                name="password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Contraseña"
              />
              <Button type="submit">{registro? "Registrarse" : "Iniciar sesión"}</Button>
              <Button onClick={() => setRegistro(!registro)} variant="outline-info">{!registro? "Registrarse" : "Iniciar sesión"}</Button>
            </Container>
          </Row>
        </Form>
      </div>
    </div>
  );
}
