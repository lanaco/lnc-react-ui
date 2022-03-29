import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";

const HtmlRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  ${(props) => {
    if (props.IsSelected !== true)
      return `
       &:hover {
          & > td {
            // background-color: whitesmoke ;
          }

          cursor: pointer;
      }`;
    else return "";
  }}

  ${(props) => {
    if (props.IsSelected === true)
      return `
        background-color: ${theme.palette.primary.lighter};
        cursor: pointer;
      `;
    else return "";
  }}
`;

//================================================================================

function createDataTree(list) {
  var map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].value] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent !== null) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parent]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

const GetDataTreeFromGroupDefinition = (groupDef) => {
  var TREE = [];

  var groupingDataIds = [...new Set(groupDef.data.map((x) => x.id))];
  var filteredGroupingData = [];

  groupingDataIds.forEach((gId) => {
    filteredGroupingData.push(groupDef.data.filter((item) => item.id === gId));
  });

  filteredGroupingData.forEach((fgd) => {
    var groupTree = [];

    fgd.forEach((d) => {
      groupDef.fields.forEach((f, i) => {
        var parent = null;
        var parentInfo = null;
        if (i !== 0) {
          parent = d[groupDef.fields[i - 1]].title;
          parentInfo = d;
        }

        var item = groupTree.find(
          (x) => x.column === f && x.value === d[f].title && x.parent === parent
        );

        if (item === null || item === undefined) {
          groupTree.push({ column: f, value: d[f].title, parent, parentInfo });
        }
      });
    });

    TREE = [...TREE, ...createDataTree(groupTree)];
  });

  return TREE;
};

//================================================================================

const AnalyticalTableRow = (props) => {
  //--------------------------
  const {
    onRowClick,
    onSelectRow,
    RowData,
    SelectedData,
    Columns,
    ColumnsToRender,
    Index,
    IsSelected,
    //----------------
    className,
    size,
    color,
    theme,
    //================
    GroupBy,
  } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  const onClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onRowClick(e, RowData);
  };

  var tree = GetDataTreeFromGroupDefinition(GroupBy);

  return (
    <HtmlRow
      {...themeProps}
      IsSelected={IsSelected}
      key={Index}
      onClick={onClick}
    >
      {/* {props.children} */}

      <td style={{ padding: "8px" }} colspan={4}>
        {`${tree.find((x) => x.value === String(RowData.year)).value}`}
        {/* {RowData.id} */}
      </td>
    </HtmlRow>
  );
};

AnalyticalTableRow.defaultProps = {
  __TYPE__: "TABLE_ROW",
  //--------------------
  onRowClick: () => {},
  onSelectRow: () => {},
  RowData: {},
  SelectedData: [],
  Columns: [],
  ColumnsToRender: [],
  //--------------------
  IsSelected: null,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
  RowData: PropTypes.object,
  SelectedData: PropTypes.array,
  Columns: PropTypes.arrayOf(PropTypes.object),
  ColumnsToRender: PropTypes.arrayOf(PropTypes.object),
  //----------------------------------------
  IsSelected: PropTypes.bool,
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

export default AnalyticalTableRow;
