import React from "react";
import TableSelectionType from "../DataView/Constants/TableSelectionType";
import PropTypes from "prop-types";
import Icon from "../Icon/index";
import style from "./style.module.css";

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

  const renderEmptySelectionCell = () => {
    if (
      !EnableSelection ||
      ReadOnly ||
      (IsLookup && SelectionType === TableSelectionType.SINGLE)
    )
      return <></>;

    return (
      <td
        className={[
          style["table-cell"],
          style["special-cell-render"],
          style["select-checkbox"],
        ].join(" ")}
      ></td>
    );
  };

  const renderGroupBodyRows = (col, dataItem) => {
    if (col) var nestedArray = dataItem[col.accessor];

    if (nestedArray) {
      return dataItem[col.accessor].map((x, i) => {
        return (
          <tr
            key={i + 100}
            className={[
              style["table-row-group-by-nested"],
              style["table-row-odd"],
            ].join(" ")}
          >
            {renderEmptySelectionCell()}
            {Columns.map((col, j) => {
              return renderBodyCell(x, col, i + 100, j + 100);
            })}
          </tr>
        );
      });
    }

    return <></>;
  };

  const renderBodyRow = (dataItem, i) => {
    var nested = Columns.find((x) => x.nested);

    let eveOddClass =
      i % 2 === 0
        ? style["table-row-even"] + " "
        : style["table-row-odd"] + " ";
    if (nested) eveOddClass = style["table-row-even"] + " ";

    let rowSelected = isRowSelected(dataItem);
    let selectedRowClass = rowSelected ? style["selected-row"] + " " : "";
    let tableRowClass = nested
      ? style["table-row-group-by"] + " "
      : style["table-row"] + " ";

    return (
      <>
        <tr key={i} className={selectedRowClass + eveOddClass + tableRowClass}>
          {renderSelectionCell(dataItem, rowSelected)}
          {Columns.map((col, j) => {
            return renderBodyCell(dataItem, col, i, j);
          })}
        </tr>

        {renderGroupBodyRows(nested, dataItem)}
      </>
    );
  };

  const renderHeaderCell = (col, i) => {
    var hideOrdering = !EnableOrdering || !col.sort;

    var isOrderByColumn = col.accessor === Accessor;

    let onClick =
      IsLoading || hideOrdering ? () => {} : () => OnOrder(col.accessor);
    var orderingIconClass = "lnc-arrow-down-up";

    if (isOrderByColumn && Ascending) orderingIconClass = "lnc-arrow-up";

    if (isOrderByColumn && Descending) orderingIconClass = "lnc-arrow-down";

    if (isOrderByColumn && !Ascending && !Descending)
      orderingIconClass = "lnc-arrow-down-up";

    if (!isOrderByColumn || Accessor === "")
      orderingIconClass = "lnc-arrow-down-up";

    return (
      <th key={i} className={style["table-cell-header"]} onClick={onClick}>
        <div className={style["table-cell-header-inner"]}>
          {col.name}

          {!hideOrdering ? (
            <div className={style["header-cell-icon"]}>
              <Icon iconClassName={orderingIconClass}></Icon>
            </div>
          ) : (
            <></>
          )}
        </div>
      </th>
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
      <td
        className={[
          style["table-cell"],
          style["special-cell-render"],
          style["select-checkbox"],
        ].join(" ")}
        onClick={() => {
          OnSelection(dataItem);
        }}
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={() => {}}
          className={style["pointer"]}
        ></input>
      </td>
    );
  };

  const renderBodyCell = (dataItem, col, rowIndex, cellIndex) => {
    var tabIndex = rowIndex * Columns.length + cellIndex + 50;
    var className = style["table-cell"];

    return (
      <td
        key={tabIndex}
        className={className}
        onClick={col.render ? () => {} : () => OnRowClick(dataItem, col)}
      >
        {col.render
          ? col.render(dataItem, col)
          : Array.isArray(dataItem[col.accessor])
          ? ""
          : dataItem[col.accessor]}
      </td>
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
      <th
        className={[style["table-cell-header"], style["select-checkbox"]].join(
          " "
        )}
      >
        {SelectionType === TableSelectionType.MULTIPLE ? (
          <input
            title={title}
            type="checkbox"
            checked={SelectedEntirePage}
            onChange={handleSelectAll}
            className={style["pointer"]}
          ></input>
        ) : (
          <></>
        )}
      </th>
    );
  };

  return (
    <div className={style["table-container"]}>
      <table className={style["table"]} cellSpacing={0}>
        <thead>
          <tr key={"header"}>
            {renderSelectAllHeaderCell()}
            {Columns.map((col, i) => renderHeaderCell(col, i))}
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
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
