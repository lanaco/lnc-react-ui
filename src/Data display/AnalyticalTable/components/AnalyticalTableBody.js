import React, { useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import AnalyticalTableGroupRow from "./AnalyticalTableGroupRow";
import { getCustomRender, renderCustomElement } from "../../../_utils/utils";
import { useMeasure } from "react-use";

const HtmlTableBody = styled.tbody``;

//================================================================================

const AnalyticalTableBody = (props) => {
  //--------------------------
  const {
    Columns,
    GetData,
    ExpandCollapseGroup,
    ClearData,
    GroupBy,
    Groups,
    EnableSelection,
    SelectedData,
    onSelectRow,
    RowIdentifier,
    //------------------
    className,
    size,
    color,
    theme,
  } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  //====================================================================================================

  const [tableBodyRef, { width }] = useMeasure();

  //====================================================================================================

  const renderAnalyticalTableGroupRow = ({
    Key,
    Depth,
    Node,
    IsLeaf,
    Show,
    Expanded,
    Data,
    CurrentPage,
    PageCount,
    PageSize,
  }) => {
    var rowProps = {
      Key,
      Depth,
      Node,
      IsLeaf,
      Show,
      Expanded,
      Data,
      GetData,
      ExpandCollapseGroup,
      ClearData,
      Columns,
      GroupByFields: GroupBy.fields,
      onSelectRow,
      SelectedData,
      RowIdentifier,
      CurrentPage,
      PageCount,
      PageSize,
    };

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_GROUP_ROW", props.children),
        rowProps,
        props.children
      ) || (
        <AnalyticalTableGroupRow key={Key} {...rowProps}>
          {props.children}
        </AnalyticalTableGroupRow>
      )
    );
  };

  const renderGroups = () => {
    return Groups.map((n, i) =>
      renderAnalyticalTableGroupRow({
        Key: i,
        Depth: n.depth,
        Node: n.node,
        IsLeaf: n.depth === GroupBy.fields.length - 1,
        Show: n.show,
        Expanded: n.expanded,
        Data: n.data,
        CurrentPage: n.currentPage,
        PageCount: n.pageCount,
        PageSize: n.pageSize,
        Selected: n.selected,
        EnableSelection,
        SelectedData,
        onSelectRow,
      })
    );
  };

  //====================================================================================================

  return (
    <HtmlTableBody ref={tableBodyRef} {...themeProps}>
      {renderGroups()}
    </HtmlTableBody>
  );
};

AnalyticalTableBody.defaultProps = {
  __TYPE__: "TABLE_BODY",
  //--------------------
  Columns: [],
  GetData: () => {},
  ExpandCollapseGroup: () => {},
  GroupBy: {},
  Groups: [],
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableBody.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Columns: PropTypes.arrayOf(PropTypes.object),
  GetData: PropTypes.func,
  ExpandCollapseGroup: PropTypes.func,
  GroupBy: PropTypes.object,
  Groups: PropTypes.arrayOf(PropTypes.object),
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

export default AnalyticalTableBody;
