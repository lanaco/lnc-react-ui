import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import AnalyticalTableHeadRow from "./AnalyticalTableHeadRow";
import AnalyticalTableHeadCell from "./AnalyticalTableHeadCell";
import { getCustomRender, renderCustomElement } from "../../../_utils/utils";

const HtmlTableHead = styled.thead``;

//================================================================================

const AnalyticalTableHead = (props) => {
  //--------------------------
  const { GroupBy, Groups, Columns, className, size, color, theme } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  //=========================================================================================

  const renderHeadCells = () => {
    var groupedFields = GroupBy.fields.map((field) =>
      Columns.find((c) => c.accessor === field)
    );
    var remainingFields = Columns.filter(
      (c) => !GroupBy.fields.includes(c.accessor)
    );

    var groupedColumn = {
      columnId: 1,
      displayName: "",
    };

    groupedFields.forEach((x, i) => {
      groupedColumn.displayName += x.displayName;

      if (i !== groupedFields.length - 1) groupedColumn.displayName += " / ";
    });

    var groupedCell = renderAnalyticalTableHeadCell(groupedColumn, -1);

    return (
      <>
        {groupedCell}
        {remainingFields.map((c, i) => renderAnalyticalTableHeadCell(c, i))}
      </>
    );
  };

  const renderAnalyticalTableHeadRow = () => {
    var rowProps = {};

    var children = <>{renderHeadCells()}</>;

    return (
      renderCustomElement(
        getCustomRender("TABLE_HEAD_ROW", props.children),
        rowProps,
        children
      ) || (
        <AnalyticalTableHeadRow key={-1} {...rowProps}>
          {children}
        </AnalyticalTableHeadRow>
      )
    );
  };

  const renderAnalyticalTableHeadCell = (Column, Index) => {
    var cellProps = { Column, Index };

    return (
      renderCustomElement(
        getCustomRender("TABLE_HEAD_CELL", props.children),
        cellProps
      ) || <AnalyticalTableHeadCell key={Index} {...cellProps} />
    );
  };

  //=========================================================================================

  return (
    <HtmlTableHead {...themeProps}>
      {renderAnalyticalTableHeadRow()}
    </HtmlTableHead>
  );
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
