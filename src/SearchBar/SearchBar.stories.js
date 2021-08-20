import React from "react";
import SearchBar from ".";
import dataTypes from "./DataTypes";
import operationTypes, { getStringOperationTypes } from "./OperationTypes";


export default {
  title: "SearchBar",
  component: SearchBar,
};

const Template = (args) => <SearchBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "SearchBar",
  onClick: undefined,
  State: {
    Filters: [],
  },
  filterProps: [
    {
      value: 1,
      name: "Project name",
      propName: "ProjectName",
      firstLevel: "ProjectName",
      dataType: dataTypes.String,
      isAdvanced: false,
      operationTypes: getStringOperationTypes(),
      showInQuickFilters: true,
      quickFiltersOperationType: operationTypes.Contains,
    },
  ],
  SetProperties: () => {},
  SetQuickFilterOpen: () => {},
  ChangeQuickFilterText: () => {},
  onChange: () => {},
};
