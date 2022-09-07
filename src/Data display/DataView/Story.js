import React, { useRef } from "react";
import DataView from ".";
import styled from "@emotion/styled";
import Button from "../../General/Button";
import Table from "../Table/index";
import TextInput from "../../Basic Inputs/TextInput";
import DecimalInput from "../../Basic Inputs/DecimalInput";
import TableView from "./components/TableView";
import CreditCardForm from "./components/CreditCardForm";

var Data = [
  {
    id: 1,
    cardNumber: "5108758036243676",
    userName: "Mallory Anton",
    value: 3434.72,
    currency: "RUB",
  },
  {
    id: 2,
    cardNumber: "5048377671540495",
    userName: "Raye Barrott",
    value: 1016.49,
    currency: "RUB",
  },
  {
    id: 3,
    cardNumber: "5048375754390564",
    userName: "Darrin Djurkovic",
    value: 2090.71,
    currency: "RUB",
  },
  {
    id: 4,
    cardNumber: "5108756514839718",
    userName: "Arny Hegarty",
    value: 1672.65,
    currency: "RUB",
  },
  {
    id: 5,
    cardNumber: "5108758761004715",
    userName: "Evvy Wallage",
    value: 1844.96,
    currency: "EUR",
  },
  {
    id: 6,
    cardNumber: "5048371699182943",
    userName: "Corney Screach",
    value: 2096.08,
    currency: "EUR",
  },
  {
    id: 7,
    cardNumber: "5048377722250243",
    userName: "Claudell Deegan",
    value: 1373.61,
    currency: "EUR",
  },
  {
    id: 8,
    cardNumber: "5048379712588129",
    userName: "Nat Speariett",
    value: 1940.15,
    currency: "EUR",
  },
  {
    id: 9,
    cardNumber: "5108756245873028",
    userName: "Leopold Pauls",
    value: 2855.57,
    currency: "USD",
  },
  {
    id: 10,
    cardNumber: "5108751044692109",
    userName: "Casie Jolley",
    value: 1516.39,
    currency: "USD",
  },
  {
    id: 11,
    cardNumber: "5108752679334629",
    userName: "Nolly Soreau",
    value: 2667.89,
    currency: "USD",
  },
  {
    id: 12,
    cardNumber: "5048370164498446",
    userName: "Andros Exley",
    value: 3027.13,
    currency: "USD",
  },
  {
    id: 13,
    cardNumber: "5108759772384245",
    userName: "Isabeau Annwyl",
    value: 1790.46,
    currency: "USD",
  },
  {
    id: 14,
    cardNumber: "5108752938755606",
    userName: "Steve Iggalden",
    value: 3816.44,
    currency: "EUR",
  },
  {
    id: 15,
    cardNumber: "5048377721375967",
    userName: "Zeb Parncutt",
    value: 1552.63,
    currency: "RUB",
  },
  {
    id: 16,
    cardNumber: "5048375814934765",
    userName: "Zacharie Courtenay",
    value: 1616.03,
    currency: "RUB",
  },
  {
    id: 17,
    cardNumber: "5108752465533095",
    userName: "Farica Reyne",
    value: 2998.29,
    currency: "RUB",
  },
  {
    id: 18,
    cardNumber: "5048378039694818",
    userName: "Derek Tolchard",
    value: 2557.51,
    currency: "RUB",
  },
  {
    id: 19,
    cardNumber: "5048379513918871",
    userName: "Katha Suller",
    value: 1915.06,
    currency: "EUR",
  },
  {
    id: 20,
    cardNumber: "5108752127854004",
    userName: "Shaine Ivasechko",
    value: 713.41,
    currency: "RUB",
  },
  {
    id: 21,
    cardNumber: "5108753631477472",
    userName: "Wiatt Gamwell",
    value: 1302.3,
    currency: "EUR",
  },
  {
    id: 22,
    cardNumber: "5108757869509534",
    userName: "Arin Thumann",
    value: 3924.35,
    currency: "EUR",
  },
  {
    id: 23,
    cardNumber: "5108750227399805",
    userName: "Penny Saxon",
    value: 1944.72,
    currency: "EUR",
  },
  {
    id: 24,
    cardNumber: "5108752638695516",
    userName: "Muire Bradburne",
    value: 2138.61,
    currency: "USD",
  },
  {
    id: 25,
    cardNumber: "5108757090486114",
    userName: "Joaquin Emons",
    value: 1569.7,
    currency: "USD",
  },
  {
    id: 26,
    cardNumber: "5108759306707168",
    userName: "Livvyy Hiskey",
    value: 3677.21,
    currency: "USD",
  },
  {
    id: 27,
    cardNumber: "5048377099535390",
    userName: "Stevy Andell",
    value: 2007.78,
    currency: "EUR",
  },
  {
    id: 28,
    cardNumber: "5048370052982709",
    userName: "Madalyn Callard",
    value: 3601.3,
    currency: "USD",
  },
  {
    id: 29,
    cardNumber: "5108751619593229",
    userName: "Analise De Freyne",
    value: 1827.96,
    currency: "USD",
  },
  {
    id: 30,
    cardNumber: "5108756964291311",
    userName: "Shannen Halm",
    value: 726.98,
    currency: "EUR",
  },
  {
    id: 31,
    cardNumber: "5108758716092443",
    userName: "Rosita Skechley",
    value: 2948.37,
    currency: "EUR",
  },
  {
    id: 32,
    cardNumber: "5108758215350136",
    userName: "Pearl Kobierzycki",
    value: 3645.37,
    currency: "USD",
  },
  {
    id: 33,
    cardNumber: "5048374761067380",
    userName: "Marilyn Peckitt",
    value: 2235.69,
    currency: "RUB",
  },
];

export const View = styled.div`
  border-radius: 8px;
  background-color: fcfcfc;
`;

const Kanban = (props) => {
  return <View>Kanban view</View>;
};

const Story = (props) => {
  const dw = useRef();

  return (
    <DataView
      {...props}
      ref={dw}
      DefaultCurrentView={{
        id: 1,
        name: "Table View",
        type: "TABLE_VIEW",
      }}
      Views={[
        {
          id: 1,
          name: "Table View",
          type: "TABLE_VIEW",
        },
        // {
        //   id: 2,
        //   name: "Calendar View",
        //   type: "CALENDAR_VIEW",
        // },
        // {
        //   id: 3,
        //   name: "Gantt View",
        //   type: "GANTT_VIEW",
        // },
        {
          id: 2,
          name: "Kanban View",
          type: "KANBAN_VIEW",
        },
      ]}
      //------------------------
      DataSource={Data.slice(0, 5)}
      DataShape={[
        { field: "id" },
        { field: "cardNumber" },
        { field: "userName" },
        { field: "value" },
        { field: "currency" },
      ]}
    >
      <CreditCardForm />
      <TableView
        Columns={[
          {
            id: 1,
            accessor: "userName",
            displayName: "User",
            width: 30,
          },
          {
            id: 2,
            accessor: "cardNumber",
            displayName: "Card Number",
            width: 35,
          },
          {
            id: 3,
            accessor: "value",
            displayName: "Amount",
            width: 20,
          },
          {
            id: 4,
            accessor: "currency",
            displayName: "Currency",
            width: 15,
          },
        ]}
      />

      <Kanban __TYPE__="KANBAN_VIEW" GroupBy={{ field: "currency" }} />
    </DataView>
  );
};

export default Story;
