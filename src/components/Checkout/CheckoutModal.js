import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CheckoutModal({ show }) {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={() => navigate("/")}>
      <Modal.Header closeButton>
        <Modal.Title>Order Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Woohoo, your order has been submitted! would you like to see it on your
        orders page?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Home Page
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate("/my-account/orders")}
        >
          My Orders
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckoutModal;
