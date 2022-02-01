import React, { useContext, useEffect, useState } from "react";
import GridContext from "../context";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useMedia } from "react-use";
import { screenSizes } from "../constants/constants";

//==============================================================================

function useScreenSize() {
  const sizeXS = useMedia(screenSizes.XS.mediaQuery);
  const sizeS = useMedia(screenSizes.S.mediaQuery);
  const sizeM = useMedia(screenSizes.M.mediaQuery);
  const sizeL = useMedia(screenSizes.L.mediaQuery);
  const sizeXL = useMedia(screenSizes.XL.mediaQuery);

  if (sizeXS) return screenSizes.XS.type;
  if (sizeS) return screenSizes.S.type;
  if (sizeM) return screenSizes.M.type;
  if (sizeL) return screenSizes.L.type;
  if (sizeXL) return screenSizes.XL.type;

  return screenSizes.M.type;
}

//==============================================================================

const Row = styled.div`
  display: flex;
`;

const Cell = styled.div`
  padding: 6px;
  border: 1px solid #80808080;
  width: ${(props) => props.width};
  overflow: hidden;
`;

//===========================================================================

const Table = (props) => {
  //
  const sizes = Object.keys(screenSizes).map((size) => screenSizes[size].type);

  const GridState = useContext(GridContext);
  const screenSize = useScreenSize();

  const { dispatch } = props;

  // ==================== METHODS =============================================

  const findChildComponentByType = (type, _props) => {
    if (props.children && type) {
      var component = React.Children.toArray(props.children).find(
        (child) => child.props.__TYPE__ === type
      );

      if (React.isValidElement(component)) {
        return React.cloneElement(component, _props);
      }
    }

    return null;
  };

  // ==================== RENDER ==============================================

  const renderRow = (rowData, i) => {
    // Filter columns based on 'hide' property and current screen size
    var columnsToRender = GridState.Data.Columns.filter((x) => {
      var columnSizeIndex = sizes.indexOf(x.size);
      var screenSizeIndex = sizes.indexOf(screenSize);

      if (x.hide !== true && columnSizeIndex <= screenSizeIndex) return true;
      else return false;
    });

    // Sum of rendered columns width
    var screenRealestateUsed = columnsToRender
      .map((col) => col.width)
      .reduce((sum, a) => sum + a, 0);

    // Width to add to every column
    var addWidthToCell = 100 - screenRealestateUsed / columnsToRender.length;

    // Try to find a custom table row renderer child
    var customRowRender = findChildComponentByType("TABLE_ROW", {
      index: i,
      rowData,
      aditionalCellWidth: addWidthToCell,
      columns: columnsToRender,
    });

    if (customRowRender !== null) return customRowRender;

    // Default table row render
    return (
      <Row key={i}>
        {columnsToRender.map((col) => (
          <Cell width={col.width + addWidthToCell + "%"}>
            {rowData[col.accessor]}
          </Cell>
        ))}
      </Row>
    );
  };

  return (
    <>
      <div
        style={{
          fontWeight: "bold",
          padding: "15px",
          border: "1px solid black",
          marginBottom: "10px",
        }}
      >
        {"Screen size:" + screenSize}
      </div>
      <div>{GridState.Data.Data.map((x, i) => renderRow(x, i))}</div>
    </>
  );
};

Table.defaultProps = {
  __TYPE__: "TABLE",
};

Table.propTypes = {
  __TYPE__: PropTypes.string,
};

export default Table;
