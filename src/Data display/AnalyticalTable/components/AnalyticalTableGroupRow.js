import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { usePrevious } from "react-use";
import { isEqual } from "lodash";

const Row = styled.tr`
  border-radius: 2px;
  background-color: ${(props) => props.bgColor};
  cursor: pointer;
  display: ${(props) => (props.show === false ? "none" : "default")};
`;

const Cell = styled.td`
  margin: 3px;
  padding: 6px;
  font-family: Arial;
  font-size: 12px;
  border: 1px solid white;
`;

const LeafCell = styled.td`
  padding: 6px;
  text-align: ${(props) => (props.isNumber ? "right" : "left")};
`;

const AnalyticalTableGroupRow = (props) => {
  //
  const {
    Node,
    Depth,
    IsLeaf,
    GetData,
    ExpandCollapseGroup,
    Show = true,
    Columns,
    GroupByFields,
  } = props;

  const [leafs, setLeafs] = useState([]);
  const prevGroupBy = usePrevious(GroupByFields);

  useEffect(() => {
    if (!Show) setLeafs([]);
  }, [Show]);

  useEffect(() => {
    if (!isEqual(prevGroupBy, GroupByFields)) setLeafs([]);
  }, [GroupByFields]);

  //============================================================================

  const getBgColorByLevel = () => {
    if (Depth === 0) return theme.palette.gray[600];
    if (Depth === 1) return theme.palette.gray[400];
    if (Depth === 2) return theme.palette.gray[200];

    return "white";
  };

  const getOpacityByLevel = () => {
    return 1 - Depth * 0.25;
  };

  const renderEmptyGroupedCells = () => {
    var cells = [];

    for (let i = 0; i < Depth; i++) {
      cells.push(<Cell />);
    }

    return cells.map((c) => c);
  };

  const renderEmptyLeafCells = () => {
    var cells = [];

    for (let i = 0; i < Depth + 1; i++) {
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
    if (!IsLeaf) ExpandCollapseGroup(Depth, Node);

    if (IsLeaf && leafs.length === 0 && GetData) {
      //
      var leafData = await GetData(Node.parentInfo);
      setLeafs(leafData);

      //
    } else if (IsLeaf && leafs.length !== 0) setLeafs([]);
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
      <Row
        show={Show}
        bgColor={getBgColorByLevel()}
        opacity={getOpacityByLevel()}
        onClick={handleClick}
      >
        {renderEmptyGroupedCells()}

        <Cell colSpan={4}>{Node.value}</Cell>
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
