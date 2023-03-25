import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Marco from "./Components/Marco";
import { CarritoContextProvider } from "./contextos/Carrito";
import { FiltroContextProvider } from "./contextos/Filtro";
import { TiendaContextProvider } from "./contextos/Productos";
import Catalogo from "./pages/catalogo";
import Login from "./pages/login";
import Pedidos from "./pages/pedidos";
// import Admin from "./pages/admin";
// import Cars from "./pages/cars";
// import DefaultLayout from "./pages/defaultLayout";
// import GuestLayout from "./pages/guestLayout";
// import Login from "./pages/login";

const CtxProvider = () => {
  return (
    <TiendaContextProvider>
      <CarritoContextProvider>
        <FiltroContextProvider>
          <Outlet />
        </FiltroContextProvider>
      </CarritoContextProvider>
    </TiendaContextProvider>
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
            element: <Login/>,
          },
          {
            path: "/pedidos",
            element: <Pedidos/>,
          },
          //   {
          //     path: "/admin",
          //     element: <Admin />,
          //   },
        ],
      },
      //   {
      //     path: "/",
      //     element: <GuestLayout />,
      //     children: [
      //       {
      //         path: "/login",
      //         element: <Login />,
      //       },
      //     ],
      //   },
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

export default router;
