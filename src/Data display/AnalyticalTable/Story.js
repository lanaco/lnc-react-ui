import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import AnalyticalTable from "./index";

// const renderTree = ({ node, level, index, show, findParents }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [leafs, setLeafs] = useState([]);

//   useEffect(() => {
//     if (show === false) setExpanded(false);
//   }, [show]);

//   const getOpacityByLevel = () => {
//     return 1 - level * 0.25;
//   };

//   const getPaddingByLevel = () => {
//     var pad = 12 + level * 50;
//     return pad + "px";
//   };

//   const renderEmptyCellsByLevel = () => {
//     var arr = Array.from({ length: level }, (_, idx) => ++idx);

//     return arr.map((x) => <GroupCell key={x} />);
//   };

//   const onClick = () => {
//     setExpanded(!expanded);
//     if (level === 2) {
//       setLeafs(findParents(node));
//     }
//   };

//   const renderNode = () => {
//     return (
//       <Group
//         key={node.value}
//         show={show}
//         index={index}
//         opacity={getOpacityByLevel()}
//         onClick={onClick}
//       >
//         {renderEmptyCellsByLevel()}

//         <GroupCell colSpan={4} padding={getPaddingByLevel()}>
//           <span>{level + ": "}</span>
//           <span>{node.value}</span>
//         </GroupCell>
//       </Group>
//     );
//   };

//   const renderChildren = () => {
//     if (node.children.length > 0)
//       return node.children.map((n, i) =>
//         renderTree({
//           node: n,
//           level: level + 1,
//           index: i,
//           findParents,
//           show: expanded,
//         })
//       );

//     return <></>;
//   };

//   const renderLeafs = () => {
//     return leafs.map((l) => {
//       return (
//         <Leaf show={expanded}>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td>
//             <div
//               style={{
//                 textAlign: "right",
//                 padding: "12px",
//                 border: "1px solid black",
//               }}
//             >
//               {l.amount}
//             </div>
//           </td>
//         </Leaf>
//       );
//     });
//   };

//   if (level === 0) {
//     return (
//       <tbody key={node.value}>
//         {renderNode()}
//         {renderChildren()}
//       </tbody>
//     );
//   }

//   return (
//     <>
//       {renderNode()}
//       {renderChildren()}
//       {renderLeafs()}
//     </>
//   );
// };

const data = [
  {
    id: "61f7b8ea2fe061cacbcdbfea",
    year: "2020",
    type: "type1",
    typeId: 1,
    status: "status1",
    statusId: 1,
    amount: 2000,
  },
  {
    id: "11f7b8ea2fo061cacbfdbfea",
    year: "2020",
    type: "type1",
    typeId: 1,
    status: "status1",
    statusId: 1,
    amount: 2200,
  },
  {
    id: "21f7b8ea1fo061cacbfdcfeg",
    year: "2020",
    type: "type1",
    typeId: 1,
    status: "status1",
    statusId: 1,
    amount: 1800,
  },
  {
    id: "61f7b8ea63d0fc830f326350",
    year: "2020",
    type: "type1",
    typeId: 1,
    status: "status2",
    statusId: 2,
    amount: 3000,
  },
  {
    id: "61f7b8eaf418ca604fcdffba",
    year: "2020",
    type: "type2",
    typeId: 2,
    status: "status1",
    statusId: 1,
    amount: 4000,
  },
  {
    id: "61f7b8ea066dfb5760224b71",
    year: "2020",
    type: "type2",
    typeId: 2,
    status: "status2",
    statusId: 2,
    amount: 5000,
  },
  {
    id: "61f7b8eadd6586c40491b91e",
    year: "2021",
    type: "type1",
    typeId: 1,
    status: "status1",
    statusId: 1,
    amount: 2000,
  },
  {
    id: "61f7b8eadd6586c40491b91e",
    year: "2021",
    type: "type1",
    typeId: 1,
    status: "status2",
    statusId: 2,
    amount: 3000,
  },
  {
    id: "61f7b8eadd6586c40491b91e",
    year: "2021",
    type: "type2",
    typeId: 2,
    status: "status1",
    statusId: 1,
    amount: 4000,
  },
];

const Story = (props) => {
  const [Loading, SetLoading] = useState(false);

  const GetDataForGroup = async (parentInfo) => {
    SetLoading(true);

    return new Promise((resolve, _) => {
      setTimeout(() => {
        SetLoading(false);

        var response = data.filter((d) => {
          return (
            d.year === parentInfo.year.title &&
            d.type === parentInfo.type.title &&
            d.status === parentInfo.status.title
          );
        });

        resolve(response);
      }, 800);
    });
  };

  return (
    <AnalyticalTable
      {...props}
      GetDataForGroup={GetDataForGroup}
      Loading={Loading}
    />
  );
};

export default Story;