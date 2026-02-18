/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, Children, isValidElement, cloneElement } from "react";
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

export default FlexGrid;
