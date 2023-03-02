import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import inputTypes from "../../DAL/formData";
import FormTemplate from "../Form/FormTemplate";
import CheckoutItem from "./CheckoutItem";
import party, { Rect } from "party-js";
import "./Checkout.css";
import { useEffect, useState } from "react";
import { createOrder, getUser } from "../../DAL/api";
import CheckoutModal from "./CheckoutModal";

function Checkout() {
  const { state } = useLocation();
  const { itemsDetails, subtotal } = state;
  const [myAddress, setMyAddress] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [showMyAddress, setShowMyAddress] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // itemsDetails = [{quantity: 2, size: 'XS', item: {description,id,images,name,price,sizes}},..]

  function submitOrder(formData = null) {
    if (formData) {
      const {
        address: { value: address },
        city: { value: city },
        country: { value: country },
        postalCode: { value: postalCode },
        phone: { value: phone },
      } = formData;
      createOrder({ address, city, postalCode, country, phone }, subtotal);
    } else {
      createOrder(myAddress, subtotal);
    }
    party.confetti(new Rect(700, 10), { count: party.variation.range(50, 60) });
    setShowModal(true);
  }

  useEffect(() => {
    async function getData() {
      const data = await getUser();
      if (data.statusCode === 403) {
        navigate("/login");
      }
      const { address, city, country, postalCode, phone } = data;
      if (address) setMyAddress({ address, city, country, postalCode, phone });
    }

    getData();
  }, []);

  return (
    <Row className="p-1 mx-0 mb-5 justify-content-center">
      {showModal && <CheckoutModal show={showModal}></CheckoutModal>}
      <Col lg={5}>
        <Card className="mb-3">
          <Card.Header as="h5">Shipping Address</Card.Header>
          <Card.Body className="px-1 pb-0 pb-lg-2 px-lg-0">
            <div className="d-flex justify-content-between px-2 px-lg-4 mb-lg-1 mb-3">
              <Form.Check
                type="radio"
                label="Different address"
                name="address"
                onClick={() => {
                  setShowNewAddress(true);
                  setShowMyAddress(false);
                }}
              />
              <Form.Check
                disabled={!myAddress}
                type="radio"
                label="Use my address"
                name="address"
                onClick={() => {
                  setShowNewAddress(false);
                  setShowMyAddress(true);
                }}
              />
            </div>
            {showMyAddress && (
              <div className="d-flex flex-column align-items-center">
                <div className="pt-1 ps-2 mt-3 ms-xl-4" id="my-address">
                  {Object.values(myAddress).map((key, idx) => (
                    <p key={idx} className="lh-base mb-1">
                      {key}
                    </p>
                  ))}
                </div>
                <Button
                  className="col-12 w-75 m-4"
                  variant="dark"
                  id="submit"
                  onClick={(e) => submitOrder()}
                >
                  Submit My Order
                </Button>
              </div>
            )}
            {showNewAddress && (
              <FormTemplate
                inputs={{
                  address: { ...inputTypes.address },
                  country: { ...inputTypes.country },
                  city: { ...inputTypes.city },
                  postalCode: { ...inputTypes.postalCode },
                  phone: { ...inputTypes.phone },
                }}
                submit="Submit My Order"
                postToServer={submitOrder}
              ></FormTemplate>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <Card.Header as="h5">Summary</Card.Header>
          <Card.Body>
            <div id="items-summary">
              {itemsDetails.map((itemCart, idx) => (
                <CheckoutItem
                  key={idx}
                  img={itemCart.item.images[0]}
                  name={itemCart.item.name}
                  quantity={itemCart.quantity}
                  size={itemCart.size}
                  price={itemCart.item.price}
                ></CheckoutItem>
              ))}
            </div>
            <hr></hr>
            <div className="d-flex justify-content-between">
              <span className="fw-semibold">Total Price</span>
              <span>${subtotal}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Checkout;
