import Container  from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Marco() {
  return (
    <>
      <Header />
      <Container style={{height: '100%'}}>Componentea</Container>
      <Outlet />
      <Footer />
    </>
  );
}
