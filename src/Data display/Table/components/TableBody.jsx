/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const HtmlBody = styled.tbody``;

const TableBody = (props) => {
  //--------------------------
  const { className = "", size = "small", color = "primary" } = props;

  const theme = useTheme();

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return (
    <HtmlBody data-tbody={true} {...themeProps}>
      {props.children}
    </HtmlBody>
  );
};

// TODO : type
// TableBody.defaultProps = {
//   __TYPE__: "TABLE_BODY",
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default TableBody;

TableBody.displayName = "TABLE_BODY";
