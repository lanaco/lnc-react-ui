import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useScreenSize } from "../../_utils/utils";

const StyledFlexGridItem = styled.div`
  ${(props) => (props.width > 0 ? "" : "flex: 1;")}
  min-width: ${(props) => 100 / props.columns}%;
  width: ${(props) => props.width}%;
  padding: ${(props) => props.rowGap}px ${(props) => props.columnGap}px;
  overflow-wrap: break-word;
`;

const FlexGridItem = React.forwardRef((props, ref) => {
  //============================================== PROPS ===============================================
  const {
    XS,
    S,
    M,
    L,
    XL,
    col,
    columns,
    spacing,
    rowSpacing,
    columnSpacing,
    children,
  } = props;

  const screenSize = useScreenSize();
  const [itemWidth, setItemWidth] = useState(0);
  const [rowGap, setRowGap] = useState(0);
  const [columnGap, setColumnGap] = useState(0);

  //============================================= LIFECYCLE ============================================
  useEffect(() => {
    calculateWidth();
  }, [columns, XS, S, M, L, XL, col]);

  useEffect(() => {
    calculateWidth();
    adjustSpacing();
  }, [screenSize]);

  useEffect(() => {
    adjustSpacing();
  }, [spacing, rowSpacing, columnSpacing]);

  //============================================= METHODS ============================================
  const calculateWidth = () => {
    // Calculate the width of FlexGridItem
    // If smaller screen size has a defined width and the larger one doesn't, smaller is applied.
    // If the larger screen has the size but the smaller one doesn't, then the col is applied or it will fill up rest of the available columns.
    let width = col ? 100 / (columns / col) : 0;
    switch (screenSize) {
      case "XS":
        width = XS ? 100 / (columns / XS) : width;
        break;
      case "S":
        width = S ? 100 / (columns / S) : XS ? 100 / (columns / XS) : width;
        break;
      case "M":
        width = M
          ? 100 / (columns / M)
          : S
          ? 100 / (columns / S)
          : XS
          ? 100 / (columns / XS)
          : width;
        break;
      case "L":
        width = L
          ? 100 / (columns / L)
          : M
          ? 100 / (columns / M)
          : S
          ? 100 / (columns / S)
          : XS
          ? 100 / (columns / XS)
          : width;
        break;
      case "XL":
        width = XL
          ? 100 / (columns / XL)
          : L
          ? 100 / (columns / L)
          : M
          ? 100 / (columns / M)
          : S
          ? 100 / (columns / S)
          : XS
          ? 100 / (columns / XS)
          : width;
        break;
    }
    setItemWidth(width);
  };

  const adjustSpacing = () => {
    // If we have spacing defined, rowSpacing and columnSpacing are ignored
    if (spacing) {
      setRowGap(spacing);
      setColumnGap(spacing);
    } else {
      if (rowSpacing) {
        if (!isNaN(rowSpacing)) setRowGap(rowSpacing);
        else setRowGap(rowSpacing[screenSize] ?? 0);
      }

      if (columnSpacing) {
        if (!isNaN(columnSpacing)) setColumnGap(columnSpacing);
        else setColumnGap(columnSpacing[screenSize] ?? 0);
      }
    }
  };

  //============================================== RENDER ==============================================
  return (
    <StyledFlexGridItem
      ref={ref}
      columns={columns}
      width={itemWidth}
      rowGap={rowGap}
      columnGap={columnGap}
    >
      {children}
    </StyledFlexGridItem>
  );
});

//====================================== PROP TYPES / DEFAULT PROPS ====================================
FlexGridItem.propTypes = {
  /**
   * Number of columns to take up on XS screens.
   */
  XS: PropTypes.number,
  /**
   * Number of columns to take up on S screens.
   */
  S: PropTypes.number,
  /**
   * Number of columns to take up on M screens.
   */
  M: PropTypes.number,
  /**
   * Number of columns to take up on L screens.
   */
  L: PropTypes.number,
  /**
   * Number of columns to take up on XL screens.
   */
  XL: PropTypes.number,
  /**
   * Number of columns to take up on any screen size.
   * Defining number on columns for specific screen sizes takes priority over this.
   */
  col: PropTypes.number,
};

export default FlexGridItem;
