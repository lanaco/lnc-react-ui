/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  forwardRef,
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";
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
      "background",
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
    color = "primary",
    size = "small",
    contentClassName = "",
    children,
    ...rest
  } = props;

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

export default DropdownMenu;
