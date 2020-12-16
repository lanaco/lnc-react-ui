// export const styles = () => ({
 
// })
export const styles = {
  ".containerToggleSwitch": {
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
  ".containerWithSideLabelToggleSwitch": {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingTop: "3px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "1px"
  },
  ".labelToggleSwitch": {
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
  ".errorTextToggleSwitch": {
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
  ".standardInputToggleSwitch": {
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
  ".switch": { position: "relative", display: "inline-block", width: "40px" },
  ".switch input": { opacity: 0, width: "0", height: "0" },
  ".slider": {
    position: "absolute",
    cursor: "pointer",
    top: "25%",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "gray",
    WebkitTransition: "0.4s",
    transition: "0.4s",
    height: "20px",
    width: "45px",
    border: "1px solid var(--base-color)",
    borderRadius: "2px"
  },
  ".slider:before": {
    position: "absolute",
    content: '""',
    height: "22px",
    width: "22px",
    left: "1px",
    top: "-2px",
    backgroundColor: "white",
    WebkitTransition: "0.4s",
    transition: "0.4s",
    border: "1px solid var(--base-color)",
    borderRadius: "2px"
  },
  ".sliderDisabledToggleSwitch": {
    position: "absolute",
    cursor: "pointer",
    top: "25%",
    left: "0",
    right: "0",
    bottom: "0",
    WebkitTransition: "0.4s",
    transition: "0.4s",
    height: "20px",
    width: "45px",
    borderRadius: "2px",
    backgroundColor: "#ccc !important"
  },
  ".sliderDisabledToggleSwitch:before": {
    position: "absolute",
    content: '""',
    height: "22px",
    width: "22px",
    left: "1px",
    top: "-2px",
    backgroundColor: "white",
    WebkitTransition: "0.4s",
    transition: "0.4s",
    border: "1px solid gray",
    borderRadius: "2px"
  },
  "input:checked + .slider": { backgroundColor: "var(--lanaco-accent-color)" },
  "input:focus + .slider": { boxShadow: "0 0 1px var(--lanaco-accent-color)" },
  "input:checked + .slider:before": {
    WebkitTransform: "translateX(90%)",
    msTransform: "translateX(90%)",
    transform: "translateX(90%)"
  },
  ".switchLabel": { paddingLeft: "10px" },
  ".switchLine": { paddingBottom: "3px" }
}

// .containerToggleSwitch {
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

// .containerWithSideLabelToggleSwitch {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   padding-top: 3px;
//   padding-left: 1px;
//   padding-right: 1px;
//   padding-bottom: 1px;
// }

// .labelToggleSwitch {
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

// .errorTextToggleSwitch {
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

// .standardInputToggleSwitch {
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

// .switch {
//   position: relative;
//   display: inline-block;
//   width: 40px;
// }

// .switch input {
//   opacity: 0;
//   width: 0;
//   height: 0;
// }

// .slider {
//   position: absolute;
//   cursor: pointer;
//   top: 25%;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: gray;
//   -webkit-transition: 0.4s;
//   transition: 0.4s;
//   height: 20px;
//   width: 45px;
//   border: 1px solid var(--base-color);
//   border-radius: 2px;
// }

// .slider:before {
//   position: absolute;
//   content: "";
//   height: 22px;
//   width: 22px;
//   left: 1px;
//   top: -2px;
//   background-color: white;
//   -webkit-transition: 0.4s;
//   transition: 0.4s;
//   border: 1px solid var(--base-color);
//   border-radius: 2px;
// }

// .sliderDisabledToggleSwitch {
//   position: absolute;
//   cursor: pointer;
//   top: 25%;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   -webkit-transition: 0.4s;
//   transition: 0.4s;
//   height: 20px;
//   width: 45px;
//   border-radius: 2px;
//   background-color: #ccc !important;
// }

// .sliderDisabledToggleSwitch:before {
//   position: absolute;
//   content: "";
//   height: 22px;
//   width: 22px;
//   left: 1px;
//   top: -2px;
//   background-color: white;
//   -webkit-transition: 0.4s;
//   transition: 0.4s;
//   border: 1px solid gray;
//   border-radius: 2px;
// }

// input:checked + .slider {
//   background-color: var(--lanaco-accent-color);
// }

// input:focus + .slider {
//   box-shadow: 0 0 1px var(--lanaco-accent-color);
// }

// input:checked + .slider:before {
//   -webkit-transform: translateX(90%);
//   -ms-transform: translateX(90%);
//   transform: translateX(90%);
// }

// .switchLabel {
//   padding-left: 10px;
// }

// .switchLine {
//   padding-bottom: 3px;
// }
