import { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { CartModalDispatchContext } from "../ContextProviders/ModalContextProvider";

function WishlistCard({ title, img, onDelete, productID, sizes }) {
  const cartModalDispatchContext = useContext(CartModalDispatchContext);
  const setModalProps = cartModalDispatchContext;

  return (
    <Card className="mb-3">
      <Row className="p-2 align-items-stretch">
        <Col md={5}>
          <img src={img.src} alt={img.alt} style={{ maxHeight: "240px" }} />
        </Col>
        <Col md={7} className="d-flex flex-column justify-content-around">
          <h5>{title}</h5>
          <div>
            <Button
              variant="outline-secondary"
              className="add-to-cart shadow-none px-2 py-1 mb-3 col-lg-11"
              onClick={() => {
                setModalProps({ show: true, sizes, productID });
              }}
            >
              Add to cart
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
