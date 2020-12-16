export const styles = {
  ".containerTextInput": {
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
  ".containerWithSideLabelTextInput": {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingTop: "3px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "1px"
  },
  ".labelTextInput": {
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
  ".errorTextTextInput": {
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
  ".standardInputTextInput": {
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
  ".standardInputTextInput:focus": {
    backgroundColor: "var(--input-bg-focus-color)"
  },
  ".standardInputTextInput:disabled": {
    backgroundColor: "var(--disabled-bg-color)",
    color: "var(--disabled-text-color)"
  }
}


// export const styles = () => ({
//   containerTextInput: {
//     width: '100%',
//     height: '100%',
//     display: 'grid',
//     grid_template_rows: 'var(--base-label-size) minmax(55%, auto) var(--base-error-text-size)',
//     padding_top: '3px',
//     padding_left: '1px',
//     padding_right: '1px',
//     padding_bottom: '1px'
//   },
  
//   containerWithSideLabelTextInput: {
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     padding_top: '3px',
//     padding_left: '1px',
//     padding_right: '1px',
//     padding_bottom: '1px'
//   },
  
//   labelTextInput: {
//     font_size: 'var(--base-additional-text-font-size)',
//     font_family: 'inherit',
//     font_weight: 400,
//     font_size: '08em',
//     color: '#545454',
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     justify_content: 'left',
//     align_items: 'flex-end',
//     padding_bottom: '2px'
//   },
  
//   errorTextTextInput: {
//     font_size: 'var(--base-additional-text-font-size)',
//     font_family: 'inherit',
//     font_weight: 400,
//     color: 'var(--base-error-color)',
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     justify_content: 'left',
//     align_items: 'flex-start'
//   },
  
//   standardInputTextInput: {
//     font_family: 'inherit',
//     _webkit_appearance: 'none',
//     appearance: 'none',
//     outline: 'none',
//     width: '100%',
//     height: '100%',
//     background_color: 'var(--input-bg-color)',
//     transition: 'all var(--transition-duration)',
//     font_size: 'var(--font-size)',
//     border_bottom: '27px solid var(--base-color)',
//     padding: '5px 10px'
//   },
  
//   standardInputTextInput: { '&:$focus': {
//     background_color: 'var(--input-bg-focus-color)'
//   }},
  
//   standardInputTextInput: { '&:$disabled': {
//     background_color: 'var(--disabled-bg-color)',
//     color: 'var(--disabled-text-color)'
//   }}
// })

// .containerTextInput {
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-rows:  var(--base-label-size) minmax(55%, auto) var(--base-error-text-size);
//   padding-top: 3px;
//   padding-left: 1px;
//   padding-right: 1px;
//   padding-bottom: 1px;
// }

// .containerWithSideLabelTextInput {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   padding-top: 3px;
//   padding-left: 1px;
//   padding-right: 1px;
//   padding-bottom: 1px;
// }

// .labelTextInput {
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

// .errorTextTextInput {
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

// .standardInputTextInput {
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

// .standardInputTextInput:focus {
//   background-color: var(--input-bg-focus-color);
// }

// .standardInputTextInput:disabled {
//   background-color: var(--disabled-bg-color);
//   color: var(--disabled-text-color);
// }