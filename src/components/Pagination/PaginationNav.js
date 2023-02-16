import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

function PaginationNav({ totalPages, searchParams, updateQueryValues }) {
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const page = Number(searchParams.get("page"));

  function nextPage() {
    if (page + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + 3);
      setminPageNumberLimit(minPageNumberLimit + 3);
    }
    updateQueryValues(page + 1);
  }

  function prevPage() {
    if (page - 1 <= minPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - 3);
      setminPageNumberLimit(minPageNumberLimit - 3);
    }
    updateQueryValues(page - 1);
  }

  return (
    <Pagination className="mt-3 d-flex justify-content-center">
      <Pagination.Prev onClick={prevPage} disabled={page === 1} />
      {totalPages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <Pagination.Item
              key={number}
              active={page === number}
              onClick={() => updateQueryValues(number)}
            >
              {number}
            </Pagination.Item>
          );
        } else return null;
      })}
      <Pagination.Next
        onClick={nextPage}
        disabled={page === totalPages.length}
      />
    </Pagination>
  );
}

export default React.memo(PaginationNav, (prev, next) => {
  if (
    prev.totalPages === next.totalPages &&
    prev.searchParams === next.searchParams
  )
    return true;
  else return false;
});
