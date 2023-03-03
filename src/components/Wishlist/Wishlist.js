import { Card, Col } from "react-bootstrap";
import WishlistCard from "./WishlistCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { deleteFromWishlist, getWishlist } from "../../DAL/api";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  function onDelete(id) {
    deleteFromWishlist(id);
    const newItems = items.filter((item) => item.item.id !== id);
    setItems(newItems);
  }

  useEffect(() => {
    async function getData() {
      const data = await getWishlist();
      if (data.statusCode === 403) {
        navigate("/login");
      }
      setItems(data);
    }

    getData();
  }, []);

  return (
    <Card className="m-1 mt-md-1 m-md-2 m-lg-3 mt-lg-2">
      <Card.Header as="h5">Wishlist</Card.Header>
      <Card.Body className="p-3 pt-1 p-lg-3 row row-cols-2 row-cols-md-3">
        {items.length ? (
          items.map((item, idx) => (
            <Col md={4} key={idx} className="p-0 px-lg-2 pb-lg-3">
              <WishlistCard
                sizes={item.item.sizes}
                title={item.item.name}
                images={item.item.images}
                price={item.item.price}
                description={item.item.description}
                productID={item.item.id}
                onDelete={onDelete}
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

export default React.memo(Wishlist);
