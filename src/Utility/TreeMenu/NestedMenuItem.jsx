/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  forwardRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../_utils/utils";
import { AnimatePresence, motion } from "framer-motion";

const StyledNested = styled(motion.div)`
  ${(props) => props.tuckIn == true && `margin-left: ${props.tuckInSize};`}
  ${(props) => props.tuckIn == true && `padding-left: ${props.tuckInSize};`}
    ${(props) =>
    props.tuckIn == true &&
    `border-left: 2px solid ${getColorRgbaValue(
      props.theme,
      "MenuItem",
      props.color,
      "focus",
      "background",
      "backgroundOpacity",
    )};`}
    border-radius: 2px;
`;

const NestedMenuItem = forwardRef((props, ref) => {
  const {
    item,
    //------------------
    onItemSelected = () => {},
    //--------------------
    defaultOpen = false,
    tuckIn = true,
    tuckInSize = "0.3rem",
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
    children,
    ...rest
  } = props;

  const theme = useTheme();
  const [show, setShow] = useState(defaultOpen);

  const toggleNested = () => {
    setShow(!show);
  };

  const clonedItem = cloneElement(item, {
    isNested: true,
    showNested: show,
    toggleNested: toggleNested,
    color: color,
    size: size,
  });

  const clonedChildren = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      if (
        child.props.__TYPE__ == "MENU_ITEM" ||
        child?.type?.displayName === "MENU_ITEM" ||
        child.props.__TYPE__ == "NESTED_ITEM" ||
        child?.type?.displayName === "NESTED_ITEM"
      ) {
        return cloneElement(child, {
          color: child.props.color ? child.props.color : color,
          size: size,
          onItemSelected: onItemSelected,
        });
      }
    }
  });

  return (
    <>
      <>{clonedItem}</>
      <AnimatePresence>
        {show && (
          <StyledNested
            theme={theme}
            tuckIn={tuckIn}
            tuckInSize={tuckInSize}
            color={color}
            size={size}
            className={"nested-item-lnc " + className}
            style={style}
            ref={ref}
            show={show}
            {...animation}
            {...rest}
          >
            {clonedChildren}
          </StyledNested>
        )}
      </AnimatePresence>
    </>
  );
});

// TODO : type
// NestedMenuItem.defaultProps = {
//   defaultOpen: false,
//   tuckIn: true,
//   tuckInSize: "0.3rem",
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
//   size: "small",
//   color: "primary",
//   style: {},
//   className: "",
//   __TYPE__: "NESTED_ITEM",
// };

export default NestedMenuItem;

NestedMenuItem.displayName = "NESTED_ITEM";
