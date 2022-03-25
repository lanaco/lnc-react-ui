import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { isFunction, isEmpty } from "lodash";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width};
  padding: ${(props) =>
    props.selection === false ? "11.4px 6px 11.4px 6px" : "4px 6px 4px 6px"};
`;

const CellText = styled.span`
  ${(props) => props.textColor}
`;

const TableCell = (props) => {
  //--------------------------
  const {
    Column,
    RowData,
    Index,
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

  // TODO: move to service
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
      <CellText textColor={getTextColor()}>{RowData[Column.accessor]}</CellText>
    );
  };

  return (
    <HtmlCell
      {...themeProps}
      selection={EnableSelection}
      width={getWidth()}
      key={Index}
    >
      {renderCellContent()}
    </HtmlCell>
  );
};

TableCell.defaultProps = {
  __TYPE__: "TABLE_CELL",
  //--------------------
  Column: {},
  RowData: {},
  Index: 0,
  EnableSelection: false,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Column: PropTypes.object.isRequired,
  RowData: PropTypes.object.isRequired,
  Index: PropTypes.number.isRequired,
  EnableSelection: PropTypes.bool,
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

export default TableCell;
