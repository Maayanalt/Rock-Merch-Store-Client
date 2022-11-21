import { Col, Row } from "react-bootstrap";

function OrderItem({ name, img, totalPrice, quantity, size }) {
  console.log(img);

  return (
    <Row className="my-3">
      <Col>
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
