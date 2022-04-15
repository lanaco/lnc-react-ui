import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import {
  createDataTree,
  getDataTreeFromGroupDefinition,
  iterativeTreeTraversal,
} from "./service/service";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import theme from "../../_utils/theme";
import Table from "../Table/index";
import AnalyticalTableRow from "./components/AnalyticalTableRow";
import AnalyticalTableCell from "./components/AnalyticalTableCell";
import AnalyticalTableBody from "./components/AnalyticalTableBody";
import AnalyticalTableHead from "./components/AnalyticalTableHead";

const AnalyticalTable = forwardRef((props, ref) => {
  //
  var { Data, GroupBy = {}, GetDataForGroup = () => {} } = props;

  const [groups, setGroups] = useState([]);

  //================ STATE =================================================================

  //================ LIFECYCLE =============================================================

  // Functions exposed to parent via ref
  useImperativeHandle(ref, () => ({}), [
    props, // Update functions when certain state changes
  ]);

  useEffect(() => {
    if (GroupBy && GroupBy.fields && GroupBy.fields.length > 0) {
      var groupsTree = getDataTreeFromGroupDefinition(GroupBy);
      var groups = iterativeTreeTraversal(groupsTree, GroupBy.fields);

      setGroups(
        groups.map((g) => {
          return {
            depth: g.depth,
            show: g.depth === 0,
            node: g.node,
            expanded: false,
            data: [],
          };
        })
      );
    } else {
      setGroups([]);
    }
  }, [GroupBy]);

  //================ EVENTS ================================================================

  //================ METHODS ===============================================================

  const ExpandCollapseGroup = (depth, node) => {
    var groupsCopy = cloneDeep(groups);
    var expandOrCollapse = true;

    var childrenIds = node.children.map((c) => c._id_);
    var groupsChildrenIntersect = groupsCopy.filter((g) =>
      childrenIds.includes(g.node._id_)
    );

    if (groupsChildrenIntersect[0].show === true) expandOrCollapse = false;

    // EXPAND
    if (expandOrCollapse) {
      groupsCopy.forEach((g) => {
        if (g.node._id_ === node._id_) g.expanded = true;

        if (childrenIds.includes(g.node._id_)) {
          g.show = true;
        }
      });

      setGroups(groupsCopy);
    }

    // COLLAPSE
    if (!expandOrCollapse) {
      var toCollapse = iterativeTreeTraversal([node], GroupBy.fields);

      var toCollapseIds = toCollapse
        .filter((x) => x.depth > depth)
        .map((x) => x.node._id_);

      groupsCopy.forEach((g) => {
        if (g.node._id_ === node._id_) g.expanded = false;

        if (toCollapseIds.includes(g.node._id_)) {
          g.show = false;
        }
      });

      setGroups(groupsCopy);
    }
  };

  const handleGetDataForGroup = async (node) => {
    var groupsCopy = cloneDeep(groups);
    var selectedNode = groupsCopy.find((x) => x.node._id_ === node._id_);

    var data = await GetDataForGroup(node.parentInfo);
    selectedNode.data = data;

    setGroups(groupsCopy);
  };

  const handleClearData = (node) => {
    var groupsCopy = cloneDeep(groups);
    var selectedNode = groupsCopy.find((x) => x.node._id_ === node._id_);

    selectedNode.data = [];
    setGroups(groupsCopy);
  };

  //================ RENDER ================================================================

  const renderAnalyticalTableRow = () => {
    var rowProps = { GroupBy: props.GroupBy };

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_ROW", props.children),
        rowProps
      ) || <AnalyticalTableRow {...rowProps} />
    );
  };

  const renderAnalyticalTableCell = () => {
    var cellProps = {};

    return (
      renderCustomElement(
        getCustomRender("ANALYTICAL_TABLE_CELL", props.children),
        cellProps
      ) || <AnalyticalTableCell {...cellProps} />
    );
  };

  const renderAnalyticalTableBody = () => {
    if (GroupBy && GroupBy.fields && GroupBy.fields.length > 0) {
      var bodyProps = {
        Groups: groups,
        GetData: handleGetDataForGroup,
        ClearData: handleClearData,
        ExpandCollapseGroup,
      };

      var children = [];
      children.push(renderAnalyticalTableRow());
      children.push(renderAnalyticalTableCell());

      return (
        renderCustomElement(
          getCustomRender("TABLE_BODY", props.children),
          bodyProps,
          children
        ) || (
          <AnalyticalTableBody {...bodyProps}>{children}</AnalyticalTableBody>
        )
      );
    }

    return <></>;
  };

  const renderAnalyticalTableHead = () => {
    if (GroupBy && GroupBy.fields && GroupBy.fields.length > 0) {
      var headProps = {
        GroupBy,
        Groups: groups,
        GetData: GetDataForGroup,
        ExpandCollapseGroup,
      };

      return (
        renderCustomElement(
          getCustomRender("TABLE_HEAD", props.children),
          headProps
        ) || <AnalyticalTableHead {...headProps} />
      );
    }

    return <></>;
  };

  return (
    <>
      <Table {...props} Data={Data} VisibilityPattern={null}>
        {props.children}

        {renderAnalyticalTableBody()}
        {renderAnalyticalTableHead()}
      </Table>
    </>
  );
});

AnalyticalTable.defaultProps = {
  __TYPE__: "ANALYTICAL_TABLE",
  //--------------------
  Loading: false,
  Columns: [],
  Data: [],
  //--------------------
  EnableSelection: false,
  EnableOrdering: false,
  EnableLoader: false,
  EnableSelectAll: false,
  //--------------------
  NoDataText: "No data to show",
  SelectedData: [],
  SelectedEntirePage: false,
  RowIdentifier: "id",
  VisibilityPattern: {},
  Ordering: {},
  //--------------------
  onColumnClick: () => {},
  onRowClick: () => {},
  onSelectRow: () => {},
  onSelectAll: () => {},
  //--------------------
  onRowFocusChange: () => {},
  onDiscard: () => {},
  onInputChange: () => {},
  //--------------------
  size: "small",
  color: "primary",
  theme: theme,
  className: "",
};

AnalyticalTable.propTypes = {
  /**
   * This property determines where the component is rendered.
   * Should not be overridden!
   */
  __TYPE__: PropTypes.string,
  //----------------------------------------
  /**
   * Show a selection checkbox in the first cell of every row.
   * Value of the checkbox is determined by the `SelectedData` property.
   */
  EnableSelection: PropTypes.bool,
  /**
   * Show ordering arrows in header cells.
   */
  EnableOrdering: PropTypes.bool,
  /**
   * Show a spinner with backdrop on top of the table when `Loading` is set to `true`.
   */
  EnableLoader: PropTypes.bool,
  /**
   * Show a selection checkbox in the first cell of the table header.
   * Value of the checkbox is determined by the `SelectedEntirePage` property.
   */
  EnableSelectAll: PropTypes.bool,
  //----------------------------------------
  /**
   * Specify the text that is shown when there are 0 rows in the `Data`.
   */
  NoDataText: PropTypes.string,
  /**
   *  Disables some events and actions when set to `true`. Also triggers the spinner if `EnableLoader` is set to `true`.
   */
  Loading: PropTypes.bool,
  /**
   * Defines the table columns.
   * @param id - Column identifier
   * @param displayName - Text displayed in the header
   * @param accessor - Access the property in `Data`
   * @param width - Default column width (overridden by the VisibilityPattern)
   * @param sortable - Can be sorted
   *
   */
  Columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Defines the data displayed in each row.
   */
  Data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Define the selected data.
   * @param id - Column identifier (mandatory field)
   */
  SelectedData: PropTypes.arrayOf(PropTypes.object),
  /**
   *  Value of the `SelectAll` checkbox.
   */
  SelectedEntirePage: PropTypes.bool,
  /**
   *  Defines which field in a data object is the row identifier.
   */
  RowIdentifier: PropTypes.string,
  /**
   * An object that defines the width and order of columns for different screen sizes.
   * (`XS`,`S`,`M`,`L`,`XL`)
   */
  VisibilityPattern: PropTypes.object,
  /**
   * Describe how the data is ordered.
   * @param columnId - Column identifier, maps to the id on the Column object
   */
  Ordering: PropTypes.object,
  //----------------------------------------
  /**
   *  Triggers when the focus is moved to another row or another component outside of the table
   * @param event - event object
   * @param currentRowIndex - index of the currently focused row
   * @param nextRowIndex - index of the next focused row (-1 if the focuse moves otutside of the table rows)
   */
  onRowFocusChange: () => {},
  /**
   *
   */
  onDiscard: () => {},
  /**
   *
   */
  onInputChange: () => {},
  //----------------------------------------
  /**
   * Triggered on header cell click.
   * @param event - event object
   * @param column - column definition
   * @param ordering - updated ordering object, or undefined if ordering is not enabled or the column is not sortable
   */
  onColumnClick: PropTypes.func,
  /**
   * Triggered on table row click.
   * @param event - event object
   * @param rowData - row data
   */
  onRowClick: PropTypes.func,
  /**
   * Triggered on selection checkbox click.
   * @param event - event object
   * @param rowData - row data
   * @param isSelected - the value of selection checkbox
   */
  onSelectRow: PropTypes.func,
  /**
   * Triggered on select all checkbox click.
   * @param event - event object
   * @param isSelected - the value of select all checkbox
   */
  onSelectAll: PropTypes.func,
  //----------------------------------------
  /**
   * Theme object.
   */
  theme: PropTypes.object.isRequired,
  /**
   * `className` applied to the component container.
   */
  className: PropTypes.string,
  /**
   * Defines size of the component (padding, margin, font etc.).
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   *  Defines the palette color for the component.
   */
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
};

export default AnalyticalTable;
