import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import "../../Base/fontawesome/css/fontawesome.css";
import { isEmpty } from "lodash";

const standardCssFields = ({ theme, size }) => {

  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
    min-height: ${theme.typography[size].buttonSize};
    max-height: ${theme.typography[size].buttonSize};
    min-width: ${theme.typography[size].buttonSize};
    max-width: ${theme.typography[size].buttonSize};
    width: fit-content;
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

  background-color: ${(props) =>
    props.outline
      ? props.theme.test_palette.light[100]
      : props.theme.test_palette[props.color][400]};
  color: ${(props) =>
    props.outline
      ? props.theme.test_palette[props.color][400]
      : props.theme.test_palette.light[100]};
  border-radius: 50%;

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

const IconButton = React.forwardRef((props, ref) => {
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

IconButton.defaultProps = {
  id: "",
  disabled: false,
  outline: false,
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

IconButton.propTypes = {
  id: PropTypes.any,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  tooltip: PropTypes.string,
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
    "danger",
    "warning",
    "disabled",
    "white",
    "info",
  ]),
};

export default IconButton;
