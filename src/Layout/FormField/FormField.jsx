/* eslint-disable react/prop-types */
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
      "text",
    )};
`;

const FormField = (props) => {
  const {
    size = "small",
    color = "primary",
    className = "",
    style = {},
    text = "",
    label = "",
    children,
  } = props;

  const theme = useTheme();

  return (
    <div style={style} className={"lnc-ui-form-field " + className}>
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

// FormField.defaultProps = {
//   text: "",
//   label: "",
//   size: "small",
//   color: "primary",
//   style: {},
//   className: "",
// };

export default FormField;
