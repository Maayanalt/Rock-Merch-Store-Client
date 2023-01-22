import { useState } from "react";
import { Card, Col, Carousel, Row, Button, Alert } from "react-bootstrap";
import { IoHeartCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import CartModal from "../CartModal/CartModal";
import { createToCart, postToWishlist } from "../../DAL/api";
import { toast } from "react-toastify";

function ProductCard({ images, name, sizes, price, description, productID }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  async function addToWishlist() {
    const success = await postToWishlist(productID);
    if (success) {
      toast.success("Added item to wishlist");
    }
  }

  async function addToCart(size = null) {
    const success = await createToCart(productID, size);
    if (success) {
      setShowModal(false);
      toast.success("Added item to cart");
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
            className="product-title"
          >
            <Card.Title>{name}</Card.Title>
          </Link>
          <Card.Text className="card-text">${price}</Card.Text>
          <Row className="d-flex gap-1 justify-content-center">
            <Button
              variant="outline-secondary"
              className="add-to-cart shadow-none px-2 py-1 col-lg-10"
              onClick={() => setShowModal(true)}
            >
              Add to cart
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
