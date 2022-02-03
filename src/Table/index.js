import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { getChildComponentByType } from "../_utils/utils";
import { isObject } from "lodash";
import { useScreenSize } from "../_utils/utils";
import theme from "../_utils/theme";
import { screenSizes } from "../AdvancedGrid/constants/constants";
import TableCell from "./components/TableCell";
import TableRow from "./components/TableRow";

const Container = styled.div`
  padding: 10px;
  margin: 2px;
  border: 1px solid #80808080;
  border-radius: 2px;
  overflow-x: auto;
  white-space: nowrap;
  font-size: ${theme.typography.small.fontSize};
  font-family: ${theme.typography.fontFamily};
`;

const HtmlTable = styled.table`
  table-layout: fixed;
  width: 100%;
  white-space: nowrap;
  border-collapse: collapse;
`;

const HtmlHead = styled.thead``;

const HtmlBody = styled.tbody``;

const HtmlRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  ${(props) => {
    if (props.IsSelected !== true)
      return `
        &:hover {
          & > td {
            background-color: whitesmoke;
          }
          cursor: pointer;
      }`;
    else return "";
  }}

  ${(props) => {
    if (props.IsSelected === true)
      return `
        background-color: ${theme.palette.primary.lighter};
        cursor: pointer;
      `;
    else return "";
  }}
`;

const HtmlHeadCell = styled.th``;

const Table = (props) => {
  //================== PROPS ===========================================

  var {
    Columns,
    Data,
    EnableSelection,
    SelectedData,
    RowIdentifier,
    VisibilityPattern,
    //--------------------
    onColumnClick,
    onRowClick,
    onSelectRow,
    //--------------------
    theme,
    color,
    size,
    className,
  } = props;

  const tableRowRender = useRef(null);
  const tableCellRender = useRef(null);
  const tableHeadCellRender = useRef(null);

  //================== LIFECYCLE =======================================

  useEffect(() => {
    var customTableRow = getChildComponentByType("TABLE_ROW", props.children);
    var customTableCell = getChildComponentByType("TABLE_CELL", props.children);
    var customTableHeadCell = getChildComponentByType(
      "TABLE_HEAD_CELL",
      props.children
    );

    if (customTableRow && React.isValidElement(customTableRow))
      tableRowRender.current = customTableRow;

    if (customTableCell && React.isValidElement(customTableCell))
      tableCellRender.current = customTableCell;

    if (customTableHeadCell && React.isValidElement(customTableHeadCell))
      tableHeadCellRender.current = customTableCell;
  }, []);

  var screenSize = useScreenSize();

  useEffect(() => {
    if (
      EnableSelection === true &&
      (RowIdentifier === null || RowIdentifier === "")
    )
      console.error(
        "Error: Selection is enabled but the 'RowIdentifier' is empty"
      );
  }, []);

  useEffect(() => {
    if (Columns === null || Columns === undefined || Columns.length === 0)
      console.error("Error: Columns array must have at least one item.");
  }, [Columns]);

  useEffect(() => {
    if (VisibilityPattern) {
      if (!VisibilityPattern.hasOwnProperty(screenSizes.XS.type))
        console.error(getVisibilityPatternError(screenSizes.XS.type));

      if (!VisibilityPattern.hasOwnProperty(screenSizes.S.type))
        console.error(getVisibilityPatternError(screenSizes.S.type));

      if (!VisibilityPattern.hasOwnProperty(screenSizes.M.type))
        console.error(getVisibilityPatternError(screenSizes.M.type));

      if (!VisibilityPattern.hasOwnProperty(screenSizes.L.type))
        console.error(getVisibilityPatternError(screenSizes.L.type));

      if (!VisibilityPattern.hasOwnProperty(screenSizes.XL.type))
        console.error(getVisibilityPatternError(screenSizes.XL.type));
    }
  }, [VisibilityPattern]);

  //================== METHODS =========================================

  const getVisibilityPatternError = (type) =>
    `Error: 'VisibilityPattern' missing property ${type}.`;

  const filterColumns = () => {
    let columnsToRender = [];

    // Calculate columns visibility and size
    if (isObject(VisibilityPattern)) {
      columnsToRender = VisibilityPattern[screenSize].map((colForSize) => {
        let col = Columns.find((x) => String(x.id) === String(colForSize.id));

        return {
          ...col,
          ...colForSize,
        };
      });
    } else {
      columnsToRender = Columns.map((x) => ({ ...x }));
    }

    return columnsToRender;
  };

  const checkColumnsWidthSum = (columnsToRender, index) => {
    //
    var widthSum = columnsToRender
      .map((x) => x.width)
      .reduce((prev, next) => prev + next);

    if (widthSum !== 100)
      console.error(
        `Error: Row ${index} - sum of column widths is ${widthSum}.`
      );
  };

  const calculateRowSelection = (rowData) => {
    let rowSelection = {};

    // Check if row is selected
    let row = SelectedData.find(
      (x) => String(x[RowIdentifier]) === String(rowData[RowIdentifier])
    );

    if (row !== null && row !== undefined) rowSelection.IsSelected = true;
    else rowSelection.IsSelected = false;

    return rowSelection;
  };

  //================== RENDER ==========================================

  const renderRow = (rowData = {}, index) => {
    let rowSelection = {};
    var columnsToRender = filterColumns();

    checkColumnsWidthSum(columnsToRender, index);

    // Check if row is selected
    if (EnableSelection) calculateRowSelection(rowData);

    var rowProps = {
      key: index,
      onRowClick,
      onSelectRow,
      RowData: rowData,
      SelectedData,
      Columns,
      ColumnsToRender: columnsToRender,
      Index: index,
      ...rowSelection,
    };

    if (tableRowRender.current !== null) {
      rowProps.children = columnsToRender.map((column, index) => {
        return renderCell(rowData, column, index);
      });

      return React.cloneElement(tableRowRender.current, rowProps);
    }

    return (
      <TableRow {...rowProps} key={index}>
        {columnsToRender.map((column, index) => {
          return renderCell(rowData, column, index);
        })}
      </TableRow>
    );
  };

  const renderCell = (rowData, column, index) => {
    // Try finding a custom cell renderer
    if (tableCellRender.current !== null) {
      return React.cloneElement(tableCellRender.current, {
        key: index,
        children: tableCellRender.current.props.children,
        RowData: rowData,
        Column: column,
        Index: index,
      });
    }

    return (
      <TableCell RowData={rowData} Column={column} Index={index} key={index} />
    );
  };

  const renderHeadCell = () => {
    // Try finding a custom header cell renderer
    var childHeadCell = getChildComponentByType(
      "TABLE_HEAD_CELL",
      props.children,
      {}
    );

    if (childHeadCell !== null) {
      return childHeadCell;
    }

    return <></>;
  };

  const renderSelectionCell = () => {
    return <></>;
  };

  const renderBody = () => {
    return Data.map((rowData, index) => renderRow(rowData, index));
  };

  const renderHead = () => {
    return <></>;
  };

  return (
    <Container className={className}>
      <HtmlTable>
        <HtmlHead>{renderHead()}</HtmlHead>
        <HtmlBody>{renderBody()}</HtmlBody>
      </HtmlTable>
    </Container>
  );
};

Table.defaultProps = {
  __TYPE__: "TABLE",
  Columns: [],
  Data: [],
  EnableSelection: false,
  SelectedData: [],
  RowIdentifier: "id",
  VisibilityPattern: {},
  //--------------------
  onColumnClick: null,
  onRowClick: null,
  onSelectRow: null,
  //--------------------
  size: "small",
  color: "primary",
  theme: theme,
  className: "",
};

Table.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Columns: PropTypes.arrayOf(PropTypes.object),
  Data: PropTypes.arrayOf(PropTypes.object),
  EnableSelection: PropTypes.bool,
  SelectedData: PropTypes.arrayOf(PropTypes.string),
  RowIdentifier: PropTypes.string,
  VisibilityPattern: PropTypes.object,
  //----------------------------------------
  onColumnClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
  //----------------------------------------
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "white",
    "black",
  ]),
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Table;
