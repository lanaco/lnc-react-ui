import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import "../Base/fontawesome/css/fontawesome.css";

//====================== STYLE ======================

const paddingBySize = (size, hasText) => {
  if (size === "small") return "0.3875rem 0.34375rem";
  if (size === "medium") return "0.45rem 0.415625rem";
  if (size === "large") return "0.4875rem 0.445rem";
};

const StyledButton = styled.button((props) => {
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    transition: "all 220ms",
    display: "inline-block",
    // flexDirection: "row",
    // justifyContent: "center",
    cursor: "pointer",
    padding: paddingBySize(props.size, props.hasText),
    fontSize: props.theme.typography[props.size].fontSize,
    fontFamily: props.theme.typography.fontFamily,
    backgroundColor: props.theme.palette[props.color].main,
    color: props.theme.palette[props.color].text,
    borderRadius: "2px",
    "&:hover": {
      backgroundColor: props.theme.palette[props.color].light,
    },
    "&:disabled": {
      backgroundColor: props.theme.palette.gray[200],
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
  };
});

const TextLeft = styled.span((props) => ({
  paddingRight: props.hasIcon ? "0.3125rem" : "0",
  fontSize: props.theme.typography[props.size].fontSize,
}));

const TextRight = styled.span((props) => ({
  paddingLeft: props.hasIcon ? "0.3125rem" : "0",
  fontSize: props.theme.typography[props.size].fontSize,
}));

const Icon = styled.i((props) => ({
  fontSize: props.theme.typography[props.size].fontSize,
}));

//===================================================

const Button = (props) => {
  const {
    theme,
    color,
    id,
    onClick,
    disabled,
    tooltip,
    preventDefault,
    className,
    icon,
    iconStyle,
    size,
    iconLocation,
    text,
  } = props;

  const handleOnClick = (e) => {
    if (preventDefault) e.preventDefault();
    onClick(id);
  };

  var title = "";
  if (tooltip && tooltip !== "") title = tooltip;

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  return (
    <StyledButton
      {...{ theme, size, color }}
      onClick={handleOnClick}
      className={className}
      disabled={disabled}
      title={title}
      hasText={icon && icon !== ""}
    >
      {/* Text when the icon is RIGTH */}
      {text && text !== "" && iconLocation === "right" ? (
        <TextLeft
          {...{
            theme,
            size,
            color,
            hasIcon: icon && icon !== "",
          }}
        >
          {text}
        </TextLeft>
      ) : (
        <></>
      )}

      {/* Icon */}
      {icon && icon !== "" ? (
        <Icon
          {...{
            theme,
            size,
            color,
          }}
          className={getIconClass()}
        />
      ) : (
        <></>
      )}

      {/* Text when the icon is LEFT */}
      {text && text !== "" && iconLocation === "left" ? (
        <TextRight
          {...{
            theme,
            size,
            color,
            hasIcon: icon && icon !== "",
          }}
        >
          {text}
        </TextRight>
      ) : (
        <></>
      )}
    </StyledButton>
  );
};

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
  theme: theme,
};

Button.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  iconStyle: PropTypes.oneOf(["solid", "regular"]),
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
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
  ]),
};

export default Button;
