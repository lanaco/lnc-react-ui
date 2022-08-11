import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import Button from "../../General/Button/index";
import IconButton from "../../General/IconButton/index";
import ButtonGroup from "../../Layout/Button Group/index";
import styled from "@emotion/styled";

//========================================================================

const Container = styled.div`
  display: inline-flex;
  width: fit-content;
  gap: 0.375rem;
`;

//========================================================================

const Pagination = (props) => {
  const {
    borderRadius,
    currentPage,
    pages,
    buttonType,
    currentPageButtonType,
    withFirstLast,
    withButtonGroup,
    disabledNext,
    disabledPrevious,
    disabledFirst,
    disabledLast,
    disabled,
    //------------------
    onClick,
    onPageNumberClick,
    //------------------
    className,
    style,
    size,
    color,
  } = props;

  const theme = useTheme();

  const themeProps = { theme, size, color, type: buttonType };

  //======================== METHODS ==========================================

  const handleOnClick = (e, type) => {
    if (onClick) onClick(e, type);
  };

  //======================== RENDER ==========================================

  const renderPages = () => {
    if (pages && pages.length > 1) {
      return (
        <>
          {pages.map((p) => (
            <Button
              {...themeProps}
              borderRadius={borderRadius}
              onClick={(e) => onPageNumberClick(e, p)}
              type={currentPage === p ? currentPageButtonType : "basic"}
              text={p.toString()}
              disabled={disabled}
            />
          ))}
        </>
      );
    }

    return (
      <>
        <Button
          {...themeProps}
          borderRadius={borderRadius}
          type={currentPageButtonType}
          text={currentPage}
          disabled={disabled}
        />
      </>
    );
  };

  const renderButtons = (borderRadius = null) => {
    var br = {};

    if (borderRadius) br.borderRadius = borderRadius;

    return (
      <>
        {withFirstLast && (
          <IconButton
            {...themeProps}
            icon="angle-double-left"
            disabled={disabledFirst || disabled}
            onClick={(e) => handleOnClick(e, "first")}
            {...br}
          />
        )}

        <IconButton
          {...themeProps}
          icon="angle-left"
          disabled={disabledPrevious || disabled}
          onClick={(e) => handleOnClick(e, "previous")}
          {...br}
        />

        {renderPages()}

        <IconButton
          {...themeProps}
          icon="angle-right"
          disabled={disabledNext || disabled}
          onClick={(e) => handleOnClick(e, "next")}
          {...br}
        />

        {withFirstLast && (
          <IconButton
            {...themeProps}
            icon="angle-double-right"
            disabled={disabledLast || disabled}
            onClick={(e) => handleOnClick(e, "last")}
            {...br}
          />
        )}
      </>
    );
  };

  if (withButtonGroup)
    return (
      <ButtonGroup
        className={className}
        style={style}
        borderRadius={borderRadius}
      >
        {renderButtons()}
      </ButtonGroup>
    );

  return (
    <Container className={className} style={style}>
      {renderButtons(borderRadius)}
    </Container>
  );
};

Pagination.defaultProps = {
  disabled: false,
  borderRadius: "regular",
  currentPage: 1,
  pages: [],
  buttonType: "outline",
  currentPageButtonType: "tinted",
  withFirstLast: true,
  withButtonGroup: true,
  disabledNext: false,
  disabledPrevious: false,
  disabledFirst: false,
  disabledLast: false,
  //-------------------------------
  onPageNumberClick: () => {},
  onClick: () => {},
  //-------------------------------
  style: {},
  className: "",
  color: "primary",
  size: "small",
};

Pagination.propTypes = {
  /**
   *  Applies to the movement buttons and to the page number buttons
   */
  disabled: PropTypes.bool,
  borderRadius: PropTypes.oneOf(["regular", "curved"]),
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
   * To show multiple page numbers
   */
  pages: PropTypes.arrayOf(PropTypes.number),
  /**
   * Active page number
   */
  currentPage: PropTypes.number,
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
  //-------------------------------
  /**
   *  Click on the page numbers
   */
  onPageNumberClick: PropTypes.func,
  /**
   *  Click on the movement buttons
   */
  onClick: PropTypes.func,
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
  ]),
};

export default Pagination;
