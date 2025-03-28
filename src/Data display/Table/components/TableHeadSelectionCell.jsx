import styled from "@emotion/styled";
import PropTypes from "prop-types";
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
      "background"
    )}};
  border-top: ${(props) =>
    "1px solid " +
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "border"
    )}};
  
  border-bottom: ${(props) =>
    "1px solid " +
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "border"
    )}};
  
  border-radius: 0.5rem 0 0 0;
`;

const TableHeadSelectionCell = (props) => {
  //--------------------------
  const {
    __TYPE__ = "TABLE_HEAD_SELECTION_CELL",
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

TableHeadSelectionCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Index: PropTypes.number,
  IsSelected: PropTypes.bool,
  EnableSelectAll: PropTypes.bool,
  //----------------------------------------
  className: PropTypes.string,
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

export default TableHeadSelectionCell;

TableHeadSelectionCell.displayName = "TABLE_HEAD_SELECTION_CELL";
