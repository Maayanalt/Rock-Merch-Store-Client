import { Card, Col } from "react-bootstrap";
import WishlistCard from "./WishlistCard";
import "./Wishlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getWishlist } from "../../DAL/api";

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getWishlist();
      setItems(data);
    }

    getData();
  }, []);

  return (
    <Card className="m-5">
      <Card.Header as="h5">Wishlist</Card.Header>
      <Card.Body className="p-4 row">
        {items.length ? (
          items.map((item, idx) => (
            <Col md={6} key={idx}>
              <WishlistCard
                title={item.item.name}
                img={item.item.images[0]}
              ></WishlistCard>
            </Col>
          ))
        ) : (
          <Card.Title className="text-center">
            No items yet! <FontAwesomeIcon icon={faHeartBroken} />
          </Card.Title>
        )}
      </Card.Body>
    </Card>
  );
}

export default Wishlist;
