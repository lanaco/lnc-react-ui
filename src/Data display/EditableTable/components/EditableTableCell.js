import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { isFunction, isEmpty } from "lodash";
import EditableTableRow from "../components/EditableTableRow";
import { inputType } from "../constants/constants";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width};
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
  padding: ${(props) => (props.hasRender ? "0" : "9.5px 6px 9.5px 6px")};
  border: 1px solid transparent;
  cursor: ${(props) => (props.tabIndex !== -1 ? "pointer" : "auto")};

  &:focus {
    outline: none;
    border: 1px solid #c7c7c7;
    border-radius: 3px;
  }
`;

const EditableTableCell = (props) => {
  //
  const [focused, setFocus] = useState(false);

  var inputRef = useRef();
  var divRef = useRef();
  var triggerBlur = useRef(true);

  //--------------------------
  const {
    Column,
    ColumnsToRender,
    RowData,
    Index,
    RowIndex,
    EnableSelection,
    TabIndexOffset,
    onFocusChanged,
    RowIdentifier,
    onDiscard,
    onMount,
    //----------------
    onChange,
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
    onMount(RowIndex, Index, divRef);
  }, []);

  useEffect(() => {
    if (!focused) onMount(RowIndex, Index, divRef);
  }, [focused]);

  useEffect(() => {
    if (focused && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  const getWidth = () => {
    if (Column && Column.width) {
      return Column.width + "%";
    }

    return "auto";
  };

  const calculateTabIndex = () => {
    if (Column.editable !== true) return -1;

    var editableCells = ColumnsToRender.filter((x) => x.editable);
    var thisCell = editableCells.find((x) => x.id === Column.id);

    return (
      TabIndexOffset +
      RowIndex * editableCells.length +
      editableCells.indexOf(thisCell)
    );
  };

  const onSetFocus = (e, focused) => {
    onFocusChanged(e, focused, RowIndex, Index);

    if (!focused) setFocus(focused);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      triggerBlur.current = false;
      inputRef.current.blur();
      triggerBlur.current = true;
      onDiscard(e, RowIndex, Index, RowData);
    }
  };

  const getDefaultInputComponent = () => {
    //
    var inputComponent = null;

    var inputProps = {
      ...themeProps,
      value: RowData[Column.accessor],

      onChange: (e) =>
        onChange(e, e.target.value, RowIndex, Index, Column, RowData),
      focused: focused,
      onBlur: (e) => onSetFocus(e, false),
      onFocus: (e) => onSetFocus(e, true),
      onKeyDown: (e) => onKeyDown(e),
      tabIndex: calculateTabIndex(),
    };

    switch (Column.inputType) {
      case inputType.STRING:
        inputComponent = <Input {...inputProps} ref={inputRef} />;
        break;

      case inputType.INTEGER:
        inputComponent = <Input {...inputProps} ref={inputRef} />;
        break;

      case inputType.DECIMAL:
        inputComponent = <Input {...inputProps} ref={inputRef} />;
        break;

      case inputType.DATE:
        inputComponent = <Input {...inputProps} ref={inputRef} />;
        break;

      case inputType.BOOLEAN:
        inputComponent = <Input {...inputProps} ref={inputRef} />;
        break;

      case inputType.SELECT:
        inputComponent = <Input {...inputProps} ref={inputRef} />;
        break;
    }

    return inputComponent;
  };

  const handleBlur = (e) => {
    if (triggerBlur.current === true) onSetFocus(e, false);
    else setFocus(false);
  };

  const renderCellContent = () => {
    // Default input component
    var inputComponent = getDefaultInputComponent();

    // Input component as a react element
    if (Column.editable === true && Column.editComponent) {
      var additionalProps = {};

      if (Column.inputType === "SELECT")
        additionalProps = {
          items: Column.selectItems,
          mapNameTo: Column.selectProps.mapNameTo,
          mapValueTo: Column.selectProps.mapValueTo,
        };

      inputComponent = (
        <Column.editComponent
          ref={inputRef}
          tabIndex={calculateTabIndex()}
          value={RowData[Column.accessor]}
          onChange={(event, value, id) =>
            onChange(event, value, RowIndex, Index, Column, RowData, id)
          }
          focused={focused}
          onBlur={handleBlur}
          onFocus={(e) => onSetFocus(e, true)}
          onKeyDown={(e) => onKeyDown(e)}
          {...additionalProps}
        />
      );
    }

    if (Column.editable === true && focused) return inputComponent;

    if (!focused || Column.editable !== true)
      return (
        <DefaultCellContent
          ref={divRef}
          tabIndex={calculateTabIndex()}
          onFocus={() => setFocus(true)}
          hasRender={Column.readonlyComponent ? true : false}
          {...themeProps}
        >
          {Column.readonlyComponent ? (
            <Column.readonlyComponent
              rowData={RowData}
              value={RowData[Column.accessor]}
              disabled={true}
            />
          ) : (
            RowData[Column.accessor]
          )}
        </DefaultCellContent>
      );
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
