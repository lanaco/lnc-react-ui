import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../../General/Icon";
import { useDropzone } from "react-dropzone";

var paddingBySize = {
  small: "8px 13px",
  medium: "9.5px 14.5px",
  large: "11.75px 16.75px",
};

const standardCssFields = ({ theme, color, size }) => {
  return `
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.typography[size].fontSize};
    `;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 3.875rem;
  border: 1px dashed ${(props) => props.theme.test_palette.light[500]};
  border-radius: 5px;

  &:hover label {
    background-color: ${(props) =>
    props.disabled
      ? ""
      : props.focused
        ? props.theme.test_palette[props.color][200]
        : props.theme.test_palette[props.color][300]};
  }
`;

const TextContent = styled.div`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].subTextSize};
  color: ${(props) => props.theme.palette.transparent.text};
`;

const Label = styled.label`
  ${(props) => standardCssFields(props)}
  white-space: nowrap;
  display: inline-block;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[400]
      : props.theme.test_palette[props.color][props.focused ? 200 : 400]};
  color: white;

  padding: ${(props) => paddingBySize[props.size]};
  border-radius: 10px;
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const DragDropFileInput = React.forwardRef((props, ref) => {
  const {
    id,
    className,
    style,
    onChange,
    onFocus,
    onBlur,
    onDropAccepted,
    onDrop,
    disabled,
    preventDefault,
    value,
    accept,
    multiple,
    selectFileText,
    dndFileText,
    showFileSize,
    color,
    size,
    ...rest
  } = props;
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  var themeProps = { theme, size, color, disabled, focused };

  const handleOnDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (onDrop) onDrop(acceptedFiles, rejectedFiles);
  }, []);

  const handleOnDropAccepted = useCallback((acceptedFiles) => {
    if (onChange && !disabled) onChange(acceptedFiles);
    if (onDropAccepted) onDropAccepted(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleOnDrop,
    accept: accept,
    onDropAccepted: handleOnDropAccepted,
  });

  return (
    <Container
      {...themeProps}
      className={className}
      style={style}
      {...getRootProps()}
    >
      <Input
        {...getInputProps()}
        {...themeProps}
        multiple={multiple}
        ref={ref}
        type="file"
        id={id}
        onFocus={(e) => {
          if (!disabled) setFocused(true);
          if (onFocus && !disabled) onFocus(e);
        }}
        onBlur={(e) => {
          if (!disabled) setFocused(false);
          if (onBlur && !disabled) onBlur(e);
        }}
        onChange={(e) => {
          if (onChange && !disabled) onChange(e);
        }}
        {...rest}
      />

      <Icon icon={"upload"} size={size} color={"gray"} />
      <TextContent {...themeProps}>{dndFileText}</TextContent>
      <Label {...themeProps} htmlFor={id}>
        {selectFileText}
      </Label>
    </Container>
  );
});

DragDropFileInput.defaultProps = {
  id: "",
  disabled: false,
  accept: {},
  multiple: true,
  selectFileText: "Select file",
  dndFileText: "Drag and drop file here or",
  showFileSize: false,
  //------------------
  onChange: () => { },
  onFocus: () => { },
  onBlur: () => { },
  onDropAccepted: () => { },
  onDrop: () => { },
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

DragDropFileInput.propTypes = {
  id: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  /**
   * Type of: { \[key: string]: string[] }
   * 
   * Ex: {
   * 
   *   'image/png': ['.png'],
   * 
   *   'text/html': ['.html', '.htm']
   * 
   * }
  */
  accept: PropTypes.object,
  multiple: PropTypes.bool,
  selectFileText: PropTypes.string,
  dndFileText: PropTypes.string,
  showFileSize: PropTypes.bool,
  //-------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDrop: PropTypes.func,
  //-------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
};

export default DragDropFileInput;
