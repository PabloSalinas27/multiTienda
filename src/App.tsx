import Container from "react-bootstrap/Container";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { CarritoContextProvider } from "./contextos/Carrito";
import { TiendaContextProvider } from "./contextos/Productos";
import router from "./router";

function App() {
  return (
    <>
      <Container style={{ minHeight: "100vh" }}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </Container>
    </>
  );
}

export default App;
