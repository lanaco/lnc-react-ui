// export const styles = () => ({

// })

export const styles = {
  ".containerDropDown": {
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
  ".containerWithSideLabelDropDown": {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingTop: "3px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "1px"
  },
  ".labelDropDown": {
    fontSize: "var(--base-additional-text-font-size)",
    fontFamily: "inherit",
    fontWeight: 400,
    color: "#545454",
    height: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-end"
  },
  ".errorTextDropDown": {
    fontSize: "var(--base-additional-text-font-size)",
    fontFamily: "inherit",
    fontWeight: 400,
    color: "var(--base-error-color)",
    height: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-start"
  },
  ".standardInputDropDown": {
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--input-bg-color)",
    transition: "all var(--transition-duration)",
    fontSize: "var(--font-size)",
    borderBottom: "2.7px solid var(--base-color)"
  },
  ".standardInputDropDown:focus": {
    backgroundColor: "var(--input-bg-focus-color)"
  },
  ".standardInputDropDown:disabled": {
    backgroundColor: "var(--disabled-bg-color)",
    color: "var(--disabled-text-color)"
  }
}


// .containerDropDown {
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

// .containerWithSideLabelDropDown {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   padding-top: 3px;
//   padding-left: 1px;
//   padding-right: 1px;
//   padding-bottom: 1px;
// }

// .labelDropDown {
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   color: #545454;
//   height: 100%;
//   display: flex;
//   justify-content: left;
//   align-items: flex-end;
// }

// .errorTextDropDown {
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   color: var(--base-error-color);
//   height: 100%;
//   display: flex;
//   justify-content: left;
//   align-items: flex-start;
// }

// .standardInputDropDown {
//   font-family: inherit;
//   outline: none;
//   width: 100%;
//   height: 100%;
//   background-color: var(--input-bg-color);
//   transition: all var(--transition-duration);
//   font-size: var(--font-size);
//   border-bottom: 2.7px solid var(--base-color);
// }

// .standardInputDropDown:focus {
//   background-color: var(--input-bg-focus-color);
// }

// .standardInputDropDown:disabled {
//   background-color: var(--disabled-bg-color);
//   color: var(--disabled-text-color);
// }

