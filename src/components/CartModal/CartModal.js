import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SizesSelection from "../Sizes/SizesSelection";

function CartModal({ sizes, show, addToCart, handleClose }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Choose a size</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SizesSelection
          itemSizes={sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        ></SizesSelection>
        {errorMsg && <p className="error">* Must pick a size!</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="outline-secondary"
          className="add-to-cart shadow-none"
          onClick={() => {
            if (selectedSize === "") setErrorMsg(true);
            else addToCart(selectedSize);
          }}
        >
          Add to cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
