import React from "react";
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
    GroupBy,
    Groups,
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
      Columns,
      GroupByFields: GroupBy.fields,
    };

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_GROUP_ROW", props.children),
        rowProps,
        props.children
      ) || (
        <AnalyticalTableGroupRow {...rowProps}>
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
