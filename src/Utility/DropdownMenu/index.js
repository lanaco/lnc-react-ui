import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from "../../General/Button";
import { getColorRgbaValue } from "../../_utils/utils";
import { useTheme } from "../../ThemeProvider";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../Popover";

const StyledDropDown = styled.div``;

const StyledContent = styled(motion.div)`
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
    offsetValue,
    placement,
    widthFitContent,
    closeOnItemSelect,
    zIndex,
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

  const [openPopover, setOpenPopover] = useState(false);

  const handleOnItemSelected = (e, value, children) => {
    onItemSelected(e, value, children);
    if (closeOnItemSelect == true) setOpenPopover(false);//popoverRef?.current?.close();
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
            color: child.props.color ? child.props.color : color,
            size: size,
            onItemSelected: handleOnItemSelected,
            animation: animation,
          });
        }
        return React.cloneElement(child, {
          color: child.props.color ? child.props.color : color,
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
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={controlRef}
          onKeyDown={onKeyDown}
          trailingIcon="angle-down"
          color={color}
          size={size}
        />
      );
    } else {
      return React.cloneElement(control, {
        color: color,
        size: size,
        ref: controlRef,
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onBlur: onBlur,
        onFocus: onFocus,
        onKeyDown: onKeyDown,
      });
    }
  };

  return (
    <StyledDropDown ref={ref} {...rest}>
      <Popover open={openPopover} onOpenChange={setOpenPopover} placement={placement} offsetValue={offsetValue}>
        <PopoverTrigger onClick={() => setOpenPopover((v) => !v)}>{clonedControl()}</PopoverTrigger>
        <PopoverContent zIndex={zIndex}>
        <StyledContent
            ref={menuContentRef}
            widthFitContent={widthFitContent}
            color={color}
            theme={theme}
          >
            {clonedChildren}
          </StyledContent>
        </PopoverContent>
      </Popover>
    </StyledDropDown>
  );
});

DropdownMenu.defaultProps = {
  offsetValue: 8,
  widthFitContent: false,
  closeOnItemSelect: true,
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
  /**
   * Menu offset from the control
   */
  offsetValue: PropTypes.number,
  placement: PropTypes.oneOf([
    "center",
    "top",
    "right",
    "bottom",
    "left",
    "top-start",
    "top-end",
    "right-start",
    "right-end",
    "bottom-start",
    "bottom-end",
    "left-start",
    "left-end",
  ]),
  /**
   * Adjust width of dropdown according to dropdown items content.
   */
  widthFitContent: PropTypes.bool,
  /**
   * Close menu when item is selected
   */
  closeOnItemSelect: PropTypes.bool,
  /**
   * zIndex of dropdown popup
   */
  zIndex: PropTypes.number,
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
