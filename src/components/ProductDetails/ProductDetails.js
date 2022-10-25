import {
  Container,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Carousel,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { getOneProduct } from "../../DAL/api";
import { organizeSizes } from "../../utilities/helpers";
import { useLocation, useParams } from "react-router-dom";

function ProductDetails({ sizes, img, alt, title, description, price }) {
  // sizes = [{value: 'XS', disabled: true/false}...]
  const [itemDetails, setItemDetails] = useState(null);
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    async function getData() {
      const item = await getOneProduct(id);
      const sizes = organizeSizes(item.sizes);
      setItemDetails({ ...item, sizes });
    }

    if (state) {
      const sizes = organizeSizes(state.sizes);
      setItemDetails({ ...state, sizes });
    } else {
      getData();
    }
  }, []);

  const [radioValue, setRadioValue] = useState("1");

  return (
    <div>
      {itemDetails && (
        <Container className="px-4" id="item">
          <Row className="gx-5">
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
              <div>
                <ToggleButtonGroup type="radio" name="size" required>
                  {itemDetails.sizes.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      disabled={radio.disabled}
                      id={`radio-${idx}`}
                      type="radio"
                      variant="outline-dark"
                      name="size"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      className="shadow-none me-1"
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.value}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </div>
              <Col md="6" className="d-flex flex-column gap-2 mt-3">
                <div>
                  <Button
                    variant="outline-secondary"
                    className="shadow-none me-1"
                    id="add-to-cart"
                  >
                    Add to cart
                  </Button>
                  <Button
                    variant="outline-info"
                    className="shadow-none"
                    id="add-to-wishlist"
                  >
                    Add to wishlist
                  </Button>
                </div>
                <div className="d-grid">
                  <Button type="button" className="btn btn-danger shadow-none">
                    Buy it now
                  </Button>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ProductDetails;
