import { Button, Card, Col, Row, Table } from "react-bootstrap";
import CartCard from "./CartCard";
import "./Cart.css";
import { useEffect, useState } from "react";
import {
  deleteCart,
  deleteFromCart,
  getCart,
  updateCart,
  updateCartDuplicates,
} from "../../DAL/api";
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

  async function itemAlreadyInCart(idToBeRemoved, items, size, itemID) {
    const sameItem = items.filter((item) => {
      return item.size === size && item.item.id === itemID;
    });
    if (sameItem.length > 1) {
      let existingItem;
      sameItem[1].id === idToBeRemoved
        ? (existingItem = sameItem[0])
        : (existingItem = sameItem[1]);
      existingItem.quantity = sameItem[1].quantity + sameItem[0].quantity;
      updateCartDuplicates(
        idToBeRemoved,
        existingItem.item.id,
        existingItem.quantity,
        size
      );
      items.forEach((item, idx) => {
        if (item.id === idToBeRemoved) {
          items.splice(idx, 1);
          return;
        }
      });
      return true;
    }
    return false;
  }

  async function updateDetails(keys) {
    let index = 0;
    let count = 0;
    const newItems = [...itemsDetails];
    while (keys.length !== count) {
      const cartDetailID = `${newItems[index].id}`;
      const indexOfKey = keys.indexOf(cartDetailID);
      if (indexOfKey !== -1) {
        const data = JSON.parse(sessionStorage.getItem(cartDetailID));
        if (data.quantity === 0) onDelete(newItems[index].id);
        else {
          newItems[index].quantity = Number(data.quantity);
          newItems[index].size = data.size;
          const isDuplicated = await itemAlreadyInCart(
            +cartDetailID,
            newItems,
            data.size,
            newItems[index].item.id
          );
          if (!isDuplicated) {
            await updateCart(
              cartDetailID,
              newItems[index].item.id,
              data.quantity,
              data.size
            );
          }
        }
        count++;
      }
      index++;
    }
    return newItems;
  }

  async function onDelete(cartDetailID) {
    const newItemsDetails = itemsDetails.filter(
      (itemCart) => itemCart.id !== cartDetailID
    );
    await deleteFromCart(cartDetailID);
    if (newItemsDetails.length === 0) {
      await deleteCart();
    }
    setItemsDetails(newItemsDetails);
  }

  async function saveEditedDetails() {
    const keys = Object.keys(sessionStorage);
    const newItemsDetails = await updateDetails(keys);
    sessionStorage.clear();
    setItemsDetails(newItemsDetails);
    setEditMode(false);
  }

  function changeQuantity(e, itemCart) {
    const data = JSON.parse(sessionStorage.getItem(`${itemCart.id}`));
    sessionStorage.setItem(
      `${itemCart.id}`,
      JSON.stringify({
        quantity: e.target.value,
        size: data?.size || itemCart.size,
      })
    );
  }

  function changeSize(e, itemCart) {
    const data = JSON.parse(sessionStorage.getItem(`${itemCart.id}`));
    sessionStorage.setItem(
      `${itemCart.id}`,
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
      <Card className="m-1 m-lg-5 mt-lg-2">
        <Card.Header as="h5">
          Item Summary({calculateTotalQuantity()})
        </Card.Header>
        <Card.Body>
          {itemsDetails.length ? (
            <div>
              <Table hover id="table">
                <thead>
                  <tr>
                    <th>PRODUCT DETAILS</th>
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
                          cartDetailID={itemCart.id}
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
                <Col xs={5} lg={2}>
                  <Button
                    variant="outline-secondary"
                    id="edit"
                    onClick={changeEditMode}
                  >
                    {editMode ? "Cancel" : "Edit Cart"}
                  </Button>
                </Col>
                <Col xs={2} md={1} className="me-3 me-lg-0">
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
        <Card className="m-1 mt-2 m-lg-5">
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
