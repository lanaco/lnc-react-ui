import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

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
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  cursor: pointer;
`;

const FileName = styled.span`
  position: absolute;
  bottom: -35px;
  left: 10px;
  font-size: 0.85rem;
  color: #555;
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
    ...rest
  } = props;

  const handleOnChange = (e) => {
    if (preventDefault) e.preventDefault();

    if (onChange) onChange(id, e);
  };

  return (
    <Container>
      <Input type="file" id={id} />
      <Label htmlFor={id}>Select file</Label>
      <FileName></FileName>
    </Container>
  );

  return (
    // <input type="file" />
    <input
      type="file"
      id={id}
      className={className}
      style={style}
      accept={accept}
      disabled={disabled}
      name={name}
      ref={ref}
      multiple={multiple}
      onChange={handleOnChange}
      {...rest}
    />
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
