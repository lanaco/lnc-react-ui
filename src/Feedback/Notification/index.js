import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getColorRgbaValue } from "../../_utils/utils";

const StyledNotification = styled.div`
 & .lnc-notification {
  & > div {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Notification",
        props.color,
        "enabled",
        "background",
        "backgroundOpacity"
      )};

    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
 }
`;

const NotificationContainer = React.forwardRef((props, ref) => {
  const {
    position,
    autoClose,
    hideProgressBar,
    newestOnTop,
    closeOnClick,
    rtl,
    pauseOnFocusLoss,
    draggable,
    pauseOnHover,
    closeButton,
    status,
    className,
    style,
    toastContainerProps,
    children,
    ...rest
  } = props;
  const theme = useTheme();

  const themeProps = { theme, className, style };  

  return (
    <StyledNotification ref={ref} {...themeProps} {...rest}>
      <ToastContainer
        position={position}
        autoClose={autoClose}
        hideProgressBar={hideProgressBar}
        newestOnTop={newestOnTop}
        closeOnClick={closeOnClick}
        rtl={rtl}
        pauseOnFocusLoss={pauseOnFocusLoss}
        draggable={draggable}
        pauseOnHover={pauseOnHover}
        closeButton={closeButton}
        className="lnc-notification"
        {...toastContainerProps} />
    </StyledNotification>
  );
});

NotificationContainer.defaultProps = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  closeButton: true,
  //----------------------------
  style: {},
};

NotificationContainer.propTypes = {
  position: PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']),
  /**
   * Value in ms
   */
  autoClose: PropTypes.number,
  hideProgressBar: PropTypes.bool,
  newestOnTop: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  /**
   * Right to Left
   */
  rtl: PropTypes.bool,
  pauseOnFocusLoss: PropTypes.bool,
  draggable: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  closeButton: PropTypes.bool,
  //----------------------------
  status: PropTypes.oneOf([
    "success",
    "danger",
    "warning",
    "information"
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  /**
   * Other react-toastify ToastContainer props.
   */
  toastContainerProps: PropTypes.any,
};

export { NotificationContainer, toast as notification };
