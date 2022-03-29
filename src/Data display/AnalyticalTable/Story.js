import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import AnalyticalTable from "./index";

const groupingData = {
  fields: ["year", "type", "status"],
  //-------------------------------------
  data: [
    {
      id: "g1",
      //-----
      year: {
        title: "2020",
        obj: {
          id: 1,
        },
      },
      type: {
        title: "type1",
        obj: {
          id: 1,
        },
      },
      status: {
        title: "status1",
        obj: {
          id: 1,
        },
      },
    },
    //-------------------------
    {
      id: "g1",
      //-----
      year: {
        title: "2020",
        obj: {
          id: 1,
        },
      },
      type: {
        title: "type1",
        obj: {
          id: 1,
        },
      },
      status: {
        title: "status2",
        obj: {
          id: 2,
        },
      },
    },
    //-------------------------
    {
      id: "g1",
      //-----
      year: {
        title: "2020",
        obj: {
          id: 1,
        },
      },
      type: {
        title: "type2",
        obj: {
          id: 2,
        },
      },
      status: {
        title: "status1",
        obj: {
          id: 1,
        },
      },
    },
    //-------------------------
    {
      id: "g1",
      //-----
      year: {
        title: "2020",
        obj: {
          id: 1,
        },
      },
      type: {
        title: "type2",
        obj: {
          id: 2,
        },
      },
      status: {
        title: "status2",
        obj: {
          id: 2,
        },
      },
    },
    //========================================
    {
      id: "g2",
      //-----
      year: {
        title: "2021",
        obj: {
          id: 2,
        },
      },
      type: {
        title: "type1",
        obj: {
          id: 1,
        },
      },
      status: {
        title: "status1",
        obj: {
          id: 1,
        },
      },
    },
    //-------------------------
    {
      id: "g2",
      //-----
      year: {
        title: "2021",
        obj: {
          id: 2,
        },
      },
      type: {
        title: "type1",
        obj: {
          id: 1,
        },
      },
      status: {
        title: "status2",
        obj: {
          id: 2,
        },
      },
    },
    //-------------------------
    {
      id: "g2",
      //-----
      year: {
        title: "2021",
        obj: {
          id: 2,
        },
      },
      type: {
        title: "type2",
        obj: {
          id: 2,
        },
      },
      status: {
        title: "status1",
        obj: {
          id: 1,
        },
      },
    },
  ],
};

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
          groupTree.push({
            column: f,
            value: d[f].title,
            obj: d[f].obj,
            parent,
            parentInfo,
          });
        }
      });
    });

    TREE = [...TREE, ...createDataTree(groupTree)];
  });

  return TREE;
};

const GetFlatDataTreeFromGroupDefinition = (groupDef) => {
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
          groupTree.push({
            column: f,
            value: d[f].title,
            obj: d[f].obj,
            parent,
            parentInfo,
          });
        }
      });
    });

    TREE = [...TREE, ...groupTree];
  });

  return TREE;
};

const Group = styled.tr`
  opacity: ${(props) => props.opacity};
  border: 1px solid gray;
  border-radius: 2px;
  background-color: gray;
  cursor: pointer;
  display: ${(props) => (props.show === false ? "none" : "default")};
`;

const GroupCell = styled.td`
  margin: 3px;
  padding: 12px;
  color: white;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  margin-left: ${(props) => props.padding || "0"};
`;

const Leaf = styled.tr`
  display: ${(props) => (props.show === false ? "none" : "default")};
`;

const renderTree = ({ node, level, index, show, findParents }) => {
  const [expanded, setExpanded] = useState(false);
  const [leafs, setLeafs] = useState([]);

  useEffect(() => {
    if (show === false) setExpanded(false);
  }, [show]);

  const getOpacityByLevel = () => {
    return 1 - level * 0.25;
  };

  const getPaddingByLevel = () => {
    var pad = 12 + level * 50;
    return pad + "px";
  };

  const renderEmptyCellsByLevel = () => {
    var arr = Array.from({ length: level }, (_, idx) => ++idx);

    return arr.map((x) => <GroupCell key={x} />);
  };

  const onClick = () => {
    setExpanded(!expanded);
    if (level === 2) {
      setLeafs(findParents(node));
    }
  };

  const renderNode = () => {
    return (
      <Group
        key={node.value}
        show={show}
        index={index}
        opacity={getOpacityByLevel()}
        onClick={onClick}
      >
        {renderEmptyCellsByLevel()}

        <GroupCell colSpan={4} padding={getPaddingByLevel()}>
          <span>{level + ": "}</span>
          <span>{node.value}</span>
        </GroupCell>
      </Group>
    );
  };

  const renderChildren = () => {
    if (node.children.length > 0)
      return node.children.map((n, i) =>
        renderTree({
          node: n,
          level: level + 1,
          index: i,
          findParents,
          show: expanded,
        })
      );

    return <></>;
  };

  const renderLeafs = () => {
    return leafs.map((l) => {
      return (
        <Leaf show={expanded}>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div
              style={{
                textAlign: "right",
                padding: "12px",
                border: "1px solid black",
              }}
            >
              {l.amount}
            </div>
          </td>
        </Leaf>
      );
    });
  };

  if (level === 0) {
    return (
      <tbody key={node.value}>
        {renderNode()}
        {renderChildren()}
      </tbody>
    );
  }

  return (
    <>
      {renderNode()}
      {renderChildren()}
      {renderLeafs()}
    </>
  );
};

const Story = (props) => {
  var tree = GetDataTreeFromGroupDefinition(groupingData);

  var [filters, setFilters] = useState({});

  const logParents = (leafNode) => {
    var fs = {};

    groupingData.fields.forEach((f) => {
      fs[f] = leafNode.parentInfo[f].title;
    });

    setFilters(fs);

    return props.Data.filter((d) => {
      return (
        d.year === leafNode.parentInfo.year.title &&
        d.type === leafNode.parentInfo.type.title &&
        d.status === leafNode.parentInfo.status.title
      );
    });
  };

  return (
    <>
      <table
        style={{
          width: "100%",
        }}
      >
        <thead
          style={{
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>Year</th>
            <th>Type</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>

        {tree.map((t) =>
          renderTree({
            node: t,
            index: 0,
            level: 0,
            show: true,
            findParents: logParents,
          })
        )}
      </table>
      <hr />
      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </>
  );
};

export default Story;
