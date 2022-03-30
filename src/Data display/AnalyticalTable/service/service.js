const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const createDataTree = (list) => {
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
    node._id_ = uuidv4();

    if (node.parent !== null) {
      list[map[node.parent]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};

export const getDataTreeFromGroupDefinition = (groupDef) => {
  var finalTreeStructure = [];

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

    finalTreeStructure = [...finalTreeStructure, ...createDataTree(groupTree)];
  });

  return finalTreeStructure;
};

export const iterativeTreeTraversal = (tree, fields) => {
  var flat = [];
  var stack = [];

  tree.forEach((root) => {
    stack.push(root);

    while (stack.length !== 0) {
      var node = stack.pop();
      var depth = fields.indexOf(node.column);

      flat.push({
        depth: depth,
        node: node,
      });

      if (node.children && node.children.length !== 0) {
        node.children.forEach((n) => stack.push(n));
      }
    }
  });

  return flat;
};
