/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import { ClassNames, useTheme } from "@emotion/react";

// import component
import ReactDrawer from "react-modern-drawer";

//import styles
import "react-modern-drawer/dist/index.css";
import { useImperativeHandle } from "react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";

const Drawer = forwardRef((props, ref) => {
  const {
    direction = "right",
    duration = 300,
    overlayOpacity = 0.4,
    enableOverlay = true,
    zIndex = 100,
    //----------------
    onClose = () => {},
    onOpen = () => {},
    //----------------
    className = "",
    style = {},
    color = "neutral",
    size = "small",
    overlayColor,
    width = "unset",
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
                "background",
              )} !important;
              color: ${getColorRgbaValue(
                theme,
                "Drawer",
                color,
                "enabled",
                "text",
              )};
              ${getComponentTypographyCss(theme, "Drawer", size, "enabled")};
            `,
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

// Drawer.defaultProps = {
//   direction: "right",
//   open: false,
//   duration: 300,
//   overlayOpacity: 0.4,
//   enableOverlay: true,
//   zIndex: 100,
//   //-------------------------
//   onClose: () => {},
//   onOpen: () => {},
//   //-------------------------
//   style: {},
//   color: "neutral",
//   width: "unset",
//   size: "small",
// };

export default Drawer;
