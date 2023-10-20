import { useEffect, useState } from "react";

function Pagination({ total, currentPage, setCurrentPage }) {
  const page = Math.ceil(total / 9);

  const buttonElements = [];

  const [startPage, setStartPage] = useState(1);

  for (let i = startPage; i <= startPage + 5; i++) {
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

  // const handleNextPage = () => {
  //   setCurrentPage(currentPage + 1);
  //   if (startPage + 6 < page) {
  //     setStartPage(startPage + 1);
  //   }
  // };

  return (
    <div className="text-center my-3">
      <div className="">
        {total >= 9 && (
          <div className="d-flex justify-content-center align-items-center">
            <button
              className={`btn btn-light`}
              onClick={handlePreviousPage}
              disabled={currentPage == 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            {startPage > 1 && (
              <button className="btn btn-light" onClick={handlePreviousPage}>
                ...
              </button>
            )}
            {buttonElements}

            {page > 6 && startPage + 6 < page && (
              <button
                className="btn btn-light"
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  if (startPage + 5 < page) {
                    setStartPage(startPage + 1);
                  }
                }}
              >
                ...
              </button>
            )}
            {startPage + 5 !== page && (
              <button
                className={`btn ${
                  currentPage == page ? "btn-primary" : "btn-light "
                }`}
                onClick={() => {
                  setCurrentPage(page);
                  setStartPage(page - 5);
                }}
              >
                {page}
              </button>
            )}
            <button
              className={`btn btn-light`}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                if (startPage + 6 < page) {
                  setStartPage(startPage + 1);
                }
              }}
              disabled={page == currentPage}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
