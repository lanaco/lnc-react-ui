/* eslint-disable react/display-name */
import {
  useState,
  forwardRef,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../_utils/utils";
import { AnimatePresence, motion } from "framer-motion";

const StyledNested = styled(motion.div)`
  margin-left: 0.3rem;
  padding-left: 0.3rem;
  border-left: ${(props) =>
    `2px solid ${getColorRgbaValue(
      props.theme,
      "MenuItem",
      props.color,
      "focus",
      "background"
    )}`};
  border-radius: 2px;
`;

const NestedDropdownItem = forwardRef((props, ref) => {
  const {
    __TYPE__ = "NESTED_ITEM",
    item,
    //------------------
    onItemSelected = () => {},
    //--------------------
    defaultOpen = false,
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
    return child;
  });

  return (
    <>
      <>{clonedItem}</>
      <AnimatePresence>
        {show && (
          <StyledNested
            {...animation}
            theme={theme}
            color={color}
            size={size}
            className={"nested-item-lnc " + className}
            style={style}
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
// NestedDropdownItem.defaultProps = {
//   defaultOpen: false,
//   /**
//    * Animation use on nested items open/close
//    */
//    animation: {
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

NestedDropdownItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  //--------------------------
  defaultOpen: PropTypes.bool,
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
    "gray",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  __TYPE__: PropTypes.string,
};

export default NestedDropdownItem;

NestedDropdownItem.displayName = "NESTED_ITEM";
