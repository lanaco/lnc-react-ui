import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from "../../General/Button";
import Popover from "../Popover";
import { getColorRgbaValue } from "../../_utils/utils";
import { useTheme } from "../../ThemeProvider";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const StyledDropDown = styled.div``;

const PopoverContent = styled(motion.div)`
  padding: 0.25rem;
  gap: 0.25rem;
  display: flex;
  flex-direction: column;
  ${(props) => props.widthFitContent == false && "min-width: 12.5rem"};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Dropdown",
      props.color,
      "enabled",
      "background"
    )};
`;

const DropdownMenu = React.forwardRef((props, ref) => {
  const {
    control,
    openOnClick,
    openOnHover,
    offset,
    verticalAlignment,
    horizontalAlignment,
    widthFitContent,
    closeOnItemSelect,
    //----------------
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onItemSelected,
    //----------------
    animation,
    className,
    style,
    color,
    size,
    popoverProps,
    children,
    ...rest
  } = props;

  const popoverRef = useRef();
  const menuContentRef = useRef();
  const { theme } = useTheme();

  const controlRef = useRef();
  const firstItemRef = useRef();

  const handleOnItemSelected = (e, value, children) => {
    onItemSelected(e, value, children);
    if (closeOnItemSelect == true) popoverRef?.current?.close();
  };

  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (
        child.props.__TYPE__ == "MENU_ITEM" ||
        child.props.__TYPE__ == "NESTED_ITEM"
      ) {
        if (index == 0) {
          if (child.props.ref) firstItemRef.current = ref;
          return React.cloneElement(child, {
            ref: ref ? ref : firstItemRef, //needed to focus on navigation
            color: color,
            size: size,
            onItemSelected: handleOnItemSelected,
            animation: animation
          });
        }
        return React.cloneElement(child, {
          color: color,
          size: size,
          onItemSelected: handleOnItemSelected,
        });
      }
    }

    return child;
  });

  const clonedControl = () => {
    if (typeof control === "string" || control instanceof String) {
      return (
        <Button
          text={control}
          onClick={handleOnClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={controlRef}
          onKeyDown={handleOnControlKeyDown}
          trailingIcon="angle-down"
          color={color}
          size={size}
          data-control={true} //Used for when click on outside of menu to ignore control click (control is outside)
        />
      );
    } else {
      return React.cloneElement(control, {
        color: color,
        size: size,
        ref: controlRef,
        onClick: handleOnClick,
        onMouseEnter: handleOnMouseEnter,
        onMouseLeave: handleOnMouseLeave,
        onBlur: onBlur,
        onFocus: onFocus,
        onKeyDown: handleOnControlKeyDown,
        ["data-control"]: true,
      });
    }
  };

  const handleOnClick = (e) => {
    if (openOnClick && !openOnHover) {
      popoverRef?.current?.isOpen()
        ? popoverRef?.current?.close()
        : popoverRef?.current?.open();
    }

    onClick(e);
  };
  const handleOnMouseEnter = (e) => {
    if (openOnHover == true) {
      popoverRef?.current?.isOpen()
        ? popoverRef?.current?.close()
        : popoverRef?.current?.open();
    }

    onMouseEnter(e);
  };
  const handleOnMouseLeave = (e) => {
    onMouseLeave(e);
  };

  const handleOnControlKeyDown = (e) => {
    e.preventDefault();
    firstItemRef?.current?.focus();
    onKeyDown(e);
  };

  //Outside click handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuContentRef?.current &&
        !menuContentRef?.current?.contains(event.target)
      ) {
        //ignore if click is on control
        if (!event.target?.attributes?.["data-control"])
          popoverRef?.current?.close();
      }
    };
    //Fired on component mount
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      //Fired on component unmount
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <StyledDropDown ref={ref} {...rest}>
      {clonedControl()}
      <Popover
        anchorElement={controlRef}
        ref={popoverRef}
        vertical={verticalAlignment}
        horizontal={horizontalAlignment}
        offset={offset}
        style={{ padding: 0, maxHeight: "unset" }}
        closeOnClickOutside={false} //dropdown has it's own outside click handler which includes control (element that opens dropdown)
        {...popoverProps}
      >
          <PopoverContent
            ref={menuContentRef}
            widthFitContent={widthFitContent}
            color={color}
            theme={theme}
          >
            {clonedChildren}
          </PopoverContent>
      </Popover>
    </StyledDropDown>
  );
});

DropdownMenu.defaultProps = {
  openOnClick: true,
  openOnHover: false,
  offset: 8,
  widthFitContent: false,
  closeOnItemSelect: true,
  verticalAlignment: null,
  //-------------------------
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onItemSelected: (e, value, children) => {},
  //-------------------------
  /**
   * Animation use on nested items open/close
   */
  animation: {
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    initial: { opacity: 0, height: 0 },
    transition: {
      type: "tween",
      duration: 0.15,
      opacity: { duration: 0.15, ease: "easeOut" },
      height: { duration: 0.15 },
    },
  },
  style: {},
  color: "primary",
  size: "small",
};

DropdownMenu.propTypes = {
  control: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  openOnClick: PropTypes.bool,
  openOnHover: PropTypes.bool,
  /**
   * Menu offset from the control
   */
  offset: PropTypes.number,
  //Menu's horizontal alignment
  horizontalAlignment: PropTypes.oneOf(["left", "right", "center"]),
  //Menu's vertical alignment
  verticalAlignment: PropTypes.oneOf(["top", "bottom", null]),
  /**
   * Adjust width of dropdown according to dropdown items content.
   */
  widthFitContent: PropTypes.bool,
  /**
   * Close menu when item is selected
   */
  closeOnItemSelect: PropTypes.bool,
  //---------------------------------------------------------------
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onItemSelected: PropTypes.func,
  //---------------------------------------------------------------
  animation: PropTypes.object,
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
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  popoverProps: PropTypes.any,
};

export default DropdownMenu;
