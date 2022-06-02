import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";

const Container = styled.div``;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Label = styled.label`
  font-family: arial;
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  color: white;
  padding: 6px;
  border-radius: 3px 0 0 3px;
`;

const FileName = styled.input`
  font-family: arial;
  font-size: 12px;
  padding: 5px;
  border-radius: 0 3px 3px 0;
  appearance: none;
  outline: none;
  border: 1px solid ${theme.palette.primary.main};
`;

const FileInput = React.forwardRef((props, ref) => {
  const {
    id,
    className,
    style,
    onChange,
    disabled,
    name,
    preventDefault,
    accept,
    multiple,
    chooseFileText = "Choose file",
    showFileSize = false,
    ...rest
  } = props;

  const [file, setFile] = useState(null);

  const getFileName = () => {
    if (file && showFileSize)
      return `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;

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
    <Container className={className} style={style}>
      <Input
        accept={accept}
        multiple={false}
        ref={ref}
        onChange={handleOnChange}
        type="file"
        id={id}
        {...rest}
      />
      <Label htmlFor={id}>{chooseFileText}</Label>
      <FileName onChange={() => {}} value={getFileName()} />
    </Container>
  );
});

FileInput.defaultProps = {
  id: "",
  disabled: false,
  onChange: () => {},
  preventDefault: true,
  className: "",
  style: {},
};
FileInput.propTypes = {
  id: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  preventDefault: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
};

export default FileInput;
