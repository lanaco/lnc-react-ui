import React, { useState } from "react";
import styled from "@emotion/styled";

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
  font-size: 15px;
  font-weight: bold;
`;

const LeafCell = styled.td`
  padding: 6px;
  font-weight: bold;
  text-align: right;
  border: 1px solid black;
`;

const GroupRow = ({ node, depth, isLeaf, getData, toggle, show = true }) => {
  //
  const [leafs, setLeafs] = useState([]);

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

  const renderLeafs = () => {
    return leafs.map((l) => (
      <tr>
        {renderEmptyLeafCells()}
        <LeafCell>{l.amount}</LeafCell>
      </tr>
    ));
  };

  const handleClick = () => {
    if (isLeaf && leafs.length === 0) {
      setLeafs(getData(node.parentInfo));
    }

    if (isLeaf && leafs.length !== 0) {
      setLeafs([]);
    }

    toggle(depth, node, show);
  };

  return (
    <>
      <Row
        opacity={getOpacityByLevel()}
        onClick={handleClick}
        show={depth === 0 ? true : show}
      >
        {renderEmptyGroupedCells()}

        <Cell colSpan={4}>{node.value}</Cell>
      </Row>

      {renderLeafs()}
    </>
  );
};

export default GroupRow;
