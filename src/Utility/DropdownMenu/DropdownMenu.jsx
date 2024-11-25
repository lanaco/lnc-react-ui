/* eslint-disable react/display-name */
import {
  forwardRef,
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from "../../General/Button/Button";
import { getColorRgbaValue } from "../../_utils/utils";
import { useTheme } from "../../ThemeProvider/ThemeProvider";
import { motion } from "framer-motion";
import Popover from "../Popover/Popover";
import PopoverTrigger from "../Popover/PopoverTrigger";
import PopoverContent from "../Popover/PopoverContent";

const StyledDropDown = styled.div``;

const StyledContent = styled(motion.div)`
  gap: 0.25rem;
  display: flex;
  flex-direction: column;
  ${(props) => props.widthfitcontent == false && "min-width: 12.5rem"};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Dropdown",
      props.color,
      "enabled",
      "background"
    )};
`;

const DropdownMenu = forwardRef((props, ref) => {
  const {
    control,
    offsetValue = 9,
    placement,
    widthFitContent = false,
    closeOnItemSelect = true,
    zIndex,
    //----------------
    onFocus = () => {},
    onBlur = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    onItemSelected = () => {},
    //----------------
    animation = {
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
    className = "",
    style = {},
    color = "primary",
    size = "small",
    contentClassName = "",
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
    if (closeOnItemSelect == true) setOpenPopover(false); //popoverRef?.current?.close();
  };

  const clonedChildren = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      if (
        child.props.__TYPE__ == "MENU_ITEM" ||
        child?.type?.displayName === "MENU_ITEM" ||
        child.props.__TYPE__ == "NESTED_ITEM" ||
        child?.type?.displayName === "NESTED_ITEM"
      ) {
        if (index == 0) {
          if (child.props.ref) firstItemRef.current = ref;
          return cloneElement(child, {
            ref: ref ? ref : firstItemRef, //needed to focus on navigation
            color: child.props.color ? child.props.color : color,
            size: size,
            onItemSelected: handleOnItemSelected,
            animation: animation,
          });
        }
        return cloneElement(child, {
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
      return cloneElement(control, {
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
    <StyledDropDown ref={ref} className={className} {...rest}>
      <Popover
        open={openPopover}
        onOpenChange={setOpenPopover}
        placement={placement}
        offsetValue={offsetValue}
      >
        <PopoverTrigger onClick={() => setOpenPopover((v) => !v)}>
          {clonedControl()}
        </PopoverTrigger>
        <PopoverContent zIndex={zIndex}>
          <StyledContent
            ref={menuContentRef}
            widthfitcontent={widthFitContent}
            color={color}
            theme={theme}
            className={contentClassName}
          >
            {clonedChildren}
          </StyledContent>
        </PopoverContent>
      </Popover>
    </StyledDropDown>
  );
});

// DropdownMenu.defaultProps = {
//   offsetValue: 8,
//   widthFitContent: false,
//   closeOnItemSelect: true,
//   //-------------------------
//   onBlur: () => {},
//   onFocus: () => {},
//   onClick: () => {},
//   onKeyDown: () => {},
//   onMouseEnter: () => {},
//   onMouseLeave: () => {},
//   onItemSelected: (e, value, children) => {},
//   //-------------------------
//   /**
//    * Animation use on nested items open/close
//    */
//   animation: {
//     animate: { opacity: 1, height: "auto" },
//     exit: { opacity: 0, height: 0 },
//     initial: { opacity: 0, height: 0 },
//     transition: {
//       type: "tween",
//       duration: 0.15,
//       opacity: { duration: 0.15, ease: "easeOut" },
//       height: { duration: 0.15 },
//     },
//   },
//   color: "primary",
//   size: "small",
//   className: "",
//   contentClassName: "",
// };

DropdownMenu.propTypes = {
  control: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
  popoverProps: PropTypes.any,
};

export default DropdownMenu;
