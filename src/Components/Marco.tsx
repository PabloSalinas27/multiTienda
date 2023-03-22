import { useTiendaContext } from "../contextos/Productos";
import { Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Marco() {
  return (
    <>
    <Header/>
      <>Componente</>
      <Outlet/>
    <Footer/>
    </>
  );
}
