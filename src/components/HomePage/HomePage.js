import { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";
import SideNavbar from "./SideNavbar";
import {
  getProducts,
  getProductsByCategory,
  getProductsByParentCategory,
} from "../../DAL/api";
import "./HomePage.css";

function HomePage({ categories }) {
  const [products, setProducts] = useState([]);
  const { type, id } = useParams();

  async function getData() {
    if (type === "cat") {
      setProducts(await getProductsByCategory(id));
    } else if (type === "parentCat") {
      setProducts(await getProductsByParentCategory(id));
    } else {
      setProducts(await getProducts());
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Row className="m-0 px-2 justify-content-between gap-4 align-items-start">
      <Col sm={12} md={3} lg={2}>
        <SideNavbar categories={categories}></SideNavbar>
      </Col>
      <Col
        lg={9}
        md={8}
        sm={11}
        className="mx-md-3 mx-sm-4 mx-lg-4 mx-xl-4 mb-5 d-grid gap-3 p-0"
      >
        <Row className="justify-content-between align-items-start">
          <Col xs={2}>
            <h3>Clothes</h3>
          </Col>
          <Col
            xs={9}
            className="d-flex align-items-center justify-content-end gap-2"
          >
            <span>Sort by:</span>
            <div style={{ width: "11rem" }}>
              <Form.Select aria-label="Default select" defaultValue={"Best"}>
                <option value="Best">Best seller</option>
                <option value="low-high">Price Low to High</option>
                <option value="high-low">Price High to Low</option>
              </Form.Select>
            </div>
          </Col>
        </Row>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 gap-md-0 gap-lg-0 gap-xl-0">
          {products.map((product, idx) => (
            <ProductCard
              key={idx}
              productID={product.id}
              images={product.images}
              name={product.name}
              price={product.price}
              sizes={product.sizes}
              description={product.description}
            ></ProductCard>
          ))}
          {products.length === 0 && <p className="fs-5">No items.</p>}
        </Row>
      </Col>
    </Row>
  );
}

export default HomePage;
