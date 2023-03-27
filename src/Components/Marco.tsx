import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Row from "react-bootstrap/esm/Row";

export default function Marco() {
  return (
    <>
      <Container className="col" style={{ minHeight: "70vh" }}>
        <Row>
          <Header />
        </Row>
        Componentea
        <Row>
          <Outlet />
        </Row>
        <Row style={{marginTop: "auto"}}>
          <Footer />
        </Row>
      </Container>
    </>
  );
}
