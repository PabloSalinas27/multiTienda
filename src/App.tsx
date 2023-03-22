import { RouterProvider } from "react-router-dom";
import "./App.css";
import { CarritoContextProvider } from "./contextos/Carrito";
import { TiendaContextProvider } from "./contextos/Productos";
import router from "./router";

function App() {
  return (
    <>
      <TiendaContextProvider>
        <CarritoContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CarritoContextProvider>
      </TiendaContextProvider>
    </>
  );
}

export default App;
