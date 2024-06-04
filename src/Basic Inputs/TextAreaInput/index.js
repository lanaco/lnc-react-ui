import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { debounce } from "lodash";
import { StyledTextareaWrapper } from "./styledComponents";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useEffectOnce, useUpdateEffect } from "react-use";

//===================================================

const TextAreaInput = React.forwardRef((props, ref) => {
  const {
    id,
    disabled,
    readOnly,
    value,
    defaultValue,
    debounceTime,
    type,
    placeholder,
    tabIndex,
    collapseOnBlur,
    minRows,
    maxRows,
    //----------------
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    //----------------
    className,
    style,
    size,
    color,
    ...rest
  } = props;

  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value);
  const [focused, setFocused] = useState(false);
  const [innerMinRows, setInnerMinRows] = useState(minRows);
  const [innerMaxRows, setInnerMaxRows] = useState(
    collapseOnBlur ? minRows : maxRows
  );

  useUpdateEffect(() => setInputValue(value), [value]);

  useEffect(() => {
    setInnerMinRows(minRows);
    if (collapseOnBlur && !focused) setInnerMaxRows(minRows);
  }, [minRows, maxRows]);

  useEffect(() => {
    if (!collapseOnBlur) setInnerMaxRows(maxRows);
    else setInnerMaxRows(focused ? maxRows : minRows);
  }, [collapseOnBlur]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    [onChange]
  );

  const handleChange = (e, value) => {
    if (onChange) onChange(e, value);
  };

  const onValueChange = (e) => {
    if (value || value === "") setInputValue(e.target.value);
    debouncedOnChange(e, e.target.value);
  };

  const handleFocus = (e) => {
    setFocused(true);
    if (collapseOnBlur) {
      setInnerMaxRows(maxRows);
    }
    onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (collapseOnBlur) {
      setInnerMaxRows(minRows);
    }
    onBlur(e);
  };

  return (
    <StyledTextareaWrapper
      ref={ref}
      style={style}
      className={className}
      theme={theme}
      color={color}
      size={size}
      focused={focused}
      disabled={disabled}
      readOnly={readOnly}
      collapseOnBlur={collapseOnBlur}
    > 
    {
      // Controlled input and uncotrolled input must be differentiated because of usage of the value property
      (value == null || value == "undefined") ?
      <ReactTextareaAutosize
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        readOnly={readOnly}
        tabIndex={tabIndex}
        minRows={innerMinRows}
        maxRows={innerMaxRows}
        onChange={onValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      :
      <ReactTextareaAutosize
        placeholder={placeholder}
        disabled={disabled}
        value={inputValue}
        readOnly={readOnly}
        tabIndex={tabIndex}
        minRows={innerMinRows}
        maxRows={innerMaxRows}
        onChange={onValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    }
    </StyledTextareaWrapper>
  );
});

TextAreaInput.defaultProps = {
  id: "",
  defaultValue: "",
  placeholder: "",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  tabIndex: 0,
  collapseOnBlur: false,
  minRows: 1,
  //----------------
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

TextAreaInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  /**
   * Defines whether the textarea will collapse to its original size after it loses focus.
   */
  collapseOnBlur: PropTypes.bool,
  /**
   * Minimum number of rows to show.
   */
  minRows: PropTypes.number,
  /**
   * Maximum number of rows to be shown before scroller appears.
   */
  maxRows: PropTypes.number,
  /**
   * `(event, value) => void`
   */
  onChange: PropTypes.func,
  /**
   * `(event) => void`
   */
  onBlur: PropTypes.func,
  /**
   * `(event) => void`
   */
  onFocus: PropTypes.func,
  //----------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray"
  ]),
};

export default TextAreaInput;