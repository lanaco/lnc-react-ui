import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import "../../Base/fontawesome/css/fontawesome.css";
import { isEmpty } from "lodash";

//====================== STYLE ======================

const paddingBySize = (size, hasText) => {
  return {
    small: `0.41875rem ${hasText ? "0.8rem" : "0.6rem"}`,
    medium: `0.48125rem ${hasText ? "0.9rem" : "0.7rem"}`,
    large: `0.65625rem ${hasText ? "1rem" : "0.8rem"}`,
  }[size];
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
    appearance: none;
    outline: none;
    border: none;
    display: inline-block;
    cursor: pointer;
    padding: ${(props) => paddingBySize(props.size)};
  `;
};

const StyledBtn = styled.button`
  ${(props) => standardCssFields(props)}

  background-color: ${(props) =>
    props.outline
      ? props.theme.test_palette.light[100]
      : props.theme.test_palette[props.color][400]};
  color: ${(props) =>
    props.outline
      ? props.theme.test_palette[props.color][400]
      : props.theme.test_palette.light[100]};
  border-radius: 0.625rem;

  ${(props) =>
    props.outline
      ? `border: 2px solid ${props.theme.test_palette[props.color][300]};`
      : ""}

  &:hover:enabled {
    ${(props) =>
      !props.outline
        ? `background-color: ${props.theme.test_palette[props.color][300]};`
        : ""}

    ${(props) =>
      props.outline
        ? `color: ${props.theme.test_palette[props.color][400]};`
        : ""}
  }

  &:focus:enabled {
    ${(props) =>
      !props.outline
        ? `background-color: ${props.theme.test_palette[props.color][200]};`
        : ""}
  }

  &:disabled {
    ${(props) =>
      !props.outline
        ? `background-color: ${props.theme.test_palette.light[400]};`
        : ""}
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
    ${(props) => (!props.hasText ? "padding: 0px" : "")}
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
  tooltip: "",
  onClick: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  icon: "",
  iconStyle: "solid",
  iconLocation: "left",
  text: "",
  color: "primary",
  outline: false,
};

Button.propTypes = {
  // theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  outline: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  iconStyle: PropTypes.oneOf(["solid", "regular"]),
  iconLocation: PropTypes.oneOf(["left", "right"]),
  text: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "background",
    "transparent",
  ]),
};

export default Button;
