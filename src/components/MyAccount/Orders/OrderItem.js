import { Col, Row } from "react-bootstrap";

function OrderItem({ name, img, totalPrice, quantity, size }) {
  return (
    <Row className="my-3">
      <Col className="mb-2 m-xl-0">
        <img src={img.src} alt={img.alt} style={{ maxWidth: "150px" }}></img>
      </Col>
      <Col className="d-flex flex-column" lg={9}>
        <p className="fw-semibold">{name}</p>
        <p>Price: ${totalPrice}</p>
        <p>Quantity: {quantity}</p>
        <p>Size: {size}</p>
      </Col>
    </Row>
  );
}

export default OrderItem;
