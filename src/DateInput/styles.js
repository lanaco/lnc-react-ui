// export const styles = () => ({

// })

export const styles = {
  ".containerDateInput": {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows:
      "var(--base-label-size) minmax(55%, auto) var(\n      --base-error-text-size\n    )",
    paddingTop: "3px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "1px"
  },
  ".containerWithSideLabelDateInput": {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingTop: "3px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "1px"
  },
  ".labelDateInput": {
    fontSize: "var(--base-additional-text-font-size)",
    fontFamily: "inherit",
    fontWeight: 400,
    color: "#545454",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-end"
  },
  ".errorTextDateInput": {
    fontSize: "var(--base-additional-text-font-size)",
    fontFamily: "inherit",
    fontWeight: 400,
    color: "var(--base-error-color)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-start"
  },
  'input[type="date"]::-webkit-inner-spin-button': {
    display: "none",
    WebkitAppearance: "none"
  },
  ".standardInputDateInput": {
    fontFamily: "inherit",
    WebkitAppearance: "none",
    appearance: "none",
    outline: "none",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--input-bg-color)",
    transition: "all var(--transition-duration)",
    fontSize: "var(--font-size)",
    borderBottom: "2.7px solid var(--base-color)",
    padding: "5px 10px"
  },
  ".standardInputDateInput:focus": {
    backgroundColor: "var(--input-bg-focus-color)"
  },
  ".standardInputDateInput:disabled": {
    backgroundColor: "var(--disabled-bg-color)",
    color: "var(--disabled-text-color)"
  },
  ".datePickerWrapperDateInput": { width: "100%" },
  ".datePickerWrapperDateInput > *": { width: "100%" }
}


// .containerDateInput {
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-rows: var(--base-label-size) minmax(55%, auto) var(
//       --base-error-text-size
//     );
//   padding-top: 3px;
//   padding-left: 1px;
//   padding-right: 1px;
//   padding-bottom: 1px;
// }

// .containerWithSideLabelDateInput {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   padding-top: 3px;
//   padding-left: 1px;
//   padding-right: 1px;
//   padding-bottom: 1px;
// }

// .labelDateInput {
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   color: #545454;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: left;
//   align-items: flex-end;
// }

// .errorTextDateInput {
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   color: var(--base-error-color);
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: left;
//   align-items: flex-start;
// }

// input[type="date"]::-webkit-inner-spin-button {
//   display: none;
//   -webkit-appearance: none;
// }

// .standardInputDateInput {
//   font-family: inherit;
//   -webkit-appearance: none;
//   appearance: none;
//   outline: none;
//   width: 100%;
//   height: 100%;
//   background-color: var(--input-bg-color);
//   transition: all var(--transition-duration);
//   font-size: var(--font-size);
//   border-bottom: 2.7px solid var(--base-color);
//   padding: 5px 10px;
// }

// .standardInputDateInput:focus {
//   background-color: var(--input-bg-focus-color);
// }

// .standardInputDateInput:disabled {
//   background-color: var(--disabled-bg-color);
//   color: var(--disabled-text-color);
// }

// .datePickerWrapperDateInput {
//   width: 100%;
// }

// .datePickerWrapperDateInput > * {
//   width: 100%;
// }