import React, { useState } from "react";
import PropTypes from "prop-types";
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
      "backgroundOpacity"
    )};`}
    border-radius: 2px;
`;

const NestedMenuItem = React.forwardRef((props, ref) => {
  const {
    item,
    //------------------
    onItemSelected,
    //--------------------
    defaultOpen,
    tuckIn,
    tuckInSize,
    animation,
    color,
    size,
    className,
    style,
    __TYPE__,
    children,
    ...rest
  } = props;

  const theme = useTheme();
  const [show, setShow] = useState(defaultOpen);

  const toggleNested = () => {
    setShow(!show);
  };

  const clonedItem = React.cloneElement(item, {
    isNested: true,
    showNested: show,
    toggleNested: toggleNested,
    color: color,
    size: size,
  });

  const clonedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (
        child.props.__TYPE__ == "MENU_ITEM" ||
        child.props.__TYPE__ == "NESTED_ITEM"
      ) {
        return React.cloneElement(child, {
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

NestedMenuItem.defaultProps = {
  defaultOpen: false,
  tuckIn: true,
  tuckInSize: "0.3rem",
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
  size: "small",
  color: "primary",
  style: {},
  className: "",
  __TYPE__: "NESTED_ITEM",
};

NestedMenuItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  //--------------------------
  defaultOpen: PropTypes.bool,
  /**
   * Determines wether nested items will be tucked in to the right (using margin-right and padding-left).
   */
  tuckIn: PropTypes.bool,
  tuckInSize: PropTypes.string,
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
  __TYPE__: PropTypes.string,
};

export default NestedMenuItem;
