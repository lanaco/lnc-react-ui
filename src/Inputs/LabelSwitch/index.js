import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";
import { useTheme } from "@emotion/react";

var height = {
  standard: { small: "1.875rem", medium: "2.25rem", large: "2.625rem" },
  disabled: { small: "1.625rem", medium: "2rem", large: "2.375rem" },
};

const SwitchContainer = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[100]
      : props.theme.test_palette[props.color][400]};
  cursor: pointer;
  width: 100%;
  border-radius: ${(props) => height.standard[props.size]};
  box-sizing: border-box;
  outline: none;
  box-shadow: ${(props) =>
    props.focused && !props.disabled
      ? ` 0px 0px 0.5rem -0.125rem ${
          props.theme.test_palette[props.color][400]
        }`
      : "none;"};

  max-height: ${(props) => height.standard[props.size]};
  min-height: ${(props) => height.standard[props.size]};

  ${(props) =>
    props.disabled
      ? `border: 0.125rem solid ${props.theme.test_palette.light[500]};`
      : "border: none;"}
`;

const ItemLeft = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  max-height: ${(props) =>
    props.disabled ? height.disabled[props.size] : height.standard[props.size]};
  min-height: ${(props) =>
    props.disabled ? height.disabled[props.size] : height.standard[props.size]};
  transition: 0.25s all ease;
  padding: 0.5rem 1rem;

  color: ${(props) =>
    props.disabled && props.value
      ? props.theme.test_palette.light[500]
      : props.theme.test_palette.light[100]};

  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  border-radius: ${(props) =>
    props.value
      ? `${height.standard[props.size]} 0 0 ${height.standard[props.size]}`
      : height.standard[props.size]};

  background-color: ${(props) => {
    if (props.disabled && props.value)
      return props.theme.test_palette.light[100];
    if (props.disabled && !props.value)
      return props.theme.test_palette.light[500];

    if (!props.disabled && props.value)
      return props.theme.test_palette[props.color][400];
    if (!props.disabled && !props.value)
      return props.theme.test_palette[props.colorAlt][400];
  }};

  box-shadow: ${(props) =>
    props.disabled
      ? "none;"
      : `inset 0 0.125rem 0.5rem ${
          props.theme.test_palette[props.color][400]
        };`};
`;

const ItemRight = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  max-height: ${(props) =>
    props.disabled ? height.disabled[props.size] : height.standard[props.size]};
  min-height: ${(props) =>
    props.disabled ? height.disabled[props.size] : height.standard[props.size]};
  transition: 0.25s all ease;
  padding: 0.5rem 1rem;

  color: ${(props) => {
    var col = props.theme.test_palette.light;

    if (!props.disabled && props.value) return col[100];
    if (!props.disabled && !props.value) return col[100];

    if (props.disabled && props.value) return col[100];
    if (props.disabled && !props.value) return col[500];
  }};

  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  border-radius: ${(props) =>
    props.value
      ? height.standard[props.size]
      : `0 ${height.standard[props.size]} ${height.standard[props.size]} 0`};

  background-color: ${(props) => {
    if (props.disabled && props.value)
      return props.theme.test_palette.light[500];
    if (props.disabled && !props.value)
      return props.theme.test_palette.light[100];

    if (!props.disabled && props.value)
      return props.theme.test_palette[props.colorAlt][400];
    if (!props.disabled && !props.value)
      return props.theme.test_palette[props.color][400];
  }};

  box-shadow: ${(props) =>
    props.disabled
      ? "none;"
      : `inset 0 0.125rem 0.5rem ${
          props.theme.test_palette[props.color][400]
        };`};
`;

//================================================================================================

const LabelSwitch = (props) => {
  const {
    id,
    disabled,
    readOnly,
    value,
    labelWhenFalse,
    labelWhenTrue,
    itemWhenTrue,
    itemWhenFalse,
    //----------------
    onChange,
    onBlur,
    onFocus,
    //----------------
    className,
    style,
    size,
    color,
    colorAlt,
    ...rest
  } = props;

  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  let themeProps = {
    value,
    theme,
    size,
    color,
    colorAlt,
    focused,
    disabled,
    readOnly,
  };

  function handleChange(e) {
    if (disabled || readOnly) return;
    else onChange(e, !value, !value ? itemWhenTrue : itemWhenFalse);
  }

  return (
    <SwitchContainer
      tabIndex={1}
      {...themeProps}
      className={className}
      style={style}
      onClick={(e) => handleChange(e)}
      onFocus={(e) => {
        setFocused(true);
        if (onFocus) onFocus(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        if (onBlur) onBlur(e);
      }}
      {...rest}
    >
      <ItemLeft title={labelWhenFalse} {...themeProps}>
        {labelWhenFalse}
      </ItemLeft>
      <ItemRight title={labelWhenTrue} {...themeProps}>
        {labelWhenTrue}
      </ItemRight>
    </SwitchContainer>
  );
};

LabelSwitch.defaultProps = {
  id: "",
  disabled: false,
  onChange: () => {},
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
  //-------------
  value: false,
  labelWhenFalse: "",
  labelWhenTrue: "",
  itemWhenTrue: {},
  itemWhenFalse: {},
};

LabelSwitch.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  preventDefault: PropTypes.bool,
  //-------------
  value: PropTypes.bool,
  labelWhenFalse: PropTypes.string.isRequired,
  labelWhenTrue: PropTypes.string.isRequired,
  itemWhenTrue: PropTypes.object,
  itemWhenFalse: PropTypes.object,
  //-------------
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

export default LabelSwitch;
