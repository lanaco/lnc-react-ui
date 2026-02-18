/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const Container = styled.div`
  padding: 10px;
  margin: 2px;
  border: 1px solid red;
  border-radius: 2px;
  overflow-x: auto;
  white-space: nowrap;
  font-size: ${(p) => p.theme.typography.small.fontSize};
  font-family: ${(p) => p.theme.typography.fontFamily};
  position: relative;
`;

const CustomTableContainer = (props) => {
  //--------------------------
  const { className = "", size = "small", color = "primary" } = props;
  const theme = useTheme();

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return <Container {...themeProps}>{props.children}</Container>;
};

// TODO : type
// CustomTableContainer.defaultProps = {
//   __TYPE__: "TABLE_CONTAINER",
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default CustomTableContainer;

CustomTableContainer.displayName = "TABLE_CONTAINER";
