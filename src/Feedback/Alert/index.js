import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
// import { useTheme } from "@emotion/react";
import { useTheme } from "../../ThemeProvider";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentPropValue,
  getComponentTypographyCss,
} from "../../_utils/utils";
import Icon from "../../General/Icon";
import { useEffect } from "react";

const Container = styled.div`
  min-height: 3rem;
  ${(props) =>
    getComponentTypographyCss(props.theme, "Alert", props.size, "enabled")};
  line-height: 1.25rem;
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Alert",
      props.color,
      "enabled",
      "background",
      "backgroundOpacity"
    )};
  color: ${(props) =>
    getColorRgbaValue(props.theme, "Alert", props.color, "enabled", "text")};
  word-wrap: break-word;
  box-sizing: border-box;
  padding: 0.875rem 1rem;
  display: flex;
  gap: 1rem;
  & .alert-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  & .alert-icon {
    align-items: flex-start;
    & i {
      font-size: 1.25rem;
    }
  }
  & .alert-title {
    font-weight: ${(props) =>
      getComponentPropValue(
        props.theme,
        "Alert",
        props.color,
        "enabled",
        "fontWeightTitle"
      )};
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Alert", props.color, "enabled", "title")};
  }
  & .alert-actions {
    display: ${(props) => (props.actions ? "flex" : "none")};
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 0.5rem;
  }

  & .alert-actions > * {
    font-weight: ${(props) =>
      getComponentPropValue(
        props.theme,
        "Alert",
        props.color,
        "enabled",
        "fontWeightAction"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Alert",
        props.color,
        "enabled",
        "action"
      )};
    cursor: pointer;
  }
`;

const getIcon = (color) => {
  if (color == "danger") return "times-circle";
  if (color == "warning") return "exclamation-triangle";
  if (color == "success") return "check-circle";

  return "exclamation-circle";
};

const IconComponent = ({ statusIcon, color }) => {
  if (typeof statusIcon == "boolean" && statusIcon == true) {
    return <Icon className={"alert-icon"} icon={getIcon(color)} />;
  }
  if (typeof statusIcon == "string" && statusIcon !== "") {
    return <Icon className={"alert-icon"} icon={statusIcon} />;
  }
  return React.cloneElement(statusIcon, {
    className: "alert-icon " + statusIcon?.className,
  });
};

const Alert = React.forwardRef((props, ref) => {
  const {
    className = "",
    size = "small",
    color = "primary",
    title,
    actions,
    noIcon = false,
    statusIcon = true,
    children,
    ...rest
  } = props;
  const { theme } = useTheme();
  const themeProps = { theme, size, color };

  return (
    <Container
      ref={ref}
      {...themeProps}
      className={"lnc-ui-alert " + className}
      actions={actions}
      {...rest}
    >
      {noIcon == false && statusIcon && (
        <IconComponent color={color} statusIcon={statusIcon} />
      )}
      <div className="alert-content">
        <div className="alert-title">{title}</div>
        {children}
        <div className="alert-actions">{actions}</div>
      </div>
    </Container>
  );
});

// Alert.defaultProps = {
//   statusIcon: true,
//   noIcon: false,
//   className: "",
//   size: "small",
//   color: "primary",
// };

Alert.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  actions: PropTypes.element,
  /**
   * Can be boolean (true - display default icon, false - don't display icon at all), string (display custom icon), element (display custom element as icon)
   */
  statusIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.bool,
  ]),
  /**
   * Disable display of status icon
   */
  noIcon: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * When `status` is not defined color of alert can be defined with `color` prop
   */
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray",
  ]),
};

export default Alert;
