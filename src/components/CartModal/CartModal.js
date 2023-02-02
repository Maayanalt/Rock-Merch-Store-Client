import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  CartModalDispatchContext,
  CartModalValueContext,
} from "../ContextProviders/ModalContextProvider";
import SizesSelection from "../SizesSelection/SizesSelection";
import { createToCart } from "../../DAL/api";

function CartModal() {
  const [selectedSize, setSelectedSize] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const cartModalDispatchContext = useContext(CartModalDispatchContext);
  const cartModalValueContext = useContext(CartModalValueContext);
  const setModalProps = cartModalDispatchContext;
  const modalProps = cartModalValueContext;

  async function addToCart(size) {
    if (size === "one size") size = null;
    const success = await createToCart(modalProps.productID, size);
    if (success) {
      closeModal();
      toast.success("Added item to cart");
    }
  }

  function closeModal() {
    setModalProps({ show: false });
  }

  return (
    <Modal show={modalProps.show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Choose a size</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SizesSelection
          itemSizes={modalProps.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        ></SizesSelection>
        {errorMsg && <p className="error">* Must pick a size!</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={closeModal}>
          Close
        </Button>
        <Button
          variant="outline-secondary"
          className="add-to-cart shadow-none"
          onClick={() => {
            if (selectedSize === "") setErrorMsg(true);
            else addToCart(selectedSize, modalProps.productID);
          }}
        >
          Add to cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
