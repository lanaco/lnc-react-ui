// export const styles = () => ({

// })

export const styles = {
  ".container": {
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
  ".innerContainer": { display: "flex" },
  ".clearInputSpan": {
    backgroundColor: "var(--input-bg-color)",
    transition: "all var(--transition-duration)",
    fontSize: "var(--font-size)",
    borderBottom: "2.7px solid var(--base-color)",
    paddingRight: "5px"
  },
  ".label": {
    fontSize: ["var(--base-additional-text-font-size)", "0.8em"],
    fontFamily: "inherit",
    fontWeight: 400,
    color: "#545454",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-end",
    paddingBottom: "2px"
  },
  ".errorText": {
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
  ".standardInput": {
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
  ".standardInput:focus": { backgroundColor: "var(--input-bg-focus-color)" },
  ".standardInput:disabled": {
    backgroundColor: "var(--disabled-bg-color)",
    color: "var(--disabled-text-color)"
  },
  ".listItem": { cursor: "pointer", backgroundColor: "white", zIndex: 10000 },
  ".listItem:hover": {
    zIndex: 10000,
    color: "var(--lanaco-accent-color)",
    backgroundColor: "whitesmoke",
    position: "relative"
  },
  ".list": { zIndex: 10000, border: "1px solid gray", position: "relative" },
  ".ulListDiv": {
    backgroundColor: "white !important",
    zIndex: 10000,
    border: "1px solid gray",
    position: "relative"
  }
}



// .container {
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

// .innerContainer {
//   display: flex;
// }

// .clearInputSpan {
//   background-color: var(--input-bg-color);
//   transition: all var(--transition-duration);
//   font-size: var(--font-size);
//   border-bottom: 2.7px solid var(--base-color);
//   padding-right: 5px;
// }

// .label {
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   font-size: 0.8em;
//   color: #545454;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: left;
//   align-items: flex-end;
//   padding-bottom: 2px;
// }

// .errorText {
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

// .standardInput {
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

// .standardInput:focus {
//   background-color: var(--input-bg-focus-color);
// }

// .standardInput:disabled {
//   background-color: var(--disabled-bg-color);
//   color: var(--disabled-text-color);
// }

// .listItem {
//   cursor: pointer;
//   background-color: white;
//   z-index: 10000;
// }

// .listItem:hover {
//   z-index: 10000;
//   color: var(--lanaco-accent-color);
//   background-color: whitesmoke;
//   position: relative;
// }

// .list {
//   z-index: 10000;
//   border: 1px solid gray;
//   position: relative;
// }

// .ulListDiv {
//   background-color: white !important;
//   z-index: 10000;
//   border: 1px solid gray;
//   position: relative;
// }
