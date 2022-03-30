import React, { useState, useEffect } from "react";
import GroupRow from "./components/GroupRow";
import styled from "@emotion/styled";
import { cloneDeep } from "lodash";

const Table = styled.table`
  width: 100%;
  font-family: Arial;
`;

const THead = styled.thead`
  background-color: black;
  color: white;
  font-weight: bold;
  text-align: left;
`;

const THeadCell = styled.th`
  padding: 6px;
`;

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
    map[list[i].value] = i;
    list[i].children = [];
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent !== null) {
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

const iterativeTreeTraversal = (tree) => {
  var flat = [];
  var stack = [];

  tree.forEach((root) => {
    stack.push(root);

    while (stack.length !== 0) {
      var node = stack.pop();
      var depth = groupingData.fields.indexOf(node.column);

      flat.push({
        show: depth === 0 ? true : false,
        depth: groupingData.fields.indexOf(node.column),
        node: node,
      });

      if (node.children && node.children.length !== 0) {
        node.children.forEach((n) => stack.push(n));
      }
    }
  });

  return flat;
};

const IterativeTreeTraversal = (props) => {
  const [groups, setGroups] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    var tree = GetDataTreeFromGroupDefinition(groupingData);
    var _groups = iterativeTreeTraversal(tree);

    setGroups(_groups);
  }, []);

  const toggle = (depth, node, show) => {
    var expand = iterativeTreeTraversal([node]).filter(
      (x) => x.depth === depth + 1
    );

    var collapse = iterativeTreeTraversal([node]).filter(
      (x) => x.depth > depth
    );

    if (show) console.log(collapse);
    if (!show) console.log(expand);
  };

  const getData = (parentInfo) => {
    return props.Data.filter((d) => {
      return (
        d.year === parentInfo.year.title &&
        d.type === parentInfo.type.title &&
        d.status === parentInfo.status.title
      );
    });
  };

  return (
    <div>
      <Table>
        <THead>
          <tr>
            <THeadCell>Year</THeadCell>
            <THeadCell>Type</THeadCell>
            <THeadCell>Status</THeadCell>
            <THeadCell>Amount</THeadCell>
          </tr>
        </THead>

        <tbody>
          {groups.map((n, i) => {
            return (
              <GroupRow
                key={i}
                depth={n.depth}
                node={n.node}
                isLeaf={n.depth === 2}
                getData={getData}
                toggle={toggle}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default IterativeTreeTraversal;
