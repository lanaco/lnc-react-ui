import { isUndefined } from "lodash";
import React, { useState } from "react";
import {
  getDarkerColor,
  getLighterColor,
  isColorDark,
} from "../Base/ColorBlender";
import TableSelectionType from "./Constants/TableSelectionType";
import { mergeCSS } from "../Helper/helper";
import Pagination from "./Pagination";
import { default as LncPagination } from "../Pagination/index";
import styles from "./styles.module.css";
import CheckBox from "../CheckBox/index";
import PropTypes from "prop-types";
import Icon from "../Icon/index";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

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
    ReadOnly,
    IsLookup = false,
  } = props.Config;

  const { Localization = {}, Export = () => {}, Icons = {} } = props;

  // const [headerHoverIndex, setHeaderHoverIndex] = useState(-1);
  // const [rowHoverIndex, setRowHoverIndex] = useState(-1);
  const [rowSelectedIndices, setRowSelectedIndices] = useState([]);

  //======== FUNCTIONS ========

  function isFunction(functionToCheck) {
    return (
      functionToCheck &&
      {}.toString.call(functionToCheck) === "[object Function]"
    );
  }

  const handleOnSelection = (rowData, e, rowIndex = -1) => {
    if (e.target.checked && rowIndex >= 0) {
      if (SelectionType === TableSelectionType.MULTIPLE) {
        let tmpArray = [...rowSelectedIndices];
        tmpArray.push(rowIndex);
        setRowSelectedIndices(tmpArray);
      } else if (SelectionType === TableSelectionType.SINGLE) {
        setRowSelectedIndices([rowIndex]);
      }
    } else if (!e.target.checked && rowIndex >= 0) {
      if (SelectionType === TableSelectionType.MULTIPLE) {
        let tmpArray = rowSelectedIndices.map((x) => x !== rowIndex);
        setRowSelectedIndices(tmpArray);
      } else if (SelectionType === TableSelectionType.SINGLE) {
        setRowSelectedIndices([]);
      }
    }
    OnSelection(rowData, e.target.checked, SelectionType);
  };

  const handleSelectAll = () => {
    OnSelectAll();
  };

  //======== RENDER ========

  // const renderSelectionHeader = () => {
  //   if (!EnableSelection || ReadOnly) return null;

  //   if (props.accentColor) {
  //     const style = {
  //       backgroundColor: props.accentColor,
  //       color: props.color
  //         ? props.color
  //         : isColorDark(props.accentColor)
  //         ? "white"
  //         : "black",
  //     };

  //     const styleForHover = {
  //       backgroundColor: getDarkerColor(props.accentColor, 0.2),
  //       color: props.color
  //         ? props.color
  //         : isColorDark(props.accentColor)
  //         ? "white"
  //         : "black",
  //     };

  //     return (
  //       <th
  //         className={mergeCSS([styles.header, styles.selectColumn])}
  //         style={headerHoverIndex === 0 ? styleForHover : style}
  //         onMouseEnter={() => setHeaderHoverIndex(0)}
  //         onMouseLeave={() => setHeaderHoverIndex(-1)}
  //       >
  //         {renderSelectAll()}
  //       </th>
  //     );
  //   }

  //   return (
  //     <th className={mergeCSS([styles.header, styles.selectColumn])}>
  //       {renderSelectAll()}
  //     </th>
  //   );
  // };

  // const renderSelectAll = () => {
  //   if (SelectionType === TableSelectionType.MULTIPLE) {
  //     return (
  //       <input
  //         title={
  //           SelectedEntirePage
  //             ? Localization.DeselectAll
  //             : Localization.SelectAll
  //         }
  //         type="checkbox"
  //         checked={SelectedEntirePage}
  //         onChange={(e) => OnSelectAll(e.target.checked)}
  //         className={styles.pointer}
  //       ></input>
  //     );
  //   }

  //   return null;
  // };

  const isItemInArray = (item, array, byProp) => {
    if (item[byProp] !== undefined)
      return !isUndefined(array.find((x) => x[byProp] === item[byProp]));

    return array.indexOf(item) > -1;
  };

  // const renderSelectionCheckbox = (rowData, rowIndex = -1) => {
  //   if (EnableSelection && !ReadOnly) {
  //     return (
  //       <td
  //         className={mergeCSS([styles.specialRenderCell, styles.selectColumn])}
  //       >
  //         <input
  //           type="checkbox"
  //           checked={isItemInArray(rowData, SelectedData, SelectionIndicator)}
  //           onChange={(e) => handleOnSelection(rowData, e, rowIndex)}
  //           className={styles.pointer}
  //         ></input>
  //       </td>
  //     );
  //   } else return <></>;
  // };

  // const renderHeader = () => {
  //   return (
  //     <tr>
  //       {renderSelectionHeader()}
  //       {Columns.filter((x) => x.hide !== true).map((def, i) =>
  //         renderHeaderCell(def, i)
  //       )}
  //     </tr>
  //   );
  // };

  const renderBody = () => {
    return <>{Data.map((dataItem, i) => renderBodyRow(dataItem, i))}</>;
  };

  const renderBodyRow = (dataItem, i) => {
    var nested = Columns.find((x) => x.nested);
    let rowSelected = isItemInArray(dataItem, SelectedData, SelectionIndicator);

    return (
      <>
        <TableBodyRow selectedRow={rowSelected} key={i}>
          {(renderSelectionCell(dataItem, rowSelected), i)}
          {Columns.map((col, j) => {
            return renderBodyCell(dataItem, col, i, j);
          })}
        </TableBodyRow>

        {/* {renderGroupBodyRows(nested, dataItem)} */}
      </>
    );
  };

  // const renderCell = (rowData, def, key) => {
  //   let onClick = !isFunction(def.specialRender)
  //     ? () => {
  //         ChangeToFormView(rowData);
  //       }
  //     : () => {};

  //   if (!EnableFormView) onClick = () => {};

  //   if (!EnableFormView && EnableSelection) {
  //     var checked = isItemInArray(rowData, SelectedData, SelectionIndicator);

  //     onClick = () =>
  //       handleOnSelection(rowData, { target: { checked: !checked } });
  //   }

  //   let cellData =
  //     def.isObject === true
  //       ? rowData[def.accessor][def.objectAccessor]
  //       : rowData[def.accessor];

  //   return (
  //     <td key={key} className={styles.cell} onClick={onClick}>
  //       {isFunction(def.specialRender) ? def.specialRender(rowData) : cellData}
  //     </td>
  //   );
  // };

  const renderBodyCell = (dataItem, def, rowIndex, cellIndex) => {
    var tabIndex = rowIndex * Columns.length + cellIndex + 50;

    let onClick = !isFunction(def.specialRender)
      ? () => {
          ChangeToFormView(dataItem);
        }
      : () => {};

    if (!EnableFormView) onClick = () => {};

    if (!EnableFormView && EnableSelection) {
      var checked = isItemInArray(dataItem, SelectedData, SelectionIndicator);

      onClick = () =>
        handleOnSelection(dataItem, { target: { checked: !checked } });
    }

    let cellData =
      def.isObject === true
        ? dataItem[def.accessor][def.objectAccessor]
        : dataItem[def.accessor];

    return (
      <TableBodyCell key={tabIndex} onClick={onClick}>
        {isFunction(def.specialRender) ? def.specialRender(dataItem) : cellData}
      </TableBodyCell>
    );
  };

  const renderSelectionCell = (dataItem, selected, rowIndex) => {
    if (
      !EnableSelection ||
      ReadOnly ||
      (IsLookup && SelectionType === TableSelectionType.SINGLE)
    )
      return <></>;

    return (
      <TableBodyCell selectionCell={true} key={-1}>
        <CheckBox
          checked={isItemInArray(dataItem, SelectedData, SelectionIndicator)}
          onChange={(e) => handleOnSelection(dataItem, e, rowIndex)}
          id={dataItem["id"]}
        />
      </TableBodyCell>
    );
  };

  // const renderRow = (rowData, key) => {
  //   let evenOddClass = key % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd;
  //   let selectionClass = isItemInArray(
  //     rowData,
  //     SelectedData,
  //     SelectionIndicator
  //   )
  //     ? styles.checkedRow
  //     : "";

  //   if (props.accentColor) {
  //     const style = {
  //       border: "0px",
  //       backgroundColor: key % 2 === 0 ? "white" : "whitesmoke",
  //       borderLeft: "1px solid transparent",
  //       borderRight: "1px solid transparent",
  //       borderTop: "1px solid transparent",
  //     };

  //     const styleForHover = {
  //       border: "1px solid " + getLighterColor(props.accentColor, 0.75),
  //       backgroundColor: key % 2 === 0 ? "white" : "whitesmoke",
  //     };

  //     const styleForSelect = {
  //       backgroundColor: getLighterColor(props.accentColor, 0.75),
  //     };

  //     return (
  //       <tr
  //         key={key}
  //         style={
  //           rowSelectedIndices.includes(key)
  //             ? styleForSelect
  //             : rowHoverIndex === key
  //             ? styleForHover
  //             : style
  //         }
  //         onMouseEnter={() => setRowHoverIndex(key)}
  //         onMouseLeave={() => setRowHoverIndex(-1)}
  //       >
  //         {renderSelectionCheckbox(rowData, key)}
  //         {Columns.filter((x) => x.hide !== true).map((def, i) =>
  //           renderCell(rowData, def, i)
  //         )}
  //       </tr>
  //     );
  //   }

  //   return (
  //     <tr key={key} className={evenOddClass + " " + selectionClass}>
  //       {renderSelectionCheckbox(rowData)}
  //       {Columns.filter((x) => x.hide !== true).map((def, i) =>
  //         renderCell(rowData, def, i)
  //       )}
  //     </tr>
  //   );
  // };

  const renderHeaderCell = (def, i) => {
    let headerClick = () => {};
    let hideOrdering =
      !EnableOrdering ||
      (def.sortable === undefined ? false : def.sortable === false);

    let isAccessor = def.accessor === Accessor;
    let orderingIconClass;

    //-------------------------------------------------------------------

    if (isAccessor && Ascending) orderingIconClass = "sort-up";

    if (isAccessor && Descending) orderingIconClass = "sort-down";

    if (isAccessor && !Ascending && !Descending) orderingIconClass = "sort";

    if (!isAccessor) orderingIconClass = "sort";

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
      <TableHeadCell
        key={i}
        onClick={IsLoading || hideOrdering ? () => {} : headerClick}
      >
        <div>
          {def.displayName}

          {!hideOrdering && <Icon color={"white"} icon={orderingIconClass} />}
        </div>
      </TableHeadCell>
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

  // return (
  //   <div>
  //     <div className={styles.tableDiv}>
  //       <table className={styles.table}>
  //         <thead>{renderHeader()}</thead>
  //         <tbody>{renderBody()}</tbody>
  //       </table>
  //     </div>
  //     <div>{renderPagination()}</div>
  //   </div>
  // );
};

export default TableView;
