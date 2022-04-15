import React from 'react';
import styled from "@emotion/styled";
import PropTypes from "prop-types";

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
  }

  return (
    // <input type="file" />
    <input type="file" id={id} className={className} style={style}
      accept={accept}
      disabled={disabled} name={name} ref={ref} multiple={multiple} onChange={handleOnChange} {...rest} />
  )
});

FileInput.defaultProps = {
  id: "",
  disabled: false,
  onChange: () => { },
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

export default FileInput