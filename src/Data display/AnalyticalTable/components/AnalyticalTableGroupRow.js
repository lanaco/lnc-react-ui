import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { usePrevious } from "react-use";
import { isEqual } from "lodash";

const Row = styled.tr`
  border-radius: 3px;
  // background-color: ${(props) => props.bgColor};
  cursor: pointer;
  display: ${(props) => (props.show === false ? "none" : "default")};
`;

const Cell = styled.td`
  // padding: 8px;
  padding-left: ${(props) =>
    props.padding + "__________________________________________" + "px"};
  font-family: Arial;
  font-size: 12px;
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
`;

const LeafCell = styled.td`
  padding: 8px;
  padding-right: 16px;
  text-align: ${(props) => (props.isNumber ? "right" : "left")};
`;

const CellContent = styled.div`
  display: flex;
  width: 100%;
`;

const CellPad = styled.div``;

const CellInfo = styled.div`
  width: 100%;
  padding: 8px;
  background-color: ${theme.palette.gray[400]};
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
    return theme.palette.gray[100];
  };

  const getOpacityByLevel = () => {
    return 1 - Depth * 0.25;
  };

  const getPaddingByLevel = () => {
    return Depth * 60;
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

    for (let i = 0; i < 1; i++) {
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

  const renderPaddingDiv = () => {
    var pad = [];

    for (let i = 0; i < Depth; i++) {
      pad.push(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>);
    }

    return <CellPad>{pad}</CellPad>;
  };

  const renderGroupCell = () => {
    return <CellInfo>{Node.value}</CellInfo>;
  };

  return (
    <>
      <Row
        show={Show}
        bgColor={getBgColorByLevel()}
        opacity={getOpacityByLevel()}
        onClick={handleClick}
      >
        {/* {renderEmptyGroupedCells()} */}

        <Cell colSpan={Columns.length} padding={getPaddingByLevel()}>
          <CellContent>
            {renderPaddingDiv()}
            {renderGroupCell()}
          </CellContent>
        </Cell>
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
