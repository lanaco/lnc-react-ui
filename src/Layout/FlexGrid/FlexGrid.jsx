/* eslint-disable react/display-name */
import { forwardRef, Children, isValidElement, cloneElement } from "react";
import PropTypes from "prop-types";
import FlexBox from "../FlexBox/FlexBox";
import FlexGridItem from "./FlexGridItem";

const FlexGrid = forwardRef((props, ref) => {
  //============================================== PROPS ===============================================
  const {
    columns = 12,
    spacing,
    rowSpacing,
    columnSpacing,
    justifyContent = "Start",
    alignItems = "Stretch",
    children,
    rest,
  } = props;

  const clonedChildren = Children.map(children, (child) => {
    if (!isValidElement(child) || child.type != FlexGridItem) {
      return;
    }

    return cloneElement(child, {
      columns,
      spacing,
      rowSpacing,
      columnSpacing,
    });
  });

  //============================================== RENDER ==============================================
  return (
    <FlexBox
      ref={ref}
      wrap="Wrap"
      justifyContent={justifyContent}
      alignItems={alignItems}
      {...rest}
    >
      {clonedChildren}
    </FlexBox>
  );
});

//====================================== PROP TYPES / DEFAULT PROPS ====================================
// FlexGrid.defaultProps = {
//   columns: 12,
//   justifyContent: "Start",
//   alignItems: "Stretch",
// };

FlexGrid.propTypes = {
  /**
   * Number of available grid columns.
   */
  columns: PropTypes.number,
  /**
   * Defines spacing for rows and columns.
   */
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  /**
   * Defines row spacing. If this is set, `spacing` property is ignored for this value.
   */
  rowSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  /**
   * Defines column spacing. If this is set, `spacing` property is ignored for this value.
   */
  columnSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  /**
   * Controls how the space is distributed between items along the main-axis.
   */
  justifyContent: PropTypes.oneOf([
    "Start",
    "Center",
    "End",
    "SpaceAround",
    "SpaceBetween",
    "SpaceEvenly",
  ]),
  /**
   * Controls how the space is distributed between items along the cross-axis.
   */
  alignItems: PropTypes.oneOf([
    "Start",
    "Center",
    "Stretch",
    "End",
    "Baseline",
  ]),
};

export default FlexGrid;
