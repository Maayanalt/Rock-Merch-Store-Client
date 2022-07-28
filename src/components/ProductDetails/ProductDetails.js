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

function ProductDetails() {
  const radios = [
    { name: "XS", value: "XS" },
    { name: "S", value: "S" },
    { name: "M", value: "M" },
    { name: "L", value: "L" },
  ];

  const [radioValue, setRadioValue] = useState("1");

  return (
    <Container className="px-4" id="item">
      <Row className="gx-5">
        <Col className="d-flex justify-content-center">
          <img src="adtr.JPG" width="300px" alt="t-shirt" />
        </Col>
        <Col className="d-grid gap-2" id="details">
          <h1>I JUST WANNA GO HOME TIE DYE TEE</h1>
          <span id="price">$30</span>
          <span>size</span>
          <div>
            <ToggleButtonGroup type="radio" name="size" required>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="outline-dark"
                  name="size"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  className="shadow-none me-1"
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <Col md="6" className="d-grid gap-2">
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
