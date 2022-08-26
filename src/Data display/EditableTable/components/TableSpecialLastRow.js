import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../../_utils/utils";

const SpecialRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(248, 250, 252, 100%);
  border: 1px solid rgba(203, 213, 225, 100%);
  margin-top: 0.5rem;

  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "TableSpecialLastRow",
      props.size,
      "enabled"
    )};

  transition: all 0.2s ease;

  &:disabled {
    color: gray;
    border: 1px solid gray;
    background-color: gray;
  }

  &:focus {
    outline: none;
    border: 1px solid teal;
    background-color: whitesmoke;
  }

  &:hover {
    outline: none;
    border: 1px solid teal;
    background-color: whitesmoke;
  }

  ${(props) =>
    !props.disabled
      ? ""
      : `
          cursor: default;
          color: gray;
          border: 1px solid gray;
        `}
`;

const TableSpecialLastRow = (props) => {
  //--------------------------
  const {
    Columns,
    Disabled,
    Data,
    ColumnsToRender,
    onClick,
    TabIndexOffset,
    //----------------
    className,
    size,
    color,
  } = props;

  const theme = useTheme();

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return (
    <SpecialRow
      disabled={Disabled}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !Loading) onClick(true);
      }}
      onClick={() => {
        if (!Loading) onClick(false);
      }}
      tabIndex={
        TabIndexOffset +
        ColumnsToRender.filter((x) => x.editable).length * Data.length
      }
      {...themeProps}
    >
      Add new invoice
    </SpecialRow>
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
    "warning",
    "danger",
    "information",
    "neutral",
  ]),
};

export default TableSpecialLastRow;
