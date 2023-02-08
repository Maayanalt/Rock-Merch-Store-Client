import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getProducts,
  getProductsByCategory,
  getProductsByParentCategory,
} from "../../../DAL/api";
import PaginationNav from "./PaginationNav";
import ProductCard from "./ProductCard";

function ProductList({ categoryName, setCategoryName }) {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const { type, id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const setItemsForPage = useCallback(
    async (page, apiFunc) => {
      let items, total;
      if (id) {
        [items, total] = await apiFunc(id, page);
      } else {
        [items, total] = await apiFunc(page);
      }
      setProducts(items);
      const pages = Math.ceil(total / 6);
      if (pages !== totalPages.length) {
        const totalArray = [];
        for (let i = 1; i <= pages; i++) {
          totalArray.push(i);
        }
        setTotalPages(totalArray);
      }
    },
    [id, totalPages]
  );

  const getData = useCallback(async () => {
    if (type === "cat") {
      await setItemsForPage(currentPage, getProductsByCategory);
    } else if (type === "parentCat") {
      await setItemsForPage(currentPage, getProductsByParentCategory);
    } else {
      setCategoryName("All Items");
      await setItemsForPage(currentPage, getProducts);
    }
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("page", `${currentPage}`);
    setSearchParams(updatedSearchParams.toString());
  }, [currentPage, type, setItemsForPage]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [type, id]);

  useEffect(() => {
    getData();
  }, [id, currentPage]);

  return (
    <Col
      lg={9}
      md={8}
      sm={11}
      className="mx-md-3 mx-sm-4 mx-lg-4 mx-xl-4 mb-5 p-0"
    >
      {products ? (
        <div>
          <Row className="justify-content-between align-items-start">
            <Col xs={3} lg={4}>
              <h3>{categoryName}</h3>
            </Col>
            <Col
              xs={9}
              lg={6}
              className="d-flex align-items-center justify-content-end gap-2 mb-4"
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
            {products?.length === 0 && <p className="fs-5">No items.</p>}
          </Row>

          <PaginationNav
            getData={getData}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></PaginationNav>
        </div>
      ) : (
        <Row className="m-5 p-5 justify-content-center">
          <Spinner animation="border" className="spinner" />
        </Row>
      )}
    </Col>
  );
}

export default React.memo(ProductList);
