import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import Button from "../../General/Button/index";
import IconButton from "../../General/IconButton/index";
import ButtonGroup from "../../Layout/Button Group/index";
import styled from "@emotion/styled";
import { useUpdateEffect } from "react-use";

//========================================================================

const Container = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.375rem;
  justify-content: ${(props) => props.horizontalAlignment};
`;

const PaginationContainer = styled.div`
  & > .button-group-pagination-lnc {
    width: 100%;
    justify-content: ${(props) => props.horizontalAlignment};
  }
`;

//========================================================================

const Pagination = (props) => {
  const {
    icons,
    borderRadius,
    currentPage,
    buttonType,
    currentPageButtonType,
    withFirstLast,
    withButtonGroup,
    disabledNext,
    disabledPrevious,
    disabledFirst,
    disabledLast,
    disabled,
    totalNumberOfPages,
    pagesOffset,
    horizontalAlignment,
    //------------------
    onPageChange,
    //------------------
    className,
    style,
    size,
    color,
  } = props;

  const theme = useTheme();

  const themeProps = { theme, size, color, btnType: buttonType };

  const [page, setPage] = useState(currentPage);

  useUpdateEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useUpdateEffect(() => {
    onPageChange(page);
  }, [page]);

  //======================== METHODS ==========================================

  const handlePageClick = (e, p) => {
    if (p == "next" && page < totalNumberOfPages) setPage(page + 1);
    else if (p == "previous" && page > 1) setPage(page - 1);
    else if (p == "last" && page != totalNumberOfPages)
      setPage(totalNumberOfPages);
    else if (p == "first" && page != 1) setPage(1);
    else if (!isNaN(+p)) setPage(p);
  };

  //======================== RENDER ==========================================

  const renderPages = () => {
    let pagesButtons = [];

    //before offset
    for (
      let i = page - pagesOffset > 0 ? page - pagesOffset : 1;
      i < page && i > 0;
      i++
    ) {
      pagesButtons.push(
        <Button
          key={i}
          {...themeProps}
          borderRadius={borderRadius}
          onClick={(e) => handlePageClick(e, i)}
          btnType={"basic"}
          text={i.toString()}
          disabled={disabled}
        />
      );
    }

    //current page
    pagesButtons.push(
      <Button
        key={page}
        {...themeProps}
        borderRadius={borderRadius}
        btnType={currentPageButtonType}
        text={page.toString()}
        disabled={disabled}
      />
    );

    //after offset
    for (
      let i = page + 1;
      i <= page + pagesOffset && i <= totalNumberOfPages;
      i++
    ) {
      pagesButtons.push(
        <Button
          key={i}
          {...themeProps}
          borderRadius={borderRadius}
          onClick={(e) => handlePageClick(e, i)}
          btnType={"basic"}
          text={i.toString()}
          disabled={disabled}
        />
      );
    }

    return pagesButtons;
  };

  const renderButtons = (borderRadius = null) => {
    var br = {};

    if (borderRadius) br.borderRadius = borderRadius;

    return (
      <>
        {withFirstLast && (
          <IconButton
            {...themeProps}
            icon={icons.doubleLeft || "angle-double-left"}
            disabled={disabledFirst || disabled}
            onClick={(e) => handlePageClick(e, "first")}
            {...br}
          />
        )}

        <IconButton
          {...themeProps}
          icon={icons.left || "angle-left"} 
          disabled={disabledPrevious || disabled}
          onClick={(e) => handlePageClick(e, "previous")}
          {...br}
        />

        {renderPages()}

        <IconButton
          {...themeProps}
          icon={icons.right || "angle-right"}
          disabled={disabledNext || disabled}
          onClick={(e) => handlePageClick(e, "next")}
          {...br}
        />

        {withFirstLast && (
          <IconButton
            {...themeProps}
            icon={icons.doubleRight || "angle-double-right"}
            disabled={disabledLast || disabled}
            onClick={(e) => handlePageClick(e, "last")}
            {...br}
          />
        )}
      </>
    );
  };

  if (withButtonGroup)
    return (
      <PaginationContainer horizontalAlignment={horizontalAlignment}>
        <ButtonGroup
          className={"button-group-pagination-lnc " + className}
          style={style}
          borderRadius={borderRadius}
        >
          {renderButtons()}
        </ButtonGroup>
      </PaginationContainer>
    );

  return (
    <Container
      horizontalAlignment={horizontalAlignment}
      className={className}
      style={style}
    >
      {renderButtons(borderRadius)}
    </Container>
  );
};

Pagination.defaultProps = {
  icons: {},
  disabled: false,
  borderRadius: "regular",
  currentPage: 1,
  buttonType: "outline",
  currentPageButtonType: "tinted",
  withFirstLast: true,
  withButtonGroup: true,
  disabledNext: false,
  disabledPrevious: false,
  disabledFirst: false,
  disabledLast: false,
  totalNumberOfPages: 1,
  pagesOffset: 0,
  horizontalAlignment: "left",
  //-------------------------------
  onPageChange: () => {},
  //-------------------------------
  style: {},
  className: "",
  color: "primary",
  size: "small",
};

Pagination.propTypes = {
  icons: PropTypes.shape({
    left: PropTypes.element,
    right: PropTypes.element,
    doubleLeft: PropTypes.element,
    doubleRight: PropTypes.element,
  }),
  /**
   *  Applies to the movement buttons and to the page number buttons
   */
  disabled: PropTypes.bool,
  borderRadius: PropTypes.oneOf([
    "slight",
    "regular",
    "edged",
    "curved",
    "none",
  ]),
  /**
   * Sets the button `type`
   */
  buttonType: PropTypes.oneOf(["filled", "tinted", "outline", "basic"]),

  /**
   * Set button `type` of the current page button
   */
  currentPageButtonType: PropTypes.oneOf([
    "filled",
    "tinted",
    "outline",
    "basic",
  ]),
  /**
   * Show the First and Last buttons
   */
  withFirstLast: PropTypes.bool,
  /**
   * Wrap the buttons in a `ButtonGroup` component
   */
  withButtonGroup: PropTypes.bool,
  /**
   * Active page number
   */
  currentPage: PropTypes.number,
  totalNumberOfPages: PropTypes.number,
  /**
   * how many page numbers will be shown to the right/left of the current page
   */
  pagesOffset: PropTypes.number,
  /**
   *  Applies to the Next button
   */
  disabledNext: PropTypes.bool,
  /**
   *  Applies to the Previous button
   */
  disabledPrevious: PropTypes.bool,
  /**
   *  Applies to the First button
   */
  disabledFirst: PropTypes.bool,
  /**
   *  Applies to the Last button
   */
  disabledLast: PropTypes.bool,
  horizontalAlignment: PropTypes.oneOf(["left", "center", "right"]),
  //-------------------------------
  onPageChange: PropTypes.func,
  //-------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
    "gray"
  ]),
};

export default Pagination;