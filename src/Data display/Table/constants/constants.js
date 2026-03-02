import { lanaco_light } from "../../../_utils/theme";
import { screenSizes } from "../../../_utils/breakpoints";

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

export { screenSizes };
