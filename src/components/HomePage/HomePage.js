import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import SideNavbar from "./SideNavbar";
import ProductList from "./ProductList/ProductList";
import ModalContextProvider from "../ContextProviders/ModalContextProvider";
import "./HomePage.css";

function HomePage({ categories }) {
  const [categoryName, setCategoryName] = useState("All Items");

  return (
    <Row className="m-0 px-2 justify-content-between gap-4 align-items-start">
      <Col sm={12} md={3} lg={2}>
        <SideNavbar
          categories={categories}
          setCategoryName={setCategoryName}
        ></SideNavbar>
      </Col>
      <ModalContextProvider>
        <ProductList
          categoryName={categoryName}
          setCategoryName={setCategoryName}
        ></ProductList>
      </ModalContextProvider>
    </Row>
  );
}

export default HomePage;
