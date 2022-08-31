import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Icon from "../../General/Icon";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
} from "../../_utils/utils";

const Item = styled.div`
  box-sizing: border-box;
  cursor: ${props => props.disabled == false ? 'pointer' : 'context-menu'};
  width: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  min-height: 2.25rem;
  gap: 0.563rem;
  padding: 0.563rem;
  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "DropDownMenuItem",
      props.size,
      "enabled"
    )};
  & .drop-down-icon-lnc {
    color: ${(props) =>
      (props.isActive && props.disabled == false)
        ? getColorRgbaValue(
            props.theme,
            "DropDownMenuItem",
            props.color,
            "focus",
            "icon"
          )
        : getColorRgbaValue(
            props.theme,
            "DropDownMenuItem",
            props.color,
            "enabled",
            "icon"
          )};

    ${(props) => props.disabled && getDisabledStateCss(props.theme)};
  }
  & .sub-menu-icon-lnc {
    margin-left: auto;
  }

  ${(props) =>
    props.isActive == true &&
    props.disabled == false &&
    `background-color: ${getColorRgbaValue(
      props.theme,
      "DropDownMenuItem",
      props.color,
      "focus",
      "backgoround"
    )};
    color: ${getColorRgbaValue(
      props.theme,
      "DropDownMenuItem",
      props.color,
      "focus",
      "text"
    )};
  `}
    outline: none;
    
    ${(props) => props.disabled && getDisabledStateCss(props.theme)};
`;

const DropdownItem = React.forwardRef((props, ref) => {
  const {
    active,
    icon,
    disabled,
    isNested,
    showNested,
    //----------------
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    toggleNested,
    onItemSelected,
    //----------------
    className,
    style,
    color,
    iconProps,
    __TYPE__,
    children,
    ...rest
  } = props;
  const theme = useTheme();
  const themeProps = { theme, color, style };
  const itemRef = useRef();

  const [isActive, setIsActive] = useState(active);
  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const handleOnClick = (e) => {
    if(disabled == false){
      if (isNested && toggleNested) {
        toggleNested();
      }
      
      onItemSelected(e, children)
    };
    onClick(onClick);
  };
  const handleOnFocus = (e) => {
    setIsActive(true);
    onFocus(e);
  };
  const handleOnBlur = (e) => {
    setIsActive(false);
    onBlur(e);
  };
  const handleOnKeyDown = (e) => {
    e.preventDefault(); //prevents scroll

    if (e.key == "ArrowDown") {
      focusNextItem(ref ? ref.current : itemRef.current);
    } else if (e.key == "ArrowUp") {
      focusPreviousItem(ref ? ref.current : itemRef.current);
    } else if (e.key == "Enter") {
      if(disabled == false) {
        if (isNested && toggleNested) {
          toggleNested();
        }

        onItemSelected(e, children);
      };
    }

    onKeyDown(e);
  };

  const focusNextItem = (currentItem) => {
    if (currentItem) nextByClass(currentItem, "drop-down-item-lnc")?.focus();
  };

  const focusPreviousItem = (currentItem) => {
    if (currentItem)
      previousByClass(currentItem, "drop-down-item-lnc")?.focus();
  };

  const nextByClass = (node, cls) => {
    while ((node = node.nextSibling)) {
      if (hasClass(node, cls)) {
        return node;
      }
    }
    return null;
  };

  const previousByClass = (node, cls) => {
    while ((node = node.previousSibling)) {
      if (hasClass(node, cls)) {
        return node;
      }
    }
    return null;
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
        className={`drop-down-item-lnc ` + className}
        {...themeProps}
        disabled={disabled}
        tabIndex={0}
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onClick={handleOnClick}
        isActive={isActive}
        {...rest}
      >
        {icon && (
          <Icon icon={icon} className="drop-down-icon-lnc" {...iconProps} />
        )}
        <div>{children}</div>
        {isNested && (
          <Icon
            icon={showNested ? "angle-up" : "angle-down"}
            className="sub-menu-icon-lnc"
          />
        )}
      </Item>
    </>
  );
});

DropdownItem.defaultProps = {
  active: false,
  disabled: false,
  isNested: false,
  //-------------------------
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onItemSelected: () => {},
  //-------------------------
  style: {},
  className: "",
  color: "primary",
  size: "small",
  __TYPE__: "TAB_ITEM",
};

DropdownItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  isNested: PropTypes.bool,
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
    "neutral"
  ]),
  iconProps: PropTypes.any,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  __TYPE__: PropTypes.string,
};

export default DropdownItem;
