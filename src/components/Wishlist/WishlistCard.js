import { Button, Card, Col, Row } from "react-bootstrap";

function WishlistCard({ title, img, onDelete, productID }) {
  return (
    <Card className="mb-3">
      <Row className="p-2 align-items-stretch">
        <Col md={6}>
          <img src={img.src} alt={img.alt} style={{ maxHeight: "340px" }} />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-around">
          <h5>{title}</h5>
          <div>
            <Button
              variant="outline-secondary"
              className="add-to-cart shadow-none px-2 py-1 mb-3 col-lg-11"
            >
              Add to cart
            </Button>
            <Button
              variant="danger"
              className="shadow-none px-2 py-1 mb-3 col-lg-11"
            >
              Buy it now
            </Button>
            <Button
              variant="outline-secondary"
              className="shadow-none px-2 py-1 col-lg-11"
              onClick={() => onDelete(productID)}
            >
              Delete
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default WishlistCard;
