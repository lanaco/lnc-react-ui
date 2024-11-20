import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import {
  getBorderRadiusValueWithUnits,
  getBoxShadowValue,
} from "../../_utils/utils";

const Container = styled.div`
  padding: ${(props) => props.padding};
  box-shadow: ${(props) => getBoxShadowValue(props.theme, props.boxShadow)};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
  width: ${(props) => (props.fullWidth ? "100%" : "fit-content")};
  border-top: 1px solid rgba(0, 0, 0, 0.04);
`;

const Surface = ({
  children,
  style = {},
  className = "",
  boxShadow = "s",
  borderRadius = "regular",
  padding = "s",
  fullWidth = false,
}) => {
  const theme = useTheme();

  const paddingMap = {
    xs: "0.25rem",
    s: "0.5rem",
    m: "0.75rem",
    l: "1rem",
    xl: "1.25rem",
    xxl: "1.5rem",
  };

  return (
    <Container
      theme={theme}
      style={style}
      className={"lnc-ui-surface " + className}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      padding={paddingMap[padding]}
      fullWidth={fullWidth}
    >
      {children}
    </Container>
  );
};

// Surface.defaultProps = {
//   borderRadius: "regular",
//   boxShadow: "s",
//   padding: "s",
//   fullWidth: false,
//   className: "",
//   style: {},
// };

Surface.propTypes = {
  borderRadius: PropTypes.oneOf([
    "slight",
    "regular",
    "edged",
    "curved",
    "none",
  ]),
  boxShadow: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  paddign: PropTypes.oneOf(["xs", "s", "m", "l", "xl", "xxl"]),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Surface;
