import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";
import { isFunction, isEmpty } from "lodash";
import EditableTableRow from "../components/EditableTableRow";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width};
  // color: red;
  // border: 1px solid gray;
`;

const Input = styled.input`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  appearance: none;
  outline: none;
  border: none;
  border: ${(props) =>
    props.focused
      ? `1px solid ${theme.palette.primary.main}`
      : "1px solid transparent"};
  padding: 9.5px 6px 9.5px 6px;
  border-radius: 3px;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const DefaultCellContent = styled.div`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  padding: 9.5px 6px 9.5px 6px;
  border: 1px solid transparent;

  &:focus {
    outline: none;
    border: 1px solid #c7c7c7;
    border-radius: 3px;
  }
`;

const EditableTableCell = (props) => {
  //
  const [focused, setFocus] = useState(false);
  const [data, setData] = useState("");

  var inputRef = React.createRef();

  //--------------------------
  const {
    Column,
    ColumnsToRender,
    RowData,
    Index,
    RowIndex,
    EnableSelection,
    TabIndexOffset,
    //----------------
    onChange,
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

  useEffect(() => {
    setData(RowData[Column.accessor]);
  }, [props]);

  useEffect(() => {
    if (focused && inputRef && inputRef.current) {
      if (RowIndex === 1 && Index === 0) console.log("FOCUS");
      inputRef.current.focus();
    }
  }, [focused]);

  const getWidth = () => {
    if (Column && Column.width) {
      return Column.width + "%";
    }

    return "auto";
  };

  const onSetFocus = (e, focused) => {
    props.onFocusChanged(e, focused, RowIndex, Index, inputRef);

    if (!focused) setFocus(focused);
  };

  const calculateTabIndex = () => {
    if (Column.editable !== true) return -1;

    return TabIndexOffset + RowIndex * ColumnsToRender.length + Index;
  };

  const setCellData = (value) => {
    if (data !== value) {
      onChange(value, Column, RowData);
      setData(value);
    }
  };

  const renderCellContent = () => {
    //
    // Default input component
    var inputComponent = (
      <Input
        ref={inputRef}
        {...themeProps}
        value={data}
        onChange={(e) => {
          setCellData(e.target.value);
        }}
        //-----------------------------
        focused={focused}
        onBlur={(e) => onSetFocus(e, false)}
        onFocus={(e) => onSetFocus(e, true)}
        tabIndex={calculateTabIndex()}
      />
    );

    //Input component as a render prop function
    // if (
    //   Column.editable === true &&
    //   Column.component &&
    //   isFunction(Column.component)
    // )
    //   inputComponent = (
    //     <>
    //       {Column.component(
    //         {
    //           tabIndex: calculateTabIndex(),
    //           value: data,
    //           onChange: (e) => {
    //             setCellData(e.target.value);
    //           },
    //           focused: focused,
    //           onBlur: (e) => onSetFocus(e, false),
    //           onFocus: (e) => onSetFocus(e, true),
    //           ...themeProps,
    //         },
    //         inputRef
    //       )}
    //     </>
    //   );

    // Input component as a react element
    if (Column.editable === true && Column.component) {
      inputComponent = (
        <Column.component
          ref={inputRef}
          tabIndex={calculateTabIndex()}
          value={data}
          onChange={(e) => {
            setCellData(e.target.value);
          }}
          focused={focused}
          onBlur={(e) => onSetFocus(e, false)}
          onFocus={(e) => onSetFocus(e, true)}
        />
      );
    }

    if (Column.editable === true && focused) {
      return inputComponent;
    }

    if (!focused || Column.editable !== true) {
      return (
        <DefaultCellContent
          tabIndex={calculateTabIndex()}
          onFocus={() => setFocus(true)}
          {...themeProps}
        >
          {data}
        </DefaultCellContent>
      );
    }

    // if (Column.render && isFunction(Column.render)) {
    //   var element = Column.render(RowData);

    //   if (React.isValidElement(element)) return element;
    //   else
    //     console.error(
    //       `${Column.id}/${Column.accessor}: invalid render function.`
    //     );
    // }

    // if (isEmpty(Column.accessor))
    //   console.error(
    //     `${Column.index}: accessor property is required when the render function is not suplied`
    //   );

    // return RowData[Column.accessor];
  };

  return (
    <HtmlCell
      data-rowindex={RowIndex}
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
  TabIndexOffset: 100,
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
  TabIndexOffset: PropTypes.number,
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
