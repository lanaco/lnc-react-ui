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
  },
  //-------------------------------------
  Data: [
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
  ],
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
