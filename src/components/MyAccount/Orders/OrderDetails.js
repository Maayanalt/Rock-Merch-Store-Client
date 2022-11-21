import { Card } from "react-bootstrap";
import { useLocation, useOutletContext } from "react-router-dom";
import OrderItem from "./OrderItem";

function OrderDetails() {
  const { state } = useLocation();
  const { id, orderDate, requiredDate, total, items, deliveryDetails } = state;
  const user = useOutletContext();

  return (
    <div>
      <Card className="mb-3">
        <Card.Header as="h5">Order Details</Card.Header>
        <Card.Body className="p-4">
          <Card.Text>Your order has been dispatched</Card.Text>
          <Card.Text>Est. delivery {requiredDate}</Card.Text>
          {items.map((item, idx) => (
            <OrderItem
              name={item.name}
              img={item.img}
              totalPrice={item.totalPrice}
              quantity={item.quantity}
              size={item.size}
              key={idx}
            ></OrderItem>
          ))}
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header as="h5">Order Summary</Card.Header>
        <Card.Body>
          <Card.Text>Order Number: {id}</Card.Text>
          <Card.Text>Order Date: {orderDate}</Card.Text>
          <Card.Text>Total Cost: ${total}</Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header as="h5">Delivery Details</Card.Header>
        <Card.Body>
          <Card.Text className="fw-semibold">
            {user.firstName} {user.lastName}
          </Card.Text>
          <Card.Text className="mb-0">{deliveryDetails.address}</Card.Text>
          <Card.Text className="mb-0">{deliveryDetails.city}</Card.Text>
          <Card.Text className="mb-0">{deliveryDetails.postalCode}</Card.Text>
          <Card.Text className="mb-0">{deliveryDetails.country}</Card.Text>
          <Card.Text>{deliveryDetails.phone}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default OrderDetails;
