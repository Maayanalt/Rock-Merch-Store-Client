import { useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartModalDispatchContext } from "../ContextProviders/ModalContextProvider";

function WishlistCard({
  title,
  onDelete,
  productID,
  sizes,
  images,
  description,
  price,
}) {
  const cartModalDispatchContext = useContext(CartModalDispatchContext);
  const setModalProps = cartModalDispatchContext;

  return (
    <Card className="wishlist-card">
      <Card.Body className="d-flex p-2">
        <Row className="flex-column flex-xl-row flex-grow-1">
          <Col md={12} xl={5} className="d-flex justify-content-center">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="img-wishlist"
            />
          </Col>
          <Col
            xs={12}
            xl={6}
            className="d-flex flex-column justify-content-lg-around ps-xl-0 pe-xl-3 mb-xl-3 flex-grow-1 mt-2"
          >
            <Link
              to={`/item/${productID}`}
              state={{
                sizes,
                images,
                name: title,
                description,
                price,
              }}
              className="product-link mb-auto"
            >
              <Card.Title className="wishlist-title">{title}</Card.Title>
            </Link>
            <div className="pt-1">
              <Button
                variant="outline-secondary"
                className="add-to-cart shadow-none px-2 py-0 py-lg-1 mb-1 mb-xl-3 col-12"
                onClick={() => {
                  setModalProps({ show: true, sizes, productID });
                }}
              >
                Add to cart
              </Button>
              <Button
                variant="outline-secondary"
                className="shadow-none px-2 py-0 py-lg-1 col-12"
                onClick={() => onDelete(productID)}
              >
                Delete
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default WishlistCard;
