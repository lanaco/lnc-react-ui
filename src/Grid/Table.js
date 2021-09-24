import React from "react";
import CheckBox from "../CheckBox/index";
import TableSelectionType from "../DataView/Constants/TableSelectionType";
import PropTypes from "prop-types";
import Icon from "../Icon/index";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import baseStyle from "../Base/styles.module.css";

const Container = styled.div`
  border: 1.5px solid rgba(165, 164, 164, 0.4);
  border-radius: 3px;
  font-size: ${theme.typography.small.fontSize};
  font-family: ${theme.typography.fontFamily};
`;

const Wrapper = styled.div``;

const TableTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHead = styled.thead`
  background-color: ${theme.palette.primary.main};
  color: ${theme.palette.primary.text};
`;

const TableHeadRow = styled.tr``;

const TableHeadCell = styled.th`
  text-align: left;
  transition: all 250ms ease;

  ${(props) =>
    props.selectionCell === true
      ? "width: 27px; padding: 1px 1px 1px 6px;"
      : "padding: 5px 5px 5px 6px;"}

  &:first-of-type {
    border-radius: 3px 0 0 0;
  }

  &:last-of-type {
    border-radius: 0 3px 0 0;
  }

  &:hover {
    background-color: ${theme.palette.primary.light};
    cursor: pointer;
  }
`;

const TableBody = styled.tbody``;

const TableBodyRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  ${(props) => {
    if (props.selectedRow !== true)
      return `
        &:nth-of-type(even) {
          background-color: #f5f5f5;
        }

        &:hover {
          & > td {
            border-bottom: 1px solid ${theme.palette.primary.light};
            border-top: 1px solid ${theme.palette.primary.light};
          }
    
        cursor: pointer;
      }`;
    else return "";
  }}

  ${(props) => {
    if (props.selectedRow === true)
      return `
        background-color: ${theme.palette.primary.lighter};
        
        & > td {
          border-bottom: 1px solid ${theme.palette.primary.light};
          border-top: 1px solid ${theme.palette.primary.light};
        }
      `;
    else return "";
  }}
`;

const TableBodyCell = styled.td`
  ${(props) =>
    props.selectionCell === true
      ? "padding: 1px 1px 1px 6px;"
      : "padding: 5px 5px 5px 10px;"}
`;

const Table = (props) => {
  //======================== PROPS ============================================

  const {
    Columns = [],
    Data = [],
    IsLoading = false,
    OnRowClick = () => {},
    Localization = {},
  } = props;

  const {
    Accessor = "",
    Ascending = false,
    Descending = false,
    OnOrder = () => {},
  } = props.Ordering || {};

  const {
    SelectedData = [],
    SelectedEntirePage = false,
    SelectionIndicator = "",
    OnSelection = () => {},
    OnSelectAll = () => {},
  } = props.Selection || {};

  const {
    IsLookup = false,
    ReadOnly = false,
    EnableSelection = false,
    EnableOrdering = false,
    SelectionType = TableSelectionType.SINGLE,
  } = props.Options || {};

  //======================== STATE ============================================

  //======================== METHODS ==========================================

  const handleSelectAll = () => {
    OnSelectAll();
  };

  const isRowSelected = (dataItem) => {
    var selected = SelectedData.find(
      (x) => x[SelectionIndicator] === dataItem[SelectionIndicator]
    );

    if (selected) return true;

    return false;
  };

  //======================== RENDER ===========================================

  const renderBody = () => {
    return <>{Data.map((dataItem, i) => renderBodyRow(dataItem, i))}</>;
  };

  // const renderEmptySelectionCell = () => {
  //   if (
  //     !EnableSelection ||
  //     ReadOnly ||
  //     (IsLookup && SelectionType === TableSelectionType.SINGLE)
  //   )
  //     return <></>;

  //   return (
  //     <td
  //       className={[
  //         style["table-cell"],
  //         style["special-cell-render"],
  //         style["select-checkbox"],
  //       ].join(" ")}
  //     ></td>
  //   );
  // };

  // const renderGroupBodyRows = (col, dataItem) => {
  //   if (col) var nestedArray = dataItem[col.accessor];

  //   if (nestedArray) {
  //     return dataItem[col.accessor].map((x, i) => {
  //       return (
  //         <tr
  //           key={i + 100}
  //           className={[
  //             style["table-row-group-by-nested"],
  //             style["table-row-odd"],
  //           ].join(" ")}
  //         >
  //           {renderEmptySelectionCell()}
  //           {Columns.map((col, j) => {
  //             return renderBodyCell(x, col, i + 100, j + 100);
  //           })}
  //         </tr>
  //       );
  //     });
  //   }

  //   return <></>;
  // };

  const renderBodyRow = (dataItem, i) => {
    var nested = Columns.find((x) => x.nested);
    let rowSelected = isRowSelected(dataItem);

    return (
      <>
        <TableBodyRow selectedRow={rowSelected} key={i}>
          {renderSelectionCell(dataItem, rowSelected)}
          {Columns.map((col, j) => {
            return renderBodyCell(dataItem, col, i, j);
          })}
        </TableBodyRow>

        {/* {renderGroupBodyRows(nested, dataItem)} */}
      </>
    );
  };

  const renderHeaderCell = (col, i) => {
    var hideOrdering = !EnableOrdering || !col.sort;

    var isOrderByColumn = col.accessor === Accessor;

    let onClick =
      IsLoading || hideOrdering ? () => {} : () => OnOrder(col.accessor);
    var orderingIconClass = "sort";

    if (isOrderByColumn && Ascending) orderingIconClass = "sort-up";

    if (isOrderByColumn && Descending) orderingIconClass = "sort-down";

    if (isOrderByColumn && !Ascending && !Descending)
      orderingIconClass = "sort";

    if (!isOrderByColumn || Accessor === "") orderingIconClass = "sort";

    return (
      <TableHeadCell key={i} onClick={onClick}>
        <div>
          {col.name}

          {!hideOrdering && <Icon color={"white"} icon={orderingIconClass} />}
        </div>
      </TableHeadCell>
    );
  };

  const renderSelectionCell = (dataItem, selected) => {
    if (
      !EnableSelection ||
      ReadOnly ||
      (IsLookup && SelectionType === TableSelectionType.SINGLE)
    )
      return <></>;

    // console.log(dataItem, selected);

    return (
      <TableBodyCell selectionCell={true} key={-1}>
        <CheckBox
          checked={selected}
          onChange={() => {
            OnSelection(dataItem);
          }}
          id={dataItem["id"]}
        />
      </TableBodyCell>
    );
  };

  const renderBodyCell = (dataItem, col, rowIndex, cellIndex) => {
    var tabIndex = rowIndex * Columns.length + cellIndex + 50;

    return (
      <TableBodyCell
        key={tabIndex}
        onClick={col.render ? () => {} : () => OnRowClick(dataItem, col)}
      >
        {col.render
          ? col.render(dataItem, col)
          : Array.isArray(dataItem[col.accessor])
          ? ""
          : dataItem[col.accessor]}
      </TableBodyCell>
    );
  };

  const renderSelectAllHeaderCell = () => {
    if (
      !EnableSelection ||
      ReadOnly ||
      (IsLookup && SelectionType === TableSelectionType.SINGLE)
    )
      return <></>;

    var title = SelectedEntirePage ? "Deselect all" : "Select all";

    if (SelectedEntirePage && Localization.DeselectAll)
      title = Localization.DeselectAll;

    if (!SelectedEntirePage && Localization.SelectAll)
      title = Localization.DeselectAll;

    return (
      <TableHeadCell selectionCell={true} key={-1}>
        {SelectionType === TableSelectionType.MULTIPLE && (
          <CheckBox checked={SelectedEntirePage} onChange={handleSelectAll} />
        )}
      </TableHeadCell>
    );
  };

  return (
    <Container>
      <Wrapper>
        <TableTable cellSpacing={0}>
          <TableHead>
            <TableHeadRow>
              {renderSelectAllHeaderCell()}
              {Columns.map((col, i) => renderHeaderCell(col, i))}
            </TableHeadRow>
          </TableHead>
          <TableBody>{renderBody()}</TableBody>
        </TableTable>
      </Wrapper>
    </Container>
  );
};

Table.defaultProps = {
  theme: theme,
  size: "small",
  color: "primary",
  //----------------------
  Options: {},
  Selection: {},
  Ordering: {},
  //----------------------
  Accessor: "",
  Ascending: false,
  Descending: false,
  OnOrder: () => {},
  //----------------------
  SelectedData: [],
  SelectedEntirePage: false,
  SelectionIndicator: "id",
  OnSelection: () => {},
  OnSelectAll: () => {},
  //----------------------
  Columns: [],
  Data: [],
  IsLoading: false,
  //----------------------
  ReadOnly: false,
  EnablePagination: false,
  EnableSelection: false,
  EnableOrdering: false,
  SelectionType: "single",
};

Table.propTypes = {
  theme: PropTypes.object.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  //----------------------
  Options: PropTypes.object,
  Selection: PropTypes.object,
  Ordering: PropTypes.object,
  //----------------------
  Accessor: PropTypes.string,
  Ascending: PropTypes.bool,
  Descending: PropTypes.bool,
  OnOrder: PropTypes.func,
  //----------------------
  SelectedData: PropTypes.array,
  SelectedEntirePage: PropTypes.bool,
  SelectionIndicator: PropTypes.any,
  OnSelection: PropTypes.func,
  OnSelectAll: PropTypes.func,
  //----------------------
  Columns: PropTypes.array.isRequired,
  Data: PropTypes.array.isRequired,
  IsLoading: PropTypes.bool,
  //----------------------
  ReadOnly: PropTypes.bool,
  EnablePagination: PropTypes.bool,
  EnableSelection: PropTypes.bool,
  EnableOrdering: PropTypes.bool,
  SelectionType: PropTypes.oneOf(["single", "multiple"]),
};

export default Table;
