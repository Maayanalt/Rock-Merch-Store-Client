import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { organizeItemsForOrder } from "../../utilities/helpers";

function OrderCard({
  id,
  orderDate,
  requiredDate,
  total,
  items,
  deliveryDetails,
}) {
  const [newItems, setNewItems] = useState([]);

  function dateToObject(date) {
    return new Date(date);
  }

  // function add2WeeksToDate(date) {
  //   const dateObj = dateToObject(date);
  //   dateObj.setDate(dateObj.getDate() + 14);
  //   return dateObj;
  // }

  useEffect(() => {
    setNewItems(organizeItemsForOrder(items));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className="flex-column">
          <Row className="mb-4">
            <Col lg={6}>
              <Card.Text className="fw-semibold">
                Your order has been recieved
              </Card.Text>
              <Card.Text>
                Est. delivery {dateToObject(requiredDate).toDateString()}
              </Card.Text>
            </Col>
            <Col lg={6} className="d-flex justify-content-end">
              {newItems.map((item, idx) => (
                <img
                  src={item.img.src}
                  alt={item.img.alt}
                  style={{ maxHeight: "100px" }}
                  key={idx}
                />
              ))}
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col lg={10}>
              <Card.Text className="fw-semibold">Order Number : {id}</Card.Text>
              <Card.Text className="fw-semibold">
                Total Cost : ${total}
              </Card.Text>
              <Card.Text className="fw-semibold">
                Order Date : {dateToObject(orderDate).toUTCString()}
              </Card.Text>
            </Col>
            <Col lg={2} className="align-self-center">
              <Button
                variant="outline-secondary"
                id="view-details"
                className="shadow-none py-2 px-3"
                as={Link}
                to="/my-account/order-details"
                state={{
                  id,
                  orderDate: dateToObject(orderDate).toUTCString(),
                  requiredDate: dateToObject(requiredDate).toDateString(),
                  total,
                  items: newItems,
                  deliveryDetails,
                }}
              >
                View Details
              </Button>
            </Col>
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default OrderCard;
