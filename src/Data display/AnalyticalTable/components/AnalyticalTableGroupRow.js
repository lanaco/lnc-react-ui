import React, { useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { usePrevious } from "react-use";
import { isEqual } from "lodash";
import Icon from "../../../General/Icon/index";
import { getCustomRender, renderCustomElement } from "../../../_utils/utils";
import AnalyticalTableCell from "./AnalyticalTableCell";
import AnalyticalTableRow from "./AnalyticalTableRow";
import AnalyticalTableSelectionCell from "./AnalyticalTableSelectionCell";
import Button from "../../../General/Button/index";

const Row = styled.tr`
  border-radius: 3px;
  cursor: pointer;
  display: ${(props) => (props.show === false ? "none" : "default")};
`;

const Cell = styled.td`
  font-family: Arial;
  font-size: 12px;
  background-color: white;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  border-radius: 5px;
`;

const CellContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CellPad = styled.div``;

const CellIcon = styled.div``;

const CellTitle = styled.div`
  padding-left: 8px;
`;

const CellContent = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 3px 0 3px 0;
  background-color: ${theme.palette.gray[100]};
`;

const PaginationContainer = styled.div`
  margin-left: auto;
  padding-right: 10px;
`;

const AnalyticalTableGroupRow = (props) => {
  //
  const {
    Key,
    Node,
    Depth,
    IsLeaf,
    GetData,
    ClearData,
    ExpandCollapseGroup,
    Show,
    Expanded,
    Data,
    CurrentPage,
    PageCount,
    PageSize,
    Columns,
    onSelectRow,
    SelectedData,
    RowIdentifier,
    GroupByFields,
  } = props;

  const prevGroupBy = usePrevious(GroupByFields);

  useEffect(() => {
    if (!Show) ClearData(Node);
  }, [Show]);

  useEffect(() => {
    if (!isEqual(prevGroupBy, GroupByFields)) ClearData(Node);
  }, [GroupByFields]);

  //============================================================================

  const getIcon = () => {
    var icon = "caret-right";

    if (IsLeaf && Data.length === 0) icon = "caret-right";
    if (IsLeaf && Data.length > 0) icon = "caret-down";
    if (Expanded) icon = "caret-down";

    return icon;
  };

  //============================================================================

  const handleClick = () => {
    if (!IsLeaf) ExpandCollapseGroup(Depth, Node);

    if (IsLeaf && Data.length === 0 && GetData) {
      GetData(Node, 1, PageSize);
    } else if (IsLeaf && Data.length !== 0) ClearData(Node);
  };

  const handleNextPage = (e) => {
    if (CurrentPage < PageCount) {
      GetData(Node, CurrentPage + 1, PageSize);
    }
  };

  const handlePreviousPage = (e) => {
    if (CurrentPage > 1) {
      GetData(Node, CurrentPage - 1, PageSize);
    }
  };

  //============================================================================

  const renderLeafPagination = () => {
    if (IsLeaf && Data.length > 0) {
      return (
        <PaginationContainer>
          <Button
            inverted={true}
            icon="angle-left"
            onClick={handlePreviousPage}
          />
          <span>{CurrentPage + "/" + PageCount}</span>
          <Button inverted={true} icon="angle-right" onClick={handleNextPage} />
        </PaginationContainer>
      );
    }

    return <></>;
  };

  const renderEmptyLeafCells = (data) => {
    return renderAnalyticalTableSelectionCell(data);
  };

  const renderDataLeafCells = (data) => {
    return Columns.filter((c) => !GroupByFields.includes(c.accessor)).map(
      (c, index) => {
        return renderAnalyticalTableCell({
          RowData: data,
          Column: c,
          Index: index,
        });
      }
    );
  };

  const renderLeafs = () => {
    return Data.map((leaf) => renderAnalyticalTableRow(leaf));
  };

  const renderPaddingDiv = () => {
    var pad = [];

    for (let i = 0; i < Depth; i++) {
      pad.push(
        <span key={i}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      );
    }

    return <CellPad>{pad}</CellPad>;
  };

  const renderGroupCell = () => {
    return (
      <CellContent>
        <CellIcon onClick={handleClick}>
          <Icon icon={getIcon()} onClick={handleClick} />
        </CellIcon>
        <CellTitle onClick={handleClick}>{Node.value}</CellTitle>
        {renderLeafPagination()}
      </CellContent>
    );
  };

  const renderAnalyticalTableRow = (leafData) => {
    var rowProps = { Index: leafData[RowIdentifier], RowData: leafData };

    var children = (
      <>
        {renderEmptyLeafCells(leafData)}
        {renderDataLeafCells(leafData)}
      </>
    );

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_ROW", props.children),
        rowProps,
        children
      ) || (
        <AnalyticalTableRow key={leafData[RowIdentifier]} {...rowProps}>
          {children}
        </AnalyticalTableRow>
      )
    );
  };

  const renderAnalyticalTableCell = (data) => {
    var cellProps = { ...data, SelectedData, RowIdentifier };

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_CELL", props.children),
        cellProps
      ) || <AnalyticalTableCell key={data.Index} {...cellProps} />
    );
  };

  const renderAnalyticalTableSelectionCell = (data) => {
    var cellProps = {
      Index: -1,
      RowData: data,
      onSelectRow,
      SelectedData,
      RowIdentifier,
    };

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_SELECTION_CELL", props.children),
        cellProps
      ) || <AnalyticalTableSelectionCell key={-1} {...cellProps} />
    );
  };

  return (
    <>
      <Row show={Show} key={Key}>
        <Cell colSpan={Columns.length}>
          <CellContainer>
            {renderPaddingDiv()}
            {renderGroupCell()}
          </CellContainer>
        </Cell>
      </Row>

      {renderLeafs()}
    </>
  );
};

AnalyticalTableGroupRow.defaultProps = {
  __TYPE__: "ANALYTICAL_TABLE_GROUP_ROW",
  //--------------------
  Key: "",
  Node: {},
  Depth: 0,
  IsLeaf: false,
  GetData: () => {},
  ClearData: () => {},
  ExpandCollapseGroup: () => {},
  Show: false,
  Expanded: false,
  Data: [],
  CurrentPage: 1,
  PageCount: 1,
  PageSize: 2,
  Columns: [],
  onSelectRow: () => {},
  SelectedData: [],
  RowIdentifier: "id",
  GroupByFields: [],
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableGroupRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Key: PropTypes.any,
  Node: PropTypes.object,
  Depth: PropTypes.number,
  IsLeaf: PropTypes.bool,
  GetData: PropTypes.func,
  ClearData: PropTypes.func,
  ExpandCollapseGroup: PropTypes.func,
  Show: PropTypes.bool,
  Expanded: PropTypes.bool,
  Data: PropTypes.arrayOf(PropTypes.object),
  CurrentPage: PropTypes.number,
  PageCount: PropTypes.number,
  PageSize: PropTypes.number,
  Columns: PropTypes.arrayOf(PropTypes.object),
  onSelectRow: PropTypes.func,
  SelectedData: PropTypes.arrayOf(PropTypes.object),
  RowIdentifier: PropTypes.string,
  GroupByFields: PropTypes.arrayOf(PropTypes.string),
  //----------------------------------------
  className: PropTypes.string,
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
};

export default AnalyticalTableGroupRow;
