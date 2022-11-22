import { Col, Row } from "react-bootstrap";

function CheckoutItem({ img, name, quantity, price, size = "one size" }) {
  return (
    <Row className="mb-3">
      <Col lg={9} className="d-flex">
        <img src={img.src} alt={img.alt} style={{ maxHeight: "100px" }} />
        <Col lg={7} className="ms-3">
          <p className="fw-semibold">{name}</p>
        </Col>
      </Col>
      <Col lg={3}>
        <p className="lh-base mb-1">size: {size}</p>
        <p className="lh-base mb-1">quantity: {quantity}</p>
        <p className="lh-base mb-1">${price * quantity}</p>
      </Col>
    </Row>
  );
}

export default CheckoutItem;
