import React, { useState, useEffect } from "react";
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
import CheckBox from "../../../Basic Inputs/CheckBox/index";

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
  background-color: ${theme.palette.gray[500]};
`;

const AnalyticalTableGroupRow = (props) => {
  //
  const {
    Node = {},
    Depth,
    IsLeaf,
    GetData,
    ClearData = () => {},
    ExpandCollapseGroup,
    Show,
    Expanded,
    Data = [],
    Columns,
    GroupByFields,
  } = props;

  const prevGroupBy = usePrevious(GroupByFields);

  // useEffect(() => {
  //   console.log(props);
  // }, [props]);

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
      GetData(Node);
    } else if (IsLeaf && Data.length !== 0) ClearData(Node);
  };

  //============================================================================

  const renderEmptyLeafCells = () => {
    return renderAnalyticalTableSelectionCell({});
  };

  const renderDataLeafCells = (data) => {
    return Columns.filter((c) => !GroupByFields.includes(c.accessor)).map(
      (c) => {
        return renderAnalyticalTableCell({ RowData: data, Column: c });
      }
    );
  };

  const renderLeafs = () => {
    return Data.map((leaf) => renderAnalyticalTableRow(leaf));
  };

  const renderPaddingDiv = () => {
    var pad = [];

    for (let i = 0; i < Depth; i++) {
      pad.push(<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);
    }

    return <CellPad>{pad}</CellPad>;
  };

  const renderGroupCell = () => {
    return (
      <CellContent>
        <CellIcon onClick={handleClick}>
          <Icon icon={getIcon()} onClick={handleClick} />
        </CellIcon>
        {/* <div>
          <CheckBox />
        </div> */}
        <CellTitle onClick={handleClick}>{Node.value}</CellTitle>
      </CellContent>
    );
  };

  const renderAnalyticalTableRow = (leafData) => {
    var rowProps = {};

    var children = (
      <>
        {renderEmptyLeafCells()}
        {renderDataLeafCells(leafData)}
      </>
    );

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_ROW", props.children),
        rowProps,
        children
      ) || <AnalyticalTableRow {...rowProps}>{children}</AnalyticalTableRow>
    );
  };

  const renderAnalyticalTableCell = (data) => {
    var cellProps = { ...data };

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_CELL", props.children),
        cellProps
      ) || <AnalyticalTableCell {...cellProps} />
    );
  };

  const renderAnalyticalTableSelectionCell = (data) => {
    var cellProps = { ...data };

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_SELECTION_CELL", props.children),
        cellProps
      ) || <AnalyticalTableSelectionCell {...cellProps} />
    );
  };

  return (
    <>
      <Row show={Show}>
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
  Node: {},
  Depth: 0,
  IsLeaf: false,
  GetData: () => {},
  ExpandCollapseGroup: () => {},
  Show: false,
  Expanded: false,
  Columns: [],
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
  Node: PropTypes.object,
  Depth: PropTypes.number,
  IsLeaf: PropTypes.bool,
  GetData: PropTypes.func,
  ExpandCollapseGroup: PropTypes.func,
  Show: PropTypes.bool,
  Expanded: PropTypes.bool,
  Columns: PropTypes.arrayOf(PropTypes.object),
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
