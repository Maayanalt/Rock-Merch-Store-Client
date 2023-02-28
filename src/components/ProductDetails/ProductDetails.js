import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import SizesSelection from "../SizesSelection/SizesSelection";
import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { createToCart, getOneProduct, postToWishlist } from "../../DAL/api";
import { organizeSizes } from "../../utilities/helpers";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetails() {
  // sizes = [{value: 'XS', disabled: true/false}...]
  const [itemDetails, setItemDetails] = useState(null);
  const [selectedSize, setSelectedSize] = useState("none");
  const { id } = useParams();
  const { state } = useLocation();

  async function addToWishlist() {
    const success = await postToWishlist(id);
    if (success) {
      toast.success("Added item to wishlist");
    }
  }

  async function addToCart() {
    let size = selectedSize;
    if (size === "none") {
      toast.warn("Must pick a size");
      return;
    }
    if (size === "one size") size = null;
    const success = await createToCart(id, size);
    if (success) {
      toast.success("Added item to cart");
    }
  }

  useEffect(() => {
    async function getData() {
      const item = await getOneProduct(id);
      setItemDetails({ ...item });
    }

    if (state) {
      setItemDetails({ ...state });
    } else {
      getData();
    }
  }, []);

  return (
    <div>
      {itemDetails && (
        <Container className="px-4">
          <Row className="gx-5 flex-column flex-xl-row">
            <Col className="d-flex justify-content-center">
              <Carousel
                interval={null}
                variant="dark"
                id="carouselExampleControlsNoTouching"
                className="slide"
                data-bs-touch="false"
              >
                {itemDetails.images.map((image, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      src={image.src}
                      className="d-block w-75 m-auto"
                      alt={image.alt}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col className="d-flex flex-column" id="details">
              <h1>{itemDetails.name}</h1>
              <p>{itemDetails.description}</p>
              <span id="price">${itemDetails.price}</span>
              <span className="my-1">size</span>
              <div className="d-flex justify-content-center justify-content-xl-start">
                <SizesSelection
                  itemSizes={itemDetails.sizes}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                ></SizesSelection>
              </div>
              <Col xs={12} xl={7} className="d-flex flex-column gap-2 mt-3">
                <Button
                  variant="outline-secondary"
                  className="shadow-none add-to-cart"
                  onClick={addToCart}
                >
                  Add to cart
                </Button>
                <Button
                  variant="outline-info"
                  className="shadow-none"
                  id="add-to-wishlist"
                  onClick={addToWishlist}
                >
                  Add to wishlist
                </Button>
              </Col>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ProductDetails;
