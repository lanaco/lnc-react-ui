import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";
import { isFunction, isEmpty } from "lodash";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width};
  color: red;
  border: 1px solid gray;
`;

const Input = styled.input`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  appearance: none;
  outline: none;
  border: none;
  padding: 9.5px 6px 9.5px 6px;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const EditableTableCell = (props) => {
  //--------------------------
  const {
    Column,
    RowData,
    Index,
    EnableSelection,
    //----------------
    onCellFocus,
    onCellBlur,
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

  const getWidth = () => {
    if (Column && Column.width) {
      return Column.width + "%";
    }

    return "auto";
  };

  const renderCellContent = () => {
    return (
      <Input
        {...themeProps}
        value={RowData[Column.accessor]}
        onChange={() => {}}
      />
    );

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
      selection={EnableSelection}
      width={getWidth()}
      key={Index}
    >
      {renderCellContent()}
    </HtmlCell>
  );
};

EditableTableCell.defaultProps = {
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

EditableTableCell.propTypes = {
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

export default EditableTableCell;
