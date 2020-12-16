// export const styles = () => ({

// })

export const styles = {
  ".containerNumberInput": {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows:
      "var(--base-label-size) minmax(55%, auto) var(--base-error-text-size)",
    paddingTop: "3px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "1px"
  },
  ".labelNumberInput": {
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
  ".errorTextNumberInput": {
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
  ".standardInputNumberInput": {
    fontFamily: "inherit",
    WebkitAppearance: "none",
    appearance: "none",
    outline: "none",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--input-bg-color)",
    transition: "all var(--transition-duration)",
    fontSize: "var(--font-size)",
    borderBottom: "2.7px solid var(--base-color)"
  },
  ".standardInputNumberInput:focus": {
    backgroundColor: "var(--input-bg-focus-color)"
  },
  ".standardInputNumberInput:disabled": {
    backgroundColor: "var(--disabled-bg-color)",
    color: "var(--disabled-text-color)"
  }
}


// .containerNumberInput {
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-rows:  var(--base-label-size) minmax(55%, auto) var(--base-error-text-size);
//   padding-top: 3px;
//   padding-left: 1px;
//   padding-right: 1px;
//   padding-bottom: 1px;
// }
// .labelNumberInput {
//   font-size: var(--base-additional-text-font-size);
//   /* padding-bottom: 2px; */
//   font-family: inherit;
//   font-weight: 400;
//   color: #545454;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: left;
//   align-items: flex-end;
// }

// .errorTextNumberInput {
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   /* padding-top: 2px; */
//   color: var(--base-error-color);
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: left;
//   align-items: flex-start;
// }

// .standardInputNumberInput {
//   font-family: inherit;
//   -webkit-appearance: none;
//   appearance: none;
//   outline: none;
//   width: 100%;
//   height: 100%;
//   background-color: var(--input-bg-color);
//   /* padding: 3.3% 5%; */
//   transition: all var(--transition-duration);
//   font-size: var(--font-size);
//   /* margin-top: 1.8%; */
//   border-bottom: 2.7px solid var(--base-color);
// }

// .standardInputNumberInput:focus {
//   background-color: var(--input-bg-focus-color);
// }

// .standardInputNumberInput:disabled {
//   background-color: var(--disabled-bg-color);
//   color: var(--disabled-text-color);
// }