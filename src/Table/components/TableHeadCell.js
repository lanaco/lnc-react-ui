import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";

const HtmlHeadCell = styled.th`
  text-align: left;
  transition: all 250ms ease;
  font-weight: 900;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  border-bottom: 1px solid ${(props) => props.theme.palette.transparent.light};
  border-top: 1px solid ${(props) => props.theme.palette.transparent.light};

  ${(props) =>
    props.selectionCell === true
      ? "width: 27px; padding: 1px 1px 1px 6px;"
      : "padding: 2px 2px 2px 6px;"}

  &:first-of-type {
    border-radius: 3px 0 0 0;
  }

  &:last-of-type {
    border-radius: 0 3px 0 0;
  }

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;

const HeadInnerCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & i {
    color: black;
  }
`;

const HeadCellText = styled.span`
  color: black;
`;

const HeadCellIcon = styled.span`
  color: black;
  margin-left: auto;

  & i {
    color: ${(props) => (props.sort ? "transparent" : "black")};
  }
`;

const TableHeadCell = (props) => {
  //--------------------------
  const {
    Column,
    Ordering,
    Index,
    onColumnClick,
    //-----------
    className,
    size,
    color,
    theme,
  } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return (
    <HtmlHeadCell
      onClick={(e) => onColumnClick(e, Column, Ordering)}
      {...themeProps}
      key={Index}
    >
      {Column.displayName}
    </HtmlHeadCell>
  );
};

TableHeadCell.defaultProps = {
  __TYPE__: "TABLE_HEAD_CELL",
  //--------------------
  Column: {},
  Ordering: {},
  Index: 0,
  onColumnClick: () => {},
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableHeadCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Columns: PropTypes.object,
  Ordering: PropTypes.array,
  Index: PropTypes.any,
  onColumnClick: PropTypes.func,
  //----------------------------------------
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "white",
    "black",
  ]),
  theme: PropTypes.object.isRequired,
};

export default TableHeadCell;
