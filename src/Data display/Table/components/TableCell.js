import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { isFunction, isEmpty } from "lodash";
import { useTheme } from "@emotion/react";
import {
  getComponentTypographyCss,
  getColorRgbaValue,
} from "../../../_utils/utils";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width};
  padding: 0.875rem 1.5rem;

  background-color: ${(props) =>
    getColorRgbaValue(props.theme, "TableRow", null, "enabled", "background")};

  ${(props) => props.bgColor}

  ${(props) =>
    getComponentTypographyCss(props.theme, "TableCell", props.size, "enabled")};
`;

const TableCell = (props) => {
  //--------------------------
  const {
    Column,
    RowData,
    Index,
    EnableSelection,
    EnableRowHighlight,
    GetRowHighlightColor,
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

  const getBgColor = () => {
    var color = GetRowHighlightColor(RowData);

    if (EnableRowHighlight === true && isColor(color))
      return `
        background-color: ${color};
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

    return RowData[Column.accessor];
  };

  return (
    <HtmlCell
      {...themeProps}
      bgColor={getBgColor()}
      selection={EnableSelection}
      width={getWidth()}
      key={Index}
      title={RowData[Column.accessor]}
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
  EnableRowHighlight: false,
  GetRowHighlightColor: () => "",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
};

TableCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Column: PropTypes.object.isRequired,
  RowData: PropTypes.object.isRequired,
  Index: PropTypes.number.isRequired,
  EnableSelection: PropTypes.bool,
  EnableRowHighlight: PropTypes.bool,
  GetRowHighlightColor: PropTypes.func,
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
    "gray"
  ]),
};

export default TableCell;
