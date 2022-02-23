import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";

const SpecialFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  color: ${(props) => props.theme.palette[props.color].textDark};
  border: 1px solid ${(props) => props.theme.palette.gray[800]};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.palette[props.color].main};
    background-color: whitesmoke;
  }

  &:hover {
    outline: none;
    border: 1px solid ${(props) => props.theme.palette[props.color].main};
    background-color: whitesmoke;
  }
`;

const TableSpecialLastRow = (props) => {
  //--------------------------
  const {
    Columns,
    Data,
    ColumnsToRender,
    onClick,
    TabIndexOffset,
    //----------------
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
    <SpecialFooter
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      onClick={onClick}
      tabIndex={
        TabIndexOffset +
        ColumnsToRender.filter((x) => x.editable).length * Data.length
      }
      {...themeProps}
    >
      Add new item
    </SpecialFooter>
  );
};

TableSpecialLastRow.defaultProps = {
  __TYPE__: "TABLE_SPECIAL_LAST_ROW",
  //--------------------
  onRowClick: () => {},
  onSelectRow: () => {},
  RowData: {},
  //--------------------
  IsSelected: null,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableSpecialLastRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
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

export default TableSpecialLastRow;
