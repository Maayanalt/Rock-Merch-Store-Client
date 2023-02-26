import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";

function SortSelect({ updateQueryValues, searchParams, setSearchParams }) {
  const [selectedOption, setSelectedOption] = useState("best");

  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort) setSelectedOption(sort);
    else setSelectedOption("best");
  }, [searchParams]);

  return (
    <Col
      xs={11}
      md={7}
      lg={6}
      className="d-flex align-items-center justify-content-md-end gap-2 mb-4"
    >
      <span>Sort by:</span>
      <div style={{ width: "11rem" }}>
        <Form.Select
          aria-label="Default select"
          value={selectedOption}
          onChange={(e) => {
            if (e.target.value === "best") {
              searchParams.delete("sort");
              setSearchParams(searchParams);
            } else updateQueryValues(false, e.target.value);
          }}
        >
          <option value="best">Best seller</option>
          <option value="asc">Price Low to High</option>
          <option value="desc">Price High to Low</option>
        </Form.Select>
      </div>
    </Col>
  );
}

export default React.memo(SortSelect);
