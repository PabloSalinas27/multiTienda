import  Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  Nav  from "react-bootstrap/Navbar";
import  Ul from "react-bootstrap/Navbar";
import { useFiltroContext } from "src/contextos/Filtro";
import { Link } from "react-router-dom";

export default function Header() {
  const { filtro, setFiltro } = useFiltroContext();
  return (
    <Nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand" />
        <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Ul className="dropdown-menu">
                <Link to="/catalogo"><li><a className="dropdown-item" href="#">Catalogo</a></li></Link>
                <Link to="/pedidos"><li><a className="dropdown-item" href="#">Carrito</a></li></Link>
                <Link to="/login"><li><a className="dropdown-item" href="#">Login/Logout</a></li></Link>
              </Ul>
            </li>
          </ul>
          <Form className="d-flex" role="search">
            <input value={filtro} onChange={(e) => setFiltro(e.target.value || "")} className="form-control me-2" type="search" placeholder="Buscar productos" aria-label="Search"></input>
          </Form>
        </div>
      </div>
    </Nav>
  );
}