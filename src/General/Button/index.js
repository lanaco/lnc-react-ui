import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import "../../Base/fontawesome/css/fontawesome.css";
import { isEmpty } from "lodash";

const padding = {
  default: {
    small: "0.5rem 0.875rem",
    medium: "0.59375rem 0.96875rem",
    large: "0.671875rem 1.15625rem",
  },
  outline: {
    small: "0.40625rem 0.78125rem",
    medium: "0.5rem 0.875rem",
    large: "0.578125rem 1.0625rem",
  },
  outlineHover: {
    small: "0.34375rem 0.71875rem",
    medium: "0.4375rem 0.8125rem",
    large: "0.515625rem 1rem",
  },
};

const standardCssFields = ({ theme, size }) => {
  var height = { small: "1.875rem", medium: "2.25rem", large: "2.625rem" }[
    size
  ];

  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
    min-height: ${height};
    max-height: ${height};
    width: 100%;
    box-sizing: border-box;
    appearance: none;
    outline: none;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `;
};

const StyledBtn = styled.button`
  ${(props) => standardCssFields(props)}

  padding: ${(props) =>
    props.outline ? padding.outline[props.size] : padding.default[props.size]};

  background-color: ${(props) =>
    props.outline
      ? props.theme.test_palette.light[100]
      : props.theme.test_palette[props.color][400]};
  color: ${(props) =>
    props.outline
      ? props.theme.test_palette[props.color][400]
      : props.theme.test_palette.light[100]};
  border-radius: 0.5625rem;

  border: ${(props) =>
    props.outline
      ? `0.09375rem solid ${props.theme.test_palette[props.color][300]};`
      : "none;"}

  &:hover:enabled {
    background-color: ${(props) => {
      if (props.outline) return props.theme.test_palette.light[100];
      return props.theme.test_palette[props.color][200];
    }};

    color: ${(props) => {
      if (props.outline) return props.theme.test_palette[props.color][400];
      return props.theme.test_palette.light[100];
    }};

    border: ${(props) => {
      if (props.outline)
        return `0.15625rem solid ${props.theme.test_palette[props.color][400]}`;
      return "none";
    }};

    padding: ${(props) => {
      if (props.outline) return padding.outlineHover[props.size];

      return padding.default[props.size];
    }}
  }

  &:focus:enabled {
    color: ${(props) => props.theme.test_palette.light[100]};
    background-color: ${(props) =>
      props.outline
        ? props.theme.test_palette[props.color][400]
        : props.theme.test_palette[props.color][500]};
  }

  &:disabled {
    cursor: default;
    background-color: ${(props) => props.theme.test_palette.light[500]};
    color: ${(props) => props.theme.test_palette.light[100]};
    border: ${(props) =>
      props.outline
        ? `0.125rem solid ${props.theme.test_palette.light[500]}`
        : "none"};
  }
`;

const Text = styled.span``;

const Icon = styled.i`
  ${(props) =>
    props.location === "left" && props.hasText
      ? "padding-right: 0.3125rem;"
      : ""}
  ${(props) =>
    props.location === "right" && props.hasText
      ? "padding-left: 0.3125rem;"
      : ""}
`;

//===================================================

const Button = React.forwardRef((props, ref) => {
  //
  const {
    color,
    id,
    onClick,
    disabled,
    tooltip,
    className,
    icon,
    iconStyle,
    size,
    iconLocation,
    text,
    outline,
    ...rest
  } = props;

  const theme = useTheme();

  const handleOnClick = (e) => {
    onClick(e, id);
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
  };

  var title = "";
  if (tooltip && tooltip !== "") title = tooltip;

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  var themeProps = { theme, size, color, outline, disabled };

  return (
    <StyledBtn
      {...themeProps}
      data-testid="button"
      onClick={handleOnClick}
      className={className}
      disabled={disabled}
      title={title}
      hasText={!isEmpty(text)}
      ref={ref}
      {...rest}
    >
      {!isEmpty(iconLocation) && !isEmpty(icon) && iconLocation === "left" && (
        <Icon
          {...themeProps}
          className={getIconClass()}
          hasText={!isEmpty(text)}
          location={"left"}
        />
      )}

      {!isEmpty(text) && <Text {...themeProps}>{text}</Text>}

      {!isEmpty(iconLocation) && !isEmpty(icon) && iconLocation === "right" && (
        <Icon
          {...themeProps}
          className={getIconClass()}
          hasText={!isEmpty(text)}
          location={"right"}
        />
      )}
    </StyledBtn>
  );
});

Button.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  outline: false,
  text: "",
  tooltip: "",
  icon: "",
  iconStyle: "solid",
  iconLocation: "right",
  //-------------
  onClick: () => {},
  //-------------
  style: {},
  className: "",
  size: "small",
  color: "primary",
};

Button.propTypes = {
  id: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  outline: PropTypes.bool,
  tooltip: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconStyle: PropTypes.oneOf(["regular", "solid"]),
  iconLocation: PropTypes.oneOf(["right", "left"]),
  //-------------
  onClick: PropTypes.func,
  //-------------
  style: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
  ]),
};

export default Button;
