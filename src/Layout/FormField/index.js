import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  ${(props) =>
    getComponentTypographyCss(props.theme, "FormField", props.size, "enabled")}
  color: ${(props) =>
    getColorRgbaValue(props.theme, "FormField", "primary", "enabled", "label")};
`;

const StyledText = styled.span`
  display: block;
  margin-top: 8px;
  ${(props) =>
    getComponentTypographyCss(props.theme, "FormField", props.size, "enabled")}
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "FormField",
      props.color,
      "enabled",
      "text"
    )};
`;

const FormField = (props) => {
  const { size, color, text, label, children, style, className, ...rest } = props;

  const theme = useTheme();

  return (
    <div style={style} className={className}>
      {label && (
        <StyledLabel theme={theme} size={size}>
          {label}
        </StyledLabel>
      )}
      {children}
      {text && (
        <StyledText size={size} theme={theme} color={color}>
          {text}
        </StyledText>
      )}
    </div>
  );
};

FormField.defaultProps = {
  text: "",
  label: "",
  size: "small",
  color: "primary",
  style: {},
  className: "",
};

FormField.propTypes = {
  /**
   * Additional text that appears below the main element.
   */
  text: PropTypes.string,
  /**
   * Label text that appears above the main element.
   */
  label: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray"
  ]),
  style: PropTypes.object,
  className: PropTypes.string,
};

export default FormField;
