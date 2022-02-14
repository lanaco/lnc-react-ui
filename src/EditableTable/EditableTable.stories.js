import React from "react";
import EditableTable from "./";
// import Story from "./Story";

export default {
  title: "Editable Table",
  component: EditableTable,
};

const Template = (args) => <EditableTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  size: "small",
  //------------------------------------
  EnableSelection: false,
  EnableOrdering: false,
  EnableSelectAll: false,
  EnableLoader: true,
  //-------------------------------------
  Loading: false,
  RowIdentifier: "id",
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
  Data: [
    {
      id: "61f7b8ea2fe061cacbcdbfea",
      isActive: true,
      balance: "$1,476.66",
      age: 21,
      name: "Katie Wilson",
      gender: "female",
      company: "QUAREX",
      email: "katiewilson@quarex.com",
      phone: "(807) 443-2274",
      address: "125 Oceanview Avenue, Moquino, Mississippi, 418",
      status: "banned",
    },
    {
      id: "61f7b8ea63d0fc830f326350",
      isActive: false,
      balance: "$3,239.46",
      age: 32,
      name: "Delgado Lott",
      gender: "male",
      company: "XYMONK",
      email: "delgadolott@xymonk.com",
      phone: "(973) 427-2565",
      address: "402 Vernon Avenue, Draper, Florida, 6921",
      status: "banned",
    },
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
    {
      id: "61f7b8ea066dfb5760224b71",
      isActive: true,
      balance: "$3,731.79",
      age: 29,
      name: "Lynch Sims",
      gender: "male",
      company: "EARTHPURE",
      email: "lynchsims@earthpure.com",
      phone: "(979) 489-3188",
      address: "620 Riverdale Avenue, Greenbush, New Mexico, 9605",
      status: "active",
    },
    {
      id: "61f7b8eadd6586c40491b91e",
      isActive: true,
      balance: "$2,116.41",
      age: 30,
      name: "Black William",
      gender: "male",
      company: "RODEOMAD",
      email: "blackwilliam@rodeomad.com",
      phone: "(818) 583-2805",
      address: "125 Kathleen Court, Bergoo, Michigan, 1206",
      status: "banned",
    },
  ],
  Columns: [
    {
      id: 1,
      displayName: "Name",
      accessor: "name",
      width: 25,
      dataType: "STRING",
    },
    {
      id: 2,
      displayName: "Company",
      accessor: "company",
      width: 15,
      dataType: "STRING",
    },
    {
      id: 3,
      displayName: "Address",
      accessor: "address",
      width: 60,
      dataType: "STRING",
    },
  ],
};
