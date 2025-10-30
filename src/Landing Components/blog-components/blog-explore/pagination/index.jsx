import { forwardRef } from "react";

import DropdownMenu from "../../../../Utility/DropdownMenu/DropdownMenu";
import DropdownItem from "../../../../Utility/DropdownMenu/DropdownItem";
import Icon from "../../../../General/Icon/Icon";
import { Container } from "./style";

const Pagination = forwardRef(
  (
    {
      perPageOptions = [
        { code: 10, name: "Show 10 items" },
        { code: 25, name: "Show 25 items" },
        { code: 50, name: "Show 50 items" },
      ],
      perPage,
      handlePerPage = () => {},
      page = 1,
      handlePage = () => {},
      total,
    },
    ref
  ) => {
    const handlePrev = () => {
      if (page > 1) {
        handlePage?.(page - 1);
      }
    };

    const handleNext = () => {
      if (page < total) {
        handlePage?.(page + 1);
      }
    };

    const renderPageNumbers = () => {
      const pages = [];

      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        if (page <= 3) {
          pages.push(1, 2, 3, "...", total);
        } else if (page >= total - 2) {
          pages.push(1, "...", total - 2, total - 1, total);
        } else {
          pages.push(1, 2, 3, "...", total);
        }
      }

      return pages?.map((p, idx) => {
        if (p === "...") {
          return (
            <div
              key={`pagination-ellipsis__${idx}`}
              className="pagination__page ellipsis"
            >
              {p}
            </div>
          );
        }

        return (
          <div
            key={`pagination-page__${idx}`}
            onClick={() => handlePage(p)}
            className={`pagination__page ${page === p ? "active" : ""}`}
          >
            {p}
          </div>
        );
      });
    };

    return (
      <Container className="pagination">
        <DropdownMenu
          color="neutral"
          control={perPage || perPageOptions[0]?.name}
          placement="bottom"
          zIndex={1001}
          className="pagination__per-page"
        >
          {perPageOptions?.map((option, idx) => (
            <DropdownItem
              key={`blog-epxlore-section-per-page-option__${idx + 1}`}
              active={option?.code === perPage?.code}
              className="sort-by__item"
              onClick={() => handlePerPage(option)}
            >
              {option?.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
        <div className="pagination__pages">
          <div
            className={`pagination__page ${page === 1 ? "disabled" : ""}`}
            onClick={handlePrev}
          >
            <Icon icon=" mng-lnc-chevron--left" />
          </div>
          {renderPageNumbers()}
          <div
            className={`pagination__page ${page === total ? "disabled" : ""}`}
            onClick={handleNext}
          >
            <Icon icon=" mng-lnc-chevron--right" />
          </div>
        </div>
      </Container>
    );
  }
);

export default Pagination;
