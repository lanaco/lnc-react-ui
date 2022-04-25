import React from "react";
import AnalyticalTable from "./";
import Story from "./Story";
export default {
  title: "Data Display/AnalyticalTable",
  component: AnalyticalTable,
};

const Template = (args) => <Story {...args} />;

export const Default = Template.bind({});
Default.args = {
  ID: "UsersTable",
  //------------------------------------
  EnableSelection: true,
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
  SelectedData: [],
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
      width: 15,
      sortable: false,
    },
    {
      id: 2,
      displayName: "Type",
      accessor: "type",
      width: 10,
      sortable: false,
    },
    {
      id: 3,
      displayName: "Status",
      accessor: "status",
      width: 15,
      sortable: false,
    },
    {
      id: 4,
      displayName: "Requested amount",
      accessor: "amountRequested",
      width: 20,
      sortable: false,
      inputType: "NUMBER",
    },
    {
      id: 5,
      displayName: "Approved amount",
      accessor: "amountApproved",
      width: 20,
      sortable: false,
      inputType: "NUMBER",
    },
    {
      id: 6,
      displayName: "Rejected amount",
      accessor: "amountRejected",
      width: 20,
      sortable: false,
      inputType: "NUMBER",
    },
  ],
  //-------------------------------------
  color: "primary",
  size: "small",
};
