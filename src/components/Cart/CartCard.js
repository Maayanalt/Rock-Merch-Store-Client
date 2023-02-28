import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { postToWishlist } from "../../DAL/api";

function CartCard({
  title,
  img,
  selectedSize,
  sizes,
  state,
  onChange,
  id,
  trash,
  cartDetailID,
}) {
  async function addToWishlist(id) {
    const success = await postToWishlist(id);
    if (success) {
      toast.success("Added item to wishlist");
      trash(cartDetailID);
    }
  }

  return (
    <Row>
      <Col md={3}>
        <img src={img.src} alt={img.alt} style={{ maxHeight: "100px" }} />
      </Col>
      <Col md={6} className="d-flex flex-column justify-content-between">
        <h5 className="">{title}</h5>
        {state ? (
          <Form.Select
            onChange={onChange}
            aria-label="Default select"
            defaultValue={selectedSize}
            style={{ width: "70px" }}
          >
            {sizes.map((size, idx) => (
              <option value={size.size} key={idx}>
                {size.size || "one size"}
              </option>
            ))}
          </Form.Select>
        ) : (
          <p>{selectedSize || "one size"}</p>
        )}

        <div className="mt-2">
          <FontAwesomeIcon
            icon={faHeart}
            className="icon-button me-4"
            onClick={(e) => addToWishlist(id)}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            icon={faTrash}
            className="icon-button ms-4"
            onClick={(e) => trash(cartDetailID)}
          ></FontAwesomeIcon>
        </div>
      </Col>
    </Row>
  );
}

export default CartCard;
