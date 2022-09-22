import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import CheckBoxInput from "../../../Basic Inputs/CheckBoxInput/index";

const HtmlCell = styled.td`
  padding: 4px 6px 4px 6px;
  background-color: transparent;
  width: ${(props) => props.width}%;
`;

const Inner = styled.div`
  wdith: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const AnalyticalTableSelectionCell = (props) => {
  //--------------------------
  const {
    RowData,
    SelectedData,
    onSelectRow,
    RowIdentifier,
    Index,
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

  const calculateRowSelection = (rowData) => {
    // Check if row is selected
    let row = SelectedData.find(
      (x) => String(x[RowIdentifier]) === String(rowData[RowIdentifier])
    );

    if (row !== null && row !== undefined) return true;
    else return false;
  };

  const onChange = (e) => {
    console.log(RowData.id);
    onSelectRow(e, RowData, calculateRowSelection(RowData));
  };

  const onCellClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    onSelectRow(e, RowData, calculateRowSelection(RowData));
  };

  return (
    <HtmlCell
      {...themeProps}
      key={Index}
      width={props.width}
      // onClick={onCellClick}
    >
      <Inner>
        <CheckBoxInput
          id={Index}
          checked={calculateRowSelection(RowData)}
          onChange={onChange}
        />
      </Inner>
    </HtmlCell>
  );
};

AnalyticalTableSelectionCell.defaultProps = {
  __TYPE__: "ANALYTICAL_TABLE_SELECTION_CELL",
  //--------------------
  RowData: {},
  SelectedData: [],
  onSelectRow: () => {},
  RowIdentifier: "id",
  Index: 0,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableSelectionCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  RowData: PropTypes.object,
  SelectedData: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  RowIdentifier: PropTypes.string,
  Index: PropTypes.number.isRequired,
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

export default AnalyticalTableSelectionCell;
