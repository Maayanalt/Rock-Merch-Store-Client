import { Button, Card, Table } from "react-bootstrap";
import CartCard from "./CartCard";
import "./Cart.css";
import { useEffect, useState } from "react";
import { getCart } from "../../DAL/api";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const [itemsDetails, setItemsDetails] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const data = await getCart();
      if (data.statusCode === 403) {
        navigate("/login");
      }
      setItemsDetails(data);
    }

    getData();
  }, []);

  function calculateSubtotal() {
    const sum = itemsDetails.reduce(
      (prev, curr) => prev + curr.quantity * curr.item.price,
      0
    );
    setSubtotal(sum);
  }

  function calculatePrice(price, quantity) {
    const total = price * quantity;
    return total;
  }

  useEffect(() => {
    calculateSubtotal();
  }, [itemsDetails]);

  return (
    <div>
      <Card className="m-5">
        <Card.Header as="h5">Item Summary({itemsDetails.length})</Card.Header>
        <Card.Body>
          {itemsDetails.length ? (
            <Table hover id="table">
              <thead>
                <tr>
                  <th>PRODUCTE DETAILS</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {itemsDetails.map((itemCart, idx) => (
                  <tr key={idx}>
                    <td>
                      <CartCard
                        title={itemCart.item.name}
                        selectedSize={itemCart.size}
                        img={itemCart.item.images[0]}
                        sizes={itemCart.item.sizes}
                      ></CartCard>
                    </td>
                    <td>${itemCart.item.price}</td>
                    <td>
                      <input
                        type="number"
                        style={{ width: "45px" }}
                        defaultValue={itemCart.quantity}
                      />
                    </td>
                    <td>
                      ${calculatePrice(itemCart.item.price, itemCart.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Card.Title className="text-center">
              No items yet! <FontAwesomeIcon icon={faBasketShopping} />
            </Card.Title>
          )}
        </Card.Body>
      </Card>

      {itemsDetails.length ? (
        <Card className="m-5">
          <Card.Header as="h5">Order Summary</Card.Header>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <Card.Text>Subtotal: ${subtotal}</Card.Text>
            <Button variant="outline-secondary" id="checkout">
              Checkout
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Cart;
