import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Gracias() {
    return (
        <div>
            <h1>Gracias por tu compra</h1>
            <Link to="/catalogo">
            <Button>Seguir Comprando</Button>
            </Link>
        </div>
    );
}