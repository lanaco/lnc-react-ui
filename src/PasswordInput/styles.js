// export const styles = () => ({

// })

export const styles = {
  ".containerPasswordInput": {
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
  ".containerWithSideLabelPasswordInput": {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingTop: "3px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "1px"
  },
  ".labelPasswordInput": {
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
  ".errorTextPasswordInput": {
    fontSize: "var(--base-additional-text-font-size)",
    fontFamily: "inherit",
    fontWeight: 400,
    color: "var(--base-error-color)",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "70% 30%"
  },
  ".standardInputPasswordInput": {
    fontFamily: "inherit",
    WebkitAppearance: "none",
    appearance: "none",
    outline: "none",
    width: "85%",
    height: "100%",
    backgroundColor: "var(--input-bg-color)",
    transition: "all var(--transition-duration)",
    fontSize: "var(--font-size)",
    borderBottom: "2.7px solid var(--base-color)",
    padding: "5px 10px"
  },
  ".standardInputPasswordInput:focus": {
    backgroundColor: "var(--input-bg-focus-color)"
  },
  ".standardInputPasswordInput:disabled": {
    backgroundColor: "var(--disabled-bg-color)",
    color: "var(--disabled-text-color)"
  },
  ".iconButtonPasswordInput": {
    cursor: "pointer",
    position: "relative",
    fontSize: "1.5em",
    textAlign: "right",
    paddingRight: "5px",
    width: "15%",
    height: "100%",
    borderBottom: "2.7px solid var(--base-color)",
    backgroundColor: "var(--input-bg-color)",
    transition: "all 400ms"
  },
  ".iconButtonFocusedPasswordInput": {
    cursor: "pointer",
    position: "relative",
    fontSize: "1.5em",
    textAlign: "right",
    paddingRight: "5px",
    width: "15%",
    height: "100%",
    borderBottom: "2.7px solid var(--base-color)",
    backgroundColor: "var(--input-bg-focus-color)",
    transition: "all 400ms"
  },
  ".iconButtonPasswordInput:disabled": {
    backgroundColor: "var(--disabled-bg-color)",
    color: "var(--disabled-text-color)"
  },
  ".inputWithIconButtonPasswordInput": {
    display: "flex",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    height: "100%",
    backgroundColor: "var(--input-bg-color)"
  },
  ".forgotPasswordLabelPasswordInput": {
    textAlign: "right",
    marginBottom: "10%",
    fontSize: "var(--base-additional-text-font-size)",
    fontFamily: "inherit",
    fontWeight: 400,
    color: "#545454",
    width: "100%",
    height: "100%",
    justifyContent: "left",
    alignItems: "flex-end",
    cursor: "pointer"
  },
  ".forgotPasswordLabelPasswordInput:hover": { color: "var(--base-color)" },
  ".forgottenPasswordDivPasswordInput": {
    color: "#545454",
    position: "relative",
    cursor: "pointer",
    width: "100%",
    fontSize: "1em",
    paddingTop: "9px"
  }
}



// .containerPasswordInput {
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

// .containerWithSideLabelPasswordInput {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   padding-top: 3px;
//   padding-left: 1px;
//   padding-right: 1px;
//   padding-bottom: 1px;
// }

// .labelPasswordInput {
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   color: #545454;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: left;
//   align-items: flex-end;
//   font-size: 0.8em;
//   padding-bottom: 2px;
// }

// .errorTextPasswordInput {
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   /* padding-top: 2px; */
//   color: var(--base-error-color);
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-columns: 70% 30%;
// }

// .standardInputPasswordInput {
//   font-family: inherit;
//   -webkit-appearance: none;
//   appearance: none;
//   outline: none;
//   width: 85%;
//   height: 100%;
//   background-color: var(--input-bg-color);
//   /* padding: 3.3% 5%; */
//   transition: all var(--transition-duration);
//   font-size: var(--font-size);
//   /* margin-top: 1.8%; */
//   border-bottom: 2.7px solid var(--base-color);
//   padding: 5px 10px;
// }

// .standardInputPasswordInput:focus {
//   background-color: var(--input-bg-focus-color);
// }

// .standardInputPasswordInput:disabled {
//   background-color: var(--disabled-bg-color);
//   color: var(--disabled-text-color);
// }

// .iconButtonPasswordInput {
//   cursor: pointer;
//   position: relative;
//   font-size: 1.5em;
//   text-align: right;
//   padding-right: 5px;
//   width: 15%;
//   height: 100%;
//   border-bottom: 2.7px solid var(--base-color);
//   background-color: var(--input-bg-color);
//   transition: all 400ms;
// }

// .iconButtonFocusedPasswordInput {
//   cursor: pointer;
//   position: relative;
//   font-size: 1.5em;
//   text-align: right;
//   padding-right: 5px;
//   width: 15%;
//   height: 100%;
//   border-bottom: 2.7px solid var(--base-color);
//   background-color: var(--input-bg-focus-color);
//   transition: all 400ms;
// }

// .iconButtonPasswordInput:disabled {
//   background-color: var(--disabled-bg-color);
//   color: var(--disabled-text-color);
// }

// .inputWithIconButtonPasswordInput {
//   display: flex;
//   font-family: inherit;
//   outline: none;
//   width: 100%;
//   height: 100%;
//   background-color: var(--input-bg-color);
// }

// .forgotPasswordLabelPasswordInput {
//   text-align: right;
//   margin-bottom: 10%;
//   font-size: var(--base-additional-text-font-size);
//   font-family: inherit;
//   font-weight: 400;
//   color: #545454;
//   width: 100%;
//   height: 100%;

//   justify-content: left;
//   align-items: flex-end;
//   cursor: pointer;
// }

// .forgotPasswordLabelPasswordInput:hover {
//   color: var(--base-color);
// }

// .forgottenPasswordDivPasswordInput {
//   color: #545454;
//   position: relative;
//   cursor: pointer;
//   width: 100%;
//   font-size: 1em;
//   padding-top: 9px;
// }

