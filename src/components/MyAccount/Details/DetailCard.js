import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function DetailCard({ state, text, title }) {
  return (
    <Row className="mb-4">
      <Col>
        <Card.Text className="mb-0 fw-semibold">{title}</Card.Text>
        <Card.Text>{text}</Card.Text>
      </Col>
      <Button
        variant="outline-secondary"
        className="shadow-none px-0 pt-2 col-lg-1 edit-btn"
        as={Link}
        to="/my-account/edit-page"
        state={state}
      >
        Edit
      </Button>
    </Row>
  );
}

export default DetailCard;
