import dataTypes from "./DataTypes";

export const operationTypes = {
  AND: { name: "AND", value: "AND", dataTypesForOperation: [] },
  OR: { name: "OR", value: "OR", dataTypesForOperation: [] },
  Contains: {
    name: "Contains",
    value: "Contains",
    dataTypesForOperation: [dataTypes.String],
  },
  StartsWith: {
    name: "StartsWith",
    value: "StartsWith",
    dataTypesForOperation: [dataTypes.String],
  },
  EndsWith: {
    name: "EndsWith",
    value: "EndsWith",
    dataTypesForOperation: [dataTypes.String],
  },
  Length: {
    name: "Length",
    value: "Length",
    dataTypesForOperation: [dataTypes.String],
  },
  Equal: {
    name: "Equal",
    value: "Equal",
    dataTypesForOperation: [
      dataTypes.String,
      dataTypes.Number,
      dataTypes.DateTime,
      dataTypes.Bool,
    ],
  },
  NotEqual: {
    name: "NotEqual",
    value: "NotEqual",
    dataTypesForOperation: [
      dataTypes.String,
      dataTypes.Number,
      dataTypes.DateTime,
    ],
  },
  GreaterThan: {
    name: "GreaterThan",
    value: "GreaterThan",
    dataTypesForOperation: [dataTypes.Number, dataTypes.DateTime],
  },
  GreaterThanOrEqual: {
    name: "GreaterThanOrEqual",
    value: "GreaterThanOrEqual",
    dataTypesForOperation: [dataTypes.Number, dataTypes.DateTime],
  },
  LessThan: {
    name: "LessThan",
    value: "LessThan",
    dataTypesForOperation: [dataTypes.Number, dataTypes.DateTime],
  },
  LessThanOrEqual: {
    name: "LessThanOrEqual",
    value: "LessThanOrEqual",
    dataTypesForOperation: [dataTypes.Number, dataTypes.DateTime],
  },
  AdvancedFilter: {
    name: "AdvancedFilter",
    value: "AdvancedFilter",
    dataTypesForOperation: [
      dataTypes.Number,
      dataTypes.DateTime,
      dataTypes.String,
    ],
  },
};

export const getStringOperationTypes = () => {
  return [
    operationTypes.Contains,
    operationTypes.StartsWith,
    operationTypes.EndsWith,
    operationTypes.Equal,
    operationTypes.NotEqual,
  ];
};

export const getNumberOperationTypes = () => {
  return [
    operationTypes.Equal,
    operationTypes.NotEqual,
    operationTypes.GreaterThan,
    operationTypes.LessThan,
    operationTypes.GreaterThanOrEqual,
    operationTypes.LessThanOrEqual,
  ];
};

export const getBoolOperationTypes = () => {
  return [operationTypes.Equal];
};

export const getDateTimeOperationTypes = () => {
  return [
    operationTypes.Equal,
    operationTypes.NotEqual,
    operationTypes.GreaterThan,
    operationTypes.LessThan,
    operationTypes.GreaterThanOrEqual,
    operationTypes.LessThanOrEqual,
  ];
};

export const getAdvancedOperationTypes = () => {
  return [operationTypes.AdvancedFilter];
};

export default operationTypes;
