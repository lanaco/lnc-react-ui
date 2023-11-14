import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

const Container = styled.label`
  display: inline-flex;
  box-sizing: border-box;
  width: 100%;
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "enabled",
      "background"
    )};
  border-radius: 8px;
  ${(props) =>
    props.focused && props.readOnly == false ? getOutlineCss(props.theme) : ""}
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0.625rem 0.75rem;
  ${(props) =>
    getComponentTypographyCss(props.theme, "Input", props.size, "enabled")}
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.focused ? "primary" : props.color,
      "enabled",
      "prefix"
    )};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "enabled",
      "background"
    )};
  border: 1px solid
    ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.focused ? "primary" : props.color,
        props.disabled ? "disabled" : "enabled",
        "border"
      )};
  border-radius: 8px 0 0 8px;

  ${(props) => (props.disabled ? getDisabledStateCss(props.theme) : "")}
`;

const FileName = styled.input`
  width: 100%;
  appearance: none;
  outline: none;
  padding: 0.625rem 0.75rem;
  ${(props) =>
    getComponentTypographyCss(props.theme, "Input", props.size, "enabled")}
  border: 1px solid
    ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.focused ? "primary" : props.color,
      props.disabled ? "disabled" : "enabled",
      "border"
    )};
  border-radius: 0 8px 8px 0;
  border-left: transparent;
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.focused ? "primary" : props.color,
      "enabled",
      "text"
    )};

  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "enabled",
      "background"
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.focused ? "primary" : props.color,
      "enabled",
      "text"
    )};

  ${(props) => (props.disabled ? getDisabledStateCss(props.theme) : "")}
`;

const FileInput = React.forwardRef((props, ref) => {
  const {
    id,
    className,
    style,
    onChange,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    multiple,
    accept,
    label,
    tabIndex,
    color,
    size,
    ...rest
  } = props;

  const theme = useTheme();

  const [files, setFiles] = useState([]);
  const [focused, setFocused] = useState(false);

  var themeProps = { theme, size, color, disabled, focused };

  const getFileNames = () => {
    if (files.length > 0) {
      var nameString = "";

      for (const fileIndex in files) {
        nameString +=
          fileIndex == files.length - 1
            ? `${files[fileIndex].name}`
            : `${files[fileIndex].name}, `;
      }

      return nameString;
    }

    return "";
  };

  const handleOnChange = (e) => {
    var files = [];

    if (e.target.files && e.target.files.length > 0) {
      for (const file of e.target.files) {
        files.push(file);
      }
    } else files = [];

    setFiles(files);
    if (onChange) onChange(e, files);
  };

  return (
    <Container
      {...themeProps}
      className={className}
      style={style}
      focused={focused}
      readOnly={readOnly}
    >
      <Input
        {...themeProps}
        accept={accept}
        multiple={multiple}
        ref={ref}
        onChange={disabled || readOnly ? () => {} : handleOnChange}
        type="file"
        id={id}
        tabIndex={tabIndex}
        onFocus={(e) => {
          if (!disabled) setFocused(true);
          if (onFocus && !disabled) onFocus(e);
        }}
        onBlur={(e) => {
          if (!disabled) setFocused(false);
          if (onBlur && !disabled) onBlur(e);
        }}
        {...rest}
      />
      <Label {...themeProps}>{label}</Label>
      <FileName
        tabIndex={-1}
        {...themeProps}
        onChange={() => {}}
        value={getFileNames()}
      />
    </Container>
  );
});

FileInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  multiple: false,
  accept: "",
  label: "Choose File",
  tabIndex: 0,
  //------------------
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
FileInput.propTypes = {
  id: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tabIndex: PropTypes.number,
  //-------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  //-------------------------
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

export default FileInput;
