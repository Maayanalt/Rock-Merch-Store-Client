import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getProducts,
  getProductsByCategory,
  getProductsByParentCategory,
} from "../../../DAL/api";
import PaginationNav from "./PaginationNav";
import ProductCard from "./ProductCard";
import SortSelect from "./SortSelect";

function ProductList({ categoryName, setCategoryName }) {
  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const { type, id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const updateQueryValues = useCallback(
    (currentPage = false, order = false) => {
      if (currentPage) searchParams.set("page", currentPage);
      if (order) searchParams.set("sort", order);
      setSearchParams(searchParams);
      if (type) navigate(`/${type}/${id}?${searchParams.toString()}`);
    },
    [searchParams, type, id]
  );

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
            <SortSelect
              updateQueryValues={updateQueryValues}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            ></SortSelect>
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
