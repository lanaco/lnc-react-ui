import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
} from "../../_utils/utils";
import { useUpdateEffect } from "react-use";

const getHeight = (size) => {
  if (size == "small") return "3.125rem";
  if (size == "medium") return "3.375rem";

  return "3.625rem";
};

const Tab = styled.div`
  box-sizing: border-box;
  ${(props) => props.disabled === true && getDisabledStateCss(props.theme)};
  min-width: 5.25rem;
  ${(props) => props.fullWidth && "width: 100%"};
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${(props) => getHeight(props.size)};
  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      getTypeName(props.type),
      props.size,
      "enabled"
    )};
  ${(props) => !props.disabled === true && "cursor: pointer"};
  color: ${(props) =>
    !props.disabled === true &&
    getColorRgbaValue(
      props.theme,
      getTypeName(props.type),
      props.color,
      props.active ? "active" : "enabled",
      "text"
    )};
  background-color: ${(props) =>
    props.type == "regular" ||
    (props.type == "pill" && (props.disabled == true || props.active == false))
      ? "transparent"
      : !props.disabled === true &&
        getColorRgbaValue(
          props.theme,
          getTypeName(props.type),
          props.color,
          props.active ? "active" : "enabled",
          "background",
          "backgroundOpacity"
        )};
  ${(props) =>
    props.type == "underline" &&
    props.last == false &&
    "border-right: 1px solid " +
      getColorRgbaValue(
        props.theme,
        getTypeName(props.type),
        props.color,
        "enabled",
        "line"
      )};
  ${(props) =>
    getBottomLine(
      props.theme,
      props.type,
      props.active,
      props.disabled,
      props.color,
      "enabled"
    )};
  ${(props) =>
    getBorderRadius(props.theme, props.type, props.first, props.last)};
  &:hover {
    color: ${(props) =>
      !props.disabled === true &&
      getColorRgbaValue(
        props.theme,
        getTypeName(props.type),
        props.color,
        "hover",
        "text"
      )};
    background-color: ${(props) =>
      props.type == "regular"
        ? "transparent"
        : !props.disabled === true &&
          getColorRgbaValue(
            props.theme,
            getTypeName(props.type),
            props.color,
            "hover",
            "background",
            "backgroundOpacity"
          )};
    ${(props) =>
      getBottomLine(
        props.theme,
        props.type,
        props.active,
        props.disabled,
        props.color,
        "hover"
      )};
  }
  &:active {
    background: ${(props) =>
      getColorRgbaValue(
        props.theme,
        getTypeName(props.type),
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )};
  }
`;

const getTypeName = (type) => {
  if (type == "underline") {
    return "TabUnderline";
  } else if (type == "pill") {
    return "TabPill";
  }
  return "TabRegular";
};

const getBorderRadius = (theme, type, first, last) => {
  if (type == "pill")
    return `border-radius: ${getBorderRadiusValueWithUnits(theme, "regular")}`;
  else if (type == "underline" && first)
    return `border-radius: ${getBorderRadiusValueWithUnits(
      theme,
      "regular"
    )} 0  0 ${getBorderRadiusValueWithUnits(theme, "regular")}`;
  else if (type == "underline" && last)
    return `border-radius: 0 ${getBorderRadiusValueWithUnits(
      theme,
      "regular"
    )} ${getBorderRadiusValueWithUnits(theme, "regular")} 0`;
};

const getBottomLine = (theme, type, active, disabled, color, state) => {
  if (type == "pill") return;

  return `border-bottom: ${
    !disabled && (active || state == "hover")
      ? theme.components[type === "regular" ? "TabRegular" : "TabUnderline"]
          .default.enabled.lineHeight + ""
      : theme.components[type === "regular" ? "TabRegular" : "TabUnderline"]
          .default.hover.lineHeight + ""
  } solid ${getColorRgbaValue(
    theme,
    getTypeName(type),
    color,
    active && !disabled ? "active" : disabled ? "enabled" : state,
    "line"
  )}`;
};

const TabItem = React.forwardRef((props, ref) => {
  const {
    type = "underline",
    disabled,
    first = false,
    last = false,
    fullWidth = false,
    active = false,
    activeIndex,
    index,
    //----------------
    onFocus = () => {},
    onBlur = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    itemClick = () => {},
    //----------------
    size = "small",
    color = "primary",
    className = "",
    style = {},
    children,
    ...rest
  } = props;
  const theme = useTheme();
  const [isActive, setIsActive] = useState(active);

  const themeProps = {
    theme,
    color,
    size,
    style,
    className: "lnc-ui-tabitem " + className,
  };

  const handleClick = (e) => {
    if (itemClick && !disabled) itemClick(index);
    if (onClick && !disabled) onClick(e);
  };

  useUpdateEffect(() => {
    setIsActive(active);
  }, [active]);

  useUpdateEffect(() => {
    setIsActive(activeIndex == index);
  }, [activeIndex]);

  return (
    <Tab
      ref={ref}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      type={type}
      first={first}
      last={last}
      fullWidth={fullWidth}
      active={isActive}
      {...themeProps}
      {...rest}
    >
      {children}
    </Tab>
  );
});

//====================================== PROP TYPES / DEFAULT PROPS ====================================

// TabItem.defaultProps = {
//   type: "underline",
//   first: false,
//   last: false,
//   fullWidth: false,
//   active: false,
//   //---------------------------------------------------------------
//   onClick: () => {},
//   onBlur: () => {},
//   onKeyDown: () => {},
//   onFocus: () => {},
//   //---------------------------------------------------------------
//   style: {},
//   className: "",
//   size: "small",
//   color: "primary",
// };

TabItem.propTypes = {
  type: PropTypes.oneOf(["regular", "pill", "underline"]),
  /**
   * Is it first Tab Item in Tab Wrapper
   * }
   */
  first: PropTypes.bool,
  /**
   * Is it last Tab Item in Tab Wrapper
   * }
   */
  last: PropTypes.bool,
  fullWidth: PropTypes.bool,
  active: PropTypes.bool,
  //---------------------------------------------------------------
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
    "gray",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default TabItem;
