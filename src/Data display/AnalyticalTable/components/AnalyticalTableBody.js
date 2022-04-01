import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import AnalyticalTableGroupRow from "./AnalyticalTableGroupRow";
import { getCustomRender, renderCustomElement } from "../../../_utils/utils";

const HtmlTableBody = styled.tbody``;

//================================================================================

const AnalyticalTableBody = (props) => {
  //--------------------------
  const {
    Columns,
    GetData,
    ExpandCollapseGroup,
    //================
    className,
    size,
    color,
    theme,
    //================
    GroupBy,
    Groups,
  } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  //=========================================================================================

  //=========================================================================================

  const renderAnalyticalTableRow = ({ Key, Depth, Node, IsLeaf, Show }) => {
    var rowProps = {
      Key,
      Depth,
      Node,
      IsLeaf,
      Show,
      GetData,
      ExpandCollapseGroup,
      Columns,
      GroupByFields: GroupBy.fields,
    };

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_GROUP_ROW", props.children),
        rowProps
      ) || <AnalyticalTableGroupRow {...rowProps} />
    );
  };

  const renderGroups = () => {
    return (
      <>
        {Groups.map((n, i) =>
          renderAnalyticalTableRow({
            Key: i,
            Depth: n.depth,
            Node: n.node,
            IsLeaf: n.depth === GroupBy.fields.length - 1,
            Show: n.show,
          })
        )}
      </>
    );
  };

  //=========================================================================================

  return <HtmlTableBody {...themeProps}>{renderGroups()}</HtmlTableBody>;
};

AnalyticalTableBody.defaultProps = {
  __TYPE__: "TABLE_BODY",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableBody.propTypes = {
  __TYPE__: PropTypes.string,
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
