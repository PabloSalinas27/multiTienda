import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Row from "react-bootstrap/esm/Row";

export default function Marco() {
  return (
    <>
      <Container className="col" >
        <Row>
          <Header />
        </Row>
        &nbsp;
        <br></br>
        &nbsp;
        <Row style={{ minHeight: "70vh" }}>
          <Outlet />
        </Row>
        <Row style={{ marginTop: "auto" }}>
          <Footer />
        </Row>
      </Container>
    </>
  );
}
