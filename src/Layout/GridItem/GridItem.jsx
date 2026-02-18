/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import styled from "@emotion/styled";

const StyledGridItem = styled.div`
  display: ${(props) => (props.inline ? "inline-grid" : "grid")};
  row-gap: ${(props) =>
    props.rowGap ? props.rowGap : props.gap ? props.gap : 0};
  column-gap: ${(props) =>
    props.columnGap ? props.columnGap : props.gap ? props.gap : 0};
  ${(props) => props.gridTemplate && `grid-template: ${props.gridTemplate};`}
  ${(props) =>
    props.templateRows && `grid-template-rows: ${props.templateRows};`}
  ${(props) =>
    props.templateColumns && `grid-template-columns: ${props.templateColumns};`}
  ${(props) => props.justifySelf && `justify-self: ${props.justifySelf};`} 
  ${(props) => props.alignSelf && `align-self: ${props.alignSelf};`} 
  ${(props) => props.area && `grid-area: ${props.area};`} 
  ${(props) => props.colStart && `grid-column-start: ${props.colStart};`} 
  ${(props) =>
    (props.colEnd || props.colSpan) &&
    `grid-column-end: span ${props.colEnd || props.colSpan};`} 
  ${(props) => props.rowStart && `grid-row-start: ${props.rowStart};`} 
  ${(props) =>
    (props.rowEnd || props.rowSpan) &&
    `grid-row-end: span ${props.rowEnd || props.rowSpan};`}
`;

const GridItem = forwardRef((props, ref) => {
  const {
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    colSpan,
    rowSpan,
    justifySelf,
    alignSelf,
    area,
    className = "",
    style = {},
    children,
    ...rest
  } = props;

  var gridItemProps = {
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    colSpan,
    rowSpan,
    justifySelf,
    alignSelf,
    area,
  };

  return (
    <StyledGridItem
      ref={ref}
      {...gridItemProps}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </StyledGridItem>
  );
});

// GridItem.defaultProps = {
//     style: {},
//     className: "",
// };

export default GridItem;
