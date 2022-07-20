import "./nunito-font.css";

const theme = {
  name: "Main",
  class: "lnc-main",
  backgroundColor: "#fff",
  test_palette: {
    primary: {
      10: "#F5FCFF",
      20: "#D6F2FF",
      30: "#C2ECFF",
      40: "#ADE5FF",
      50: "#85D8FF",
      60: "#5CCBFF",
      70: "#33BEFF",
      80: "#0AB1FF",
      90: "#0099E0",
      100: "#007DB8",
      200: "#0070a3",
      300: "#00628f",
      400: "#00537a",
      500: "#004666",
    },
    secondary: {
      100: "#00dcf5",
      200: "#00cae0",
      300: "#00b8cc",
      400: "#00a1b4",
      500: "#0093a3",
    },
    dark: {
      100: "#858585",
      200: "#707070",
      300: "#666666",
      400: "#575757",
      500: "#474747",
    },
    light: {
      100: "#FFFFFF",
      200: "#F5F5F5",
      300: "#EBEBEB",
      400: "#E0E0E0",
      500: "#CCCCCC",
    },
    success: {
      100: "#2EEFC2",
      200: "#1BEEBD",
      300: "#11E4B3",
      400: "#10D1A3",
      500: "#0EBE95",
    },
    danger: {
      100: "#FF99A7",
      200: "#FF8595",
      300: "#FF7083",
      400: "#FF556C",
      500: "#FF4760",
    },
    warning: {
      100: "#FFD5AD",
      200: "#FFCA99",
      300: "#FFC085",
      400: "#FFB26B",
      500: "#FFAB5C",
    },
    info: {
      100: "#A1C5F7",
      200: "#8EB9F5",
      300: "#7CAEF4",
      400: "#69A1F2",
      500: "#5696F0",
    },
    disabled: {
      100: "#F5F5F5",
      200: "#EBEBEB",
      300: "#E0E0E0",
      400: "#CCCCCC",
      500: "#C2C2C2",
      600: "#C4C4C4",
      textLight: "#474747",
      textDark: "white",
      disabled: "#CCCCCC",
      disabledDark: "#C4C4C4",
    },
    white: {
      100: "#EDEADE",
      200: "#F9F6EE",
      300: "#FAF9F6",
      400: "#ffffff",
    }
  },
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
      disabled: "#CCCCCC",
      disabledDark: "#C4C4C4",
      main: "#CCCCCC",
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
    fontFamily: "Nunito",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    small: {
      fontSize: "0.875rem",
      iconFontSize: "1.25rem",
      gap: "0.3rem",
      subTextSize: "0.625rem",
      thumb: "1rem",
      inputSize: "1.875rem",
      buttonSize: "1.875rem",
    },
    medium: {
      fontSize: "1rem",
      iconFontSize: "1.425rem",
      gap: "0.45rem",
      subTextSize: "0.725rem",
      thumb: "1.2rem",
      inputSize: "2.25rem",
      buttonSize: "2.25rem",
    },
    large: {
      fontSize: "1.125rem",
      iconFontSize: "1.6375rem",
      gap: "0.6rem",
      subTextSize: "0.825rem",
      thumb: "1.4rem",
      inputSize: "2.625rem",
      buttonSize: "2.625rem",
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
      fontWeight: 600,
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
      short: 250,
      standard: 300,
      long: 400,
    },
  },
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
    popover: 1299,
  },
  spaces: {
    paddings: {
      popover: "1.25rem"
    },
    margins: {}
  }
};

const lanaco_light = {
  name: "Lanaco Light",
  class: "lnc-light",
  backgroundColor: "#fff",
  palette: {
    outline: {
      width: "0.125rem solid",
      color: "secondary",
      weight: 500,
      outlineOffset: "0.125rem",
    },
    disabled: {
      color: "gray",
      textWeight: 400,
      backgroundWeight: 200,
      opacity: 50,
    },
    primary: {
      50: "#F4FAFF",
      100: "#E3F2FF",
      200: "#C6E4FF",
      300: "#96CEFF",
      400: "#6AB7FB",
      500: "#4FA2EB",
      600: "#3284CB",
      700: "#2667A0",
      800: "#00427C",
      900: "#003461",
      cssStates: {
        enabled: 200,
        hover: 300,
        focus: 300,
        active: 400,
        text: 600,
      }
    },
    secondary: {
      50: "#F0FDFD",
      100: "#CCFAFB",
      200: "#ADF4F5",
      300: "#73E3E4",
      400: "#2DD1D4",
      500: "#00B9BD",
      600: "#008C8F",
      700: "#00787A",
      800: "#045F61",
      900: "#0A4D4F",
      cssStates: {
        enabled: 200,
        hover: 300,
        focus: 300,
        active: 400,
        text: 600,
      }
    },
    red: {
      50: "#FFF1F2",
      100: "#FFE4E6",
      200: "#FECDD3",
      300: "#FDA4AF",
      400: "#FB7185",
      500: "#F43F5E",
      600: "#E11D48",
      700: "#BE123C",
      800: "#9F1239",
      900: "#881337",
      cssStates: {
        enabled: 200,
        hover: 300,
        focus: 300,
        active: 400,
        text: 600,
      }
    },
    violet: {
      50: "#F5F3FF",
      100: "#EDE9FE",
      200: "#DDD6FE",
      300: "#C4B5FD",
      400: "#A78BFA",
      500: "#8B5CF6",
      600: "#7C3AED",
      700: "#6D28D9",
      800: "#5B21B6",
      900: "#4C1D95",
      cssStates: {
        enabled: 200,
        hover: 300,
        focus: 300,
        active: 400,
        text: 600,
      }
    },
    yellow: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F59E0B",
      600: "#D97706",
      700: "#B45309",
      800: "#92400E",
      900: "#78350F",
      cssStates: {
        enabled: 200,
        hover: 300,
        focus: 300,
        active: 400,
        text: 600,
      }
    },
    green: {
      50: "#ECFDF5",
      100: "#D1FAE5",
      200: "#A7F3D0",
      300: "#6EE7B7",
      400: "#34D399",
      500: "#10B981",
      600: "#059669",
      700: "#047857",
      800: "#065F46",
      900: "#064E3B",
      cssStates: {
        enabled: 200,
        hover: 300,
        focus: 300,
        active: 400,
        text: 600,
      }
    },
    gray: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
      cssStates: {
        enabled: 50,
        hover: 100,
        focus: 100,
        active: 200,
        text: 600,
      }
    },
    neutral: {
      50: "#FAFAFA",
      100: "#F4F4F5",
      200: "#E4E4E7",
      300: "#D4D4D8",
      400: "#A1A1AA",
      500: "#71717A",
      600: "#52525B",
      700: "#3F3F46",
      800: "#27272A",
      900: "#18181B",
      cssStates: {
        enabled: 50,
        hover: 100,
        focus: 100,
        active: 200,
        text: 600,
      }
    },
    opacity: {
      50: "5%",
      100: "10%",
      200: "20%",
      250: "25",
      300: "30%",
      400: "40%",
      500: "50%",
      600: "60%",
      700: "70%",
      800: "80%",
      900: "90%",
      950: "95%",
    },
    values: {
      default: 500,
      container: 100,
      hover: 700,
      background: "gray[100]",
      surface: "white",
    },
  },
  sizes: {
    chip: {
      regular: "2rem",
      compact: "2.25rem",
      chipIconSize: "1.25rem",
    }
  },
  borderRadius: {
    chip: {
      regular: "0.5rem",
      full: "62.5rem",
    }
  },
  typography: {
      headline: {
        weight: 600,
        large: {
          fontSize: "1.375rem",
          lineHeight: "1.75rem",
        },
        medium: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
        small: {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        },
      },
      title: {
        weight: 600,
        large: {
          fontSize: "1.375rem",
          lineHeight: "1.75rem",
        },
        medium: {
          fontSize: "rem",
          lineHeight: "1.5rem",
        },
        small: {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        },
      },
      label: {
        weight: 500,
        large: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
        medium: {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        },
        small: {
          fontSize: "0.75rem",
          lineHeight: "1rem",
        },
      },
      body: {
        weight: 400,
        large: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
        medium: {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        },
        small: {
          fontSize: "0.75rem",
          lineHeight: "1rem",
        },
      },
  },
  paddings: {
    chip: {
      compact: {
        gap: "0.375rem",
        left: {
          labelOnly: "0.75rem",
          trailingIconOnly: "0.625rem",
          leadingIcon: "0.375rem",
          avatar: "0.125rem"
        },
        right: {
          labelOnly: "0.75rem",
          trailingIconOnly: "0.375rem",
          leadingIcon: "0.375rem",
          avatar: "0.625rem",
        }
      },
      regular: {
        gap: "0.5rem",
        left: {
          labelOnly: "1rem",
          trailingIconOnly: "0.75rem",
          leadingIcon: "0.5rem",
          avatar: "0.25rem"
        },
        right: {
          labelOnly: "1rem",
          trailingIconOnly: "0.5rem",
          leadingIcon: "0.5rem",
          avatar: "0.75rem",
        }
      }
    }
  }
}

const themes = [
  theme,
  lanaco_light,
  {
    ...theme,
    name: "Main copy",
    class: "lnc-dark",
    appBg: "#fff",
  },
];

export default theme;
export { themes };
