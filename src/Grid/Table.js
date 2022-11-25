import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CheckBox from "../CheckBox/index";
import TableSelectionType from "../DataView/Constants/TableSelectionType";
import Icon from "../Icon/index";
import theme from "../_utils/theme";

const Container = styled.div`
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
  color: ${theme.palette.primary.textDark};
  border-top: 1px solid #80808025;
`;

const TableHeadRow = styled.tr`
  border-bottom: 1px solid #80808025;
`;

const TableHeadCell = styled.th`
  text-align: left;
  transition: all 250ms ease;
  font-weight: 900;

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
    // background-color: ${theme.palette.primary.light};
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const HeaderInnerCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;

  & i {
    color: black;
  }
`;

const HeaderCellText = styled.span`
  color: black;
`;

const HeaderCellIcon = styled.span`
  color: black;
  margin-left: auto;

  & i {
    color: ${(props) => (props.sort ? "transparent" : "black")};
  }
`;

const TableBody = styled.tbody``;

const TableBodyRowNested = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  background-color: #f7f7f7;
  cursor: normal;
`;

const TableBodyRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  background-color: ${(props) => (props.nested ? "#f7f7f7" : "inherit")};

  ${(props) => {
    if (props.selectedRow !== true)
      return `
      &:hover {
        & > td {
          background-color: #f0f0f0;
        }
  
      cursor: pointer;
    }`;
    else return "";
  }}
  ${(props) => {
    if (props.selectedRow === true)
      return `
      background-color: ${theme.palette.primary.lighter};
      cursor: pointer;
    `;
    else return "";
  }};
`;

const TableBodyCell = styled.td`
  padding: ${(props) =>
    props.selectionCell === true ? "1px 1px 1px 6px" : "5px 5px 5px 10px"};
`;

const Table = (props) => {
  //======================== PROPS ============================================

  const {
    Columns = [],
    Data = [],
    IsLoading = false,
    OnRowClick = () => { },
    Localization = {},
  } = props;

  const {
    Accessor = "",
    Ascending = false,
    Descending = false,
    OnOrder = () => { },
  } = props.Ordering || {};

  const {
    SelectedData = [],
    SelectedEntirePage = false,
    SelectionIndicator = "",
    OnSelection = () => { },
    OnSelectAll = () => { },
  } = props.Selection || {};

  const {
    IsLookup = false,
    ReadOnly = false,
    EnableSelection = false,
    EnableOrdering = false,
    SelectionType = TableSelectionType.SINGLE,
  } = props.Options || {};

  //======================== STATE ============================================

  const [expandedColumns, setExpandedColumns] = useState([]);

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

  const renderEmptySelectionCell = () => {
    if (
      !EnableSelection ||
      ReadOnly ||
      (IsLookup && SelectionType === TableSelectionType.SINGLE)
    )
      return <></>;

    return <td></td>;
  };

  const renderGroupBodyRows = (col, dataItem) => {
    var nestedArray;
    if (col) nestedArray = dataItem[col.accessor];

    if (nestedArray) {
      return dataItem[col.accessor].map((x, i) => {
        return (
          <TableBodyRowNested key={i + 100}>
            {renderEmptySelectionCell()}
            <td></td>
            {Columns.map((col, j) => {
              return renderBodyCell(x, col, i + 100, j + 100);
            })}
          </TableBodyRowNested>
        );
      });
    }

    return <></>;
  };

  const renderBodyRow = (dataItem, i) => {
    var nested = Columns.find((x) => x.nested === true);
    let rowSelected = isRowSelected(dataItem);
    var nestedArray;

    if (nested) nestedArray = dataItem[nested.accessor];

    return (
      <>
        <TableBodyRow
          selectedRow={rowSelected}
          key={i}
          onClick={() => {
            if (expandedColumns.includes(dataItem[SelectionIndicator])) {
              setExpandedColumns(
                expandedColumns.filter((x) => x != dataItem[SelectionIndicator])
              );
            } else {
              setExpandedColumns([
                ...expandedColumns,
                dataItem[SelectionIndicator],
              ]);
            }
          }}
        >
          {renderSelectionCell(dataItem, rowSelected)}
          {nested && nestedArray && nestedArray.length > 0 ? (
            <td>
              <Icon
                color={"primary"}
                icon={
                  expandedColumns.includes(dataItem[SelectionIndicator])
                    ? "caret-square-down"
                    : "caret-square-right"
                }
              />
            </td>
          ) : (
            <td></td>
          )}

          {Columns.map((col, j) => {
            return renderBodyCell(dataItem, col, i, j);
          })}
        </TableBodyRow>

        {expandedColumns.includes(dataItem[SelectionIndicator]) &&
          renderGroupBodyRows(nested, dataItem)}
      </>
    );
  };

  const renderHeaderCell = (col, i) => {
    var hideOrdering = !EnableOrdering || !col.sort;

    var isOrderByColumn = col.accessor === Accessor;

    let onClick =
      IsLoading || hideOrdering ? () => { } : () => OnOrder(col.accessor);
    var orderingIconClass = "sort";

    if (isOrderByColumn && Ascending) orderingIconClass = "long-arrow-alt-up";

    if (isOrderByColumn && Descending)
      orderingIconClass = "long-arrow-alt-down";

    if (isOrderByColumn && !Ascending && !Descending)
      orderingIconClass = "sort";

    if (!isOrderByColumn || Accessor === "") orderingIconClass = "sort";

    return (
      <TableHeadCell key={i} onClick={onClick}>
        <HeaderInnerCell>
          <HeaderCellText> {col.name}</HeaderCellText>

          {!hideOrdering && (
            <HeaderCellIcon sort={orderingIconClass === "sort"}>
              <Icon color={"white"} icon={orderingIconClass} />
            </HeaderCellIcon>
          )}
        </HeaderInnerCell>
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
        onClick={col.render ? () => { } : () => OnRowClick(dataItem, col)}
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
      title = Localization.SelectAll;

    return (
      <TableHeadCell selectionCell={true} key={-1} title={title}>
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
              <th
                style={{
                  width: "13px",
                }}
              ></th>
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
  OnOrder: () => { },
  //----------------------
  SelectedData: [],
  SelectedEntirePage: false,
  SelectionIndicator: "id",
  OnSelection: () => { },
  OnSelectAll: () => { },
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
