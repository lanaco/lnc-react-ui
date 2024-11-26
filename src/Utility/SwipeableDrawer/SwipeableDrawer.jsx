/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import { useImperativeHandle } from "react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";
import { useEffect } from "react";
import { useRef } from "react";

const getHeight = (direction, isOpen, isFullPage, drawerSize, unsetHeight) => {
  if (direction === "right" || direction === "left") return "height: 100%;";
  if (isOpen && isFullPage) return "height: 100%;";
  if (isOpen && unsetHeight === true) return;
  if (isOpen) return "height: " + drawerSize + ";";

  return "height: 0;";
};

const getWidth = (direction, isOpen, isFullPage, drawerSize, unsetWidth) => {
  if (direction === "top" || direction === "bottom") return "width: 100%;";
  if (isOpen && isFullPage) return "width: 100%;";
  if (isOpen && unsetWidth === true) return;
  if (isOpen) return "width: " + drawerSize + ";";

  return "width: 0;";
};

const StyledDrawer = styled.div`
  touch-action: none;
  overflow: auto;
  max-height: ${(p) => (p.isOpen || p.unsetHeight === false ? "100dvh" : 0)};
  ${(props) =>
    getHeight(
      props.direction,
      props.isOpen,
      props.isFullPage,
      props.drawerSize,
      props.unsetHeight
    )}
  max-width: ${(p) => (p.isOpen || p.unsetWidth === false ? "100vw" : 0)};
  ${(props) =>
    getWidth(
      props.direction,
      props.isOpen,
      props.isFullPage,
      props.drawerSize,
      props.unsetWidth
    )}
  position: fixed;
  z-index: ${(props) => props.zIndex};
  ${(props) => (props.direction === "bottom" ? "bottom: 0" : "top: 0")};
  ${(props) => (props.direction === "right" ? "right: 0" : "left: 0")};
  -webkit-transition: ${(props) => `all ${props.duration}s`};
  -moz-transition: ${(props) => `all ${props.duration}s`};
  -ms-transition: ${(props) => `all ${props.duration}s`};
  -o-transition: ${(props) => `all ${props.duration}s`};
  transition: ${(props) => `all ${props.duration}s`};
  padding: ${(props) => (props.isOpen === true ? "20px" : 0)};

  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);

  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Drawer",
      props.color,
      "enabled",
      "background"
    )};
  color: ${(props) =>
    getColorRgbaValue(props.theme, "Drawer", props.color, "enabled", "text")};
  ${(props) =>
    getComponentTypographyCss(props.theme, "Drawer", props.size, "enabled")};
`;

const StyledOverlay = styled.div`
  z-index: ${(props) => props.zIndex};
  position: fixed;
  top: 0;
  left: 0;

  height: ${(props) =>
    props.isOpen === true && props.enableOverlay === true ? "100dvh" : 0};
  width: ${(props) =>
    props.isOpen === true && props.enableOverlay === true ? "100vw" : 0};
  background-color: ${(props) => props.overlayColor};
`;

const SwipeableDrawer = forwardRef((props, ref) => {
  const {
    direction = "right",
    open = false,
    duration = 0.8,
    enableOverlay = true,
    zIndex = 100,
    closeOnClickOutside = true,
    closeOnSwipe = true,
    isFullPage = false,
    unsetHeight = false,
    unsetWidth = false,
    //----------------
    onClose = () => {},
    onOpen = () => {},
    //----------------
    className = "",
    style = {},
    color = "neutral",
    overlayColor = "rgba(123, 123, 123, 0.5)",
    size = "small",
    drawerSize = "12.5rem",
    children,
    ...rest
  } = props;
  const theme = useTheme();

  const drawerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /** left swipe */
        if (closeOnSwipe == true && direction == "left") closeDrawer();
      } else {
        /** right swipe */
        if (closeOnSwipe == true && direction == "right") closeDrawer();
      }
    } else {
      if (yDiff > 0) {
        /*** Up swipe */
        if (closeOnSwipe == true && direction == "top") closeDrawer();
      } else {
        /** Down swipe */
        if (closeOnSwipe == true && direction == "bottom") closeDrawer();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  //Expose functions through ref
  useImperativeHandle(ref, () => ({
    open() {
      openDrawer();
    },
    close() {
      closeDrawer();
    },
    isOpen() {
      return isOpen;
    },
  }));

  const openDrawer = (event) => {
    setIsOpen(true);
    onOpen(event);
  };

  const closeDrawer = (event) => {
    setIsOpen(false);
    onClose(event);
  };

  //Outside click handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef?.current && !drawerRef?.current.contains(event.target)) {
        if (closeOnClickOutside == true) closeDrawer();
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
    <>
      <StyledOverlay
        enableOverlay={enableOverlay}
        overlayColor={overlayColor}
        isOpen={isOpen}
        zIndex={zIndex}
      >
        <StyledDrawer
          ref={drawerRef}
          zIndex={zIndex}
          isOpen={isOpen}
          direction={direction}
          isFullPage={isFullPage}
          unsetHeight={unsetHeight}
          unsetWidth={unsetWidth}
          duration={duration}
          color={color}
          theme={theme}
          className={className}
          style={style}
          size={size}
          drawerSize={drawerSize}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          {...rest}
        >
          {children}
        </StyledDrawer>
      </StyledOverlay>
    </>
  );
});

// SwipeableDrawer.defaultProps = {
//   direction: "right",
//   open: false,
//   duration: 0.8,
//   overlayColor: "rgba(123, 123, 123, 0.5)",
//   enableOverlay: true,
//   zIndex: 100,
//   closeOnClickOutside: true,
//   closeOnSwipe: true,
//   isFullPage: false,
//   drawerSize: "12.5rem",
//   size: "small",
//   /**
//    * used to fit size of the drawer to the size of its child
//    * when position is top or bottom
//    */
//   unsetHeight: false,
//   /**
//    * used to fit size of the drawer to the size of its child
//    * when position is right or left
//    */
//   unsetWidth: false,
//   //-------------------------
//   onClose: () => {},
//   onOpen: () => {},
//   //-------------------------
//   style: {},
//   color: "neutral",
// };

SwipeableDrawer.propTypes = {
  direction: PropTypes.oneOf(["top", "right", "left", "bottom"]),
  open: PropTypes.bool,
  /**
   * Duration of opening the drawer in ms
   */
  duration: PropTypes.number,
  /**
   * Determines whether to show the overlay
   */
  enableOverlay: PropTypes.bool,
  /**
   * z-index of Drawer
   */
  zIndex: PropTypes.number,
  closeOnClickOutside: PropTypes.bool,
  closeOnSwipe: PropTypes.bool,
  /**
   * Determines whether drawer takes up the whole page
   */
  isFullPage: PropTypes.bool,
  unsetHeight: PropTypes.bool,
  unsetWidth: PropTypes.bool,
  //---------------------------------------------------------------
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  overlayColor: PropTypes.string,
  /**
   * Determines drawer's height or width depending on direction
   */
  drawerSize: PropTypes.string,
  /**
   * Determines font size
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
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
};

export default SwipeableDrawer;
