/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
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
    getColorRgbaValue(
      props.theme,
      "FormField",
      props.color,
      "enabled",
      "text"
    )};
`;

const Label = forwardRef((props, ref) => {
  const {
    size = "small",
    color = "primary",
    className = "",
    style = {},
    children,
  } = props;

  const theme = useTheme();

  return (
    <StyledLabel
      theme={theme}
      size={size}
      className={"lnc-ui-label " + className}
      style={style}
      color={color}
      ref={ref}
    >
      {children}
    </StyledLabel>
  );
});

Label.defaultProps = {
  style: {},
  size: "small",
  color: "primary",
};

export default Label;
