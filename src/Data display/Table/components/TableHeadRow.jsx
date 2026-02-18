/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const HtmlRow = styled.tr`
  border-radius: 0.5rem 0.5rem 0 0;
`;

const TableHeadRow = (props) => {
  //--------------------------
  const {
    Index = 0,
    //-------------
    className = "",
    size = "small",
    color = "primary",
  } = props;

  const theme = useTheme();

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return (
    <HtmlRow {...themeProps} key={Index}>
      {props.children}
    </HtmlRow>
  );
};

// TODO : type
// TableHeadRow.defaultProps = {
//   __TYPE__: "TABLE_HEAD_ROW",
//   //--------------------
//   Index: 0,
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default TableHeadRow;

TableHeadRow.displayName = "TABLE_HEAD_ROW";
