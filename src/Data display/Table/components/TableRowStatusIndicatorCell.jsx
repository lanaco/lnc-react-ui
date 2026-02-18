/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { statusColor } from "../constants/constants";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.25rem 0.125rem;
`;

const Indicator = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  border-radius: 100px;
  background-color: ${(props) => props.bgColor} !important;
`;

const TableRowStatusIndicatorCell = (props) => {
  //--------------------------
  const {
    RowData = {},
    Index,
    GetRowStatusIndicatorColor,
    //----------------
    className = "",
    size = "small",
    color = "Primary",
  } = props;

  const theme = useTheme();

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  const getWidth = () => {
    return "4px";
  };

  const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
  };

  return (
    <HtmlCell
      {...themeProps}
      width={getWidth()}
      key={Index}
      bgColor={() => {
        var color = GetRowStatusIndicatorColor(RowData);

        if (isColor(color)) return color;

        return statusColor.NONE;
      }}
    >
      <Indicator
        {...themeProps}
        width={getWidth()}
        bgColor={() => {
          var color = GetRowStatusIndicatorColor(RowData);

          if (isColor(color)) return color;

          return statusColor.NONE;
        }}
      />
    </HtmlCell>
  );
};

// TODO : type
// TableRowStatusIndicatorCell.defaultProps = {
//   __TYPE__: "TABLE_ROW_STATUS_INDICATOR_CELL",
//   //--------------------
//   Column: {},
//   RowData: {},
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default TableRowStatusIndicatorCell;

TableRowStatusIndicatorCell.displayName = "TABLE_ROW_STATUS_INDICATOR_CELL";
