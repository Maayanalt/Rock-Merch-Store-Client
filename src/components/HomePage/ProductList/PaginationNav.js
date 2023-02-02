import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

function PaginationNav({ getData, totalPages, currentPage, setCurrentPage }) {
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  function nextPage() {
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + 3);
      setminPageNumberLimit(minPageNumberLimit + 3);
    }
    setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage - 1 <= minPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - 3);
      setminPageNumberLimit(minPageNumberLimit - 3);
    }
    setCurrentPage(currentPage - 1);
  }

  return (
    <Pagination className="mt-3 d-flex justify-content-center">
      <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
      {totalPages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <Pagination.Item
              key={number}
              active={currentPage === number}
              onClick={() => {
                setCurrentPage(number);
                getData();
              }}
            >
              {number}
            </Pagination.Item>
          );
        } else return null;
      })}
      <Pagination.Next
        onClick={nextPage}
        disabled={currentPage === totalPages.length}
      />
    </Pagination>
  );
}

export default React.memo(PaginationNav, (prev, next) => {
  if (
    prev.totalPages === next.totalPages &&
    prev.currentPage === next.currentPage
  )
    return true;
  else return false;
});
