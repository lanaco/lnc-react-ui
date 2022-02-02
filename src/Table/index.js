import React, { useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { getChildComponentByType } from "../_utils/utils";
import { isObject } from "lodash";
import { useScreenSize } from "../_utils/utils";
import { screenSizes } from "../AdvancedGrid/constants/constants";

const Container = styled.div`
  padding: 10px;
  margin: 2px;
  border: 1px solid #80808080;
  border-radius: 2px;
`;

const HtmlTable = styled.table`
  table-layout: fixed;
  width: 100%;
  white-space: nowrap;
`;

const HtmlHead = styled.thead``;

const HtmlBody = styled.tbody``;

const HtmlRow = styled.tr``;

//IsSelected
//Width
const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width}%;
  border: 1px solid #80808080;
`;

const HtmlHeadCell = styled.th``;

const Table = (props) => {
  //================== PROPS ===========================================

  var {
    Columns, //TODO: width property ?
    Data,
    EnableSelection,
    SelectedData,
    RowIdentifier,
    VisibilityPattern,
    // { XS: [{ id, accessor, width }] }
    //--------------------
    onColumnClick,
    onRowClick,
    onSelectRow,
  } = props;

  //================== LIFECYCLE =======================================

  var screenSize = useScreenSize();

  useEffect(() => {
    if (Columns === null || Columns === undefined || Columns.length === 0)
      console.error("Error: Columns array must have at least one item.");
  }, [Columns]);

  //================== RENDER ==========================================

  const renderRow = (rowData = {}, index) => {
    let rowSelection = {};
    let columnsForSize = [];

    if (isObject(VisibilityPattern) && VisibilityPattern["XS"]) {
      columnsForSize = VisibilityPattern[screenSize].map((colForSize) => {
        let col = Columns.find((x) => String(x.id) === String(colForSize.id));

        return {
          ...col,
          ...colForSize,
        };
      });
    } else {
      columnsForSize = Columns.map((x) => ({ ...x }));
    }

    var columnsToRender = Columns.filter((col) =>
      columnsForSize.map((x) => String(x.id)).includes(String(col.id))
    );

    // console.log(columnsToRender);
    // console.log(columnsForSize);

    // Check if row is selected
    if (EnableSelection) {
      let row = SelectedData.find(
        (x) => String(x[RowIdentifier]) === String(rowData[RowIdentifier])
      );

      if (row !== null && row !== undefined) rowSelection.IsSelected = true;
      else rowSelection.IsSelected = false;
    }

    var childRow = getChildComponentByType("TABLE_ROW", props.children, {
      onRowClick,
      onSelectRow,
      RowData: rowData,
      SelectedData,
      Columns,
      ColumnsToRender: columnsToRender,
      ...rowSelection,
    });

    if (childRow !== null) {
      //TODO: check if component type is <tr />
      return childRow;
    }

    return (
      <HtmlRow {...rowSelection}>
        {columnsToRender.map((column, index) => {
          return renderCell(rowData, column, index);
        })}
      </HtmlRow>
    );
  };

  const renderCell = (rowData, column, index) => {
    var childCell = getChildComponentByType("TABLE_CELL", props.children, {
      RowData: rowData,
      Column: column,
    });

    if (childCell !== null) {
      //TODO: check if component type is <td />
      return childCell;
    }

    return <HtmlCell width={column.width}>{rowData[column.accessor]}</HtmlCell>;
  };

  const renderHeadCell = () => {
    var childHeadCell = getChildComponentByType(
      "TABLE_HEAD_CELL",
      props.children,
      {}
    );

    if (childHeadCell !== null) {
      //TODO: check if component type is <th />
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
    <Container>
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
};

export default Table;
