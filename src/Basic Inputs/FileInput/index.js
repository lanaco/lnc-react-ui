import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

var heightBySize = { small: "1.875rem", medium: "2.25rem", large: "2.625rem" };

var paddingBySize = { small: "8px", medium: "9.5px", large: "11.75px" };
var fileNamePaddingBySize = {
  small: "6.5px",
  medium: "8px",
  large: "11.75px",
};

const standardCssFields = ({ theme, size }) => {
  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
  `;
};

const Container = styled.label`
  display: flex;
  max-height: ${(props) => heightBySize[props.size]};
  min-height: ${(props) => heightBySize[props.size]};
  box-sizing: border-box;
  width: 100%;

  &:hover label {
    background-color: ${(props) =>
      props.disabled
        ? ""
        : props.focused
        ? props.theme.test_palette[props.color][500]
        : props.theme.test_palette[props.color][300]};
  }

  &:hover input {
    border: 0.09375rem solid
      ${(props) =>
        props.disabled
          ? props.theme.test_palette.light[400]
          : props.theme.test_palette.light[500]};
    border-left: transparent;
  }
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
  ${(props) => standardCssFields(props)}
  white-space: nowrap;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[400]
      : props.theme.test_palette[props.color][props.focused ? 500 : 400]};
  color: white;
  padding: ${(props) => paddingBySize[props.size]};
  border-radius: 0.1875rem 0 0 0.1875rem;
`;

const FileName = styled.input`
  ${(props) => standardCssFields(props)}
  // flex-grow: 1;
  width: 100%;
  padding: ${(props) => fileNamePaddingBySize[props.size]};
  border-radius: 0 0.1875rem 0.1875rem 0;
  appearance: none;
  outline: none;
  box-sizing: border-box;
  border: 0.09375rem solid
    ${(props) =>
      props.disabled
        ? props.theme.test_palette.light[400]
        : props.theme.test_palette.light[500]};
  border-left: transparent;
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
    accept,
    label,
    tabIndex,
    color,
    size,
    ...rest
  } = props;

  const theme = useTheme();

  const [file, setFile] = useState(null);
  const [focused, setFocused] = useState(false);

  var themeProps = { theme, size, color, disabled, focused };

  const getFileName = () => {
    if (file) return file.name;
    return "";
  };

  const handleOnChange = (e) => {
    var file = null;

    if (e.target.files && e.target.files.length === 1) file = e.target.files[0];
    else file = null;

    setFile(file);
    if (onChange) onChange(e, file);
  };

  return (
    <Container {...themeProps} className={className} style={style}>
      <Input
        {...themeProps}
        accept={accept}
        multiple={false}
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
      <Label {...themeProps}>
        {label}
      </Label>
      <FileName
        tabIndex={-1}
        {...themeProps}
        onChange={() => {}}
        value={getFileName()}
      />
    </Container>
  );
});

FileInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
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
    "info",
  ]),
};

export default FileInput;
