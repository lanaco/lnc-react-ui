/* eslint-disable react/display-name */
import {
  useRef,
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledMenu = styled.div`
  padding: 0.25rem;
  gap: ${(props) => props.itemsGap};
  display: flex;
  flex-direction: column;
  ${(props) => props.widthFitContent == false && "min-width: 12.5rem"};
  height: 100%;
  justify-content: space-between;
  & > .start-menu-items-lnc,
  > .end-menu-items-lnc {
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.itemsGap};
  }
`;

const TreeMenu = forwardRef((props, ref) => {
  const {
    widthFitContent = false,
    itemsGap = "0.25rem",
    //----------------
    onItemSelected = () => {},
    //----------------
    className = "",
    style = {},
    color = "primary",
    size = "small",
    children,
    ...rest
  } = props;

  const firstItemRef = useRef();

  //justify-content: start -> menu items
  const clonedChildrenStart = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      if (
        child.props.__TYPE__ == "MENU_ITEM" ||
        child?.type?.displayName === "MENU_ITEM" ||
        child.props.__TYPE__ == "NESTED_ITEM" ||
        child?.type?.displayName === "NESTED_ITEM"
      ) {
        if (index == 0 && child.props.justifyToEnd !== true) {
          if (child.props.ref) firstItemRef.current = ref;
          return cloneElement(child, {
            ref: ref ? ref : firstItemRef, //needed to focus on navigation
            color: color,
            size: size,
            onItemSelected: onItemSelected,
          });
        } else if (
          child.props.justifyToEnd !== true ||
          child.props.__TYPE__ == "NESTED_ITEM" ||
          child?.type?.displayName === "NESTED_ITEM"
        ) {
          return cloneElement(child, {
            color: color,
            size: size,
            onItemSelected: onItemSelected,
          });
        }
        return;
      }
    }

    if (child.props?.justifyToEnd == false || !child.props?.justifyToEnd)
      return child;
  });

  //justify-content: end -> menu items
  const clonedChildrenEnd = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      if (
        (child.props.__TYPE__ == "MENU_ITEM" ||
          child?.type?.displayName === "MENU_ITEM" ||
          child.props.__TYPE__ == "NESTED_ITEM" ||
          child?.type?.displayName === "NESTED_ITEM") &&
        child.props.justifyToEnd == true
      ) {
        if (index == 0) {
          if (child.props.ref) firstItemRef.current = ref;
          return cloneElement(child, {
            ref: ref ? ref : firstItemRef, //needed to focus on navigation
            color: child.props.color ? child.props.color : color,
            size: size,
            onItemSelected: onItemSelected,
          });
        }
        return cloneElement(child, {
          color: child.props.color ? child.props.color : color,
          size: size,
          onItemSelected: onItemSelected,
        });
      }
    }

    if (child.props?.justifyToEnd == true) return child;
  });

  return (
    <StyledMenu
      ref={ref}
      widthFitContent={widthFitContent}
      itemsGap={itemsGap}
      size={size}
      color={color}
      className={"lnc-ui-treemenu " + className}
      style={style}
      {...rest}
    >
      <div className="nested-item-lnc start-menu-items-lnc">
        {clonedChildrenStart}
      </div>
      <div className="nested-item-lnc end-menu-items-lnc">
        {clonedChildrenEnd}
      </div>
    </StyledMenu>
  );
});

// TreeMenu.defaultProps = {
//   widthFitContent: false,
//   itemsGap: "0.25rem",
//   //-------------------------
//   onItemSelected: () => {},
//   //-------------------------
//   style: {},
//   color: "primary",
//   size: "small",
// };

TreeMenu.propTypes = {
  widthFitContent: PropTypes.bool,
  /**
   * Gap between Menu Items
   */
  itemsGap: PropTypes.string,
  //---------------------------------------------------------------
  onItemSelected: PropTypes.func,
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

export default TreeMenu;
