/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const HtmlHead = styled.thead`
  border-radius: 0.5rem 0.5rem 0 0;
`;

const TableHead = (props) => {
  //--------------------------
  const { className = "", size = "small", color = "primary" } = props;
  const theme = useTheme();

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return <HtmlHead {...themeProps}>{props.children}</HtmlHead>;
};

// TODO : type
// TableHead.defaultProps = {
//   __TYPE__: "TABLE_HEAD",
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default TableHead;

TableHead.displayName = "TABLE_HEAD";
