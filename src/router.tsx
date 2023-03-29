import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Marco from "./Components/Marco";
import { CarritoContextProvider } from "./contextos/Carrito";
import { FiltroContextProvider } from "./contextos/Filtro";
import { TiendaContextProvider } from "./contextos/Productos";
import Catalogo from "./pages/catalogo";
import Login from "./pages/login";
import Carrito from "./pages/carrito";
import Pedidos from "./pages/pedidos";
import { PedidosContextProvider } from "./contextos/Pedidos";
import FormularioPedido from "./pages/formularioPedido";
import Gracias from "./pages/gracias";
import { LoginContextProvider } from "./contextos/Sesion";

const CtxProvider = () => {
  return (
    <LoginContextProvider>
      <TiendaContextProvider>
        <PedidosContextProvider>
          <CarritoContextProvider>
            <FiltroContextProvider>
              <Outlet />
            </FiltroContextProvider>
          </CarritoContextProvider>
        </PedidosContextProvider>
      </TiendaContextProvider>
    </LoginContextProvider>
  );
};
const router = createBrowserRouter([
  {
    element: <CtxProvider />,
    children: [
      {
        path: "/",
        element: <Marco />,
        children: [
          {
            path: "/",
            element: <Catalogo />,
          },
          {
            path: "/catalogo",
            element: <Catalogo />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/carrito",
            element: <Carrito />,
          },
          {
            path: "/pedidos",
            element: <Pedidos />,
          },
          {
            path: "/formularioPedido",
            element: <FormularioPedido />,
          },
          {
            path: "/gracias",
            element: <Gracias />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

export default router;
