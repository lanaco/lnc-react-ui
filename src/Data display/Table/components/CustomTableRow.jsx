/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "styled-components";

const HtmlRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  ${(props) => {
    if (props.IsSelected !== true)
      return `
        &:hover {
          & > td {
            background-color: black;
            color: white;
          }
          cursor: pointer;
      }`;
    else return "";
  }}

  ${(props) => {
    if (props.IsSelected === true)
      return `
        background-color: ${theme.palette.primary.lighter};
        cursor: pointer;
      `;
    else return "";
  }}
`;

const CustomTableRow = (props) => {
  //--------------------------
  const { Index, IsSelected } = props;

  const theme = useTheme();

  return (
    <HtmlRow IsSelected={IsSelected} key={Index} theme={theme}>
      {props.children}
    </HtmlRow>
  );
};

// TODO : type
// CustomTableRow.defaultProps = {
//   __TYPE__: "TABLE_ROW",
//   //--------------------
// };

export default CustomTableRow;

CustomTableRow.displayName = "TABLE_ROW";
