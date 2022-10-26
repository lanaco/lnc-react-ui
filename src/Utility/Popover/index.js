import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { createPortal } from "react-dom";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentPropValue,
} from "../../_utils/utils";
import { useImperativeHandle } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const StyledPopover = styled.div`
  box-sizing: border-box;
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  display: ${(props) => (props.show ? "block" : "none")};
  opacity: 0;
  opacity: ${(props) => (props.show ? "1" : "0")};
  animation: fadeIn 0.4s;

  position: absolute;
  top: ${(props) =>
    props.position ? `${props.position?.top + props.position?.height}` : "0"};
  left: ${(props) => (props.position ? props.left : "")};
  ${(props) => props.position?.horizontalPosition};
  ${(props) => props.position?.verticalPosition};
  overflow: auto;
  box-shadow: ${(props) =>
    getComponentPropValue(
      props.theme,
      "Popover",
      props.color,
      "enabled",
      "boxShadow"
    )};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  max-width: ${(props) =>
    props.position?.maxWidth
      ? props.position.maxWidth != "100vw"
        ? props.position.maxWidth + "px"
        : "100vw"
      : "100vw"};
  max-height: ${(props) =>
    props.position?.maxHeight
      ? props.position.maxHeight != "100vh"
        ? props.position.maxHeight + "px"
        : "100vh"
      : "100vh"};
  padding: 12px;
  background-color: ${(props) =>
    getColorRgbaValue(props.theme, "Popover", "default", "enabled", "bg")};

  z-index: ${(props) =>
    props.zIndex ? props.zIndex : props.theme.zIndex.popover};

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Popover = React.forwardRef((props, ref) => {
  const {
    anchorElement,
    borderRadius,
    vertical,
    horizontal,
    offset,
    zIndex,
    popoverContainer,
    closeOnClickOutside,
    onOpen,
    onClose,
    className,
    style,
    children,
    ...rest
  } = props;

  const theme = useTheme();
  const popoverRef = useRef(ref);

  const [show, setShow] = useState(false);

  const [popoverPosition, setPopoverPosition] = useState();

  //Expose functions through ref
  useImperativeHandle(ref, () => ({
    open() {
      open();
    },
    close() {
      close();
    },
    isOpen() {
      return show;
    },
  }));

  const open = () => {
    setShow(true);
    onOpen(event);
  };

  const close = (event) => {
    setShow(false);
    onClose(event);
  };

  useEffect(() => {
    if (anchorElement && show == true) {
      //Anchor element can be ref or HTML element
      let anchorElPosition = getElementPosition(
        anchorElement?.current ? anchorElement.current : anchorElement
      );
      let anchorViewPortPosition = getElementViewPortPosition(
        anchorElement?.current ? anchorElement.current : anchorElement
      );
      if (anchorElPosition && anchorViewPortPosition)
        setPopoverPosition(
          findPopoverPosition(anchorElPosition, anchorViewPortPosition)
        );
    }
  }, [anchorElement, vertical, horizontal, show]);

  const findPopoverPosition = (anchorElPosition, anchorViewPortPosition) => {
    const { clientHeight: windowHeight, clientWidth: windowWidth } =
      document.body;
    const { innerHeight: windowInnerHeight, innerWidth: windowInnerWidth } =
      window;

    let popoverMeasures = getElementPosition(popoverRef.current);

    if (popoverMeasures && anchorElPosition) {
      let { horizontalPosition, maxWidth } = horizontal
        ? findHorizontalPosition(
            horizontal,
            anchorElPosition,
            popoverMeasures,
            anchorViewPortPosition,
            windowInnerWidth
          )
        : { horizontalPosition: "", maxWidth: "100vw" };
      let { verticalPosition, maxHeight } = vertical
        ? findVerticalPosition(
            vertical,
            anchorElPosition,
            popoverMeasures,
            anchorViewPortPosition,
            windowInnerHeight
          )
        : { verticalPosition: "", maxHeight: "100vh" };

      if (!horizontal) {
        maxWidth = "100vw";
        //horizontal
        if (
          popoverMeasures.width / 2 <=
            anchorElPosition.left + anchorElPosition.width / 2 &&
          popoverMeasures.width / 2 <=
            windowWidth - anchorElPosition.right + anchorElPosition.width / 2
        ) {
          horizontalPosition = `left: ${
            anchorElPosition.left +
            anchorElPosition.width / 2 -
            popoverMeasures.width / 2
          }px`;
        } else if (
          popoverMeasures.width / 2 >
          anchorElPosition.left + anchorElPosition.width / 2
        ) {
          horizontalPosition = "left: 0";
        } else {
          horizontalPosition = "right: 0";
        }
      }
      if (!vertical) {
        //vertical
        if (
          anchorViewPortPosition.top >=
          innerHeight - anchorViewPortPosition.bottom
        ) {
          //on top
          maxHeight = `${anchorViewPortPosition.top - offset}`;
          verticalPosition = `top: ${
            anchorElPosition.top -
            (popoverMeasures.height > maxHeight
              ? +maxHeight + offset
              : popoverMeasures.height + offset)
          }px`;
        } else {
          //on bottom
          maxHeight = `${
            windowInnerHeight - anchorViewPortPosition.bottom - offset
          }`;
          verticalPosition = `top: ${anchorElPosition.bottom + offset}px`;
        }
      }

      return {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      };
    }
    return null;
  };

  const findHorizontalPosition = (
    horizontalPosition,
    anchorElPosition,
    popoverMeasures,
    anchorViewPortPosition,
    windowInnerWidht
  ) => {
    let horizontalResult = "";
    let maxWidth = "";
    if (horizontalPosition == "right") {
      maxWidth = `${anchorViewPortPosition.right}`;
      horizontalResult = `left: ${
        anchorElPosition.right -
        (popoverMeasures.width > +maxWidth ? +maxWidth : popoverMeasures.width)
      }px`;
    } else if (horizontalPosition == "left") {
      maxWidth = `${windowInnerWidht - anchorViewPortPosition.left}`;
      horizontalResult = `left: ${anchorElPosition.left}px`;
    } else if (horizontalPosition == "center") {
      maxWidth = `100vw`;
      horizontalResult = `left: ${
        anchorElPosition.left +
        anchorElPosition.width / 2 -
        popoverMeasures.width / 2
      }px`;
    }

    return { horizontalPosition: horizontalResult, maxWidth: maxWidth };
  };
  const findVerticalPosition = (
    verticalPosition,
    anchorElPosition,
    popoverMeasures,
    anchorViewPortPosition,
    windowInnerHeight
  ) => {
    let verticalResult = "";
    let maxHeight = "";

    if (verticalPosition == "top") {
      maxHeight = `${anchorViewPortPosition.top - offset}`;
      verticalResult = `top: ${
        anchorElPosition.top -
        (popoverMeasures.height > maxHeight
          ? +maxHeight + offset
          : popoverMeasures.height + offset)
      }px`;
    } else if (verticalPosition == "bottom") {
      maxHeight = `${
        windowInnerHeight - anchorViewPortPosition.bottom - offset
      }`;
      verticalResult = `top: ${anchorElPosition.bottom + offset}px`;
    }

    return { verticalPosition: verticalResult, maxHeight: maxHeight };
  };

  const getElementPosition = (element) => {
    var clientRect = element.getBoundingClientRect();

    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      left: clientRect.left + scrollLeft,
      top: clientRect.top + scrollTop,
      right: clientRect.right + scrollLeft,
      bottom: clientRect.bottom + scrollTop,
      height: clientRect.height,
      width: clientRect.width,
    };
  };

  const getElementViewPortPosition = (element) => {
    return element.getBoundingClientRect();
  };

  const handleClickOutside = (e) => {
    if (closeOnClickOutside == true) close();
  };

  return createPortal(
    <OutsideClickHandler onOutsideClick={handleClickOutside}>
      <StyledPopover
        theme={theme}
        ref={popoverRef}
        zIndex={zIndex}
        position={popoverPosition}
        show={show}
        borderRadius={borderRadius}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </StyledPopover>
    </OutsideClickHandler>,
    popoverContainer
  );
});

Popover.defaultProps = {
  className: "",
  style: {},
  borderRadius: "regular",
  horizontal: null,
  offset: 0,
  popoverContainer: document.body,
  closeOnClickOutside: true,
  onOpen: () => {},
  onClose: () => {},
};

Popover.propTypes = {
  id: PropTypes.any,
  /**
   * Anchor element can be ref or HTML element.
   */
  anchorElement: PropTypes.object,
  //show: PropTypes.bool,
  borderRadius: PropTypes.oneOf(["regular", "curved"]),
  horizontal: PropTypes.oneOf(["left", "right", "center"]),
  vertical: PropTypes.oneOf(["top", "bottom", null]),
  /**
   * popoverContainer is DOM element, popover won't be mounted into the DOM as a child of the nearest parent node, it will be inserted as a child of popoverContainer location in the DOM
   */
  popoverContainer: PropTypes.any,
  /**
   * Offset from anchor element in pixels
   */
  offset: PropTypes.number,
  zIndex: PropTypes.number,
  closeOnClickOutside: PropTypes.bool,
  //--------------------------
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  //----------------------
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Popover;
