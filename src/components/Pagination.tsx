import { useEffect, useState } from "react";
import { PaginationPropsType } from "../interfaces/SpaceFlightInterface";
import Button from "./bootstrap/Button";

function Pagination({
  total,
  currentPage,
  setCurrentPage,
}: PaginationPropsType) {
  const page = Math.ceil(total / 9);

  const buttonElements = [];

  const [startPage, setStartPage] = useState(1);

  for (let i = startPage; i <= (total >= 6 * 9 ? startPage + 5 : page); i++) {
    buttonElements.push(
      <button
        key={i}
        className={`btn ${currentPage == i ? "btn-primary" : "btn-light "}`}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    );
  }

  useEffect(() => {
    if (currentPage > 6) {
      setStartPage(currentPage - 5);
    } else {
      setStartPage(1);
    }
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    if (startPage > 1) {
      setStartPage((prevStart) => prevStart - 1);
    }
  };

  const handleNextPage = (n: number) => {
    setCurrentPage(currentPage + 1);
    if (startPage + n < page) {
      setStartPage(startPage + 1);
    }
  };

  return (
    <div className="text-center my-3">
      <div className="">
        {total >= 9 && (
          <div className="d-flex justify-content-center align-items-center">
            <Button
              className="btn-light"
              onClick={handlePreviousPage}
              disabled={currentPage == 1}
              icon="leftArrow"
            />
            {startPage > 1 && (
              <Button className="btn btn-light" onClick={handlePreviousPage}>
                ...
              </Button>
            )}
            {buttonElements}

            {page > 6 && startPage + 6 < page && (
              <Button className="btn-light" onClick={() => handleNextPage(5)}>
                ...
              </Button>
            )}
            {startPage + 5 !== page && page > 6 && (
              <Button
                className={`${
                  currentPage == page ? "btn-primary" : "btn-light "
                }`}
                onClick={() => {
                  setCurrentPage(page);
                  setStartPage(page - 5);
                }}
              >
                {page}
              </Button>
            )}
            <Button
              className="btn-light"
              onClick={() => handleNextPage(6)}
              disabled={page == currentPage}
              icon="rightArrow"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
