/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getComponentTypographyCss } from "../../../_utils/utils";

const SpecialRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgba(248, 250, 252, 100%);
  border: 1px solid rgba(203, 213, 225, 100%);
  margin-top: 0.5rem;
  overflow-x: auto;

  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "TableSpecialLastRow",
      props.size,
      "enabled",
    )};

  transition: all 0.2s ease;

  &:disabled {
    color: gray;
    border: 1px solid gray;
    background-color: gray;
  }

  &:focus {
    outline: none;
    border: 1px solid teal;
    background-color: whitesmoke;
  }

  &:hover {
    outline: none;
    border: 1px solid teal;
    background-color: whitesmoke;
  }

  ${(props) =>
    !props.disabled
      ? ""
      : `
          cursor: default;
          color: gray;
          border: 1px solid gray;
        `}
`;

const TableSpecialLastRow = (props) => {
  //--------------------------
  const {
    Loading = false,
    Disabled,
    Data,
    ColumnsToRender,
    onClick,
    TabIndexOffset,
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
    <SpecialRow
      disabled={Disabled}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !Loading) onClick(true);
      }}
      onClick={() => {
        if (!Loading) onClick(false);
      }}
      tabIndex={
        TabIndexOffset +
        ColumnsToRender.filter((x) => x.editable).length * Data.length
      }
      {...themeProps}
    >
      Add new invoice
    </SpecialRow>
  );
};

// TODO : type
// TableSpecialLastRow.defaultProps = {
//   __TYPE__: "TABLE_SPECIAL_LAST_ROW",
//   //--------------------
//   Loading: false,
//   onRowClick: () => {},
//   onSelectRow: () => {},
//   RowData: {},
//   //--------------------
//   IsSelected: null,
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default TableSpecialLastRow;

TableSpecialLastRow.displayName = "TABLE_SPECIAL_LAST_ROW";
