import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import AnalyticalTableGroupRow from "./AnalyticalTableGroupRow";
import { getCustomRender, renderCustomElement } from "../../../_utils/utils";

const HtmlTableHead = styled.thead``;

//================================================================================

const AnalyticalTableHead = (props) => {
  //--------------------------
  const { className, size, color, theme } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  //=========================================================================================

  const renderAnalyticalTableHeadRow = () => {
    var rowProps = {};

    return (
      renderCustomElement(
        getCustomRender("TABLE_HEAD_ROW", props.children),
        rowProps
      ) || <></>
    );
  };

  const renderAnalyticalTableHeadCell = () => {
    var cellProps = {};

    return (
      renderCustomElement(
        getCustomRender("TABLE_HEAD_CELL", props.children),
        cellProps
      ) || <></>
    );
  };

  //=========================================================================================

  return <HtmlTableHead {...themeProps}></HtmlTableHead>;
};

AnalyticalTableHead.defaultProps = {
  __TYPE__: "TABLE_HEAD",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableHead.propTypes = {
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

export default AnalyticalTableHead;
