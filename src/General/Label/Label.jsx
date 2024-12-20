/* eslint-disable react/display-name */
import { forwardRef } from "react";
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

Label.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
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

export default Label;
