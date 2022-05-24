const theme = {
  name: "Main",
  backgroundColor: "#fff",
  palette: {
    common: {
      black: "black",
      white: "white",
    },
    //---------------------
    gray: {
      100: "#F5F5F5",
      200: "#EBEBEB",
      300: "#E0E0E0",
      400: "#D6D6D6",
      500: "#CCCCCC",
      600: "#C2C2C2",
      700: "#B8B8B8",
      800: "#ADADAD",
      900: "#A3A3A3",
      1000: "#333333",
      textLight: "#474747",
      textDark: "white",
    },
    //---------------------
    white: {
      lighter: "white",
      light: "white",
      main: "white",
      dark: "white",
      text: "white",
      textDark: "white",
    },
    //---------------------
    primary: {
      lighter: "#EBF9FF",
      light: "#00628F",
      main: "#00537A",
      dark: "#004666",
      text: "white",
      textDark: "black",
    },
    //---------------------
    secondary: {
      lighter: "#F9DCF1",
      light: "#991E74",
      main: "#7b185d",
      dark: "#66154D",
      text: "white",
      textDark: "black",
    },
    //---------------------
    success: {
      lighter: "#D4EDDA",
      light: "#71C189",
      main: "#55B472",
      dark: "#449C5F",
      text: "white",
      textDark: "black",
    },
    //---------------------
    error: {
      lighter: "#F8DEDE",
      light: "#DF686C",
      main: "#DB575B",
      dark: "#D8464B",
      text: "white",
      textDark: "black",
    },
    //---------------------
    warning: {
      lighter: "#FFEDD6",
      light: "#FFB65C",
      main: "#FFAC47",
      dark: "#FFA333",
      text: "white",
      textDark: "black",
    },
    //---------------------
    background: {
      lighter: "#FFFFFF",
      light: "#F1F6F9",
      main: "#BCD5E3",
      dark: "#619BBD",
      text: "#2e2e2e",
      textDark: "black",
    },
    //---------------------
    transparent: {
      lighter: "#e6e6e6",
      light: "#d9d9d9",
      main: "transparent",
      dark: "#619BBD",
      text: "#575757",
      textDark: "#575757",
    },
    action: {
      hoverOpacity: 0.04,
      selectedOpacity: 0.08,
      disabledOpacity: 0.38,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  typography: {
    fontFamily: "Ubuntu",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    small: {
      fontSize: "0.75rem",
      iconFontSize: "1.25rem",
      gap: "0.3rem",
    },
    medium: {
      fontSize: "0.9375rem",
      iconFontSize: "1.425rem",
      gap: "0.45rem",
    },
    large: {
      fontSize: "1.463rem",
      iconFontSize: "1.6375rem",
      gap: "0.6rem",
    },
    h1: {
      fontWeight: 300,
      fontSize: "6rem",
      //todo letter spacing
    },
    h2: {
      fontWeight: 300,
      fontSize: "3.75rem",
    },
    h3: {
      fontWeight: 400,
      fontSize: "3rem",
    },
    h4: {
      fontWeight: 400,
      fontSize: "2.125rem",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.125rem",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
    },
    button: {
      fontWeight: 500,
      fontSize: "0.75rem",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "1.125rem",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
    },
  },
  shadows: {
    0: "none",
    1: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    2: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
  },
  transition: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      short: "120ms",
      standard: "220ms",
      long: "320ms",
    },
  },
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
};

const themes = [
  theme,
  {
    ...theme,
    name: "Dark",
    backgroundColor: "#000",
  },
];

export default theme;
export { themes };
