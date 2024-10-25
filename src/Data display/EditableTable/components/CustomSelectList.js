import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

const paddingBySize = (size) => {
  if (size === "small") return "0.3rem 0.375rem 0.3rem 0.0625rem";
  if (size === "medium") return "0.3625rem 0.375rem 0.3625rem 0.0625";
  if (size === "large") return "0.4rem 0.375rem 0.4rem 0.0625";
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const Select = styled.select((props) => ({
  fontFamily: props.theme.typography.fontFamily,
  outline: "none",
  backgroundColor: props.theme.palette[props.color].lighter,
  color: props.theme.palette[props.color].textDark,
  transition: "all 250ms",
  fontSize: props.theme.typography[props.size].fontSize,
  border: "0px",
  borderBottom: `0.125rem solid ${props.theme.palette[props.color].main}`,
  width: "100%",
  boxSizing: "border-box",
  minHeight: heightBySize(props.size),
  maxHeight: heightBySize(props.size),
  cursor: "pointer",

  "&:focus": {
    backgroundColor: props.theme.palette.common.white,
    color: props.theme.palette.common.black,
  },
  "&:disabled": {
    backgroundColor: props.theme.palette.gray[200],
    borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
    color: props.theme.palette.gray.textLight,
    cursor: "default",
    opacity: 0.7,
  },
}));

const Option = styled.option((props) => ({
  fontFamily: props.theme.typography.fontFamily,
}));

const CustomSelectList = React.forwardRef((props, ref) => {
  const {
    mapNameTo = "name",
    mapValueTo = "value",
    id = "",
    preventDefault = true,
    onChange = () => {},
    items = [],
    disabled = false,
    size = "small",
    color = "primary",
    value,
    tooltip = "",
    withoutEmpty = true,
    className = "",
    tabIndex,
    onFocus,
    onBlur,
  } = props;
  const theme = useTheme();

  const handleOnChange = (e) => {
    onChange(e, e.target.value, id);
  };

  const getItems = () => {
    let name = "name";
    let value = "value";

    if (mapNameTo && mapNameTo !== "") name = mapNameTo;

    if (mapValueTo && mapValueTo !== "") value = mapValueTo;

    return items.map((el, i) => {
      return (
        <Option {...{ theme, size, color }} key={i} value={el[value]}>
          {el[name]}
        </Option>
      );
    });
  };

  const handleOnBlur = (e) => {
    if (onBlur) onBlur(e, id);
  };

  const handleOnFocus = (e) => {
    if (onFocus) onFocus(e, id);
  };

  return (
    <Select
      {...{ theme, size, color }}
      className={className}
      disabled={disabled}
      default={value}
      title={tooltip}
      onChange={handleOnChange}
      value={value}
      ref={ref}
      tabIndex={tabIndex}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
    >
      {!withoutEmpty && (
        <Option {...{ theme, size, color }} key={-1} value={-1}>
          ???
        </Option>
      )}
      {getItems()}
    </Select>
  );
});

CustomSelectList.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  withoutEmpty: PropTypes.bool,
  mapValueTo: PropTypes.string,
  mapNameTo: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "neutral",
    "gray",
  ]),
};

export default CustomSelectList;
