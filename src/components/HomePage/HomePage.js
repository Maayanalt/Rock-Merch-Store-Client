import { Row, Col, Form } from "react-bootstrap";
import "./HomePage.css";
import ProductCard from "./ProductCard";
import SideNavbar from "./SideNavbar";

function HomePage({ products, categories }) {
  return (
    <Row className="m-0 px-2 justify-content-between gap-4">
      <Col sm={12} md={3} lg={2}>
        <SideNavbar categories={categories}></SideNavbar>
      </Col>
      <Col
        lg={9}
        md={8}
        sm={11}
        className="mx-md-3 mx-sm-4 mx-lg-4 mx-xl-4 mb-5 d-grid gap-3 p-0"
      >
        <Row className="justify-content-between">
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
        </Row>
      </Col>
    </Row>
  );
}

export default HomePage;
