import { useState } from "react";
import { Card, Col, Carousel, Row, Button, Alert } from "react-bootstrap";
import { IoHeartCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import CartModal from "../CartModal/CartModal";
import { createToCart, postToWishlist } from "../../DAL/api";

function ProductCard({ images, name, sizes, price, description, productID }) {
  const [alert, setAlert] = useState({ message: "", show: false });
  const [showModal, setShowModal] = useState(false);

  async function addToWishlist() {
    const success = await postToWishlist(productID);
    if (success) {
      setAlert({ message: "wishlist", show: true });
      setTimeout(() => setAlert({ message: "", show: false }), 1500);
    }
  }

  async function addToCart(size = null) {
    const success = await createToCart(productID, size);
    if (success) {
      setAlert({ message: "cart", show: true });
      setTimeout(() => setAlert({ message: "", show: false }), 2000);
    }
  }

  return (
    <Col className="p-0">
      <CartModal
        show={showModal}
        sizes={sizes}
        addToCart={addToCart}
        handleClose={() => setShowModal(false)}
      ></CartModal>
      <Card className="p-1 h-100">
        <Alert
          variant="secondary"
          show={alert.show}
          className="disappearing-alert"
        >
          Added Item to {alert.message}
        </Alert>
        <Carousel
          interval={null}
          variant="dark"
          id="carouselExampleControlsNoTouching"
          className="slide"
          data-bs-touch="false"
        >
          {images.map((image, idx) => (
            <Carousel.Item key={idx} className="card-img-top">
              <img
                src={image.src}
                className="d-block w-75 m-auto"
                alt={image.alt}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <IoHeartCircleSharp
          className="wishlist"
          onClick={addToWishlist}
        ></IoHeartCircleSharp>
        <Card.Body className="card-body">
          <Link
            to={`/item/${productID}`}
            state={{
              sizes,
              images,
              name,
              description,
              price,
            }}
          >
            <Card.Title className="card-title">{name}</Card.Title>
          </Link>
          <Card.Text className="card-text">${price}</Card.Text>
          <Row className="d-flex gap-1 justify-content-center">
            <Button
              variant="outline-secondary"
              className="add-to-cart shadow-none px-2 py-1 col-lg-5"
              onClick={() => setShowModal(true)}
            >
              Add to cart
            </Button>
            <Button variant="danger" className="shadow-none px-2 py-1 col-lg-5">
              Buy it now
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
