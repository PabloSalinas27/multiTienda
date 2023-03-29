import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Navbar";
import Ul from "react-bootstrap/Navbar";
import { useFiltroContext } from "src/contextos/Filtro";
import { Link, useNavigate } from "react-router-dom";
import { useSesionContext } from "src/contextos/Sesion";
import toast from "react-hot-toast";

export default function Header() {
  const { sesion, setSesion } = useSesionContext();
  const { filtro, setFiltro } = useFiltroContext();
  const navigate = useNavigate();
  return (
    <Nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand" />
        <Button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-3 mb-lg-0">
            <li className="nav-item dropdown">
              <Ul className="dropdown-menu">
                <Link to="/catalogo">
                  <li>
                    <div className="dropdown-item">Catalogo</div>
                  </li>
                </Link>
                <Link to="/carrito">
                  <li>
                    <div className="dropdown-item">Carrito</div>
                  </li>
                </Link>
                <Link to="/pedidos">
                  <li>
                    <div className="dropdown-item">Pedidos</div>
                  </li>
                </Link>
                {sesion === undefined ? (
                  <Link to="/login">
                    <li>
                      <div className="dropdown-item">Login/Sign Up</div>
                    </li>
                  </Link>
                ) : (
                  <Button
                    style={{ minWidth: "8em" }}
                    onClick={() => {
                      setSesion();
                      toast.success("Se ha cerrado la sesion correctamente");
                      navigate("/catalogo");
                    }}
                    variant="outline-danger"
                  >
                    Cerrar sesion
                  </Button>
                )}
              </Ul>
            </li>
          </ul>
          <Form className="d-flex" role="search">
            <input
              value={filtro}
              onChange={(e) => setFiltro(e.target.value || "")}
              className="form-control me-2"
              type="search"
              placeholder="Buscar productos"
              aria-label="Search"
            ></input>
          </Form>
        </div>
      </div>
    </Nav>
  );
}
