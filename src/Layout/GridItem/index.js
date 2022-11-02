import React from 'react';
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledGridItem = styled.div`
  display: ${props => props.inline ? 'inline-grid' : 'grid'};
  row-gap: ${props => props.rowGap ? props.rowGap : (props.gap ? props.gap : 0)};
  column-gap: ${props => props.columnGap ? props.columnGap : (props.gap ? props.gap : 0)};
  ${(props) => props.gridTemplate && `grid-template: ${props.gridTemplate};`}
  ${(props) => props.templateRows && `grid-template-rows: ${props.templateRows};`}
  ${(props) => props.templateColumns && `grid-template-columns: ${props.templateColumns};`}
  ${(props) => props.justifySelf && `justify-self: ${props.justifySelf};`} 
  ${(props) => props.alignSelf && `align-self: ${props.alignSelf};`} 
  ${(props) => props.area && `grid-area: ${props.area};`} 
  ${(props) => props.colStart && `grid-column-start: ${props.colStart};`} 
  ${(props) => (props.colEnd || props.colSpan) && `grid-column-end: span ${props.colEnd || props.colSpan};`} 
  ${(props) => props.rowStart && `grid-row-start: ${props.rowStart};`} 
  ${(props) => (props.rowEnd || props.rowSpan) && `grid-row-end: span ${props.rowEnd || props.rowSpan};`} 
`;

const GridItem = React.forwardRef((props, ref) => {
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
        className,
        style,
        children,
        ...rest
    } = props;

    var gridItemProps = { colStart, colEnd, rowStart, rowEnd, colSpan, rowSpan, justifySelf, alignSelf, area };

    return (
        <StyledGridItem ref={ref} {...gridItemProps} className={className} style={style} {...rest}>
            {children}
        </StyledGridItem>
    )
});

GridItem.defaultProps = {
    style: {},
    className: "",
};

GridItem.propTypes = {
    /**
     * start the element at the columnStart column position
     */
    colStart: PropTypes.number,
    /**
     * end the element at the columnEnd column position
     */
    colEnd: PropTypes.number,
    /**
     * start the element at the rowStart row position
     */
    rowStart: PropTypes.number,
    /**
     * end the element at the rowStart row position
     */
    rowEnd: PropTypes.number,
    /**
     * span specific amount of columns
     */
    colSpan: PropTypes.number,
    /**
     * span specific amount of rows
     */
    rowSpan: PropTypes.number,
    justifySelf: PropTypes.oneOf(["start", "end", "center", "stretch"]),
    alignSelf: PropTypes.oneOf(["start", "end", "center", "stretch"]),
    area: PropTypes.string,
    //-------------
    style: PropTypes.object,
    className: PropTypes.string,
};

export default GridItem;

