import { useCallback, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductsBySearch, getProductsBySearchSorted } from "../../DAL/api";
import { validateSort } from "../../utilities/validations";
import PaginationNav from "../Pagination/PaginationNav";
import ProductCard from "../HomePage/ProductList/ProductCard";
import SortSelect from "../HomePage/ProductList/SortSelect";

function Search() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get("q");
  const navigate = useNavigate();

  const updateQueryValues = useCallback(
    (currentPage = false, order = false) => {
      if (currentPage) {
        searchParams.set("page", currentPage);
      }
      if (order) {
        searchParams.set("sort", order);
      }
      setSearchParams(searchParams);
      navigate(`/search?${searchParams.toString()}`);
    },
    [searchParams]
  );

  const getData = useCallback(
    async (currentPage, sort = false) => {
      let items, total;
      if (sort && validateSort(sort)) {
        [items, total] = await getProductsBySearchSorted(
          searchString,
          sort,
          currentPage
        );
      } else
        [items, total] = await getProductsBySearch(searchString, currentPage);
      setProducts(items);
      const pages = Math.ceil(total / 8);
      if (pages !== totalPages.length) {
        const totalArray = [];
        for (let i = 1; i <= pages; i++) {
          totalArray.push(i);
        }
        setTotalPages(totalArray);
      }
    },
    [totalPages, searchString]
  );

  useEffect(() => {
    const sort = searchParams.get("sort");
    const page = searchParams.get("page");
    if (page === null) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    } else getData(+page, sort);
  }, [searchParams, getData]);

  return (
    <Row className="mx-md-3 mx-sm-4 mx-lg-4 mx-xl-4 mb-5 px-2 p-lg-0">
      {products ? (
        <div>
          <Row className="justify-content-between align-items-start">
            <Col xs={11} md={5}>
              <h4>Search results for: {searchString}</h4>
            </Col>
            <SortSelect
              updateQueryValues={updateQueryValues}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            ></SortSelect>
          </Row>
          <Row className="row-cols-2 row-cols-md-3 row-cols-lg-4 gap-md-0">
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
            totalPages={totalPages}
            searchParams={searchParams}
            updateQueryValues={updateQueryValues}
          ></PaginationNav>
        </div>
      ) : (
        <Row className="m-5 p-5 justify-content-center">
          <Spinner animation="border" className="spinner" />
        </Row>
      )}
    </Row>
  );
}

export default Search;
