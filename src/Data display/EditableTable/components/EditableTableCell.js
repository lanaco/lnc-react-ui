import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { inputType } from "../constants/constants";
import { useTheme } from "@emotion/react";
import { getComponentTypographyCss } from "../../../_utils/utils";
import TextInput from "../../../Basic Inputs/TextInput";
import NumberInput from "../../../Basic Inputs/NumberInput";
import DecimalInput from "../../../Basic Inputs/DecimalInput";
import CheckBoxInput from "../../../Basic Inputs/CheckBoxInput";
import Dropdown from "../../../Inputs/Dropdown";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${(props) => props.width};
  padding: ${(props) =>
    props.focused && !props.isBoolean
      ? "0.5rem 0.5rem 0.5rem 0.7rem"
      : "0.5rem 0.5rem 0.5rem 1.5rem"};
  ${(props) => props.bgColor}

  ${(props) =>
    getComponentTypographyCss(props.theme, "TableCell", props.size, "enabled")};
`;

const DefaultCellContent = styled.div`
  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "TableSpecialLastRow",
      props.size,
      "enabled"
    )};
  padding: ${(props) => (props.hasRender ? "0" : "9.5px 6px 9.5px 0")};
  cursor: ${(props) => (props.tabIndex !== -1 ? "pointer" : "auto")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
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
    __TYPE__ = "TABLE_CELL",
    Column = {},
    ColumnsToRender,
    RowData = {},
    Index = 0,
    RowIndex,
    EnableSelection = false,
    TabIndexOffset = 100,
    onFocusChanged,
    RowIdentifier,
    onDiscard,
    onMount,
    //----------------
    onChange,
    //----------------
    className = "",
    size = "small",
    color = "primary",
  } = props;

  const theme = useTheme();

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

    var standardOnChange = (e, value) => {

     onChange(e, value, RowIndex, Index, Column, RowData);
    };

    var dropdownOnChange = (value) => {
      onChange(_, value, RowIndex, Index, Column, RowData);
    };

    var inputProps = {
      ...themeProps,
      debounceTime: 0,
      ...Column.inputProps,
      value: Column?.objectAccessor
        ? RowData[Column.accessor][Column?.objectAccessor]
        : RowData[Column.accessor],
      defaultChecked: Column?.objectAccessor
        ? RowData[Column.accessor][Column?.objectAccessor]
        : RowData[Column.accessor],
      focused: focused,
      onChange: standardOnChange,
      onBlur: (e) => onSetFocus(e, false),
      onFocus: (e) => onSetFocus(e, true),
      onKeyDown: (e) => onKeyDown(e),
      tabIndex: calculateTabIndex(),
    };

    switch (Column.inputType) {
      case inputType.STRING:
        inputComponent = <TextInput {...inputProps} ref={inputRef} />;
        break;

      case inputType.INTEGER:
        inputComponent = <NumberInput {...inputProps} ref={inputRef} />;
        break;

      case inputType.DECIMAL:
        inputComponent = <DecimalInput {...inputProps} ref={inputRef} />;
        break;

      case inputType.DATE:
        inputComponent = <TextInput {...inputProps} ref={inputRef} />;
        break;

      case inputType.BOOLEAN:
        inputComponent = <CheckBoxInput {...inputProps} ref={inputRef} />;
        break;

      case inputType.SELECT:
        inputComponent = (
          <Dropdown
            {...inputProps}
            value={Column.inputProps.options.find((x) =>
              x.value === Column?.objectAccessor
                ? RowData[Column.accessor][Column?.objectAccessor]
                : RowData[Column.accessor]
            )}
            onChange={dropdownOnChange}
            ref={inputRef}
          />
        );
        break;

      default:
        inputComponent = <TextInput {...inputProps} ref={inputRef} />;
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

      if (Column.inputType === inputType.SELECT)
        additionalProps = {
          items: Column.selectItems,
          mapNameTo: Column.selectProps.mapNameTo,
          mapValueTo: Column.selectProps.mapValueTo,
        };

      inputComponent = (
        <Column.editComponent
          ref={inputRef}
          tabIndex={calculateTabIndex()}
          value={
            Column?.objectAccessor
              ? RowData[Column.accessor][Column?.objectAccessor]
              : RowData[Column.accessor]
          }
          onChange={(event, value, id) => {
            onChange(event, value, RowIndex, Index, Column, RowData, id);
          }}
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
              value={
                Column?.objectAccessor
                  ? RowData[Column.accessor][Column?.objectAccessor]
                  : RowData[Column.accessor]
              }
              fullValue={RowData[Column.accessor]}
              disabled={true}
            />
          ) : Column?.objectAccessor ? (
            RowData[Column.accessor][Column?.objectAccessor]
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
      focused={focused}
      isBoolean={Column.inputType === inputType.BOOLEAN}
    >
      {renderCellContent()}
    </HtmlCell>
  );
};

// TODO : type
// EditableTableCell.defaultProps = {
//   __TYPE__: "TABLE_CELL",
//   //--------------------
//   Column: {},
//   RowData: {},
//   Index: 0,
//   EnableSelection: false,
//   TabIndexOffset: 100,
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

EditableTableCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Column: PropTypes.object,
  RowData: PropTypes.object,
  Index: PropTypes.number,
  EnableSelection: PropTypes.bool,
  TabIndexOffset: PropTypes.number,
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
    "gray",
  ]),
};

export default EditableTableCell;

EditableTableCell.displayName = 'TABLE_CELL';