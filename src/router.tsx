import { createBrowserRouter, Navigate } from "react-router-dom";
import Marco from "./Components/Marco";
import Catalogo from "./pages/catalogo";
// import Admin from "./pages/admin";
// import Cars from "./pages/cars";
// import DefaultLayout from "./pages/defaultLayout";
// import GuestLayout from "./pages/guestLayout";
// import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Marco />,
    children: [
      {
        path: "/",
        element: <Navigate to="/catalogo" />,
      },
      {
        path: "/catalogo",
        element: <Catalogo />,
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
]);

export default router;
