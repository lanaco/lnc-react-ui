import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import "../Base/fontawesome/css/fontawesome.css";

//====================== STYLE ======================

const paddingBySize = (size) => {
  if (size === "small") return "0.3875rem 0.34375rem";
  if (size === "medium") return "0.45rem 0.415625rem";
  if (size === "large") return "0.4875rem 0.445rem";
};

const heightBySize = (size) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const StyledButton = styled.button((props) => {
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    transition: "all 220ms",
    display: "inline-block",
    cursor: "pointer",
    padding: paddingBySize(props.size, props.hasText),
    fontSize: props.theme.typography[props.size].fontSize,
    fontFamily: props.theme.typography.fontFamily,

    backgroundColor: props.inverted
      ? "transparent"
      : props.theme.palette[props.color].main,

    borderRadius: "2px",
    minHeight: heightBySize(props.size),
    maxHeight: heightBySize(props.size),
    "&:hover": {
      backgroundColor: props.inverted
        ? "whitesmoke"
        : props.theme.palette[props.color].light,
    },
    "&:disabled": {
      backgroundColor: props.inverted
        ? "transparent"
        : props.theme.palette.gray[200],
      color: props.theme.palette.gray.textDark,
      opacity: 0.7,
      cursor: "default",
    },
  };
});

const TextLeft = styled.span((props) => {
  let opacity = 1;
  let color = props.inverted
    ? props.theme.palette[props.color].textDark
    : props.theme.palette[props.color].text;

  if (props.disabled) {
    color = props.inverted
      ? props.theme.palette[props.color].textDark
      : props.theme.palette[props.color].textDark;

    opacity = 0.6;
  }

  return {
    padding: "0",
    margin: "0",
    paddingRight: props.hasIcon ? "0.3125rem" : "0",
    fontSize: props.theme.typography[props.size].fontSize,
    color: color,
    opacity: opacity,
  };
});

const TextRight = styled.span((props) => {
  let opacity = 1;
  let color = props.inverted
    ? props.theme.palette[props.color].textDark
    : props.theme.palette[props.color].text;

  if (props.disabled) {
    color = props.inverted
      ? props.theme.palette[props.color].textDark
      : props.theme.palette[props.color].textDark;

    opacity = 0.6;
  }

  return {
    padding: "0",
    margin: "0",
    paddingLeft: props.hasIcon ? "0.3125rem" : "0",
    fontSize: props.theme.typography[props.size].fontSize,
    color: color,
    opacity: opacity,
  };
});

const Icon = styled.i((props) => {
  let opacity = 1;
  let color = props.inverted
    ? props.theme.palette[props.color].main
    : props.theme.palette[props.color].text;

  if (props.disabled) {
    color = props.inverted
      ? props.theme.palette[props.color].textDark
      : props.theme.palette[props.color].textDark;

    opacity = 0.6;
  }

  return {
    fontSize: props.theme.typography[props.size].fontSize,
    color: color,
    opacity: opacity,
  };
});

//===================================================

const Button = React.forwardRef((props, ref) => {
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
    inverted,
  } = props;

  const handleOnClick = (e) => {
    if (preventDefault) e.preventDefault();
    onClick(id);
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  };

  var title = "";
  if (tooltip && tooltip !== "") title = tooltip;

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  return (
    <StyledButton
      {...{ theme, size, color, inverted, disabled }}
      onClick={handleOnClick}
      className={className}
      disabled={disabled}
      title={title}
      hasText={icon && icon !== ""}
      ref={ref}
    >
      {/* Text when the icon is RIGTH */}
      {text && text !== "" && iconLocation === "right" && (
        <TextLeft
          {...{
            theme,
            size,
            color,
            inverted,
            disabled,
            hasIcon: icon && icon !== "",
          }}
        >
          {text}
        </TextLeft>
      )}

      {/* Icon */}
      {icon && icon !== "" && (
        <Icon
          {...{
            theme,
            size,
            color,
            inverted,
            disabled,
          }}
          className={getIconClass()}
        />
      )}

      {/* Text when the icon is LEFT */}
      {text && text !== "" && iconLocation === "left" && (
        <TextRight
          {...{
            theme,
            size,
            color,
            inverted,
            disabled,
            hasIcon: icon && icon !== "",
          }}
        >
          {text}
        </TextRight>
      )}
    </StyledButton>
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
  theme: theme,
  inverted: false,
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
  inverted: PropTypes.bool,
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
    "transparent",
  ]),
};

export default Button;
