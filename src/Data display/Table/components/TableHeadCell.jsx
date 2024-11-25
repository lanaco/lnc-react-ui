import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Icon from "../../../General/Icon/Icon";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../../_utils/utils";
import { useTheme } from "@emotion/react";

const HtmlHeadCell = styled.th`
white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  transition: all 250ms ease;
  padding: 0.875rem 1.5rem;
  cursor: ${(props) => (props.ordering ? "pointer" : "default")};
  width: ${(props) => props.width};

  &:hover {
    ${(props) =>
      props.ordering
        ? `background-color: ${getColorRgbaValue(
            props.theme,
            "TableHeadCell",
            null,
            "hover",
            "background"
          )};`
        : ""}
  }

  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "TableHeadCell",
      props.size,
      "enabled"
    )};

  color: ${(props) =>
    getColorRgbaValue(props.theme, "TableHeadCell", null, "enabled", "text")}};

  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "background"
    )}};

  border-top: ${(props) =>
    "1px solid " +
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "border"
    )}};

  border-bottom: ${(props) =>
    "1px solid " +
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "border"
    )}};


  &:first-of-type {
    border-radius: 0.5rem 0 0 0;
    border-left: ${(props) =>
      "1px solid " +
      getColorRgbaValue(
        props.theme,
        "TableHeadCell",
        null,
        "enabled",
        "border"
      )}};
  }

  &:last-of-type {
    border-radius: 0 0.5rem 0 0;
    border-right: ${(props) =>
      "1px solid " +
      getColorRgbaValue(
        props.theme,
        "TableHeadCell",
        null,
        "enabled",
        "border"
      )}};
  }
`;

const HeaderInnerCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderCellText = styled.span`
  padding-right: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      props.color,
      "enabled",
      "text"
    )};

  font-weight: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      props.color,
      "enabled",
      "fontWeight"
    )};
`;

const HeaderCellIcon = styled.span`
  & i {
    color: ${(props) =>
      props.sort
        ? "transparent"
        : getColorRgbaValue(
            props.theme,
            "TableHeadCell",
            props.color,
            "enabled",
            "text"
          )};

    font-weight: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "TableHeadCell",
        props.color,
        "enabled",
        "fontWeight"
      )};
  }
`;

const TableHeadCell = (props) => {
  //--------------------------
  const {
    __TYPE__ = "TABLE_HEAD_CELL",
    Column = {},
    Ordering = {},
    Index = 0,
    onColumnClick = () => {},
    EnableSelectAll = false,
    EnableOrdering = false,
    //-----------
    className = "",
    size = "small",
    color = "primary",
  } = props;

  const theme = useTheme();

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
        if (Ordering.ascending === true) orderingIconClass = "angle-up";

        if (Ordering.descending === true) orderingIconClass = "angle-down";

        if (!Ordering.ascending === false && !Ordering.descending === false)
          orderingIconClass = "sort";
      } else orderingIconClass = "sort";

      return (
        <HeaderCellIcon {...themeProps} sort={orderingIconClass === "sort"}>
          <Icon {...themeProps} sizeInUnits={"14px"} icon={orderingIconClass} />
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

  const getWidth = () => {
    if (Column && Column.width) {
      return Column.width + "%";
    }

    return "auto";
  };

  return (
    <HtmlHeadCell
      onClick={handleColumnClick}
      {...themeProps}
      selection={EnableSelectAll}
      ordering={EnableOrdering === true && Column.sortable === true}
      key={Index}
      width={getWidth()}
      title={Column.displayName}
    >
      <HeaderInnerCell {...themeProps}>
        <HeaderCellText {...themeProps}>{Column.displayName}</HeaderCellText>

        {renderOrdering()}
      </HeaderInnerCell>
    </HtmlHeadCell>
  );
};

// TODO : type
// TableHeadCell.defaultProps = {
//   __TYPE__: "TABLE_HEAD_CELL",
//   //--------------------
//   Column: {},
//   Ordering: {},
//   Index: 0,
//   EnableSelectAll: false,
//   EnableOrdering: false,
//   onColumnClick: () => {},
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

TableHeadCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Columns: PropTypes.object,
  Ordering: PropTypes.object,
  Index: PropTypes.any,
  EnableSelectAll: PropTypes.bool,
  EnableOrdering: PropTypes.bool,
  onColumnClick: PropTypes.func,
  //----------------------------------------
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray",
  ]),
};

export default TableHeadCell;

TableHeadCell.displayName = "TABLE_HEAD_CELL";
