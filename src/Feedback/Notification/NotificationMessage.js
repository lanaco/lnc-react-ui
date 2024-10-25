import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "../../General/Icon";
import {
  getColorRgbaValue,
  getComponentPropValue,
  getComponentTypographyCss,
} from "../../_utils/utils";
import Avatar from "../../General/Avatar";

const StyledMessage = styled.div`
  ${(props) =>
    getComponentTypographyCss(props.theme, "Notification", "small", "enabled")};

  word-wrap: break-word;
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  & .notification-actions {
    align-items: center;
    ${(props) => props.sideButtons && "margin: -14px"};
    flex-direction: ${(props) => (props.sideButtons ? "column" : "row")};
    ${(props) => props.sideButtons && "margin-left: auto"};
    ${(props) =>
      props.inlineActions == false &&
      props.sideButtons == false &&
      "padding-top: 4px"};
    gap: ${(props) => (props.sideButtons ? "0" : "1rem")};
    display: flex;

    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Notification",
        props.color,
        "enabled",
        "action"
      )};

    & > button {
      ${(props) => props.sideButtons && "flex: 1; width: 100%;"}
    }
  }
  & .notification-main {
    word-wrap: break-word;
    box-sizing: border-box;
    display: flex;
    gap: 1rem;
  }
  & .notification-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Notification",
        props.color,
        "enabled",
        "text"
      )};
  }
  & .notification-icon {
    align-items: flex-start;
    & i {
      font-size: 1.25rem;
    }
  }
  & .notification-title {
    font-weight: ${(props) =>
      getComponentPropValue(
        props.theme,
        "Notification",
        props.color,
        "enabled",
        "fontWeightTitle"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Notification",
        props.color,
        "enabled",
        "title"
      )};
  }
`;

const NotificationMessage = React.forwardRef((props, ref) => {
  const {
    title,
    icon,
    className,
    style = {},
    size = "small",
    avatar = false,
    actions,
    inlineActions = false,
    sideButtons = false,
    iconProps,
    avatarProps,
    children,
    ...rest
  } = props;
  const theme = useTheme();

  const themeProps = {
    theme,
    className,
    style,
    size,
    inlineActions,
    sideButtons,
  };

  return (
    <StyledMessage ref={ref} {...themeProps} {...rest}>
      <div className="notification-main">
        {avatar ? (
          <Avatar sizeInUnits="2.75rem" {...avatarProps} />
        ) : (
          icon && (
            <Icon className={"notification-icon"} icon={icon} {...iconProps} />
          )
        )}
        <div className="notification-content">
          <div className="notification-title">{title}</div>
          {children}
          {!inlineActions && !sideButtons && (
            <div className="notification-actions">{actions}</div>
          )}
        </div>
      </div>
      {(inlineActions || sideButtons) && (
        <div className="notification-actions">{actions}</div>
      )}
    </StyledMessage>
  );
});

// NotificationMessage.defaultProps = {
//   avatar: false,
//   inlineActions: false,
//   sideButtons: false,
//   //----------------------------
//   style: {},
//   size: "small",
// };

NotificationMessage.propTypes = {
  avatar: PropTypes.bool,
  title: PropTypes.string,
  /**
   * If `avatar={true}` icon won't be displayed
   */
  icon: PropTypes.string,
  actions: PropTypes.element,
  inlineActions: PropTypes.bool,
  sideButtons: PropTypes.bool,
  //-----------------------
  className: PropTypes.string,
  style: PropTypes.object,
  iconProps: PropTypes.any,
  avatarProps: PropTypes.any,
};

export default NotificationMessage;
