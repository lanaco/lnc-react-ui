import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css, ClassNames, useTheme } from "@emotion/react";

// import component
import ReactDrawer from "react-modern-drawer";

//import styles
import "react-modern-drawer/dist/index.css";
import { useUpdateEffect } from "react-use";
import { useImperativeHandle } from "react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";


const Drawer = React.forwardRef((props, ref) => {
  const {
    direction,
    open,
    duration,
    overlayOpacity,
    enableOverlay,
    zIndex,
    //----------------
    onClose,
    onOpen,
    //----------------
    className,
    style,
    color,
    overlayColor,
    size,
    width,
    children,
    ...rest
  } = props;
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  //Expose functions through ref
  useImperativeHandle(ref, () => ({
    open() {
      openDrawer();
    },
    close() {
      closeDrawer();
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

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <ReactDrawer
          // ref={ref}
          open={isOpen}
          onClose={handleClose}
          direction={direction}
          zIndex={zIndex}
          duration={duration}
          overlayOpacity={overlayOpacity}
          enableOverlay={enableOverlay}
          size={width}
          className={cx(
            "drawer-lnc " + className,
            css`
              padding: 20px;
              background-color: ${getColorRgbaValue(
                theme,
                "Drawer",
                color,
                "enabled",
                "background"
              )} !important;
              color: ${getColorRgbaValue(
                theme,
                "Drawer",
                color,
                "enabled",
                "text"
              )};
              ${getComponentTypographyCss(theme, "Drawer", size, "enabled")};
            `
          )}
          style={style}
          overlayColor={overlayColor}
          {...rest}
        >
          {children}
        </ReactDrawer>
      )}
    </ClassNames>
  );
});

Drawer.defaultProps = {
  direction: "right",
  open: false,
  duration: 300,
  overlayOpacity: 0.4,
  enableOverlay: true,
  zIndex: 100,
  //-------------------------
  onClose: () => {},
  onOpen: () => {},
  //-------------------------
  style: {},
  color: "neutral",
  width: "unset",
  size: "small",
};

Drawer.propTypes = {
  direction: PropTypes.oneOf(["top", "right", "left", "bottom"]),
  open: PropTypes.bool,
  /**
   * Duration of opening the drawer in ms
   */
  duration: PropTypes.number,
  overlayOpacity: PropTypes.number,
  /**
   * Determines whether to show the overlay
   */
  enableOverlay: PropTypes.bool,
  /**
   * z-index of Drawer
   */
  zIndex: PropTypes.number,
  //---------------------------------------------------------------
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  overlayColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
  ]),
};

export default Drawer;
