import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, Row } from "react-bootstrap";
import { createToWishlist, postToWishlist } from "../../DAL/api";

function CartCard({
  title,
  img,
  selectedSize,
  sizes,
  state,
  onChange,
  id,
  trash,
}) {
  function addToWishlist(id) {
    postToWishlist(id);
    trash(id);
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
                {size.size}
              </option>
            ))}
          </Form.Select>
        ) : (
          <p>{selectedSize}</p>
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
            onClick={(e) => trash(id)}
          ></FontAwesomeIcon>
        </div>
      </Col>
    </Row>
  );
}

export default CartCard;
