import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { isFunction, isEmpty } from "lodash";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  // width: ${(props) => props.width};

  background-color: ${(props) =>
    props.selected ? theme.palette.primary.lighter : "inherit"};

  padding: ${(props) =>
    props.selection === false ? "8px 6px 8px 6px" : "8px 6px 8px 6px"};
`;

const CellText = styled.span`
  ${(props) => props.textColor}
`;

const AnalyticalTableCell = (props) => {
  //--------------------------
  const {
    Column,
    RowData,
    Index,
    SelectedData,
    RowIdentifier,
    EnableSelection,
    EnableRowTextHighlight,
    GetRowTextHighlightColor,
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

  //TODO: move to service
  const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
  };

  const getWidth = () => {
    if (Column && Column.width) {
      return Column.width + "%";
    }

    return "auto";
  };

  const getTextColor = () => {
    var color = GetRowTextHighlightColor(RowData);

    if (EnableRowTextHighlight === true && isColor(color))
      return `
        color: ${color}
      `;

    return "";
  };

  const renderCellContent = () => {
    if (Column.render && isFunction(Column.render)) {
      var element = Column.render(RowData);

      if (React.isValidElement(element)) return element;
      else
        console.error(
          `${Column.id}/${Column.accessor}: invalid render function.`
        );
    }

    if (isEmpty(Column.accessor))
      console.error(
        `${Column.index}: accessor property is required when the render function is not suplied`
      );

    return (
      <CellText textColor={getTextColor()}>
        {RowData[Column.accessor]}
        {/* {RowData[Column.accessor]
          ? RowData[Column.accessor] + " / " + Column.width + "%"
          : Column.width + "%"} */}
      </CellText>
    );
  };

  const calculateRowSelection = (rowData) => {
    // Check if row is selected
    let row = SelectedData.find(
      (x) => String(x[RowIdentifier]) === String(rowData[RowIdentifier])
    );

    if (row !== null && row !== undefined) return true;
    else return false;
  };

  return (
    <HtmlCell
      {...themeProps}
      selection={EnableSelection}
      selected={calculateRowSelection(RowData)}
      width={getWidth()}
      key={Index}
    >
      {renderCellContent()}
    </HtmlCell>
  );
};

AnalyticalTableCell.defaultProps = {
  __TYPE__: "ANALYTICAL_TABLE_CELL",
  //--------------------
  RowData: {},
  SelectedData: [],
  RowIdentifier: "id",
  Index: 0,
  EnableSelection: false,
  EnableRowTextHighlight: false,
  GetRowTextHighlightColor: () => {},
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  SelectedData: PropTypes.arrayOf(PropTypes.object),
  RowIdentifier: PropTypes.string,
  RowData: PropTypes.object.isRequired,
  Index: PropTypes.number.isRequired,
  EnableSelection: PropTypes.bool,
  EnableRowTextHighlight: PropTypes.bool,
  GetRowTextHighlightColor: PropTypes.func,
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

export default AnalyticalTableCell;
