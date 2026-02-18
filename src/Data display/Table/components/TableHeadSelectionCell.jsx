/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Checkbox from "../../../Basic Inputs/CheckBoxInput/CheckBoxInput";
import { getColorRgbaValue } from "../../../_utils/utils";

const HtmlCell = styled.th`
  text-align: left;
  width: ${(props) => props.width};
  padding-left: 1.25rem;
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "background",
    )};
  border-top: ${(props) =>
    "1px solid " +
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "border",
    )};
  
  border-bottom: ${(props) =>
    "1px solid " +
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "border",
    )};
  
  border-radius: 0.5rem 0 0 0;
`;

const TableHeadSelectionCell = (props) => {
  //--------------------------
  const {
    EnableSelectAll,
    IsSelected = null,
    Index = 0,
    onSelectAll,
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
    <HtmlCell
      {...themeProps}
      selection={EnableSelectAll}
      key={Index}
      width={props.width}
    >
      {EnableSelectAll && (
        <Checkbox
          id={Index}
          checked={IsSelected ? IsSelected : false}
          onChange={(e) => onSelectAll(e, IsSelected)}
        />
      )}
    </HtmlCell>
  );
};

// TODO : type
// TableHeadSelectionCell.defaultProps = {
//   __TYPE__: "TABLE_HEAD_SELECTION_CELL",
//   //--------------------
//   Index: 0,
//   IsSelected: null,
//   GetRowHighlightColor: () => "",
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default TableHeadSelectionCell;

TableHeadSelectionCell.displayName = "TABLE_HEAD_SELECTION_CELL";
