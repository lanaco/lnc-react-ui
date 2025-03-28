import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import Checkbox from "../../../Basic Inputs/CheckBoxInput/CheckBoxInput";
import { getColorRgbaValue } from "../../../_utils/utils";

const HtmlCell = styled.td`
  padding: 0 0 0 1.25rem;
  background-color: ${(props) =>
    getColorRgbaValue(props.theme, "TableRow", null, "enabled", "background")};

  width: ${(props) => props.width}%;
  ${(props) => props.bgColor}
`;

const TableSelectionCell = (props) => {
  //--------------------------
  const {
    __TYPE__ = "TABLE_SELECTION_CELL",
    RowData = {},
    onSelectRow = () => {},
    IsSelected = null,
    Index = 0,
    EnableRowHighlight = false,
    GetRowHighlightColor = () => "",
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

  const onChange = (e, value) => {
    onSelectRow(e, RowData, IsSelected);
  };

  const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
  };

  const getBgColor = () => {
    var color = GetRowHighlightColor(RowData);

    if (EnableRowHighlight === true && isColor(color))
      return `
        background-color: ${color};
      `;

    return "";
  };

  return (
    <HtmlCell
      bgColor={getBgColor()}
      {...themeProps}
      key={Index}
      width={props.width}
    >
      <Checkbox id={Index} checked={IsSelected} onChange={onChange} />
    </HtmlCell>
  );
};

// TODO : type
// TableSelectionCell.defaultProps = {
//   __TYPE__: "TABLE_SELECTION_CELL",
//   //--------------------
//   Column: {},
//   RowData: {},
//   onSelectRow: () => {},
//   Index: 0,
//   IsSelected: null,
//   EnableRowHighlight: false,
//   GetRowHighlightColor: () => "",
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

TableSelectionCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Column: PropTypes.object,
  RowData: PropTypes.object,
  onSelectRow: PropTypes.func,
  Index: PropTypes.number,
  SelectedData: PropTypes.array,
  IsSelected: PropTypes.bool,
  EnableRowHighlight: PropTypes.bool,
  GetRowHighlightColor: PropTypes.func,
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

export default TableSelectionCell;

TableSelectionCell.displayName = "TABLE_SELECTION_CELL";
