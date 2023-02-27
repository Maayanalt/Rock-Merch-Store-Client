import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { organizeItemsForOrder } from "../../../utilities/helpers";

function OrderCard({
  id,
  orderDate,
  requiredDate,
  total,
  items,
  deliveryDetails,
}) {
  const [organizedItems, setOrganizedItems] = useState([]);

  function dateToObject(date) {
    return new Date(date);
  }

  useEffect(() => {
    setOrganizedItems(organizeItemsForOrder(items));
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className="flex-column">
          <Row className="mb-4 flex-column flex-xl-row">
            <Col xs={11} lg={6}>
              <Card.Text className="fw-semibold">
                Your order has been received
              </Card.Text>
              <Card.Text className="mb-2">
                Est. delivery {dateToObject(requiredDate).toDateString()}
              </Card.Text>
            </Col>
            <Col
              xs={12}
              xl={6}
              className="d-flex flex-wrap flex-xl-nowrap justify-content-start justify-content-xl-end"
            >
              {organizedItems.map((item, idx) => {
                if (idx > 4) return null;
                return (
                  <img
                    src={item.img.src}
                    alt={item.img.alt}
                    style={{ maxHeight: "100px" }}
                    key={idx}
                  />
                );
              })}
              {organizedItems.length > 5 && (
                <span className="fs-2 ms-2 align-self-center">...</span>
              )}
            </Col>
          </Row>
          <hr></hr>
          <Row className="flex-column flex-xl-row pe-0">
            <Col lg={10} className="pe-0">
              <Card.Text className="fw-semibold">Order Number : {id}</Card.Text>
              <Card.Text className="fw-semibold">
                Total Cost : ${total}
              </Card.Text>
              <Card.Text className="fw-semibold">
                Order Date : {dateToObject(orderDate).toUTCString()}
              </Card.Text>
            </Col>
            <Col xs={12} xl={2} className="align-self-xl-center pe-0">
              <Button
                variant="outline-secondary"
                id="view-details"
                className="shadow-none py-2 px-3 mt-3 mt-xl-0 w-100"
                as={Link}
                to="/my-account/order-details"
                state={{
                  id,
                  orderDate: dateToObject(orderDate).toUTCString(),
                  requiredDate: dateToObject(requiredDate).toDateString(),
                  total,
                  items: organizedItems,
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
