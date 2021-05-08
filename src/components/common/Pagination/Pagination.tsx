import React from "react";
import "./Pagination.scss";

export const Pagination: React.FC<IPagination> = ({
  postPerPage,
  totalPost,
  changePage,
  currentPage,
}) => {
  let pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <>
      <ul className="pagination">
        {pageNumber.map((item, key) => {
          return (
            <li className="pagination__item" key={key}>
              <span
                className={`pagination__link ${
                  currentPage === item ? "pagination__link--selected" : null
                }`}
                onClick={() => changePage(item)}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};
