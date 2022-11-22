import { Button, Card, Col, Row, Table } from "react-bootstrap";
import CartCard from "./CartCard";
import "./Cart.css";
import { useEffect, useState } from "react";
import { deleteCart, deleteFromCart, getCart, updateCart } from "../../DAL/api";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const [itemsDetails, setItemsDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
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

  function calculateTotalQuantity() {
    const sum = itemsDetails.reduce(
      (prev, curr) => prev + Number(curr.quantity),
      0
    );
    return sum;
  }

  function calculateSubtotal() {
    const sum = itemsDetails.reduce(
      (prev, curr) => prev + curr.quantity * curr.item.price,
      0
    );
    setSubtotal(sum.toFixed(2));
  }

  function calculatePrice(price, quantity) {
    const total = price * quantity;
    return total.toFixed(2);
  }

  function changeEditMode() {
    if (editMode) setEditMode(false);
    else setEditMode(true);
  }

  function updateDetails(items, keys) {
    let index = 0;
    while (keys.length) {
      const itemID = `${items[index].item.id}`;
      const indexOfKey = keys.indexOf(itemID);
      if (indexOfKey !== -1) {
        const data = JSON.parse(sessionStorage.getItem(itemID));
        if (data.quantity === 0) onDelete(items[index].item.id);
        else {
          items[index].quantity = data.quantity;
          items[index].size = data.size;
          updateCart(items[index].item.id, data.quantity, data.size);
          keys.splice(indexOfKey, 1);
        }
      }
      index++;
    }
  }

  function onDelete(itemID) {
    const newItemsDetails = itemsDetails.filter(
      (itemCart) => itemCart.item.id !== itemID
    );
    deleteFromCart(itemID);
    if (newItemsDetails === []) deleteCart();
    setItemsDetails(newItemsDetails);
  }

  function saveEditedDetails() {
    const keys = Object.keys(sessionStorage);
    const newItemsDetails = [...itemsDetails];
    updateDetails(newItemsDetails, keys);
    sessionStorage.clear();
    setItemsDetails(newItemsDetails);
    setEditMode(false);
  }

  function changeQuantity(e, itemCart) {
    const data = JSON.parse(sessionStorage.getItem(`${itemCart.item.id}`));
    sessionStorage.setItem(
      `${itemCart.item.id}`,
      JSON.stringify({
        quantity: e.target.value,
        size: data?.size || itemCart.size,
      })
    );
  }

  function changeSize(e, itemCart) {
    const data = JSON.parse(sessionStorage.getItem(`${itemCart.item.id}`));
    sessionStorage.setItem(
      `${itemCart.item.id}`,
      JSON.stringify({
        quantity: data?.quantity || itemCart.quantity,
        size: e.target.value,
      })
    );
  }

  useEffect(() => {
    calculateSubtotal();
  }, [itemsDetails]);

  return (
    <div>
      <Card className="m-5">
        <Card.Header as="h5">
          Item Summary({calculateTotalQuantity()})
        </Card.Header>
        <Card.Body>
          {itemsDetails.length ? (
            <div>
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
                          id={itemCart.item.id}
                          onChange={(e) => changeSize(e, itemCart)}
                          state={editMode}
                          title={itemCart.item.name}
                          selectedSize={itemCart.size}
                          img={itemCart.item.images[0]}
                          sizes={itemCart.item.sizes}
                          trash={onDelete}
                        ></CartCard>
                      </td>
                      <td>${itemCart.item.price}</td>
                      <td>
                        {editMode ? (
                          <input
                            type="number"
                            style={{ width: "45px" }}
                            defaultValue={itemCart.quantity}
                            onChange={(e) => changeQuantity(e, itemCart)}
                            max="5"
                          />
                        ) : (
                          <p>{itemCart.quantity}</p>
                        )}
                      </td>
                      <td>
                        $
                        {calculatePrice(itemCart.item.price, itemCart.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row className="justify-content-between">
                <Col xs={2}>
                  <Button
                    variant="outline-secondary"
                    id="edit"
                    onClick={changeEditMode}
                  >
                    {editMode ? "Cancel" : "Edit Cart"}
                  </Button>
                </Col>
                <Col xs={1}>
                  {editMode && (
                    <Button
                      variant="danger"
                      onClick={() => saveEditedDetails()}
                    >
                      Save
                    </Button>
                  )}
                </Col>
              </Row>
            </div>
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
            <Button
              variant="outline-secondary"
              id="checkout"
              as={Link}
              to="/checkout"
              state={{
                itemsDetails,
                subtotal,
              }}
            >
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
