import { isUndefined } from "lodash";
import React, { useState } from "react";
import { getDarkerColor, getLighterColor, isColorDark } from "../Base/ColorBlender";
import TableSelectionType from "./Constants/TableSelectionType";
import { mergeCSS } from "./Helper/Helper";
import Pagination from "./Pagination";
import styles from "./styles.module.css";

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
    OnSelection = () => { },
    OnSelectAll = () => { },
    EnablePagination,
    EnableOrdering,
    Accessor,
    Ascending,
    Descending,
    OnHeaderClick = () => { },
  } = props.Config;

  const { Localization = {}, Export = () => { }, Icons = {} } = props;

  const [headerHoverIndex, setHeaderHoverIndex] = useState(-1);
  const [rowHowerOrSelectedIndex, setRowHoverOrSelectedIndex] = useState(-1);

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

    if (props.accentColor) {
      const style = {
        backgroundColor: props.accentColor,
        color: props.color ? props.color : isColorDark(props.accentColor) ? "white" : "black"
      };

      const styleForHover = {
        backgroundColor: getDarkerColor(props.accentColor, 0.2),
        color: props.color ? props.color : isColorDark(props.accentColor) ? "white" : "black"
      }

      return (
        <th
          className={mergeCSS([styles.header, styles.selectColumn])}
          style={headerHoverIndex === 0 ? styleForHover : style}
          onMouseEnter={() => setHeaderHoverIndex(0)}
          onMouseLeave={() => setHeaderHoverIndex(-1)}
        >
          {renderSelectAll()}
        </th>
      );
    }

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

    if (props.accentColor) {
      const style = {
        border: "0px",
        backgroundColor: key % 2 === 0 ? "white" : "whitesmoke",
      };

      const styleForHover = {
        border: "1px solid " + getLighterColor(props.accentColor, 0.75),
        backgroundColor: key % 2 === 0 ? "white" : "whitesmoke",
      }

      return (
        <tr
          key={key}
          style={rowHowerOrSelectedIndex === key ? styleForHover : style}
          onMouseEnter={() => {
            console.log("on maus enter:", key);
            setRowHoverOrSelectedIndex(key);
          }
          }
          onMouseLeave={() => setRowHoverOrSelectedIndex(-1)}>
          {renderSelectionCheckbox(rowData)}
          {Columns.filter((x) => x.hide !== true).map((def, i) =>
            renderCell(rowData, def, i)
          )}
        </tr>
      );
    }

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
      : () => { };

    if (!EnableFormView) onClick = () => { };

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
    let headerClick = () => { };
    let hideOrdering =
      !EnableOrdering ||
      (def.sortable === undefined ? false : def.sortable === false);
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

    if (props.accentColor) {
      const style = {
        backgroundColor: props.accentColor,
        color: props.color ? props.color : isColorDark(props.accentColor) ? "white" : "black"
      };

      const styleForHover = {
        backgroundColor: getDarkerColor(props.accentColor, 0.2),
        color: props.color ? props.color : isColorDark(props.accentColor) ? "white" : "black"
      }

      return (
        <th
          key={i}
          className={styles.header}
          onClick={IsLoading || hideOrdering ? () => { } : headerClick}
          style={headerHoverIndex === i + 1 ? styleForHover : style}
          onMouseEnter={() => setHeaderHoverIndex(i + 1)}
          onMouseLeave={() => setHeaderHoverIndex(-1)}
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
    }

    return (
      <th
        key={i}
        className={styles.header}
        onClick={IsLoading || hideOrdering ? () => { } : headerClick}
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
