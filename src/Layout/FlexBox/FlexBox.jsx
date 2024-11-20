import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { DirectionMap, WrapMap, JustifyMap, AlignMap } from "./mappings";

const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: ${(props) => DirectionMap[props.direction]};
  flex-wrap: ${(props) => WrapMap[props.wrap]};
  justify-content: ${(props) => JustifyMap[props.justifyContent]};
  align-items: ${(props) => AlignMap[props.alignItems]};
  column-gap: ${(props) => (props.columnGap ? props.columnGap : props.gap)};
  row-gap: ${(props) => (props.rowGap ? props.rowGap : props.gap)};
`;

const FlexBox = React.forwardRef((props, ref) => {
  //============================================== PROPS ===============================================
  const {
    className = "",
    children,
    direction = "Row",
    wrap = "NoWrap",
    justifyContent = "Start",
    alignItems = "Stretch",
    gap = "0",
    ...rest
  } = props;

  //============================================== RENDER ==============================================
  return (
    <StyledFlexbox
      className={"lnc-flexbox-container " + (className ? className : "")}
      ref={ref}
      wrap={wrap}
      gap={gap}
      alignItems={alignItems}
      direction={direction}
      justifyContent={justifyContent}
      {...rest}
    >
      {children}
    </StyledFlexbox>
  );
});

//====================================== PROP TYPES / DEFAULT PROPS ====================================
// FlexBox.defaultProps = {
//   direction: "Row",
//   wrap: "NoWrap",
//   justifyContent: "Start",
//   alignItems: "Stretch",
//   gap: "0",
// };

FlexBox.propTypes = {
  rowGap: PropTypes.string,
  columnGap: PropTypes.string,
  gap: PropTypes.string,
  /**
   * Controls the direction of items in FlexBox.
   */
  direction: PropTypes.oneOf(["Row", "RowReverse", "Column", "ColumnReverse"]),
  /**
   * Determines whether the FlexBox should wrap, when there is not enough space to display all items in one line.
   */
  wrap: PropTypes.oneOf(["NoWrap", "Wrap", "WrapReverse"]),
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

export default FlexBox;
