import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import AnalyticalTable from "./index";
import Button from "../../General/Button/index";
import CustomAnalyticalTableGroupRow from "./components/CustomAnalyticalTableGroupRow";
import {
  GroupBy_YearTypeStatus,
  GroupBy_YearType,
  GroupBy_Year,
} from "./service/service";
import { isArray, cloneDeep } from "lodash";

const Container = styled.div``;

const Commands = styled.div`
  margin: 2px;
  padding: 8px 0;
  display: flex;
  gap: 8px;
`;

const data = [
  {
    id: "61f7b8ea2fe061cacbcdbfea",
    year: "2020",
    type: "type1",
    typeId: 1,
    status: "status1",
    statusId: 1,
    amountRequested: 4000,
    amountApproved: 2000,
    amountRejected: 2000,
  },
  {
    id: "11f7b8ea2fo061cacbfdbfea",
    year: "2020",
    type: "type1",
    typeId: 1,
    status: "status1",
    statusId: 1,
    amountRequested: 6200,
    amountApproved: 4500,
    amountRejected: 1700,
  },
  {
    id: "21f7b8ea1fo061cacbfdcfeg",
    year: "2020",
    type: "type1",
    typeId: 1,
    status: "status1",
    statusId: 1,
    amountRequested: 3100,
    amountApproved: 2100,
    amountRejected: 1000,
  },
  {
    id: "61f7b8ea63d0fc830f326350",
    year: "2020",
    type: "type1",
    typeId: 1,
    status: "status2",
    statusId: 2,
    amountRequested: 8800,
    amountApproved: 1200,
    amountRejected: 7600,
  },
  {
    id: "61f7b8eaf418ca604fcdffba",
    year: "2020",
    type: "type2",
    typeId: 2,
    status: "status1",
    statusId: 1,
    amountRequested: 5400,
    amountApproved: 5000,
    amountRejected: 400,
  },
  {
    id: "61f7b8ea066dfb5760224b71",
    year: "2020",
    type: "type2",
    typeId: 2,
    status: "status2",
    statusId: 2,
    amountRequested: 1500,
    amountApproved: 500,
    amountRejected: 1000,
  },
  {
    id: "61f7b8eadd6586c40491b91e",
    year: "2021",
    type: "type1",
    typeId: 1,
    status: "status1",
    statusId: 1,
    amountRequested: 7600,
    amountApproved: 3800,
    amountRejected: 3800,
  },
  {
    id: "61f7b8eadd6586c40491b91e",
    year: "2021",
    type: "type1",
    typeId: 1,
    status: "status2",
    statusId: 2,
    amountRequested: 3300,
    amountApproved: 2000,
    amountRejected: 1300,
  },
  {
    id: "61f7b8eadd6586c40491b91e",
    year: "2021",
    type: "type2",
    typeId: 2,
    status: "status1",
    statusId: 1,
    amountRequested: 9500,
    amountApproved: 3900,
    amountRejected: 5600,
  },
  {
    id: "11f7b8eada6686c40411b81c",
    year: "2021",
    type: "type2",
    typeId: 2,
    status: "status2",
    statusId: 2,
    amountRequested: 900,
    amountApproved: 400,
    amountRejected: 500,
  },
];

const Story = (props) => {
  const [Loading, SetLoading] = useState(false);
  const [GroupBy, SetGroupBy] = useState(GroupBy_Year);
  const [SelectedData, SetSelectedData] = useState([
    {
      id: "61f7b8ea2fe061cacbcdbfea",
      year: "2020",
      type: "type1",
      typeId: 1,
      status: "status1",
      statusId: 1,
      amountRequested: 4000,
      amountApproved: 2000,
      amountRejected: 2000,
    },
    {
      id: "11f7b8eada6686c40411b81c",
      year: "2021",
      type: "type2",
      typeId: 2,
      status: "status2",
      statusId: 2,
      amountRequested: 900,
      amountApproved: 400,
      amountRejected: 500,
    },
  ]);

  const GetDataForGroup = async (parentInfo) => {
    SetLoading(true);

    return new Promise((resolve, _) => {
      setTimeout(() => {
        SetLoading(false);

        var response = data.filter((d) => {
          if (GroupBy.fields.length === 1) {
            return d.year === parentInfo.year.title;
          }

          if (GroupBy.fields.length === 2) {
            return (
              d.year === parentInfo.year.title &&
              d.type === parentInfo.type.title
            );
          }

          if (GroupBy.fields.length === 3) {
            return (
              d.year === parentInfo.year.title &&
              d.type === parentInfo.type.title &&
              d.status === parentInfo.status.title
            );
          }
        });

        resolve(response);
      }, 800);
    });
  };

  const onSelectRow = (e, rowDataOrRowDataArray, selected) => {
    var selectedDataCopy = cloneDeep(SelectedData);

    if (isArray(rowDataOrRowDataArray)) {
    } else {
      if (!selected) {
        selectedDataCopy.push(rowDataOrRowDataArray);
      }

      if (selected) {
        selectedDataCopy = selectedDataCopy.filter(
          (x) => x.id !== rowDataOrRowDataArray.id
        );
      }
    }

    SetSelectedData(selectedDataCopy);
  };

  //========= Commands ===========================

  const notGrouped = () => SetGroupBy(null);

  const groupByYear = () => SetGroupBy(GroupBy_Year);

  const groupByYearType = () => SetGroupBy(GroupBy_YearType);

  const groupByYearTypeStatus = () => SetGroupBy(GroupBy_YearTypeStatus);

  return (
    <div>
      <Commands>
        <Button onClick={notGrouped} text={"Not grouped"} />
        <Button onClick={groupByYear} text={"Group by Year"} />
        <Button onClick={groupByYearType} text={"Group by Year / Type"} />
        <Button
          onClick={groupByYearTypeStatus}
          text={"Group by Year / Type / Status"}
        />
      </Commands>

      <AnalyticalTable
        {...props}
        Data={data}
        SelectedData={SelectedData}
        onSelectRow={onSelectRow}
        GroupBy={GroupBy}
        GetDataForGroup={GetDataForGroup}
        Loading={Loading}
      >
        {/* <CustomAnalyticalTableGroupRow /> */}
      </AnalyticalTable>
    </div>
  );
};

export default Story;
