/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../../_utils/utils";

const HtmlRow = styled.tr`
  border-bottom: ${(props) =>
    "1px solid " +
    getColorRgbaValue(props.theme, "TableRow", null, "enabled", "border")};

  border-left: ${(props) =>
    "1px solid " +
    getColorRgbaValue(props.theme, "TableRow", null, "enabled", "border")};

  border-right: ${(props) =>
    "1px solid " +
    getColorRgbaValue(props.theme, "TableRow", null, "enabled", "border")};

  &:last-of-type > td:first-of-type {
    border-radius: 0 0 0 0.5rem;
  }

  &:last-of-type > td:last-of-type {
    border-radius: 0 0 0.5rem 0;
  }

  ${(props) => {
    if (props.IsSelected !== true)
      return `
       &:hover {
          & > td {
            background-color: ${getColorRgbaValue(
              props.theme,
              "TableRow",
              null,
              "hover",
              "background",
            )};
          }
      }`;
    else return "";
  }}

  ${(props) => {
    if (props.IsSelected === true) {
      return `
        & > td {
          background-color: ${getColorRgbaValue(
            props.theme,
            "TableRow",
            props.color,
            "active",
            "background",
          )};
        }
      `;
    } else return "";
  }}
`;

const EditableTableRow = (props) => {
  //--------------------------
  const {
    Index,
    IsSelected = null,
    //----------------
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
    <HtmlRow {...themeProps} key={Index} IsSelected={IsSelected}>
      {props.children}
    </HtmlRow>
  );
};

// TODO : type
// EditableTableRow.defaultProps = {
//   __TYPE__: "TABLE_ROW",
//   //--------------------
//   RowData: {},
//   IsSelected: null,
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default EditableTableRow;

EditableTableRow.displayName = "TABLE_ROW";
