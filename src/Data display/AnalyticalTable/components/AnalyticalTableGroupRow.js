import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { usePrevious } from "react-use";
import { isEqual } from "lodash";

const Row = styled.tr`
  opacity: ${(props) => props.opacity};
  border: 1px solid gray;
  border-radius: 2px;
  background-color: gray;
  cursor: pointer;
  display: ${(props) => (props.show === false ? "none" : "default")};
`;

const Cell = styled.td`
  margin: 3px;
  padding: 6px;
  color: white;
  font-family: Arial;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid white;
`;

const LeafCell = styled.td`
  padding: 6px;
  font-weight: bold;
  text-align: ${(props) => (props.isNumber ? "right" : "left")};
  border: 1px solid black;
`;

const AnalyticalTableGroupRow = ({
  node,
  depth,
  isLeaf,
  getData,
  ExpandCollapseGroup,
  show = true,
  Columns,
  GroupByFields,
}) => {
  //
  const [leafs, setLeafs] = useState([]);
  const prevGroupBy = usePrevious(GroupByFields);

  useEffect(() => {
    if (!show) setLeafs([]);
  }, [show]);

  useEffect(() => {
    if (!isEqual(prevGroupBy, GroupByFields)) setLeafs([]);
  }, [GroupByFields]);

  //============================================================================

  const getOpacityByLevel = () => {
    return 1 - depth * 0.25;
  };

  const renderEmptyGroupedCells = () => {
    var cells = [];

    for (let i = 0; i < depth; i++) {
      cells.push(<Cell />);
    }

    return cells.map((c) => c);
  };

  const renderEmptyLeafCells = () => {
    var cells = [];

    for (let i = 0; i < depth + 1; i++) {
      cells.push(<td />);
    }

    return cells.map((c) => c);
  };

  const renderDataLeafCells = (data) => {
    return Columns.filter((c) => !GroupByFields.includes(c.accessor)).map(
      (c) => {
        return (
          <LeafCell isNumber={c.inputType === "NUMBER"}>
            {data[c.accessor]}
          </LeafCell>
        );
      }
    );
  };

  //============================================================================

  const handleClick = async () => {
    if (!isLeaf) ExpandCollapseGroup(depth, node);

    if (isLeaf && leafs.length === 0 && getData) {
      //
      var leafData = await getData(node.parentInfo);
      setLeafs(leafData);

      //
    } else if (isLeaf && leafs.length !== 0) setLeafs([]);
  };

  //============================================================================

  const renderLeafs = () => {
    return leafs.map((l) => (
      <tr>
        {renderEmptyLeafCells()}
        {renderDataLeafCells(l)}
      </tr>
    ));
  };

  return (
    <>
      <Row show={show} opacity={getOpacityByLevel()} onClick={handleClick}>
        {renderEmptyGroupedCells()}

        <Cell colSpan={4}>{node.value}</Cell>
      </Row>

      {renderLeafs()}
    </>
  );
};

AnalyticalTableGroupRow.defaultProps = {
  __TYPE__: "ANALYTICAL_TABLE_GROUP_ROW",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

AnalyticalTableGroupRow.propTypes = {
  __TYPE__: PropTypes.string,
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

export default AnalyticalTableGroupRow;
