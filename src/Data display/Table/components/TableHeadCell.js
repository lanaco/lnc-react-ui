import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import Icon from "../../../General/Icon/index";

const HtmlHeadCell = styled.th`
  text-align: left;
  transition: all 250ms ease;
  font-weight: 900;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  border-bottom: 1px solid ${(props) => props.theme.palette.transparent.light};
  border-top: 1px solid ${(props) => props.theme.palette.transparent.light};

  padding: ${(props) =>
    props.selection ? "2px 2px 2px 6px" : "4px 2px 4px 6px"};

  &:first-of-type {
    border-radius: 3px 0 0 0;
  }

  &:last-of-type {
    border-radius: 0 3px 0 0;
  }

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }
`;

const HeaderInnerCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;

  & i {
    color: black;
  }
`;

const HeaderCellText = styled.span`
  color: black;
`;

const HeaderCellIcon = styled.span`
  color: black;
  margin-left: auto;

  & i {
    color: ${(props) =>
      props.sort ? "transparent" : theme.palette[props.color].main};
  }
`;

const TableHeadCell = (props) => {
  //--------------------------
  const {
    Column,
    Ordering,
    Index,
    onColumnClick,
    EnableSelectAll,
    EnableOrdering,
    //-----------
    className,
    size,
    color,
    theme,
  } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  const renderOrdering = () => {
    if (Column.sortable === true && EnableOrdering === true) {
      let orderingIconClass;

      if (Ordering && Ordering.columnId === Column.id) {
        if (Ordering.ascending === true)
          orderingIconClass = "long-arrow-alt-up";

        if (Ordering.descending === true)
          orderingIconClass = "long-arrow-alt-down";

        if (!Ordering.ascending === false && !Ordering.descending === false)
          orderingIconClass = "sort";
      } else orderingIconClass = "sort";

      // console.log(Column.accessor, orderingIconClass);

      return (
        <HeaderCellIcon color={"primary"} sort={orderingIconClass === "sort"}>
          <Icon color={"primary"} icon={orderingIconClass} />
        </HeaderCellIcon>
      );
    }

    return <></>;
  };

  const handleColumnClick = (e) => {
    var ordering = { columnId: Column.id, ascending: false, descending: true };

    if (
      EnableOrdering === true &&
      Column.sortable === true &&
      Ordering &&
      Ordering.columnId === Column.id
    ) {
      if (Ordering.ascending === true) {
        ordering.ascending = false;
        ordering.descending = false;
      }

      if (Ordering.descending === true) {
        ordering.ascending = true;
        ordering.descending = false;
      }

      if (Ordering.descending === false && Ordering.ascending === false) {
        ordering.ascending = false;
        ordering.descending = true;
      }

      onColumnClick(e, Column, ordering);
    }

    if (
      EnableOrdering === true &&
      Column.sortable === true &&
      Ordering &&
      Ordering.columnId !== Column.id
    ) {
      onColumnClick(e, Column, ordering);
    }

    if (Column.sortable !== true || EnableOrdering !== true)
      onColumnClick(e, Column);
  };

  return (
    <HtmlHeadCell
      onClick={handleColumnClick}
      {...themeProps}
      selection={EnableSelectAll}
      key={Index}
    >
      <HeaderInnerCell>
        <HeaderCellText>{Column.displayName}</HeaderCellText>

        {renderOrdering()}
      </HeaderInnerCell>
    </HtmlHeadCell>
  );
};

TableHeadCell.defaultProps = {
  __TYPE__: "TABLE_HEAD_CELL",
  //--------------------
  Column: {},
  Ordering: {},
  Index: 0,
  EnableSelectAll: false,
  onColumnClick: () => {},
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableHeadCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Columns: PropTypes.object,
  Ordering: PropTypes.object,
  Index: PropTypes.any,
  EnableSelectAll: PropTypes.bool,
  onColumnClick: PropTypes.func,
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

export default TableHeadCell;
