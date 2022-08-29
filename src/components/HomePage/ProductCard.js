import { Card, Col, Carousel, Row, Button } from "react-bootstrap";
import { IoHeartCircleSharp } from "react-icons/io5";

function ProductCard({ images, title, price }) {
  return (
    <Col className="p-0">
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
        <IoHeartCircleSharp className="wishlist"></IoHeartCircleSharp>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{title}</Card.Title>
          <Card.Text className="card-text">${price}</Card.Text>
          <Row className="d-flex gap-1 justify-content-center">
            <Button
              variant="outline-secondary"
              className="add-to-cart shadow-none px-2 py-1 col-lg-5"
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
