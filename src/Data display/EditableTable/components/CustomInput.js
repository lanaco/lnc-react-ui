import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import debounce from "lodash.debounce";
import { useTheme } from "@emotion/react";

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.422375rem 0.375rem";
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const StyledTextInput = styled.input((props) => {
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    borderBottom: `0.125rem solid ${props.theme.palette[props.color].main}`,
    transition: "all 250ms",
    display: "inline-block",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "text",
    padding: paddingBySize(props.size),
    fontSize: props.theme.typography[props.size].fontSize,
    backgroundColor: props.theme.palette[props.color].lighter,
    color: props.theme.palette[props.color].textDark,
    borderRadius: "0.125rem",
    width: "100%",
    boxSizing: "border-box",
    minHeight: heightBySize(props.size),
    maxHeight: heightBySize(props.size),
    fontFamily: props.theme.typography.fontFamily,
    "&:disabled": {
      backgroundColor: props.theme.palette.gray[200],
      borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
    "&:focus": {
      backgroundColor: props.theme.palette.common.white,
      color: props.theme.palette.common.black,
    },
  };
});

//===================================================

const CustomInput = React.forwardRef((props, ref) => {
  const {
    color = "primary",
    id = "",
    disabled = false,
    preventDefault = false,
    className = "",
    size = "small",
    value = "",
    onChange = () => {},
    onKeyDown = () => {},
    onInput = () => {},
    onBlur = () => {},
    onFocus = () => {},
    tabIndex = -1,
  } = props;

  const theme = useTheme();

  // useEffect(() => {
  //   return () => {
  //     debouncedChangeHandler.cancel();
  //   };
  // }, []);

  const [text, setText] = useState("");

  useEffect(() => {
    if (text !== value) setText(value === null ? "" : value);
  }, [value]);

  // const changeHandler = (event) => {
  //   event.persist();
  //   onChange(event);
  // };

  // const debouncedChangeHandler = useMemo(
  //   () => debounce(changeHandler, 200),
  //   [props]
  // );

  // const handleOnChange = (e) => {
  //   // if (preventDefault) e.preventDefault();

  //   if (onChange) onChange(e);
  // };

  // const handleOnInput = (e) => {
  //   // if (preventDefault) e.preventDefault();
  //   if (onInput) onInput(e);
  // };

  const handleOnKeyDown = (e) => {
    // if (preventDefault) e.preventDefault();
    if (onKeyDown) onKeyDown(e);
  };

  const handleOnBlur = (e) => {
    // if (preventDefault) e.preventDefault();
    if (onBlur) onBlur(e);
  };

  const handleOnFocus = (e) => {
    // if (preventDefault) e.preventDefault();
    if (onFocus) onFocus(e);
  };

  const __onChange = (e) => {
    onChange(e, e.target.value, id);
  };

  const delayedQuery = useRef(debounce((q) => __onChange(q), 200)).current;
  const _onChange = (e) => {
    setText(e.target.value);
    delayedQuery(e);
  };

  return (
    <StyledTextInput
      tabIndex={tabIndex}
      {...{ theme, size, color }}
      onChange={_onChange}
      // onInput={handleOnInput}
      onKeyDown={handleOnKeyDown}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      className={className}
      disabled={disabled}
      value={text}
      type="text"
      ref={ref}
    />
  );
});

CustomInput.defaultProps = {
  id: "",
  disabled: false,
  onChange: () => {},
  onKeyDown: () => {},
  onInput: () => {},
  onBlur: () => {},
  onFocus: () => {},
  tabIndex: -1,
  className: "",
  preventDefault: false,
  size: "small",
  color: "primary",
  value: "",
};

CustomInput.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onInput: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  tabIndex: PropTypes.number,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
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

// export default CustomInput;

export default React.memo(CustomInput);

// import React from "react";
// import styled from "@emotion/styled";
// import theme from "../../_utils/theme";

// const StyledInput = styled.input`
//   box-sizing: border-box;
//   position: relative;
//   width: 100%;
//   appearance: none;
//   outline: none;
//   border: none;
//   padding: 9.5px 6px 9.5px 6px;
//   border-radius: 3px;
//   border: none;
//   border: ${(props) =>
//     props.focused
//       ? `1px solid ${theme.palette.primary.main}`
//       : "1px solid transparent"};
//   font-size: ${theme.typography["small"].fontSize};
//   font-family: ${theme.typography.fontFamily};
// `;

// const CustomInput = React.forwardRef((props, ref) => {
//   return (
//     <StyledInput
//       {...props}
//       onBlur={(e) => {
//         props.onBlur(e);
//       }}
//       onFocus={(e) => {
//         props.onFocus(e);
//       }}
//       ref={ref}
//       value={props.value}
//       onChange={(event) => {
//         if (props.onChange) props.onChange(event);
//       }}
//     />
//   );
// });

// export default CustomInput;
