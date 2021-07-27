import React from "react";
import baseStyles from "../Base/styles.module.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

//====================== STYLE ======================

const paddingBySize = (size) => {
  if (size === "small") return "6.2px 6.2px";
  if (size === "medium") return "8px 8px";
  if (size === "large") return "10px 10px";
};

const Button = styled.button((props) => {
  console.log("aaa", props);
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    transition: "all 220ms",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "pointer",
    padding: paddingBySize(props.size),
    fontSize: props.theme.typography[props.size].fontSize,
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
  paddingRight: props.hasIcon ? "5px" : "0",
  fontSize: props.theme.typography[props.size].fontSize,
}));

const TextRight = styled.span((props) => ({
  paddingLeft: props.hasIcon ? "5px" : "0",
  fontSize: props.theme.typography[props.size].fontSize,
}));

const Icon = styled.i((props) => ({
  fontSize: props.theme.typography[props.size].iconFontSize,
}));

//===================================================

const TextIconButton = (props) => {
  const {
    theme,
    color,
    id,
    onClick,
    disabled,
    tooltipText,
    preventDefault,
    className,
    iconClassName,
    size,
    iconLocation,
    text,
  } = props;

  const handleOnClick = (e) => {
    if (preventDefault) e.preventDefault();
    onClick(id);
  };

  let _iconClassName,
    title = "";

  if (tooltipText && tooltipText !== "") title = tooltipText;

  if (iconClassName && iconClassName !== "") {
    _iconClassName = iconClassName.replaceAll("-", "_");
  }

  return (
    <Button
      {...{ theme, size, color }}
      onClick={handleOnClick}
      className={className}
      disabled={disabled}
      title={title}
    >
      {/* Text when the icon is RIGTH */}
      {text && text !== "" && iconLocation === "right" ? (
        <TextLeft
          {...{
            theme,
            size,
            color,
            hasIcon: iconClassName && iconClassName !== "",
          }}
        >
          {text}
        </TextLeft>
      ) : (
        <></>
      )}

      {/* Icon */}
      <Icon
        {...{
          theme,
          size,
          color,
        }}
        className={[baseStyles["lnc"], baseStyles[_iconClassName]].join(" ")}
      />

      {/* Text when the icon is LEFT */}
      {text && text !== "" && iconLocation === "left" ? (
        <TextRight
          {...{
            theme,
            size,
            color,
            hasIcon: iconClassName && iconClassName !== "",
          }}
        >
          {text}
        </TextRight>
      ) : (
        <></>
      )}
    </Button>
  );
};

TextIconButton.defaultProps = {
  id: "",
  disabled: false,
  tooltipText: "",
  onClick: () => {},
  iconClassName: "",
  className: "",
  preventDefault: true,
  size: "small",
  iconLocation: "left",
  text: "",
  color: "primary",
};

TextIconButton.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
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
  ]),
};

export default TextIconButton;
