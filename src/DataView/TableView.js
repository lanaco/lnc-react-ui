import styled from "@emotion/styled";
import { isUndefined } from "lodash";
import React from "react";
import Button from "../Button";
import CheckBox from "../CheckBox/index";
import Icon from "../Icon/index";
import theme from "../_utils/theme";
import TableSelectionType from "./Constants/TableSelectionType";

const Container = styled.div`
  border-radius: 3px;
  font-size: ${theme.typography.small.fontSize};
  font-family: ${theme.typography.fontFamily};
`;

const Wrapper = styled.div`
  display: block;
  overflow-x: auto;
  white-space: nowrap;
`;

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
  font-size: 13px;

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
    background-color: whitesmoke;
    cursor: ${(props) => (props.hideOrdering ? "inherit" : "pointer")};
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

const TableBodyRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  ${(props) => {
    if (props.selectedRow !== true)
      return `
        &:hover {
          & > td {
            // border-bottom: 1px solid ${theme.palette.primary.light};
            // border-top: 1px solid ${theme.palette.primary.light};
            background-color: whitesmoke;
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
        
        & > td {
          // border-bottom: 1px solid ${theme.palette.primary.light};
          // border-top: 1px solid ${theme.palette.primary.light};
        }
      `;
    else return "";
  }}
`;

const TableBodyCell = styled.td`
  padding: ${(props) =>
    props.selectionCell === true ? "1px 1px 1px 6px" : "5px 5px 5px 10px"};
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
    EnableOrdering,
    Accessor,
    Ascending,
    Descending,
    OnHeaderClick = () => {},
    ReadOnly,
    IsLookup = false,
    LookupTakeItem = () => {},
  } = props.Config;

  //======== FUNCTIONS ========

  function isFunction(functionToCheck) {
    return (
      functionToCheck &&
      {}.toString.call(functionToCheck) === "[object Function]"
    );
  }

  const handleOnSelection = (rowData, val) => {
    OnSelection(rowData, val, SelectionType);
  };

  const handleSelectAll = (val) => {
    OnSelectAll(val);
  };

  //======== RENDER ========

  const isItemInArray = (item, array, byProp) => {
    if (item[byProp] !== undefined)
      return !isUndefined(array.find((x) => x[byProp] === item[byProp]));

    return array.indexOf(item) > -1;
  };

  const renderBody = () => {
    return <>{Data.map((dataItem, i) => renderBodyRow(dataItem, i))}</>;
  };

  const renderBodyRow = (dataItem, i) => {
    let rowSelected = isItemInArray(dataItem, SelectedData, SelectionIndicator);

    return (
      <TableBodyRow selectedRow={rowSelected} key={i}>
        {renderSelectionCell(dataItem, rowSelected, i)}
        {Columns.filter((x) => x.hide !== true).map((col, j) => {
          return renderBodyCell(dataItem, col, i, j);
        })}
      </TableBodyRow>
    );
  };

  const renderBodyCell = (dataItem, def, rowIndex, cellIndex) => {
    var tabIndex = rowIndex * Columns.length + cellIndex + 50;

    let onClick = () => {
      ChangeToFormView(dataItem, rowIndex);
    };

    if (!EnableFormView) onClick = () => {};

    if (!EnableSelection || ReadOnly) onClick = () => {};

    if (IsLookup) {
      onClick = () => {
        if (!IsLoading) {
          LookupTakeItem(dataItem);
        }
      };
    }

    let cellData =
      def.isObject === true
        ? dataItem[def.accessor][def.objectAccessor]
        : dataItem[def.accessor];

    return (
      <TableBodyCell key={tabIndex} onClick={onClick}>
        {isFunction(def.specialRender)
          ? def.specialRender(dataItem, () => {
              ChangeToFormView(dataItem, rowIndex);
            })
          : cellData}
      </TableBodyCell>
    );
  };

  const renderSelectionCell = (dataItem, selected, rowIndex) => {
    if (IsLookup) {
      return (
        <TableBodyCell selectionCell={true} key={-1}>
          <Button
            inverted={true}
            onClick={() => {
              if (!IsLoading) {
                LookupTakeItem(dataItem);
              }
            }}
            icon={"arrow-right"}
          />
        </TableBodyCell>
      );
    }

    if (!EnableSelection || ReadOnly || IsLookup) return <></>;

    return (
      <TableBodyCell selectionCell={true} key={-1}>
        <CheckBox
          checked={selected}
          onChange={(e, val) => handleOnSelection(dataItem, val)}
          id={rowIndex}
        />
      </TableBodyCell>
    );
  };

  const renderHeaderCell = (def, i) => {
    let headerClick = () => {};
    let hideOrdering =
      !EnableOrdering ||
      (def.sortable === undefined ? false : def.sortable === false);

    let isAccessor = def.accessor === Accessor;
    let orderingIconClass;

    //-------------------------------------------------------------------

    if (isAccessor && Ascending) orderingIconClass = "long-arrow-alt-up";

    if (isAccessor && Descending) orderingIconClass = "long-arrow-alt-down";

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
        hideOrdering={hideOrdering}
        key={i}
        onClick={IsLoading || hideOrdering ? () => {} : headerClick}
      >
        <HeaderInnerCell>
          <HeaderCellText>{def.displayName}</HeaderCellText>

          {!hideOrdering && (
            <HeaderCellIcon sort={orderingIconClass === "sort"}>
              <Icon color={"white"} icon={orderingIconClass} />
            </HeaderCellIcon>
          )}
        </HeaderInnerCell>
      </TableHeadCell>
    );
  };

  const renderSelectAllHeaderCell = () => {
    if (IsLookup)
      return <TableHeadCell selectionCell={true} key={-1}></TableHeadCell>;

    if (
      !EnableSelection ||
      ReadOnly ||
      (IsLookup && SelectionType === TableSelectionType.SINGLE)
    )
      return <></>;

    return (
      <TableHeadCell selectionCell={true} key={-1}>
        {SelectionType === TableSelectionType.MULTIPLE && (
          <CheckBox
            checked={SelectedEntirePage}
            onChange={() => handleSelectAll(!SelectedEntirePage)}
            id="SelectedEntirePage"
          />
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
              {Columns.filter((x) => x.hide !== true).map((col, i) =>
                renderHeaderCell(col, i)
              )}
            </TableHeadRow>
          </TableHead>
          <TableBody>{renderBody()}</TableBody>
        </TableTable>
      </Wrapper>
    </Container>
  );
};

export default TableView;
