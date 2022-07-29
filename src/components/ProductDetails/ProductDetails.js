import {
  Container,
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useState } from "react";
import "./ProductDetails.css";

function ProductDetails({ sizes, img, alt, title, description, price }) {
  // sizes = [{value: 'XS', disabled: true/false}...]
  const radios = sizes;

  const [radioValue, setRadioValue] = useState("1");

  return (
    <Container className="px-4" id="item">
      <Row className="gx-5">
        <Col className="d-flex justify-content-center">
          <img src={img} width="300px" alt={alt} />
        </Col>
        <Col className="d-flex flex-column" id="details">
          <h1>{title}</h1>
          <p>{description}</p>
          <span id="price">${price}</span>
          <span className="my-1">size</span>
          <div>
            <ToggleButtonGroup type="radio" name="size" required>
              {radios.map((radio, idx) => (
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
  );
}

export default ProductDetails;
