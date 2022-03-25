import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const groupingData = {
  fields: ["year", "type", "status"],
  //-------------------------------------
  data: [
    {
      id: "g1",
      //-----
      year: {
        title: "2020",
      },
      type: {
        title: "type1",
      },
      status: {
        title: "status1",
      },
    },
    //-------------------------
    {
      id: "g1",
      //-----
      year: {
        title: "2020",
      },
      type: {
        title: "type1",
      },
      status: {
        title: "status2",
      },
    },
    //-------------------------
    {
      id: "g1",
      //-----
      year: {
        title: "2020",
      },
      type: {
        title: "type2",
      },
      status: {
        title: "status1",
      },
    },
    //-------------------------
    {
      id: "g1",
      //-----
      year: {
        title: "2020",
      },
      type: {
        title: "type2",
      },
      status: {
        title: "status2",
      },
    },
    //========================================
    {
      id: "g2",
      //-----
      year: {
        title: "2021",
      },
      type: {
        title: "type1",
      },
      status: {
        title: "status1",
      },
    },
    //-------------------------
    {
      id: "g2",
      //-----
      year: {
        title: "2021",
      },
      type: {
        title: "type1",
      },
      status: {
        title: "status2",
      },
    },
    //-------------------------
    {
      id: "g2",
      //-----
      year: {
        title: "2021",
      },
      type: {
        title: "type2",
      },
      status: {
        title: "status1",
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
          groupTree.push({ column: f, value: d[f].title, parent, parentInfo });
        }
      });
    });

    TREE = [...TREE, ...createDataTree(groupTree)];
  });

  return TREE;
};

const Group = styled.div`
  opacity: ${(props) => props.opacity};
  border: 1px solid gray;
  border-radius: 2px;
  background-color: gray;
  margin: 3px;
  padding: 12px;
  color: white;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-left: ${(props) => props.padding};
`;

const ChildrenContainer = styled.div`
  display: ${(props) => (props.expanded ? "block" : "none")};
`;

const renderTree = (
  node,
  lvl,
  index,
  _expanded = false,
  findParents = () => {}
) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(_expanded);
  }, [_expanded]);

  const getOpacityByLevel = () => {
    return 1 - lvl * 0.25;
  };

  const getPaddingByLevel = () => {
    var pad = 12 + lvl * 50;
    return pad + "px";
  };

  const renderNode = () => {
    return (
      <Group
        index={index}
        opacity={getOpacityByLevel()}
        padding={getPaddingByLevel()}
        onClick={() => {
          setExpanded(!expanded);

          if (lvl === 2) findParents(node);
        }}
      >
        <span>{lvl + ": "}</span>
        <span>{node.value}</span>
      </Group>
    );
  };

  const renderChildren = () => {
    if (node.children.length > 0)
      return node.children.map((n, i) =>
        renderTree(n, lvl + 1, i, undefined, findParents)
      );
  };

  return (
    <>
      {renderNode()}

      <ChildrenContainer expanded={expanded}>
        {renderChildren()}
      </ChildrenContainer>
    </>
  );
};

const Story = (props) => {
  var tree = GetDataTreeFromGroupDefinition(groupingData);

  var [filters, setFilters] = useState({});

  const matchItem = (node) => {
    var match = false;

    groupingData.fields.forEach((f) => {});

    return match;
  };

  const logParents = (leafNode) => {
    var fs = {};

    groupingData.fields.forEach((f) => {
      fs[f] = leafNode.parentInfo[f].title;
    });

    setFilters(fs);
  };

  return (
    <>
      <div>{tree.map((t) => renderTree(t, 0, 0, false, logParents))}</div>
      <hr />
      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </>
  );
};

export default Story;
