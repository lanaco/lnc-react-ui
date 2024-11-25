/* eslint-disable react/display-name */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
} from "../../_utils/utils";
import { useTheme } from "../../ThemeProvider/ThemeProvider";

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

      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
        0px 4px 6px -2px rgba(0, 0, 0, 0.05);
      border: ${(props) =>
        `1px solid ${getColorRgbaValue(
          props.theme,
          "Notification",
          "default",
          "enabled",
          "border"
        )}`};
      border-radius: ${(props) =>
        getBorderRadiusValueWithUnits(props.theme, "regular")};
    }
    & .Toastify__close-button {
      & svg {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Notification",
            "default",
            "enabled",
            "icon"
          )};
      }
    }
    & .Toastify__toast--success {
      & svg {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Notification",
            "success",
            "enabled",
            "icon"
          )};
      }
    }
    & .Toastify__toast--information {
      & svg {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Notification",
            "information",
            "enabled",
            "icon"
          )};
      }
    }
    & .Toastify__toast--danger {
      & svg {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Notification",
            "warning",
            "enabled",
            "icon"
          )};
      }
    }
    & .Toastify__toast--error {
      & svg {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Notification",
            "danger",
            "enabled",
            "icon"
          )};
      }
    }
  }
`;

const NotificationContainer = forwardRef((props, ref) => {
  const {
    position = "top-right",
    autoClose = 500000,
    hideProgressBar = true,
    newestOnTop = true,
    closeOnClick = true,
    rtl = false,
    pauseOnFocusLoss = false,
    draggable = false,
    pauseOnHover = false,
    closeButton = true,
    className = "",
    style = {},
    toastContainerProps,
    children,
    ...rest
  } = props;
  const { theme } = useTheme();

  const themeProps = {
    theme,
    className: "lnc-ui-notification " + className,
    style,
  };

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
        {...toastContainerProps}
      />
    </StyledNotification>
  );
});

NotificationContainer.propTypes = {
  position: PropTypes.oneOf([
    "top-right",
    "top-center",
    "top-left",
    "bottom-right",
    "bottom-center",
    "bottom-left",
  ]),
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
  className: PropTypes.string,
  style: PropTypes.object,
  /**
   * Other react-toastify ToastContainer props.
   */
  toastContainerProps: PropTypes.any,
};

export default NotificationContainer;
