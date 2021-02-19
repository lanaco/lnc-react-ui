import { isUndefined } from "lodash";
import React from "react";
import TableSelectionType from "./Constants/TableSelectionType";
import styles from "./styles.module.css";
import { mergeCSS } from "./Helper/Helper";
import Pagination from "./Pagination";

const TableView = (props) => {
  //======== RENDER ========

  const {
    Columns,
    Data,
    IsLoading,
    ChangeToFormView,
    SelectedData,
    SelectionIndicator,
    SelectedEntirePage,
    EnableSelection,
    EnableFormView,
    SelectionType,
    OnSelection = () => {},
    OnSelectAll = () => {},
    EnablePagination,
    EnableOrdering,
    Accessor,
    Ascending,
    Descending,
    OnHeaderClick = () => {},
  } = props.Config;

  const { Localization = {}, Export = () => {}, Icons = {} } = props;

  //======== FUNCTIONS ========

  function isFunction(functionToCheck) {
    return (
      functionToCheck &&
      {}.toString.call(functionToCheck) === "[object Function]"
    );
  }

  const handleOnSelection = (rowData, e) => {
    OnSelection(rowData, e.target.checked, SelectionType);
  };

  //======== RENDER ========

  const renderSelectionHeader = () => {
    if (!EnableSelection) return null;

    return (
      <th className={mergeCSS([styles.header, styles.selectColumn])}>
        {renderSelectAll()}
      </th>
    );
  };

  const renderSelectAll = () => {
    if (SelectionType === TableSelectionType.MULTIPLE) {
      return (
        <input
          title={
            SelectedEntirePage
              ? Localization.DeselectAll
              : Localization.SelectAll
          }
          type="checkbox"
          checked={SelectedEntirePage}
          onChange={(e) => OnSelectAll(e.target.checked)}
          className={styles.pointer}
        ></input>
      );
    }

    return null;
  };

  const isItemInArray = (item, array, byProp) => {
    if (item[byProp] !== undefined)
      return !isUndefined(array.find((x) => x[byProp] === item[byProp]));

    return array.indexOf(item) > -1;
  };

  const renderSelectionCheckbox = (rowData) => {
    if (EnableSelection) {
      return (
        <td
          className={mergeCSS([styles.specialRenderCell, styles.selectColumn])}
        >
          <input
            type="checkbox"
            checked={isItemInArray(rowData, SelectedData, SelectionIndicator)}
            onChange={(e) => handleOnSelection(rowData, e)}
            className={styles.pointer}
          ></input>
        </td>
      );
    } else return <></>;
  };

  const renderHeader = () => {
    return (
      <tr>
        {renderSelectionHeader()}
        {Columns.filter((x) => x.hide !== true).map((def, i) =>
          renderHeaderCell(def, i)
        )}
      </tr>
    );
  };

  const renderBody = () => {
    return Data.map((row, i) => renderRow(row, i));
  };

  const renderRow = (rowData, key) => {
    let evenOddClass = key % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd;
    let selectionClass = isItemInArray(
      rowData,
      SelectedData,
      SelectionIndicator
    )
      ? styles.checkedRow
      : "";

    return (
      <tr key={key} className={evenOddClass + " " + selectionClass}>
        {renderSelectionCheckbox(rowData)}
        {Columns.filter((x) => x.hide !== true).map((def, i) =>
          renderCell(rowData, def, i)
        )}
      </tr>
    );
  };

  const renderCell = (rowData, def, key) => {
    let onClick = !isFunction(def.specialRender)
      ? () => {
          ChangeToFormView(rowData);
        }
      : () => {};

    if (!EnableFormView) onClick = () => {};

    if (!EnableFormView && EnableSelection) {
      var checked = isItemInArray(rowData, SelectedData, SelectionIndicator);

      onClick = () =>
        handleOnSelection(rowData, { target: { checked: !checked } });
    }

    let cellData =
      def.isObject === true
        ? rowData[def.accessor][def.objectAccessor]
        : rowData[def.accessor];

    return (
      <td key={key} className={styles.cell} onClick={onClick}>
        {isFunction(def.specialRender) ? def.specialRender(rowData) : cellData}
      </td>
    );
  };

  const renderHeaderCell = (def, i) => {
    let headerClick = () => {};
    let hideOrdering =
      !EnableOrdering || (def.sortable ? def.sortable === false : false);
    let isAccessor = def.accessor === Accessor;
    let orderingIcon;

    //-------------------------------------------------------------------

    if (isAccessor && Ascending)
      orderingIcon = <i iconClassName={Icons.ArrowUp}></i>;

    if (isAccessor && Descending)
      orderingIcon = <i iconClassName={Icons.ArrowDown}></i>;

    if (isAccessor && !Ascending && !Descending)
      orderingIcon = <i iconClassName={Icons.ArrowDownUp}></i>;

    if (!isAccessor) orderingIcon = <i iconClassName={Icons.ArrowDownUp}></i>;

    //-------------------------------------------------------------------

    if (!isAccessor)
      headerClick = () =>
        OnHeaderClick(def.sourceEntityName, def.accessor, true, false);

    if (isAccessor && Ascending)
      headerClick = () =>
        OnHeaderClick(def.sourceEntityName, def.accessor, false, true);

    if (isAccessor && Descending)
      headerClick = () => OnHeaderClick("", "", false, true);

    //-------------------------------------------------------------------

    return (
      <th
        key={i}
        className={styles.header}
        onClick={IsLoading || hideOrdering ? () => {} : headerClick}
      >
        <div className={styles.headerInnerDiv}>
          {def.displayName}

          {!hideOrdering ? (
            <div className={styles.headerInnerIconDiv}>{orderingIcon}</div>
          ) : (
            <></>
          )}
        </div>
      </th>
    );
  };

  const renderPagination = () => {
    if (!EnablePagination) return <></>;

    return (
      <Pagination
        Config={props.Config.PaginationConfig}
        Localization={Localization.Pagination}
        Icons={Icons}
        Export={Export}
      />
    );
  };

  return (
    <div>
      <div className={styles.tableDiv}>
        <table className={styles.table}>
          <thead>{renderHeader()}</thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
      <div>{renderPagination()}</div>
    </div>
  );
};

export default TableView;
