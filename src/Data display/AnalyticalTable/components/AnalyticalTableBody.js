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

  const renderAnalyticalTableRow = (key, depth, node, isLeaf, show) => {
    var rowProps = {
      key,
      depth,
      node,
      isLeaf,
      show,
      getData: GetData,
      ExpandCollapseGroup,
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
          renderAnalyticalTableRow(
            i,
            n.depth,
            n.node,
            n.depth === GroupBy.fields.length - 1,
            n.show
          )
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
