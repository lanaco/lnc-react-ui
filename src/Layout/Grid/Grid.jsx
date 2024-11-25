/* eslint-disable react/display-name */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledGrid = styled.div`
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
  ${(props) => props.justifyItems && `justify-items: ${props.justifyItems};`} 
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`} 
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`} 
  ${(props) =>
    props.templateAreas && `grid-template-areas: ${props.templateAreas};`}
`;

const Grid = forwardRef((props, ref) => {
  const {
    inline = false,
    template,
    templateColumns,
    templateRows,
    gap,
    rowGap,
    columnGap,
    justifyItems,
    alignItems,
    justifyContent,
    templateAreas,
    children,
    className = "",
    style = {},
    ...rest
  } = props;

  var gridProps = {
    inline,
    template,
    templateColumns,
    templateRows,
    gap,
    rowGap,
    columnGap,
    justifyItems,
    alignItems,
    justifyContent,
    templateAreas,
  };

  return (
    <StyledGrid
      ref={ref}
      {...gridProps}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </StyledGrid>
  );
});

Grid.defaultProps = {
  inline: false,
  style: {},
  className: "",
};

Grid.propTypes = {
  inline: PropTypes.bool,
  template: PropTypes.string,
  templateColumns: PropTypes.string,
  templateRows: PropTypes.string,
  gap: PropTypes.string,
  rowGap: PropTypes.string,
  columnGap: PropTypes.string,
  justifyItems: PropTypes.oneOf(["start", "end", "center", "stretch"]),
  alignItems: PropTypes.oneOf(["start", "end", "center", "stretch"]),
  placeItems: PropTypes.oneOf(["start", "end", "center", "stretch"]),
  justifyContent: PropTypes.oneOf([
    "start",
    "end",
    "center",
    "stretch",
    "space-between",
    "space-evenly",
  ]),
  templateAreas: PropTypes.string,
  //-------------
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Grid;
