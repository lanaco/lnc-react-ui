/* eslint-disable react/display-name */
import { forwardRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Icon from "../../General/Icon/Icon";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
} from "../../_utils/utils";

const Item = styled.div`
  box-sizing: border-box;
  cursor: ${(props) => (props.disabled == false ? "pointer" : "context-menu")};
  width: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  min-height: 2.25rem;
  gap: 0.563rem;
  padding: 0.563rem;
  color: ${(props) =>
    getColorRgbaValue(props.theme, "MenuItem", props.color, "enabled", "text")};
  ${(props) =>
    getComponentTypographyCss(props.theme, "MenuItem", props.size, "enabled")};
  & .menu-icon-lnc {
    color: ${(props) =>
      props.isActive && props.disabled == false
        ? getColorRgbaValue(
            props.theme,
            "MenuItem",
            props.color,
            "focus",
            "icon"
          )
        : getColorRgbaValue(
            props.theme,
            "MenuItem",
            props.color,
            "enabled",
            "icon"
          )};

    ${(props) => props.disabled === true && getDisabledStateCss(props.theme)};
    background: transparent;
  }
  & .sub-menu-icon-lnc {
    margin-left: auto;
    transform: ${(props) =>
      props.showNested ? "rotate(180deg)" : "rotate(0)"};
    transition: transform 0.25s ease;
  }

  ${(props) =>
    props.isActive == true &&
    props.disabled == false &&
    `background-color: ${getColorRgbaValue(
      props.theme,
      "MenuItem",
      props.color,
      "focus",
      "background",
      "backgroundOpacity"
    )};
    color: ${getColorRgbaValue(
      props.theme,
      "MenuItem",
      props.color,
      "focus",
      "text"
    )};
  `}
  outline: none;

  ${(props) => props.disabled === true && getDisabledStateCss(props.theme)};
  &:hover {
    ${(props) =>
      props.disabled == false &&
      `background-color: ${getColorRgbaValue(
        props.theme,
        "MenuItem",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
      color: ${getColorRgbaValue(
        props.theme,
        "MenuItem",
        props.color,
        "hover",
        "text"
      )};
      `}
  }
`;

const MenuItem = forwardRef((props, ref) => {
  const {
    value,
    active = null,
    icon,
    disabled = false,
    isNested = false,
    showNested,
    justifyToEnd = false,
    //----------------
    onFocus = () => {},
    onBlur = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    toggleNested = () => {},
    onItemSelected = () => {},
    //----------------
    className = "",
    style = {},
    color = "primary",
    size = "small",
    iconProps,
    __TYPE__ = "MENU_ITEM",
    children,
    ...rest
  } = props;
  const theme = useTheme();
  const themeProps = { theme, color, style, size };
  const itemRef = useRef();

  const [isActive, setIsActive] = useState(active == null ? false : active);
  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const handleOnClick = (e) => {
    if (disabled == false) {
      if (isNested && toggleNested) {
        toggleNested();
      }

      onItemSelected(e, value);
    }
    onClick(onClick);
  };
  const handleOnFocus = (e) => {
    setIsActive(true);
    onFocus(e);
  };
  const handleOnBlur = (e) => {
    // TODO :
    if (active == null) setIsActive(false);
    onBlur(e);
  };
  const handleOnKeyDown = (e) => {
    e.preventDefault(); // prevents scroll

    if (e.key == "ArrowDown") {
      focusNextItem(ref ? ref.current : itemRef.current);
    } else if (e.key == "ArrowUp") {
      focusPreviousItem(ref ? ref.current : itemRef.current);
    } else if (e.key == "Enter" || e.keyCode == 32) {
      if (disabled == false) {
        if (isNested && toggleNested) {
          toggleNested();
        }
        onItemSelected(e, value);
      }
    }

    onKeyDown(e);
  };

  const focusNextItem = (currentItem) => {
    if (currentItem?.nextSibling) {
      let next = findNextItem(currentItem);
      if (next?.node && next?.type == "item") {
        next.node.focus();
      } else if (next?.node && next?.type == "nested") {
        //next is nested container, find first child item in nested container to focus
        let firstChildItem = findFirstChildItem(next.node);
        if (firstChildItem) firstChildItem.focus();
      } else if (
        currentItem?.parentElement &&
        hasClass(currentItem.parentElement, "nested-item-lnc")
      ) {
        focusNextItem(currentItem.parentElement);
      }
    }
    //if item is in nested container
    else if (
      currentItem?.parentElement &&
      hasClass(currentItem.parentElement, "nested-item-lnc")
    ) {
      //item is in nested contaiener, focus next item
      focusNextItem(currentItem.parentElement);
    }
  };

  const focusPreviousItem = (currentItem) => {
    if (currentItem?.previousSibling) {
      let previous = findPrevItem(currentItem);
      if (previous?.node && previous?.type == "item") {
        previous.node.focus();
      } else if (previous?.node && previous?.type == "nested") {
        //previous is nested container, find last child item in nested container to focus
        let lastChildItem = findLastChildItem(previous.node);
        if (lastChildItem) lastChildItem.focus();
      } else if (
        currentItem?.parentElement &&
        hasClass(currentItem.parentElement, "nested-item-lnc")
      ) {
        focusPreviousItem(currentItem.parentElement);
      }
    }
    //if item is in nested container
    else if (
      currentItem?.parentElement &&
      hasClass(currentItem.parentElement, "nested-item-lnc")
    ) {
      //item is in nested contaiener, focus previous item
      focusPreviousItem(currentItem.parentElement);
    }
  };

  const findNextItem = (node) => {
    while ((node = node.nextSibling)) {
      if (hasClass(node, "menu-item-lnc")) {
        return { node: node, type: "item" };
      } else if (hasClass(node, "nested-item-lnc")) {
        return { node: node, type: "nested" };
      }
    }
    return null;
  };

  const findPrevItem = (node) => {
    while ((node = node.previousSibling)) {
      if (hasClass(node, "menu-item-lnc")) {
        return { node: node, type: "item" };
      } else if (hasClass(node, "nested-item-lnc")) {
        return { node: node, type: "nested" };
      }
    }
    return null;
  };

  const findFirstChildItem = (node) => {
    return Array.from(node.querySelectorAll(".menu-item-lnc"))?.[0];
  };

  const findLastChildItem = (node) => {
    return Array.from(node.querySelectorAll(".menu-item-lnc"))?.pop();
  };

  const hasClass = (elem, cls) => {
    var str = " " + elem.className + " ";
    var testCls = " " + cls + " ";
    return str.indexOf(testCls) != -1;
  };

  return (
    <>
      <Item
        ref={ref ? ref : itemRef}
        className={
          `menu-item-lnc ` +
          (isNested ? "nested-menu-item-lnc " : "") +
          (showNested ? "spread-nested-item-lnc " : "") +
          className
        }
        {...themeProps}
        disabled={disabled}
        tabIndex={0}
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onClick={handleOnClick}
        isActive={isActive}
        showNested={showNested}
        {...rest}
      >
        {icon && <Icon icon={icon} className="menu-icon-lnc" {...iconProps} />}
        <div>{children}</div>
        {isNested && <Icon icon={"angle-down"} className="sub-menu-icon-lnc" />}
      </Item>
    </>
  );
});

// TODO : type
// MenuItem.defaultProps = {
//   active: null,
//   disabled: false,
//   isNested: false,
//   justifyToEnd: false,
//   //-------------------------
//   onBlur: () => {},
//   onFocus: () => {},
//   onClick: () => {},
//   onKeyDown: () => {},
//   onMouseEnter: () => {},
//   onMouseLeave: () => {},
//   onItemSelected: () => {},
//   //-------------------------
//   style: {},
//   className: "",
//   size: "small",
//   __TYPE__: "MENU_ITEM",
// };

MenuItem.propTypes = {
  value: PropTypes.any,
  active: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  isNested: PropTypes.bool,
  justifyToEnd: PropTypes.bool,
  //---------------------------------------------------------------
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
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
  iconProps: PropTypes.any,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  __TYPE__: PropTypes.string,
};

export default MenuItem;

MenuItem.displayName = "MENU_ITEM";
