import { useEffect, useState } from "react";
import { Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../../DAL/api";
import "./MyAccount.css";

function MyAccount() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const data = await getUser();
      if (data.statusCode === 403) {
        navigate("/login");
      }
      setUser(data);
    }

    getData();
  }, []);

  return (
    <div>
      {user ? (
        <Row className="m-0 px-2 justify-content-between">
          <Col sm={12} md={3} lg={2}>
            <ListGroup defaultActiveKey="#overview" id="items">
              <ListGroup.Item
                action
                variant="outline-secondary"
                className="item"
                as={Link}
                to={"/my-account"}
              >
                Overview
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant="outline-secondary"
                className="item mt-0"
                as={Link}
                to={"/my-account/orders"}
              >
                My orders
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant="outline-secondary"
                className="item mt-0"
                as={Link}
                to={"/my-account/account-details"}
              >
                Account details
              </ListGroup.Item>
              <ListGroup.Item
                action
                variant="outline-secondary"
                className="item mt-0"
                as={Link}
                to={"/my-account/my-address"}
              >
                My address
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col
            lg={9}
            md={8}
            sm={11}
            className="mx-md-3 mx-sm-4 mx-lg-4 mx-xl-4 mb-5 d-grid gap-3 p-0"
          >
            <Outlet context={user} />
          </Col>
        </Row>
      ) : (
        <Row className="m-0 px-2 justify-content-center">
          <Spinner animation="border" className="spinner" />
        </Row>
      )}
    </div>
  );
}

export default MyAccount;
