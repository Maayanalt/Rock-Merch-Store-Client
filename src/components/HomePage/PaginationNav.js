import { useState } from "react";
import { Pagination } from "react-bootstrap";

function PaginationNav({ getData, totalItems, currentPage, setCurrentPage }) {
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
      {totalItems.map((number) => {
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
        disabled={currentPage === totalItems.length}
      />
    </Pagination>
  );
}

export default PaginationNav;
