import { lanaco_light } from "../../../_utils/theme";

export const mode = {
  CREATE: "CREATE",
  READ: "READ",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

export const viewType = {
  TABLE: "TABLE",
  GROUPED_TABLE: "GROUPED_TABLE",
  FORM: "FORM",
};

export const selectionType = {
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE",
};

export const statusColor = {
  SUCCESS: lanaco_light.palette.green[500],
  ERROR: lanaco_light.palette.red[500],
  WARNING: lanaco_light.palette.yellow[500],
  PRIMARY: lanaco_light.palette.teal[500],
  SECONDARY: lanaco_light.palette.blue[500],
  DISABLED: lanaco_light.palette.gray[300],
  NONE: "white",
};

export const screenSizes = {
  XS: {
    type: "XS",
    index: 0,
    mediaQuery: "(max-width: 480px)",
  },
  S: {
    type: "S",
    index: 1,
    mediaQuery: "(min-width: 481px) and (max-width: 767px)",
  },
  M: {
    type: "M",
    index: 2,
    mediaQuery: "(min-width: 768px) and (max-width: 1024px)",
  },
  L: {
    type: "L",
    index: 3,
    mediaQuery: "(min-width: 1025px) and (max-width: 1280px)",
  },
  XL: {
    type: "XL",
    index: 4,
    mediaQuery: "(min-width: 1281px)",
  },
};
