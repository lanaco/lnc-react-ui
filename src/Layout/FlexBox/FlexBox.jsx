/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import styled from "@emotion/styled";
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

const FlexBox = forwardRef((props, ref) => {
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

export default FlexBox;
