import Button from "react-bootstrap/Button";
import  Nav  from "react-bootstrap/Navbar";
import  Ul from "react-bootstrap/Navbar";

export default function Header() {
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
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Idiomas (en ranking de importancia)
              </a>
              <Ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">(S)pain</a></li>
                <li><a className="dropdown-item" href="#">Germoney</a></li>
                <li><a className="dropdown-item" href="#">frances</a></li>
              </Ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Escribes?" aria-label="Search"></input>
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </Nav>
  );
}