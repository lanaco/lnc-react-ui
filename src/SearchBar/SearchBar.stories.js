import React from "react";

import SearchBar from ".";
import dataTypes from "./DataTypes";
import operationTypes, { getStringOperationTypes } from "./OperationTypes";

export default {
  title: "SearchBar",
  component: SearchBar,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
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

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
