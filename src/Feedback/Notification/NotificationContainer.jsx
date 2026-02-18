/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";
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
    size = "small",
    toastContainerProps,
    ...rest
  } = props;
  const { theme } = useTheme();

  const themeProps = {
    theme,
    className: "lnc-ui-notification " + className,
    style,
    size,
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

export default NotificationContainer;
