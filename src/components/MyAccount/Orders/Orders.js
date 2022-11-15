import { useEffect, useState } from "react";
import { Card, Row, Spinner } from "react-bootstrap";
import { getOrders } from "../../DAL/api";
import OrderCard from "./OrderCard";

function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await getOrders();
      setOrders(data);
    }

    getData();
  }, []);

  return (
    <div>
      {orders ? (
        <Card>
          <Card.Header as="h5">My Orders</Card.Header>
          <Card.Body className="p-4">
            <Card.Text>displaying {orders.length} orders</Card.Text>
            {orders.map((order, idx) => (
              <OrderCard
                key={idx}
                id={order.id}
                orderDate={order.orderDate}
                requiredDate={order.requiredDate}
                total={order.totalCost}
                items={order.items}
                deliveryDetails={{
                  address: order.address,
                  city: order.city,
                  postalCode: order.postalCode,
                  country: order.country,
                }}
              ></OrderCard>
            ))}
          </Card.Body>
        </Card>
      ) : (
        <Row className="m-0 px-2 justify-content-center">
          <Spinner animation="border" className="spinner" />
        </Row>
      )}
    </div>
  );
}

export default Orders;
