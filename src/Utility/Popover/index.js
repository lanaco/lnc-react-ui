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
import { AnimatePresence, motion } from "framer-motion";

const StyledPopover = styled(motion.div)`
  color: black;
  box-sizing: border-box;
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  display: ${(props) => (props.show ? "block" : "none")};
  opacity: 0;
  opacity: ${(props) => (props.show ? "1" : "0")};
  animation: fadeIn 0.4s;

  position: absolute;
  max-height: ${(props) => props.position.maxHeight + "px"};
  max-width: ${(props) => props.position.maxWidth + "px"};
  ${(props) => props.position.top !== null && `top: ${props.position.top}px;`}
  ${(props) =>
    props.position.bottom !== null && `bottom: ${props.position.bottom}px;`}
  ${(props) =>
    props.position.left !== null && `left: ${props.position.left}px;`}
  ${(props) =>
    props.position.right !== null && `right: ${props.position.right}px;`}

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
    portalTarget,
    closeOnClickOutside,
    closeOnScroll,
    onOpen,
    onClose,
    className,
    style,
    children,
    ...rest
  } = props;
  const [portal, setPortal] = useState(document.body);

  const theme = useTheme();
  const popoverRef = useRef(ref);

  const [show, setShow] = useState(false);

  const [popoverPosition, setPopoverPosition] = useState({
    top: null,
    bottom: null,
    left: null,
    right: null,
    maxHeight: null,
    width: null,
  });

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
    if (anchorElement && show === true) {
      if(portalTarget) {
        setPortal(portalTarget?.current ? portalTarget.current : portalTarget);
      } else {
        //todo set relative implicitly to anchor
        if(anchorElement?.current) {
          anchorElement.current.style.position = "relative";
        } else {
          anchorElement.style.position = "relative";
        }
        setPortal(anchorElement?.current ? anchorElement.current : anchorElement);
      }
    }
  }, [anchorElement, show]);

  useEffect(() => {
    if (anchorElement && show == true) {
      
      let anchorElPosition = getElementPositionInContainer(
        anchorElement?.current ? anchorElement.current : anchorElement,
        portalTarget
      );

      let popoverMeasures = getElementMeasures(popoverRef.current);

      const container = portalTarget
        ? portalTarget.current
          ? portalTarget.current
          : portalTarget
        : document.body;

      let containerMeasures = getElementMeasures(container);

      const resultPosition = getPopoverPosition(
        anchorElPosition,
        popoverMeasures,
        containerMeasures,
        offset,
        portalTarget
      );

      setPopoverPosition(resultPosition);
    }
  }, [anchorElement, vertical, horizontal, show, portal]);

  const getPopoverPosition = (
    anchorPosition,
    popoverMeasures,
    containerMeasures,
    offset,
    portalTarget
  ) => {
    const freeSpaceTop = getFreeSpaceFromTheTop(anchorPosition, offset);
    const freeSpaceBottom = getFreeSpaceFromTheBottom(
      anchorPosition,
      offset,
      containerMeasures
    );
    const freeSpaceLeft = getFreeSpaceToTheLeft(anchorPosition);

    let position = {
      top: null,
      bottom: null,
      left: null,
      right: null,
      maxHeight: null,
      maxWidth: null,
    };

    const anchMeas = getElementMeasures(portal);

    // getting vertical position and max height boundaries
    if (freeSpaceTop > freeSpaceBottom) {
      if (portalTarget) {
        position.top =
          anchorPosition.top - offset - popoverMeasures.height > 0
            ? anchorPosition.top - offset - popoverMeasures.height
            : 0;
      } else {
        position.top =
          anchorPosition.top - offset - popoverMeasures.height > 0
            ? 0 - popoverMeasures.height
            : 0 - freeSpaceTop - offset;
      }

      position.maxHeight = freeSpaceTop;
    } else {
      if (portalTarget) {
        position.top = anchorPosition.bottom + offset;
      } else {
        position.top = anchMeas.height + offset;
      }

      position.maxHeight = freeSpaceBottom;
    }

    // getting horizontal positio and max width boundaries
    if (horizontal === "left") {
      position.maxWidth = containerMeasures.width - anchorPosition.left;

      if (portalTarget) {
        position.left = anchorPosition.left;
      } else {
        position.left = 0;
      }
    } else if (horizontal === "right") {
      position.maxWidth = anchorPosition.right;

      if (portalTarget) {
        position.left =
          anchorPosition.right - popoverMeasures.width > 0
            ? anchorPosition.right - popoverMeasures.width
            : 0;
      } else {
        position.right = 0;
      }
    } else {
      position.maxWidth = containerMeasures.width;

      if (anchorPosition.horizontalCenter >= popoverMeasures.width / 2) {
        if (portalTarget) {
          position.left =
            anchorPosition.horizontalCenter - (popoverMeasures.width / 2);
        } else {
          position.left = (anchMeas.width / 2) - (popoverMeasures.width / 2);
        }
      } else {
        if(portalTarget) {
          position.left = 0;
        } else {
          position.left = 0 - freeSpaceLeft;
        }
      }
    }

    return position;
  };

  const getFreeSpaceToTheLeft = (anchorPosition) => {
    return anchorPosition.left;
  };

  // Vertical offset can exist
  const getFreeSpaceFromTheTop = (anchorPosition, offset) => {
    if (vertical === "bottom") return 0;

    return anchorPosition.top - offset;
  };

  // Vertical offset can exist
  const getFreeSpaceFromTheBottom = (
    anchorPosition,
    offset,
    containerMeasures
  ) => {
    if (vertical === "top") return 0;
    return containerMeasures.height - anchorPosition.bottom - offset;
  };

  const getElementPositionInContainer = (element, portalTarget) => {
    //if there is no portal target get position relative to document.body
    if (!portalTarget || portalTarget == document.body) {
      var clientRect = element.getBoundingClientRect();

      var scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      return {
        left: clientRect.left + scrollLeft,
        top: clientRect.top + scrollTop,
        right: clientRect.right + scrollLeft,
        bottom: clientRect.bottom + scrollTop,
        height: clientRect.height,
        width: clientRect.width,
        horizontalCenter: clientRect.left + scrollLeft + clientRect.width / 2,
      };
    } 

    //else find relative to portal target
    scrollLeft = portalTarget.offsetLeft;
    scrollTop = portalTarget.offsetTop;

    return {
      left: element.offsetLeft,
      top: element.offsetTop,
      right: element.offsetLeft + element.offsetWidth,
      bottom: element.offsetTop + element.offsetHeight,
      height: element.offsetHeight,
      width: element.offsetWidth,
      horizontalCenter: element.offsetLeft + element.offsetWidth / 2,
    };
  };

  const getElementMeasures = (element) => {
    return {
      height: element.offsetHeight,
      width: element.offsetWidth,
    };
  };

  //Outside click handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef?.current && !popoverRef?.current.contains(event.target)) {
        if (closeOnClickOutside == true) close();
      }
    };
    const handleScroll = (event) => {
      if (popoverRef?.current && !popoverRef?.current.contains(event.target)) {
        if (closeOnScroll == true) close();
      }
    }
    //Fired on component mount
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      //Fired on component unmount
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return createPortal(
    <StyledPopover
      theme={theme}
      ref={popoverRef}
      zIndex={zIndex}
      position={popoverPosition}
      show={show}
      borderRadius={borderRadius}
      className={className}
      style={style}
      onBlur={close}
      {...rest}
    >
      {children}
    </StyledPopover>,
    // parentContainer
    portal
  );
});

Popover.defaultProps = {
  className: "",
  style: {},
  borderRadius: "regular",
  horizontal: null,
  offset: 0,
  closeOnClickOutside: false,
  closeOnScroll: false,
  onOpen: () => {},
  onClose: () => {},
};

Popover.propTypes = {
  id: PropTypes.any,
  /**
   * Anchor element can be ref or HTML element.
   */
  anchorElement: PropTypes.object,
  borderRadius: PropTypes.oneOf(["regular", "curved"]),
  horizontal: PropTypes.oneOf(["left", "right", "center", null]),
  vertical: PropTypes.oneOf(["top", "bottom", null]),
  /**
   * popoverContainer is DOM element, popover won't be mounted into the DOM as a child of the nearest parent node, it will be inserted as a child of popoverContainer location in the DOM
   */
  popoverContainer: PropTypes.any,
  /**
   * portalTarget can be DOM element or a ref to an element, possible value is `document.body`
   */
  portalTarget: PropTypes.any,
  /**
   * Offset from anchor element in pixels
   */
  offset: PropTypes.number,
  zIndex: PropTypes.number,
  closeOnClickOutside: PropTypes.bool,
  closeOnScroll: PropTypes.bool,
  //--------------------------
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  //----------------------
  className: PropTypes.string,
  style: PropTypes.object,
};

export default React.memo(Popover);
