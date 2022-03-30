import React from "react";
import AnalyticalTable from "./";
import Story from "./Story";
import IterativeTreeTraversal from "./IterativeTreeTraversal";
export default {
  title: "Data Display/AnalyticalTable",
  component: AnalyticalTable,
};

const Template = (args) => <Story {...args} />;

export const Default = Template.bind({});
Default.args = {
  ID: "UsersTable",
  //------------------------------------
  EnableSelection: false,
  EnableOrdering: false,
  EnableSelectAll: false,
  EnableLoader: true,
  //-------------------------------------
  EnableRowStatusIndicator: false,
  EnableRowTextHighlight: false,
  //-------------------------------------
  Loading: false,
  RowIdentifier: "id",
  //-------------------------------------
  Ordering: {
    columnId: 1,
    ascending: false,
    descending: true,
  },
  //-------------------------------------
  SelectedEntirePage: false,
  SelectedData: [
    {
      id: "61f7b8eaf418ca604fcdffba",
      isActive: false,
      balance: "$3,804.94",
      age: 21,
      name: "Frankie Jacobson",
      gender: "female",
      company: "QUALITEX",
      email: "frankiejacobson@qualitex.com",
      phone: "(825) 404-3871",
      address: "980 Rodney Street, Kansas, Marshall Islands, 6171",
      status: "inactive",
    },
  ],
  //-------------------------------------
  GroupBy: {
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
      //-------------------------

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
  },
  //-------------------------------------
  Columns: [
    {
      id: 1,
      displayName: "Year",
      accessor: "year",
      width: 25,
      sortable: false,
    },
    {
      id: 2,
      displayName: "Type",
      accessor: "type",
      width: 25,
      sortable: false,
    },
    {
      id: 3,
      displayName: "Status",
      accessor: "status",
      width: 25,
      sortable: false,
    },
    {
      id: 4,
      displayName: "Amount",
      accessor: "amount",
      width: 25,
      sortable: false,
    },
  ],
  //-------------------------------------
  color: "primary",
  size: "small",
};
