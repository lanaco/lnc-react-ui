import "./nunito-font.css";

export const lanaco_light = {
  name: "Lanaco Light",
  class: "lnc-light",
  colorContext: {
    primary: "teal",
    secondary: "blue",
    success: "green",
    warning: "yellow",
    danger: "red",
    information: "violet",
    neutral: "neutral",
  },
  components: {
    Input: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          prefix: 500,
          suffix: 500,
          caret: 900,
          fontWeight: 400,
        },
        focus: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          prefix: 500,
          suffix: 500,
          caret: 900,
          fontWeight: 400,
        },
        hover: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          prefix: 500,
          suffix: 500,
          caret: 900,
          fontWeight: 400,
        },
        active: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          prefix: 500,
          suffix: 500,
          caret: 900,
          fontWeight: 400,
        },
        disabled: {
          border: 200,
          background: 0,
          backgroundOpacity: 50,
          text: 500,
        },
      },
      teal: {
        enabled: {
          caret: 500,
        },
      },
      green: {
        enabled: {
          border: 300,
          text: 900,
          prefix: 600,
          suffix: 600,
        },
      },
      yellow: {
        enabled: {
          border: 300,
          text: 900,
          prefix: 600,
          suffix: 600,
        },
      },
      red: {
        enabled: {
          border: 300,
          text: 900,
          prefix: 600,
          suffix: 600,
        },
      },
    },
    DateInput: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          textWeekDays: 400,
          fontWeight: 200,
          todayColor: 600,
        },
        hover: {
          text: 600,
          background: 600,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 600,
          backgroundDayOpacity: 200,
        },
        disabled: {
          border: 200,
          text: 400,
          background: 0,
        },
      },
      teal: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      blue: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      red: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      violet: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      yellow: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      green: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      gray: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      neutral: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
    },
    Chip: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 50,
          text: 900,
          fontWeight: 700,
          backdropFilter: "blur(48px)",
        },
        hover: {
          background: 100,
          backgroundOpacity: 100,
          text: 900,
          fontWeight: 700,
        },
        focus: {
          background: 100,
          backgroundOpacity: 100,
          text: 900,
          fontWeight: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 200,
          text: 900,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      blue: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      red: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      violet: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      yellow: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      green: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      gray: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      neutral: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
    },
    Icon: {
      default: {
        palette: "gray",
        enabled: {
          icon: 600,
        },
      },
      teal: {
        enabled: {
          icon: 600,
        },
      },
      blue: {
        enabled: {
          icon: 600,
        },
      },
      red: {
        enabled: {
          icon: 600,
        },
      },
      violet: {
        enabled: {
          icon: 600,
        },
      },
      yellow: {
        enabled: {
          icon: 600,
        },
      },
      green: {
        enabled: {
          icon: 600,
        },
      },
      gray: {
        enabled: {
          icon: 500,
        },
      },
      neutral: {
        enabled: {
          icon: 600,
        },
      },
    },
    StarRating: {
      default: {
        palette: "gray",
        enabled: {
          fontSize: "1rem",
          lineHeight: "1.25rem",
          filledColor: 900,
          emptyColor: 300,
          textColor: 500,
        },
        disabled: { filledColor: 500, emptyColor: 300, textColor: 500 },
      },
      neutral: {
        enabled: {
          fontSize: "1rem",
          lineHeight: "1.25rem",
          filledColor: 900,
          emptyColor: 300,
          textColor: 500,
        },
      },
      yellow: { enabled: { filledColor: 500 } },
    },
    TabRegular: {
      default: {
        palette: "gray",
        enabled: {
          text: 500,
          line: 300,
          fontWeight: 700,
          lineHeight: "2px",
        },
        hover: {
          text: 500,
          line: 300,
          fontWeight: 700,
          lineHeight: "1px",
        },
        active: {
          text: 500,
          line: 300,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      blue: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      red: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      violet: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      yellow: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      green: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      gray: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      neutral: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
    },
    TabPill: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 0,
          text: 500,
          fontWeight: 600,
        },
        hover: {
          background: 100,
          backgroundOpacity: 1000,
          text: 500,
          fontWeight: 600,
        },
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 500,
          fontWeight: 600,
        },
      },
      teal: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 500,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 1000,
          text: 700,
        },
      },
      blue: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      red: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      violet: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      yellow: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      green: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      gray: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      neutral: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
    },
    TabUnderline: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 0,
          text: 500,
          line: 200,
          fontWeight: 700,
          lineHeight: "2px",
        },
        hover: {
          background: 0,
          backgroundOpacity: 0,
          text: 500,
          line: 200,
          fontWeight: 700,
          lineHeight: "1px",
        },
        active: {
          background: 0,
          backgroundOpacity: 0,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      blue: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      red: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      violet: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      yellow: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      green: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      gray: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      neutral: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
    },
    Checkbox: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 300,
          text: 600,
          fontWeight: 600,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
        focus: {
          border: 300,
          text: 600,
          backgroundOpacity: 1000,
          fontWeight: 600,
        },
        hover: {
          background: 900,
          backgroundOpacity: 100,
          border: 300,
          text: 600,
          fontWeight: 600,
        },
        active: {
          background: 600,
          backgroundOpacity: 1000,
          border: 600,
          text: 600,
          fontWeight: 600,
        },
        disabled: {
          border: 300,
        },
      },
      teal: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      blue: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      red: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      violet: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      yellow: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      green: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      gray: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      neutral: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
    },
    Radio: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 300,
          text: 600,
          fontWeight: 600,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
        focus: {
          border: 300,
          text: 600,
          backgroundOpacity: 1000,
          fontWeight: 600,
        },
        hover: {
          background: 900,
          backgroundOpacity: 100,
          border: 300,
          text: 600,
          fontWeight: 600,
        },
        active: {
          background: 600,
          backgroundOpacity: 1000,
          border: 600,
          text: 600,
          fontWeight: 600,
        },
        disabled: {
          border: 300,
          background: 300,
        },
      },
      teal: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      blue: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      red: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      violet: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      yellow: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      green: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      gray: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      neutral: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
    },
    Alert: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      teal: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      blue: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      red: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      violet: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      yellow: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      green: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      gray: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      neutral: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
    },
    Notification: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 1000,
          text: 500,
          action: 600,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
          border: 200,
          icon: 600,
        },
      },
      teal: {
        enabled: {
          icon: 600,
        },
      },
      blue: {
        enabled: {
          icon: 600,
        },
      },
      red: {
        enabled: {
          icon: 600,
        },
      },
      violet: {
        enabled: {
          icon: 600,
        },
      },
      yellow: {
        enabled: {
          icon: 600,
        },
      },
      green: {
        enabled: {
          icon: 600,
        },
      },
      gray: {
        enabled: {
          icon: 600,
        },
      },
      neutral: {
        enabled: {
          icon: 600,
        },
      },
    },
    ButtonFilled: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 50,
          text: 0,
          fontWeight: 700,
        },
        hover: {
          background: 100,
          backgroundOpacity: 100,
          text: 0,
          fontWeight: 700,
        },
        focus: {
          background: 100,
          backgroundOpacity: 100,
          text: 0,
          fontWeight: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 200,
          text: 0,
          fontWeight: 700,
        },
        disabled: {
          background: 200,
          text: 500,
          // background: 0,
          // opacity: 50,
        },
      },
      teal: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
        hover: {
          background: 700,
        },
        focus: {
          background: 700,
        },
        active: {
          background: 800,
        },
      },
      red: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      violet: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      yellow: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      green: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      gray: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 400,
        },
        hover: {
          background: 500,
        },
        focus: {
          background: 500,
        },
        active: {
          background: 600,
        },
      },
    },
    ButtonTinted: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 50,
          text: 900,
          fontWeight: 700,
        },
        hover: {
          background: 100,
          backgroundOpacity: 100,
          text: 900,
          fontWeight: 700,
        },
        focus: {
          background: 100,
          backgroundOpacity: 100,
          text: 900,
          fontWeight: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 200,
          text: 900,
          fontWeight: 700,
        },
        disabled: {
          background: 200,
          text: 500,
          // background: 0,
          // opacity: 50,
        },
      },
      teal: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
          backgroundOpacity: 200,
          text: 700,
        },
        hover: {
          background: 700,
          backgroundOpacity: 300,
          text: 700,
        },
        focus: {
          background: 700,
          backgroundOpacity: 300,
          text: 700,
        },
        active: {
          background: 800,
          backgroundOpacity: 400,
          text: 700,
        },
      },
      red: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      violet: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      yellow: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      green: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      gray: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 600,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 600,
        },
      },
    },
    ButtonBasic: {
      default: {
        palette: "gray",
        enabled: {
          border: 900,
          borderOpacity: 100,
          background: 0,
          backgroundOpacity: 50,
          text: 600,
          fontWeight: 700,
        },
        hover: {
          border: 900,
          borderOpacity: 100,
          background: 900,
          backgroundOpacity: 50,
          text: 600,
          fontWeight: 700,
        },
        focus: {
          border: 900,
          borderOpacity: 100,
          background: 900,
          backgroundOpacity: 50,
          text: 600,
          fontWeight: 700,
        },
        active: {
          border: 900,
          borderOpacity: 100,
          background: 900,
          backgroundOpacity: 100,
          text: 600,
          fontWeight: 700,
        },
        disabled: {
          background: 0,
          backgroundOpacity: 50,
          text: 500,
        },
      },
      teal: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      blue: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      violet: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      gray: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      neutral: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
    },
    Badge: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      teal: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      blue: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      red: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      violet: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      yellow: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      green: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      gray: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      neutral: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
    },
    Spinner: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
          unfilled: 200,
        },
      },
      teal: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
    },
    Progress: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 700,
          text: 0,
          unfilled: 300,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
      },
      teal: {
        enabled: {
          background: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
        },
      },
    },
    Range: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 700,
          text: 0,
          unfilled: 300,
        },
        disabled: {
          background: 500,
        },
      },
      teal: {
        enabled: {
          background: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
        },
      },
    },
    ButtonGroup: {
      default: {
        palette: "gray",
        enabled: {
          border: 200,
        },
      },
    },
    TableCell: {
      default: {
        palette: "gray",
        enabled: {},
        hover: {},
        focus: {},
        active: {},
        disabled: {},
      },
    },
    Table: {
      default: {
        palette: "gray",
        enabled: {
          border: 300,
          background: 0,
        },
        hover: {
          border: 300,
          background: 0,
        },
        focus: {
          border: 300,
          background: 0,
        },
        active: {
          border: 300,
          background: 0,
        },
        disabled: {
          border: 300,
          background: 0,
        },
      },
    },
    TableHeadCell: {
      default: {
        palette: "gray",
        enabled: {
          border: 300,
          background: 50,
          text: 900,
          fontWeight: 700,
        },
        hover: {
          border: 300,
          background: 100,
          text: 900,
          fontWeight: 700,
        },
        focus: {
          border: 300,
          background: 50,
          text: 900,
          fontWeight: 700,
        },
        active: {
          border: 300,
          background: 50,
          text: 900,
          fontWeight: 700,
        },
        disabled: {
          background: 0,
          backgroundOpacity: 50,
        },
      },
    },
    TableRow: {
      default: {
        palette: "gray",
        enabled: {
          border: 200,
          background: 0,
        },
        hover: {
          border: 200,
          background: 50,
        },
        focus: {
          border: 200,
          background: 50,
        },
        active: {
          border: 200,
          background: 50,
        },
        disabled: {
          border: 200,
          background: 50,
        },
      },
      teal: {
        active: {
          background: 50,
        },
      },
      blue: {
        active: {
          background: 50,
        },
      },
      red: {
        active: {
          background: 50,
        },
      },
      violet: {
        active: {
          background: 50,
        },
      },
      yellow: {
        active: {
          background: 50,
        },
      },
      green: {
        active: {
          background: 50,
        },
      },
      gray: {
        active: {
          background: 50,
        },
      },
      neutral: {
        active: {
          background: 50,
        },
      },
    },
    Modal: {
      default: {
        palette: "gray",
        enabled: {
          bg: 0,
          cancelButton: 400,
        },
        hover: {
          cancelBtnBg: 900,
          cancelBtnBgOpacity: 50,
        },
        focus: {
          cancelBtnBg: 900,
          cancelBtnBgOpacity: 100,
        },
      },
    },
    ConfirmationForm: {
      default: {
        palette: "gray",
        enabled: {
          icon: 600,
          trackBg: 100,
        },
      },
      teal: {
        enabled: {
          icon: 600,
        },
      },
      blue: {
        enabled: {
          icon: 600,
        },
      },
      red: {
        enabled: {
          icon: 600,
        },
      },
      violet: {
        enabled: {
          icon: 600,
        },
      },
      yellow: {
        enabled: {
          icon: 600,
        },
      },
      green: {
        enabled: {
          icon: 600,
        },
      },
      gray: {
        enabled: {
          icon: 600,
        },
      },
      neutral: {
        enabled: {
          icon: 600,
        },
      },
    },
    Popover: {
      default: {
        palette: "gray",
        enabled: {
          bg: 0,
          boxShadow:
            "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px -10px 10px -5px rgba(0, 0, 0, 0.02)",
        },
      },
    },
    FormField: {
      default: {
        palette: "gray",
        enabled: {
          label: 600,
          text: 600,
          fontWeight: 600,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
      },
    },
    Toggle: {
      default: {
        palette: "gray",
        enabled: {
          background: 900,
          backgroundOpacity: 200,
        },
        hover: {
          background: 900,
          backgroundOpacity: 300,
        },
        focus: {
          background: 900,
          backgroundOpacity: 300,
        },
        active: {
          background: 900,
          backgroundOpacity: 400,
        },
        disabled: {
          background: 900,
          backgroundOpacity: 200,
        },
      },
      teal: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
        hover: {
          background: 700,
        },
        focus: {
          background: 700,
        },
        active: {
          background: 800,
        },
      },
      red: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      violet: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      yellow: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      green: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      gray: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 400,
        },
        hover: {
          background: 500,
        },
        focus: {
          background: 500,
        },
        active: {
          background: 600,
        },
      },
    },
    ToggleSlider: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          fontWeight: 900,
        },
        hover: {
          background: 50,
          backgroundOpacity: 1000,
        },
        focus: {
          background: 50,
          backgroundOpacity: 1000,
        },
        active: {
          background: 50,
          backgroundOpacity: 1000,
        },
        disabled: {
          background: 50,
          backgroundOpacity: 700,
        },
      },
    },
    ToggleIcon: {
      default: {
        palette: "gray",
        enabled: {
          text: 400,
        },
        hover: {
          text: 400,
        },
        focus: {
          text: 400,
        },
        active: {
          text: 400,
        },
        disabled: {
          text: 400,
        },
      },
    },
    UploadedFile: {
      default: {
        palette: "gray",
        enabled: {
          color: 600,
        },
      },
      teal: {
        enabled: {
          color: 600,
        },
      },
      blue: {
        enabled: {
          color: 600,
        },
      },
      red: {
        enabled: {
          color: 600,
        },
      },
      violet: {
        enabled: {
          color: 600,
        },
      },
      yellow: {
        enabled: {
          color: 600,
        },
      },
      green: {
        enabled: {
          color: 600,
        },
      },
      gray: {
        enabled: {
          color: 600,
        },
      },
      neutral: {
        enabled: {
          color: 600,
        },
      },
    },
    Dropdown: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          removeIcon: 400,
        },
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      teal: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      blue: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      red: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      violet: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      yellow: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      green: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      gray: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      neutral: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
    },
    MenuItem: {
      default: {
        palette: "gray",
        enabled: {
          icon: 600,
          fontWeight: 600,
          separator: 100,
          text: 900,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
      teal: {
        enabled: {
          icon: 600,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
      blue: {
        enabled: {
          icon: 600,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
      red: {
        enabled: {
          icon: 600,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
      violet: {
        enabled: {
          icon: 600,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
      yellow: {
        enabled: {
          icon: 600,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
      green: {
        enabled: {
          icon: 600,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
      gray: {
        enabled: {
          icon: 600,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
      neutral: {
        enabled: {
          icon: 600,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
        },
      },
    },
    DragDropFiles: {
      default: {
        palette: "gray",
        enabled: {
          border: 200,
          text: 500,
          icon: 500,
          fontWeight: 400,
        },
      },
    },
    Accordion: {
      default: {
        palette: "gray",
        enabled: {
          line: 200,
          fontWeight: 600,
          summaryText: 500,
          text: 700,
        },
      },
    },
    Breadcrumbs: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 600,
          text: 600,
        },
      },
      teal: {
        enabled: {
          text: 600,
        },
      },
      blue: {
        enabled: {
          text: 600,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
      },
      violet: {
        enabled: {
          text: 600,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
      },
      gray: {
        enabled: {
          text: 600,
        },
      },
      neutral: {
        enabled: {
          text: 600,
        },
      },
    },
    Link: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 600,
          text: 600,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 900,
        },
        visited: {
          text: 800,
        },
      },
      teal: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      blue: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      violet: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      gray: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      neutral: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
    },
    Toolbar: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 1000,
          border: 900,
          borderOpacity: 100,
        },
      },
    },
    Kanban: {
      default: {
        palette: "gray",
        enabled: {
          background: 100,
        },
      },
    },
    KanbanHeader: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          text: 600,
        },
      },
    },
    KanbanCard: {
      default: {
        palette: "gray",
        enabled: {
          highlight: 600,
          background: 0,
          text: 600,
        },
      },
      teal: {
        enabled: {
          highlight: 600,
        },
      },
      blue: {
        enabled: {
          highlight: 600,
        },
      },
      red: {
        enabled: {
          highlight: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          highlight: 600,
        },
      },
      green: {
        enabled: {
          highlight: 600,
        },
      },
      gray: {
        enabled: {
          highlight: 600,
        },
      },
      neutral: {
        enabled: {
          highlight: 600,
        },
      },
    },
    TableSpecialLastRow: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 500,
        },
        hover: {
          fontWeight: 700,
        },
        focus: {
          fontWeight: 700,
        },
        active: {
          fontWeight: 700,
        },
        disabled: {
          fontWeight: 700,
        },
      },
    },
    Drawer: {
      default: {
        palette: "gray",
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      teal: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      blue: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      red: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      violet: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      yellow: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      green: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      gray: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      neutral: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
    },
    Danger: {
      default: {
        palette: "red",
        enabled: {
          text: 600,
          border: 300,
        },
      },
    },
    Background: {
      default: {
        palette: "gray",
        enabled: {
          background: 100,
        },
      },
    },
    Surface: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
        },
      },
    },
    Text: {
      default: {
        palette: "gray",
        enabled: {
          text: 600,
        },
      },
    },
  },

  palette: {
    outline: {
      width: "0.125rem",
      style: "solid",
      context: "primary",
      weight: 500,
      offset: "0.188rem",
    },
    disabled: {
      color: "gray",
      text: 400,
      background: 900,
      opacity: 50,
    },
    gray: {
      0: "#FFFFFF",
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
    },
    neutral: {
      0: "#FFFFFF",
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
    },
    blue: {
      0: "#FFFFFF",
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
    },
    teal: {
      0: "#FFFFFF",
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
    },
    red: {
      0: "#FFFFFF",
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
    },
    violet: {
      0: "#FFFFFF",
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
    },
    yellow: {
      0: "#FFFFFF",
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
    },
    green: {
      0: "#FFFFFF",
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
    },
    opacity: {
      50: "5%",
      100: "10%",
      200: "20%",
      250: "25%",
      300: "30%",
      400: "40%",
      500: "50%",
      600: "60%",
      700: "70%",
      800: "80%",
      900: "90%",
      950: "95%",
      1000: "100%",
    },
  },
  sizes: {
    small: "2.25rem",
    medium: "2.5rem",
    large: "2.75rem",
  },
  borderRadius: {
    slight: "4px",
    regular: "8px",
    edged: "12px",
    curved: "1000px",
    none: "0",
  },
  boxShadow: {
    xs: "0px 1px 2px rgba(0, 0, 0, 0.05);",
    s: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);",
    m: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);",
    l: " 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);",
    xl: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);",
    xxl: "0px 25px 50px -12px rgba(0, 0, 0, 0.25);",
  },
  typography: {
    fontFamily: "Nunito",
    component: {
      weight: 700,
      large: {
        fontSize: "1rem",
        lineHeight: "1.125rem",
        subTxtFontSize: "0.9rem",
      },
      medium: {
        fontSize: "0.875rem",
        lineHeight: "1rem",
        subTxtFontSize: "0.775rem",
      },
      small: {
        fontSize: "0.875rem",
        lineHeight: "1rem",
        subTxtFontSize: "0.775rem",
      },
    },
  },
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
    popover: 1299,
  },
};

export const lanaco_dark = {
  name: "Lanaco Dark",
  class: "lnc-dark",
  colorContext: {
    primary: "teal",
    secondary: "blue",
    success: "green",
    warning: "yellow",
    danger: "red",
    information: "violet",
    neutral: "gray",
  },
  components: {
    MainMenu: {
      default: {
        palette: "neutral",
        enabled: {
          color: 900,
          mediumColor: 600,
          lightColor: 500,
          lightestColor: 100,
          dividerOpacity: 80,
          headerBackgroundColor: 50,
          notificationBackgroundColor: 900,
          notificationOpacity: 80,
        },
        hover: { backgroundColor: 900, backgroundOpacity: 80 },
      },
      teal: {
        enabled: {
          textColor: 700,
          descriptionOpacity: 800,
          backgroundColor: 600,
          backgroundOpacity: 80,
        },
      },
      gray: {
        enabled: {
          color: 600,
          descriptionOpacity: 800,
          backgroundColor: 600,
          backgroundOpacity: 80,
        },
      },
    },
    Input: {
      default: {
        palette: "gray",
        enabled: {
          background: 700,
          border: 600,
          placeholder: 400,
          text: 0,
          prefix: 400,
          suffix: 400,
          caret: 500,
          fontWeight: 400,
        },
        focus: {
          background: 700,
          border: 600,
          placeholder: 400,
          text: 0,
          prefix: 400,
          suffix: 400,
          caret: 500,
          fontWeight: 400,
        },
        hover: {
          background: 700,
          border: 600,
          placeholder: 400,
          text: 0,
          prefix: 400,
          suffix: 400,
          caret: 500,
          fontWeight: 400,
        },
        active: {
          background: 700,
          border: 600,
          placeholder: 400,
          text: 0,
          prefix: 400,
          suffix: 400,
          caret: 500,
          fontWeight: 400,
        },
        disabled: {
          border: 700,
          text: 500,
          background: 0,
          opacity: 50,
        },
      },
      teal: {
        enabled: {
          caret: 500,
        },
      },
      green: {
        enabled: {
          border: 500,
          text: 600,
          prefix: 400,
          suffix: 400,
        },
      },
      yellow: {
        enabled: {
          border: 500,
          text: 600,
          prefix: 400,
          suffix: 400,
        },
      },
      red: {
        enabled: {
          border: 500,
          text: 600,
          prefix: 400,
          suffix: 400,
        },
      },
    },
    DateInput: {
      default: {
        palette: "gray",
        enabled: {
          background: 700,
          border: 200,
          placeholder: 500,
          text: 0,
          textWeekDays: 400,
          fontWeight: 200,
          todayColor: 600,
        },
        hover: {
          text: 600,
          background: 600,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 600,
          backgroundDayOpacity: 200,
        },
        disabled: {
          border: 200,
          background: 0,
          backgroundOpacity: 50,
          text: 500,
        },
      },
      teal: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      blue: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      red: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      violet: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      yellow: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      green: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      gray: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      neutral: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
    },
    Chip: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 50,
          text: 300,
          fontWeight: 700,
          backdropFilter: "blur(48px)",
        },
        hover: {
          background: 0,
          backgroundOpacity: 100,
          text: 300,
          fontWeight: 700,
        },
        focus: {
          background: 0,
          backgroundOpacity: 100,
          text: 300,
          fontWeight: 700,
        },
        active: {
          background: 0,
          backgroundOpacity: 200,
          text: 300,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 500,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 500,
        },
      },
      blue: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 500,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 500,
        },
      },
      red: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 500,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 500,
        },
      },
      violet: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 500,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 500,
        },
      },
      yellow: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 500,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 500,
        },
      },
      green: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 500,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 500,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 500,
        },
      },
      gray: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 300,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 300,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 300,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 500,
        },
      },
      neutral: {
        enabled: {
          background: 0,
          backgroundOpacity: 200,
          text: 500,
        },
        hover: {
          background: 0,
          backgroundOpacity: 300,
          text: 500,
        },
        focus: {
          background: 0,
          backgroundOpacity: 300,
          text: 500,
        },
        active: {
          background: 0,
          backgroundOpacity: 400,
          text: 500,
        },
      },
    },
    Icon: {
      default: {
        palette: "gray",
        enabled: {
          icon: 800,
        },
      },
      teal: {
        enabled: {
          icon: 600,
        },
      },
      blue: {
        enabled: {
          icon: 600,
        },
      },
      red: {
        enabled: {
          icon: 600,
        },
      },
      violet: {
        enabled: {
          icon: 600,
        },
      },
      yellow: {
        enabled: {
          icon: 600,
        },
      },
      green: {
        enabled: {
          icon: 600,
        },
      },
      gray: {
        enabled: {
          icon: 600,
        },
      },
      neutral: {
        enabled: {
          icon: 600,
        },
      },
    },
    StarRating: {
      default: {
        palette: "gray",
        enabled: {
          fontSize: "1rem",
          lineHeight: "1.25rem",
          filledColor: 900,
          emptyColor: 300,
          textColor: 500,
        },
        disabled: { filledColor: 500, emptyColor: 300, textColor: 500 },
      },
      neutral: {
        enabled: {
          fontSize: "1rem",
          lineHeight: "1.25rem",
          filledColor: 900,
          emptyColor: 300,
          textColor: 500,
        },
      },
      yellow: { enabled: { filledColor: 500 } },
    },
    TabRegular: {
      default: {
        palette: "gray",
        enabled: {
          text: 400,
          line: 700,
          fontWeight: 700,
          lineHeight: "2px",
        },
        hover: {
          text: 400,
          line: 700,
          fontWeight: 700,
          lineHeight: "1px",
        },
        active: {
          text: 400,
          line: 700,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {},
        hover: {
          text: 300,
          line: 300,
        },
        active: {
          text: 300,
          line: 300,
        },
      },
      blue: {
        enabled: {},
        hover: {
          text: 300,
          line: 300,
        },
        active: {
          text: 300,
          line: 300,
        },
      },
      red: {
        enabled: {},
        hover: {
          text: 300,
          line: 300,
        },
        active: {
          text: 300,
          line: 300,
        },
      },
      violet: {
        enabled: {},
        hover: {
          text: 300,
          line: 300,
        },
        active: {
          text: 300,
          line: 300,
        },
      },
      yellow: {
        enabled: {},
        hover: {
          text: 300,
          line: 300,
        },
        active: {
          text: 300,
          line: 300,
        },
      },
      green: {
        enabled: {},
        hover: {
          text: 300,
          line: 300,
        },
        active: {
          text: 300,
          line: 300,
        },
      },
      gray: {
        enabled: {},
        hover: {
          text: 300,
          line: 300,
        },
        active: {
          text: 300,
          line: 300,
        },
      },
      neutral: {
        enabled: {},
        hover: {
          text: 300,
          line: 300,
        },
        active: {
          text: 300,
          line: 300,
        },
      },
    },
    TabPill: {
      default: {
        palette: "gray",
        enabled: {
          text: 300,
          fontWeight: 600,
        },
        hover: {
          background: 800,
          backgroundOpacity: 500,
          text: 100,
          fontWeight: 600,
        },
        active: {
          background: 800,
          backgroundOpacity: 1000,
          text: 100,
          fontWeight: 600,
        },
      },
      teal: {
        enabled: {},
        hover: {
          background: 800,
          backgroundOpacity: 100,
          text: 300,
        },
        active: {
          background: 0,
          backgroundOpacity: 1000,
          text: 300,
        },
      },
      blue: {
        enabled: {},
        hover: {
          background: 800,
          backgroundOpacity: 100,
          text: 300,
        },
        active: {
          background: 0,
          backgroundOpacity: 1000,
          text: 300,
        },
      },
      red: {
        enabled: {},
        hover: {
          background: 800,
          backgroundOpacity: 100,
          text: 300,
        },
        active: {
          background: 0,
          backgroundOpacity: 1000,
          text: 300,
        },
      },
      violet: {
        enabled: {},
        hover: {
          background: 800,
          backgroundOpacity: 100,
          text: 300,
        },
        active: {
          background: 0,
          backgroundOpacity: 1000,
          text: 300,
        },
      },
      yellow: {
        enabled: {},
        hover: {
          background: 800,
          backgroundOpacity: 100,
          text: 300,
        },
        active: {
          background: 800,
          backgroundOpacity: 1000,
          text: 300,
        },
      },
      green: {
        enabled: {},
        hover: {
          background: 800,
          backgroundOpacity: 100,
          text: 300,
        },
        active: {
          background: 800,
          backgroundOpacity: 1000,
          text: 300,
        },
      },
      gray: {
        enabled: {},
        hover: {
          background: 800,
          backgroundOpacity: 100,
          text: 300,
        },
        active: {
          background: 800,
          backgroundOpacity: 1000,
          text: 300,
        },
      },
      neutral: {
        enabled: {},
        hover: {
          background: 800,
          backgroundOpacity: 100,
          text: 300,
        },
        active: {
          background: 0,
          backgroundOpacity: 1000,
          text: 300,
        },
      },
    },
    TabUnderline: {
      default: {
        palette: "gray",
        enabled: {
          background: 800,
          backgroundOpacity: 0,
          text: 300,
          line: 700,
          fontWeight: 700,
          lineHeight: "2px",
        },
        hover: {
          background: 700,
          backgroundOpacity: 0,
          text: 300,
          line: 200,
          fontWeight: 700,
          lineHeight: "1px",
        },
        active: {
          background: 800,
          backgroundOpacity: 0,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {},
        hover: {},
        active: {
          text: 300,
          line: 300,
        },
      },
      blue: {
        enabled: {},
        hover: {},
        active: {
          text: 300,
          line: 700,
        },
      },
      red: {
        enabled: {},
        hover: {},
        active: {
          text: 300,
          line: 300,
        },
      },
      violet: {
        enabled: {},
        hover: {},
        active: {
          text: 300,
          line: 300,
        },
      },
      yellow: {
        enabled: {},
        hover: {},
        active: {
          text: 300,
          line: 300,
        },
      },
      green: {
        enabled: {},
        hover: {},
        active: {
          text: 300,
          line: 300,
        },
      },
      gray: {
        enabled: {},
        hover: {},
        active: {
          text: 300,
          line: 300,
        },
      },
      neutral: {
        enabled: {},
        hover: {},
        active: {
          text: 300,
          line: 300,
        },
      },
    },
    Checkbox: {
      default: {
        palette: "gray",
        enabled: {
          background: 900,
          border: 500,
          text: 300,
          fontWeight: 600,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
        focus: {
          border: 500,
          text: 300,
          backgroundOpacity: 1000,
          fontWeight: 600,
        },
        hover: {
          background: 900,
          backgroundOpacity: 100,
          border: 300,
          text: 300,
          fontWeight: 600,
        },
        active: {
          background: 600,
          backgroundOpacity: 1000,
          border: 600,
          text: 300,
          fontWeight: 600,
        },
        disabled: {
          background: 700,
          border: 600,
        },
      },
      teal: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      blue: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      red: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      violet: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      yellow: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      green: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      gray: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      neutral: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
    },
    Radio: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 300,
          text: 600,
          fontWeight: 600,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
        focus: {
          border: 300,
          text: 600,
          backgroundOpacity: 1000,
          fontWeight: 600,
        },
        hover: {
          background: 900,
          backgroundOpacity: 100,
          border: 300,
          text: 600,
          fontWeight: 600,
        },
        active: {
          background: 600,
          backgroundOpacity: 1000,
          border: 600,
          text: 600,
          fontWeight: 600,
        },
        disabled: {
          border: 300,
          background: 300,
        },
      },
      teal: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      blue: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      red: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      violet: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      yellow: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      green: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      gray: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      neutral: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
    },
    Alert: {
      default: {
        palette: "gray",
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      teal: {
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      blue: {
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      red: {
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      violet: {
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      yellow: {
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      green: {
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      gray: {
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      neutral: {
        enabled: {
          background: 900,
          backgroundOpacity: 1000,
          text: 300,
          action: 200,
          title: 200,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
    },
    Notification: {
      default: {
        palette: "gray",
        enabled: {
          background: 700,
          backgroundOpacity: 1000,
          text: 400,
          action: 300,
          title: 50,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
          border: 600,
          icon: 300,
        },
      },
      teal: {
        enabled: {
          icon: 300,
        },
      },
      blue: {
        enabled: {
          icon: 300,
        },
      },
      red: {
        enabled: {
          icon: 300,
        },
      },
      violet: {
        enabled: {
          icon: 300,
        },
      },
      yellow: {
        enabled: {
          icon: 300,
        },
      },
      green: {
        enabled: {
          icon: 300,
        },
      },
      gray: {
        enabled: {
          icon: 300,
        },
      },
      neutral: {
        enabled: {
          icon: 300,
        },
      },
    },
    ButtonFilled: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 50,
          text: 0,
          fontWeight: 700,
        },
        hover: {
          background: 100,
          backgroundOpacity: 100,
          text: 0,
          fontWeight: 700,
        },
        focus: {
          background: 100,
          backgroundOpacity: 100,
          text: 0,
          fontWeight: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 200,
          text: 0,
          fontWeight: 700,
        },
        disabled: {
          // background: 700,
          background: 200,
          text: 500,
          // background: 0,
          // opacity: 50,
        },
      },
      teal: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
        hover: {
          background: 700,
        },
        focus: {
          background: 700,
        },
        active: {
          background: 800,
        },
      },
      red: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      violet: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      yellow: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      green: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      gray: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 400,
        },
        hover: {
          background: 500,
        },
        focus: {
          background: 500,
        },
        active: {
          background: 600,
        },
      },
    },
    ButtonTinted: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 50,
          text: 900,
          fontWeight: 700,
        },
        hover: {
          background: 100,
          backgroundOpacity: 100,
          text: 900,
          fontWeight: 700,
        },
        focus: {
          background: 100,
          backgroundOpacity: 100,
          text: 900,
          fontWeight: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 200,
          text: 900,
          fontWeight: 700,
        },
        disabled: {
          background: 700,
          text: 500,
        },
      },
      teal: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 300,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 300,
        },
      },
      blue: {
        enabled: {
          background: 600,
          backgroundOpacity: 200,
          text: 300,
        },
        hover: {
          background: 700,
          backgroundOpacity: 300,
          text: 300,
        },
        focus: {
          background: 700,
          backgroundOpacity: 300,
          text: 300,
        },
        active: {
          background: 800,
          backgroundOpacity: 400,
          text: 300,
        },
      },
      red: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 300,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 300,
        },
      },
      violet: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 300,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 300,
        },
      },
      yellow: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 300,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 300,
        },
      },
      green: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 300,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 300,
        },
      },
      gray: {
        enabled: {
          background: 0,
          backgroundOpacity: 100,
          text: 300,
        },
        hover: {
          background: 0,
          backgroundOpacity: 200,
          text: 300,
        },
        focus: {
          background: 0,
          backgroundOpacity: 200,
          text: 300,
        },
        active: {
          background: 0,
          backgroundOpacity: 300,
          text: 300,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 300,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 300,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 300,
        },
      },
    },
    ButtonBasic: {
      default: {
        palette: "gray",
        enabled: {
          border: 0,
          borderOpacity: 100,
          background: 0,
          backgroundOpacity: 50,
          text: 300,
          fontWeight: 700,
        },
        hover: {
          border: 0,
          borderOpacity: 100,
          background: 0,
          backgroundOpacity: 50,
          text: 300,
          fontWeight: 700,
        },
        focus: {
          border: 0,
          borderOpacity: 100,
          background: 0,
          backgroundOpacity: 50,
          text: 300,
          fontWeight: 700,
        },
        active: {
          border: 0,
          borderOpacity: 100,
          background: 0,
          backgroundOpacity: 100,
          text: 300,
          fontWeight: 700,
        },
        disabled: {
          background: 0,
          backgroundOpacity: 50,
          text: 500,
        },
      },
      teal: {
        enabled: {
          text: 300,
        },
        hover: {
          text: 300,
        },
        focus: {
          text: 300,
        },
        active: {
          text: 300,
        },
        disabled: {
          text: 500,
        },
      },
      blue: {
        enabled: {
          text: 300,
        },
        hover: {
          text: 300,
        },
        focus: {
          text: 300,
        },
        active: {
          text: 300,
        },
        disabled: {
          text: 500,
        },
      },
      red: {
        enabled: {
          text: 300,
        },
        hover: {
          text: 300,
        },
        focus: {
          text: 300,
        },
        active: {
          text: 300,
        },
        disabled: {
          text: 500,
        },
      },
      violet: {
        enabled: {
          text: 300,
        },
        hover: {
          text: 300,
        },
        focus: {
          text: 300,
        },
        active: {
          text: 300,
        },
        disabled: {
          text: 500,
        },
      },
      yellow: {
        enabled: {
          text: 300,
        },
        hover: {
          text: 300,
        },
        focus: {
          text: 300,
        },
        active: {
          text: 300,
        },
        disabled: {
          text: 500,
        },
      },
      green: {
        enabled: {
          text: 300,
        },
        hover: {
          text: 300,
        },
        focus: {
          text: 300,
        },
        active: {
          text: 300,
        },
        disabled: {
          text: 500,
        },
      },
      gray: {
        enabled: {
          text: 300,
        },
        hover: {
          text: 300,
        },
        focus: {
          text: 300,
        },
        active: {
          text: 300,
        },
        disabled: {
          text: 500,
        },
      },
      neutral: {
        enabled: {
          text: 300,
        },
        hover: {
          text: 300,
        },
        focus: {
          text: 300,
        },
        active: {
          text: 300,
        },
        disabled: {
          text: 500,
        },
      },
    },
    Badge: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      teal: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      blue: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      red: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      violet: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      yellow: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      green: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      gray: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      neutral: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
    },
    Spinner: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
          unfilled: 800,
        },
      },
      teal: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
    },
    Progress: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 700,
          text: 300,
          unfilled: 800,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
      },
      teal: {
        enabled: {
          background: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
        },
      },
    },
    Range: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 700,
          text: 300,
          unfilled: 800,
        },
        disabled: {
          background: 700,
        },
      },
      teal: {
        enabled: {
          background: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
        },
      },
    },
    ButtonGroup: {
      default: {
        palette: "gray",
        enabled: {
          border: 700,
        },
      },
    },
    TableCell: {
      default: {
        palette: "gray",
        enabled: {},
        hover: {},
        focus: {},
        active: {},
        disabled: {},
      },
    },
    Table: {
      default: {
        palette: "gray",
        enabled: {
          border: 700,
          background: 0,
        },
        hover: {
          border: 700,
          background: 0,
        },
        focus: {
          border: 700,
          background: 0,
        },
        active: {
          border: 700,
          background: 0,
        },
        disabled: {
          border: 700,
          background: 0,
        },
      },
    },
    TableHeadCell: {
      default: {
        palette: "gray",
        enabled: {
          border: 600,
          background: 600,
          text: 0,
          fontWeight: 700,
        },
        hover: {
          border: 600,
          background: 600,
          text: 0,
          fontWeight: 700,
        },
        focus: {
          border: 600,
          background: 600,
          text: 0,
          fontWeight: 700,
        },
        active: {
          border: 600,
          background: 600,
          text: 0,
          fontWeight: 700,
        },
        disabled: {
          background: 500,
          backgroundOpacity: 50,
        },
      },
    },
    TableRow: {
      default: {
        palette: "gray",
        enabled: {
          border: 700,
          background: 800,
        },
        hover: {
          border: 700,
          background: 700,
        },
        focus: {
          border: 700,
          background: 700,
        },
        active: {
          border: 700,
          background: 700,
        },
        disabled: {
          border: 700,
          background: 700,
        },
      },
      teal: {
        active: {
          background: 700,
        },
      },
      blue: {
        active: {
          background: 700,
        },
      },
      red: {
        active: {
          background: 700,
        },
      },
      violet: {
        active: {
          background: 700,
        },
      },
      yellow: {
        active: {
          background: 700,
        },
      },
      green: {
        active: {
          background: 700,
        },
      },
      gray: {
        active: {
          background: 700,
        },
      },
      neutral: {
        active: {
          background: 700,
        },
      },
    },
    Modal: {
      default: {
        palette: "gray",
        enabled: {
          cancelButton: 400,
          bg: 700,
        },
        hover: {
          cancelBtnBg: 900,
          cancelBtnBgOpacity: 50,
        },
        focus: {
          cancelBtnBg: 900,
          cancelBtnBgOpacity: 100,
        },
      },
    },
    ConfirmationForm: {
      default: {
        palette: "gray",
        enabled: {
          icon: 300,
          trackBg: 600,
        },
      },
      teal: {
        enabled: {
          icon: 300,
        },
      },
      blue: {
        enabled: {
          icon: 300,
        },
      },
      red: {
        enabled: {
          icon: 300,
        },
      },
      violet: {
        enabled: {
          icon: 300,
        },
      },
      yellow: {
        enabled: {
          icon: 300,
        },
      },
      green: {
        enabled: {
          icon: 300,
        },
      },
      gray: {
        enabled: {
          icon: 300,
        },
      },
      neutral: {
        enabled: {
          icon: 300,
        },
      },
    },
    Popover: {
      default: {
        palette: "gray",
        enabled: {
          bg: 700,
          boxShadow:
            "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px -10px 10px -5px rgba(0, 0, 0, 0.02)",
        },
      },
    },
    FormField: {
      default: {
        palette: "gray",
        enabled: {
          label: 300,
          text: 400,
          fontWeight: 600,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
      },
    },
    Toggle: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 200,
        },
        hover: {
          background: 0,
          backgroundOpacity: 300,
        },
        focus: {
          background: 0,
          backgroundOpacity: 300,
        },
        active: {
          background: 0,
          backgroundOpacity: 400,
        },
        disabled: {
          background: 0,
          backgroundOpacity: 200,
        },
      },
      teal: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
        hover: {
          background: 700,
        },
        focus: {
          background: 700,
        },
        active: {
          background: 800,
        },
      },
      red: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      violet: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      yellow: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      green: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      gray: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 400,
        },
        hover: {
          background: 500,
        },
        focus: {
          background: 500,
        },
        active: {
          background: 600,
        },
      },
    },
    ToggleSlider: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          fontWeight: 900,
        },
        hover: {
          background: 50,
          backgroundOpacity: 1000,
        },
        focus: {
          background: 50,
          backgroundOpacity: 1000,
        },
        active: {
          background: 50,
          backgroundOpacity: 1000,
        },
        disabled: {
          background: 50,
          backgroundOpacity: 700,
        },
      },
    },
    ToggleIcon: {
      default: {
        palette: "gray",
        enabled: {
          text: 400,
        },
        hover: {
          text: 400,
        },
        focus: {
          text: 400,
        },
        active: {
          text: 400,
        },
        disabled: {
          text: 400,
        },
      },
    },
    UploadedFile: {
      default: {
        palette: "gray",
        enabled: {
          color: 600,
        },
      },
      teal: {
        enabled: {
          color: 600,
        },
      },
      blue: {
        enabled: {
          color: 600,
        },
      },
      red: {
        enabled: {
          color: 600,
        },
      },
      violet: {
        enabled: {
          color: 600,
        },
      },
      yellow: {
        enabled: {
          color: 600,
        },
      },
      green: {
        enabled: {
          color: 600,
        },
      },
      gray: {
        enabled: {
          color: 600,
        },
      },
      neutral: {
        enabled: {
          color: 600,
        },
      },
    },
    Dropdown: {
      default: {
        palette: "gray",
        enabled: {
          background: 800,
          removeIcon: 400,
        },
        hover: {
          background: 700,
        },
        selected: {
          background: 900,
        },
      },
      teal: {
        hover: {
          background: 700,
        },
        selected: {
          background: 800,
        },
      },
      blue: {
        hover: {
          background: 700,
        },
        selected: {
          background: 800,
        },
      },
      red: {
        hover: {
          background: 700,
        },
        selected: {
          background: 800,
        },
      },
      violet: {
        hover: {
          background: 700,
        },
        selected: {
          background: 800,
        },
      },
      yellow: {
        hover: {
          background: 700,
        },
        selected: {
          background: 800,
        },
      },
      green: {
        hover: {
          background: 700,
        },
        selected: {
          background: 800,
        },
      },
      gray: {
        hover: {
          background: 700,
        },
        selected: {
          background: 800,
        },
      },
      neutral: {
        hover: {
          background: 700,
        },
        selected: {
          background: 800,
        },
      },
    },
    MenuItem: {
      default: {
        palette: "gray",
        enabled: {
          icon: 400,
          fontWeight: 600,
          separator: 700,
          text: 50,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
      teal: {
        enabled: {
          icon: 400,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
      blue: {
        enabled: {
          icon: 400,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
      red: {
        enabled: {
          icon: 400,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
      violet: {
        enabled: {
          icon: 400,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
      yellow: {
        enabled: {
          icon: 400,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
      green: {
        enabled: {
          icon: 400,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
      gray: {
        enabled: {
          icon: 400,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
      neutral: {
        enabled: {
          icon: 400,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
        },
        hover: {
          background: 600,
          icon: 300,
          text: 0,
        },
      },
    },
    DragDropFiles: {
      default: {
        palette: "gray",
        enabled: {
          border: 700,
          text: 400,
          icon: 400,
          fontWeight: 400,
        },
      },
    },
    Accordion: {
      default: {
        palette: "gray",
        enabled: {
          line: 200,
          fontWeight: 600,
          summaryText: 300,
          text: 400,
        },
      },
    },
    Breadcrumbs: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 600,
          text: 600,
        },
      },
      teal: {
        enabled: {
          text: 600,
        },
      },
      blue: {
        enabled: {
          text: 600,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
      },
      violet: {
        enabled: {
          text: 600,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
      },
      gray: {
        enabled: {
          text: 600,
        },
      },
      neutral: {
        enabled: {
          text: 600,
        },
      },
    },
    Link: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 600,
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
      teal: {
        enabled: {
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
      blue: {
        enabled: {
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
      red: {
        enabled: {
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
      violet: {
        enabled: {
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
      yellow: {
        enabled: {
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
      green: {
        enabled: {
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
      gray: {
        enabled: {
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
      neutral: {
        enabled: {
          text: 500,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 700,
        },
        visited: {
          text: 600,
        },
      },
    },
    Toolbar: {
      default: {
        palette: "gray",
        enabled: {
          background: 800,
          backgroundOpacity: 1000,
          border: 0,
          borderOpacity: 100,
        },
      },
    },
    Kanban: {
      default: {
        palette: "gray",
        enabled: {
          background: 700,
        },
      },
    },
    KanbanHeader: {
      default: {
        palette: "gray",
        enabled: {
          background: 800,
          text: 300,
        },
      },
    },
    KanbanCard: {
      default: {
        palette: "gray",
        enabled: {
          highlight: 600,
          background: 800,
          text: 300,
        },
      },
      teal: {
        enabled: {
          highlight: 600,
        },
      },
      blue: {
        enabled: {
          highlight: 600,
        },
      },
      red: {
        enabled: {
          highlight: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          highlight: 600,
        },
      },
      green: {
        enabled: {
          highlight: 600,
        },
      },
      gray: {
        enabled: {
          highlight: 600,
        },
      },
      neutral: {
        enabled: {
          highlight: 600,
        },
      },
    },
    TableSpecialLastRow: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 500,
        },
        hover: {
          fontWeight: 700,
        },
        focus: {
          fontWeight: 700,
        },
        active: {
          fontWeight: 700,
        },
        disabled: {
          fontWeight: 700,
        },
      },
    },
    Drawer: {
      default: {
        palette: "gray",
        enabled: {
          background: 800,
          fontWeight: 600,
          text: 0,
        },
      },
      teal: {
        enabled: {
          background: 800,
          fontWeight: 600,
          text: 0,
        },
      },
      blue: {
        enabled: {
          background: 800,
          fontWeight: 600,
          text: 0,
        },
      },
      red: {
        enabled: {
          background: 800,
          fontWeight: 600,
          text: 0,
        },
      },
      violet: {
        enabled: {
          background: 800,
          fontWeight: 600,
          text: 0,
        },
      },
      yellow: {
        enabled: {
          background: 800,
          fontWeight: 600,
          text: 0,
        },
      },
      green: {
        enabled: {
          background: 800,
          fontWeight: 600,
          text: 0,
        },
      },
      gray: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      neutral: {
        enabled: {
          background: 800,
          fontWeight: 600,
          text: 0,
        },
      },
    },
    Danger: {
      default: {
        palette: "red",
        enabled: {
          text: 500,
          border: 600,
        },
      },
    },
    Background: {
      default: {
        palette: "gray",
        enabled: {
          background: 900,
        },
      },
    },
    Surface: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
        },
      },
    },
    Text: {
      default: {
        palette: "gray",
        enabled: {
          text: 300,
        },
      },
    },
  },

  palette: {
    outline: {
      width: "0.125rem",
      style: "solid",
      context: "primary",
      weight: 500,
      offset: "0.188rem",
    },
    disabled: {
      color: "gray",
      text: 500,
      background: 0,
      opacity: 50,
    },
    gray: {
      0: "#FFFFFF",
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
    },
    neutral: {
      0: "#FFFFFF",
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
    },
    blue: {
      0: "#FFFFFF",
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
    },
    teal: {
      0: "#FFFFFF",
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
    },
    red: {
      0: "#FFFFFF",
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
    },
    violet: {
      0: "#FFFFFF",
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
    },
    yellow: {
      0: "#FFFFFF",
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
    },
    green: {
      0: "#FFFFFF",
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
    },
    opacity: {
      50: "5%",
      100: "10%",
      200: "20%",
      250: "25%",
      300: "30%",
      400: "40%",
      500: "50%",
      600: "60%",
      700: "70%",
      800: "80%",
      900: "90%",
      950: "95%",
      1000: "100%",
    },
  },
  sizes: {
    small: "2.25rem",
    medium: "2.5rem",
    large: "2.75rem",
  },
  borderRadius: {
    slight: "4px",
    regular: "8px",
    edged: "12px",
    curved: "1000px",
    none: "0",
  },
  boxShadow: {
    xs: "0px 1px 2px rgba(0, 0, 0, 0.05);",
    s: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);",
    m: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);",
    l: " 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);",
    xl: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);",
    xxl: "0px 25px 50px -12px rgba(0, 0, 0, 0.25);",
  },
  typography: {
    fontFamily: "Nunito",
    component: {
      weight: 700,
      large: {
        fontSize: "1rem",
        lineHeight: "1.125rem",
        subTxtFontSize: "0.9rem",
      },
      medium: {
        fontSize: "0.875rem",
        lineHeight: "1rem",
        subTxtFontSize: "0.775rem",
      },
      small: {
        fontSize: "0.875rem",
        lineHeight: "1rem",
        subTxtFontSize: "0.775rem",
      },
    },
  },
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
    popover: 1299,
  },
};

export const lanaco_e_commerce = {
  name: "Lanaco E-Commerce",
  class: "lnc-e-comm",
  colorContext: {
    primary: "violet",
    secondary: "blue",
    success: "green",
    warning: "yellow",
    danger: "red",
    information: "violet",
    neutral: "neutral",
  },
  components: {
    MainMenu: {
      default: {
        palette: "neutral",
        enabled: {
          color: 900,
          mediumColor: 600,
          lightColor: 500,
          lightestColor: 100,
          dividerOpacity: 80,
          headerBackgroundColor: 50,
          notificationBackgroundColor: 900,
          notificationOpacity: 80,
        },
        hover: { backgroundColor: 900, backgroundOpacity: 80 },
      },
      teal: {
        enabled: {
          textColor: 700,
          descriptionOpacity: 800,
          backgroundColor: 600,
          backgroundOpacity: 80,
        },
      },
      gray: {
        enabled: {
          color: 600,
          descriptionOpacity: 800,
          backgroundColor: 600,
          backgroundOpacity: 80,
        },
      },
    },
    Input: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          prefix: 500,
          suffix: 500,
          caret: 900,
          fontWeight: 400,
        },
        focus: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          prefix: 500,
          suffix: 500,
          caret: 900,
          fontWeight: 400,
        },
        hover: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          prefix: 500,
          suffix: 500,
          caret: 900,
          fontWeight: 400,
        },
        active: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          prefix: 500,
          suffix: 500,
          caret: 900,
          fontWeight: 400,
        },
        disabled: {
          border: 200,
          background: 0,
          backgroundOpacity: 50,
          text: 500,
        },
      },
      teal: {
        enabled: {
          caret: 500,
        },
      },
      green: {
        enabled: {
          border: 300,
          text: 900,
          prefix: 600,
          suffix: 600,
        },
      },
      yellow: {
        enabled: {
          border: 300,
          text: 900,
          prefix: 600,
          suffix: 600,
        },
      },
      red: {
        enabled: {
          border: 300,
          text: 900,
          prefix: 600,
          suffix: 600,
        },
      },
    },
    DateInput: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 200,
          placeholder: 500,
          text: 900,
          textWeekDays: 400,
          fontWeight: 200,
          todayColor: 600,
        },
        hover: {
          text: 600,
          background: 600,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 600,
          backgroundDayOpacity: 200,
        },
        disabled: {
          border: 200,
          background: 0,
          backgroundOpacity: 50,
          text: 500,
        },
      },
      teal: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      blue: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      red: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      violet: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      yellow: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      green: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      gray: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
      neutral: {
        enabled: {
          today: 600,
        },
        hover: {
          text: 600,
          background: 500,
          backgroundOpacity: 200,
        },
        active: {
          background: 500,
          text: 0,
          textDay: 600,
          backgroundDay: 500,
          backgroundDayOpacity: 200,
        },
      },
    },
    Chip: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 50,
          text: 900,
          fontWeight: 700,
          backdropFilter: "blur(48px)",
        },
        hover: {
          background: 100,
          backgroundOpacity: 100,
          text: 900,
          fontWeight: 700,
        },
        focus: {
          background: 100,
          backgroundOpacity: 100,
          text: 900,
          fontWeight: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 200,
          text: 900,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      blue: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      red: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      violet: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      yellow: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      green: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      gray: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
      neutral: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 500,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 500,
          backgroundOpacity: 400,
          text: 600,
        },
      },
    },
    Icon: {
      default: {
        palette: "gray",
        enabled: {
          icon: 600,
        },
      },
      teal: {
        enabled: {
          icon: 600,
        },
      },
      blue: {
        enabled: {
          icon: 600,
        },
      },
      red: {
        enabled: {
          icon: 600,
        },
      },
      violet: {
        enabled: {
          icon: 600,
        },
      },
      yellow: {
        enabled: {
          icon: 600,
        },
      },
      green: {
        enabled: {
          icon: 600,
        },
      },
      gray: {
        enabled: {
          icon: 500,
        },
      },
      neutral: {
        enabled: {
          icon: 600,
        },
      },
    },
    StarRating: {
      default: {
        palette: "gray",
        enabled: {
          fontSize: "1rem",
          lineHeight: "1.25rem",
          filledColor: 900,
          emptyColor: 300,
          textColor: 500,
        },
        disabled: { filledColor: 500, emptyColor: 300, textColor: 500 },
      },
      neutral: {
        enabled: {
          fontSize: "1rem",
          lineHeight: "1.25rem",
          filledColor: 900,
          emptyColor: 300,
          textColor: 500,
        },
      },
      yellow: { enabled: { filledColor: 500 } },
    },
    TabRegular: {
      default: {
        palette: "gray",
        enabled: {
          text: 500,
          line: 300,
          lineHeight: "2px",
          lineRadius: "0",
          fontWeight: 700,
        },
        hover: {
          text: 500,
          line: 300,
          lineHeight: "1px",
          fontWeight: 700,
        },
        active: {
          text: 500,
          line: 300,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      blue: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      red: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      violet: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      yellow: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      green: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      gray: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
      neutral: {
        enabled: {},
        hover: {
          text: 700,
          line: 700,
        },
        active: {
          text: 700,
          line: 700,
        },
      },
    },
    TabPill: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 0,
          text: 500,
          fontWeight: 600,
        },
        hover: {
          background: 100,
          backgroundOpacity: 1000,
          text: 500,
          fontWeight: 600,
        },
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 500,
          fontWeight: 600,
        },
      },
      teal: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 500,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 1000,
          text: 700,
        },
      },
      blue: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      red: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      violet: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      yellow: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      green: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      gray: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
      neutral: {
        enabled: {},
        hover: {
          background: 100,
          backgroundOpacity: 50,
          text: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 0,
          text: 700,
        },
      },
    },
    TabUnderline: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 0,
          text: 500,
          line: 200,
          fontWeight: 700,
          lineHeight: "2px",
        },
        hover: {
          background: 0,
          backgroundOpacity: 0,
          text: 500,
          line: 200,
          fontWeight: 700,
          lineHeight: "1px",
        },
        active: {
          background: 0,
          backgroundOpacity: 0,
          fontWeight: 700,
        },
      },
      teal: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      blue: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      red: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      violet: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      yellow: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      green: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      gray: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
      neutral: {
        enabled: {},
        hover: {},
        active: {
          background: 0,
          backgroundOpacity: 0,
          text: 700,
          line: 700,
        },
      },
    },
    Checkbox: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 300,
          text: 600,
          fontWeight: 600,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
        focus: {
          border: 300,
          text: 600,
          backgroundOpacity: 1000,
          fontWeight: 600,
        },
        hover: {
          background: 900,
          backgroundOpacity: 100,
          border: 300,
          text: 600,
          fontWeight: 600,
        },
        active: {
          background: 600,
          backgroundOpacity: 1000,
          border: 600,
          text: 600,
          fontWeight: 600,
        },
        disabled: {
          border: 300,
        },
      },
      teal: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      blue: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      red: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      violet: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      yellow: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      green: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      gray: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      neutral: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
    },
    Radio: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          border: 300,
          text: 600,
          fontWeight: 600,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
        focus: {
          border: 300,
          text: 600,
          backgroundOpacity: 1000,
          fontWeight: 600,
        },
        hover: {
          background: 900,
          backgroundOpacity: 100,
          border: 300,
          text: 600,
          fontWeight: 600,
        },
        active: {
          background: 600,
          backgroundOpacity: 1000,
          border: 600,
          text: 600,
          fontWeight: 600,
        },
        disabled: {
          border: 300,
          background: 300,
        },
      },
      teal: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      blue: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      red: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      violet: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      yellow: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      green: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      gray: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
      neutral: {
        active: {
          background: 600,
          border: 600,
        },
        focus: {
          border: 600,
        },
        indterminate: {
          background: 600,
          border: 600,
        },
      },
    },
    Alert: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      teal: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      blue: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      red: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      violet: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      yellow: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      green: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      gray: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
      neutral: {
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          text: 700,
          action: 800,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
        },
      },
    },
    Notification: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 1000,
          text: 500,
          action: 600,
          title: 800,
          fontWeight: 400,
          fontWeightAction: 600,
          fontWeightTitle: 600,
          border: 200,
          icon: 600,
        },
      },
      teal: {
        enabled: {
          icon: 600,
        },
      },
      blue: {
        enabled: {
          icon: 600,
        },
      },
      red: {
        enabled: {
          icon: 600,
        },
      },
      violet: {
        enabled: {
          icon: 600,
        },
      },
      yellow: {
        enabled: {
          icon: 600,
        },
      },
      green: {
        enabled: {
          icon: 600,
        },
      },
      gray: {
        enabled: {
          icon: 600,
        },
      },
      neutral: {
        enabled: {
          icon: 600,
        },
      },
    },
    ButtonFilled: {
      default: {
        palette: "turquoise",
        enabled: {
          background: 50,
          backgroundOpacity: 50,
          text: 900,
          fontWeight: 700,
        },
        hover: {
          background: 100,
          backgroundOpacity: 100,
          text: 100,
          fontWeight: 700,
        },
        focus: {
          background: 100,
          backgroundOpacity: 100,
          text: 100,
          fontWeight: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 200,
          text: 100,
          fontWeight: 700,
        },
        disabled: {
          background: 200,
          // background: 200,
          text: 500,
          // background: 0,
          // opacity: 50,
        },
      },
      teal: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
        hover: {
          background: 700,
        },
        focus: {
          background: 700,
        },
        active: {
          background: 800,
        },
      },
      red: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
        hover: {
          background: 700,
        },
        focus: {
          background: 700,
        },
        active: {
          background: 700,
        },
      },
      yellow: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      green: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      gray: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 400,
        },
        hover: {
          background: 500,
        },
        focus: {
          background: 500,
        },
        active: {
          background: 600,
        },
      },
    },
    ButtonTinted: {
      default: {
        palette: "turquoise",
        enabled: {
          background: 50,
          backgroundOpacity: 50,
          text: 100,
          fontWeight: 700,
        },
        hover: {
          background: 100,
          backgroundOpacity: 100,
          text: 100,
          fontWeight: 700,
        },
        focus: {
          background: 100,
          backgroundOpacity: 100,
          text: 100,
          fontWeight: 700,
        },
        active: {
          background: 100,
          backgroundOpacity: 200,
          text: 100,
          fontWeight: 700,
        },
        disabled: {
          // background: 200,
          color: "gray",
          text: 500,
          background: 0,
          opacity: 50,
        },
      },
      teal: {
        enabled: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        hover: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        focus: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        active: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
      },
      blue: {
        enabled: {
          background: 0,
          backgroundOpacity: 500,
          text: 700,
        },
        hover: {
          background: 0,
          backgroundOpacity: 500,
          text: 700,
        },
        focus: {
          background: 0,
          backgroundOpacity: 500,
          text: 700,
        },
        active: {
          background: 0,
          backgroundOpacity: 500,
          text: 700,
        },
      },
      red: {
        enabled: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        hover: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        focus: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        active: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
      },
      violet: {
        enabled: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        hover: {
          background: 0,
          backgroundOpacity: 500,
        },
        focus: {
          background: 0,
          backgroundOpacity: 500,
        },
        active: {
          background: 0,
          backgroundOpacity: 500,
        },
      },
      yellow: {
        enabled: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        hover: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
      },
      green: {
        enabled: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        hover: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        focus: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        active: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
      },
      gray: {
        enabled: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        hover: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        focus: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        active: {
          background: 0,
          backgroundOpacity: 500,
          text: 600,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 500,
          backgroundOpacity: 200,
          text: 600,
        },
        hover: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        focus: {
          background: 600,
          backgroundOpacity: 300,
          text: 600,
        },
        active: {
          background: 700,
          backgroundOpacity: 400,
          text: 600,
        },
      },
    },
    ButtonBasic: {
      default: {
        palette: "turquoise",
        enabled: {
          border: 900,
          borderOpacity: 100,
          background: 0,
          backgroundOpacity: 50,
          text: 600,
          fontWeight: 700,
        },
        hover: {
          border: 900,
          borderOpacity: 100,
          background: 900,
          backgroundOpacity: 50,
          text: 100,
          fontWeight: 700,
        },
        focus: {
          border: 900,
          borderOpacity: 100,
          background: 900,
          backgroundOpacity: 50,
          text: 100,
          fontWeight: 700,
        },
        active: {
          border: 900,
          borderOpacity: 100,
          background: 900,
          backgroundOpacity: 100,
          text: 100,
          fontWeight: 700,
        },
        disabled: {
          background: 0,
          backgroundOpacity: 50,
          text: 500,
          // background: 0,
          // opacity: 50,
        },
      },
      teal: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      blue: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      violet: {
        enabled: {
          text: 600,
        },
        hover: {},
        focus: {},
        active: {},
        disabled: {
          text: 400,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      gray: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
      neutral: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 600,
        },
        focus: {
          text: 600,
        },
        active: {
          text: 600,
        },
        disabled: {
          text: 400,
        },
      },
    },
    Badge: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 500,
          fontWeight: 400,
          text: 900,
        },
      },
      teal: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      blue: {
        enabled: {
          background: 600,
          text: 0,
        },
      },
      red: {
        enabled: {
          background: 600,
          text: 0,
        },
      },
      violet: {
        enabled: {
          background: 0,
          backgroundOpacity: 500,
        },
      },
      yellow: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 0,
        },
      },
      green: {
        enabled: {
          background: 600,
          text: 0,
        },
      },
      gray: {
        enabled: {
          background: 600,
          text: 0,
        },
      },
      neutral: {
        enabled: {
          background: 600,
          text: 0,
        },
      },
    },
    Spinner: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
          unfilled: 200,
        },
      },
      teal: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
          fontWeight: 600,
          text: 600,
        },
      },
    },
    Progress: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 700,
          text: 0,
          unfilled: 300,
          sizes: {
            small: "1rem",
            medium: "1.25rem",
            large: "1.5rem",
          },
        },
      },
      teal: {
        enabled: {
          background: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
        },
      },
    },
    Range: {
      default: {
        palette: "gray",
        enabled: {
          background: 600,
          fontWeight: 700,
          text: 0,
          unfilled: 300,
        },
        disabled: {
          background: 500,
        },
      },
      teal: {
        enabled: {
          background: 600,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
      },
      red: {
        enabled: {
          background: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          background: 600,
        },
      },
      green: {
        enabled: {
          background: 600,
        },
      },
      gray: {
        enabled: {
          background: 600,
        },
      },
      neutral: {
        enabled: {
          background: 600,
        },
      },
    },
    ButtonGroup: {
      default: {
        palette: "gray",
        enabled: {
          border: 200,
        },
      },
    },
    TableCell: {
      default: {
        palette: "gray",
        enabled: {},
        hover: {},
        focus: {},
        active: {},
        disabled: {},
      },
    },
    Table: {
      default: {
        palette: "gray",
        enabled: {
          border: 300,
          background: 0,
        },
        hover: {
          border: 300,
          background: 0,
        },
        focus: {
          border: 300,
          background: 0,
        },
        active: {
          border: 300,
          background: 0,
        },
        disabled: {
          border: 300,
          background: 0,
        },
      },
    },
    TableHeadCell: {
      default: {
        palette: "gray",
        enabled: {
          border: 300,
          background: 50,
          text: 900,
          fontWeight: 700,
        },
        hover: {
          border: 300,
          background: 100,
          text: 900,
          fontWeight: 700,
        },
        focus: {
          border: 300,
          background: 50,
          text: 900,
          fontWeight: 700,
        },
        active: {
          border: 300,
          background: 50,
          text: 900,
          fontWeight: 700,
        },
        disabled: {
          background: 0,
          backgroundOpacity: 50,
        },
      },
    },
    TableRow: {
      default: {
        palette: "gray",
        enabled: {
          border: 200,
          background: 0,
        },
        hover: {
          border: 200,
          background: 50,
        },
        focus: {
          border: 200,
          background: 50,
        },
        active: {
          border: 200,
          background: 50,
        },
        disabled: {
          border: 200,
          background: 50,
        },
      },
      teal: {
        active: {
          background: 50,
        },
      },
      blue: {
        active: {
          background: 50,
        },
      },
      red: {
        active: {
          background: 50,
        },
      },
      violet: {
        active: {
          background: 50,
        },
      },
      yellow: {
        active: {
          background: 50,
        },
      },
      green: {
        active: {
          background: 50,
        },
      },
      gray: {
        active: {
          background: 50,
        },
      },
      neutral: {
        active: {
          background: 50,
        },
      },
    },
    Modal: {
      default: {
        palette: "gray",
        enabled: {
          bg: 0,
          cancelButton: 400,
        },
        hover: {
          cancelBtnBg: 900,
          cancelBtnBgOpacity: 50,
        },
        focus: {
          cancelBtnBg: 900,
          cancelBtnBgOpacity: 100,
        },
      },
    },
    ConfirmationForm: {
      default: {
        palette: "gray",
        enabled: {
          icon: 600,
          trackBg: 100,
        },
      },
      teal: {
        enabled: {
          icon: 600,
        },
      },
      blue: {
        enabled: {
          icon: 600,
        },
      },
      red: {
        enabled: {
          icon: 600,
        },
      },
      violet: {
        enabled: {
          icon: 600,
        },
      },
      yellow: {
        enabled: {
          icon: 600,
        },
      },
      green: {
        enabled: {
          icon: 600,
        },
      },
      gray: {
        enabled: {
          icon: 600,
        },
      },
      neutral: {
        enabled: {
          icon: 600,
        },
      },
    },
    Popover: {
      default: {
        palette: "gray",
        enabled: {
          bg: 0,
          boxShadow:
            "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px -10px 10px -5px rgba(0, 0, 0, 0.02)",
        },
      },
    },
    FormField: {
      default: {
        palette: "gray",
        enabled: {
          label: 600,
          text: 600,
          fontWeight: 600,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
      },
    },
    Toggle: {
      default: {
        palette: "gray",
        enabled: {
          background: 900,
          backgroundOpacity: 200,
        },
        hover: {
          background: 900,
          backgroundOpacity: 300,
        },
        focus: {
          background: 900,
          backgroundOpacity: 300,
        },
        active: {
          background: 900,
          backgroundOpacity: 400,
        },
        disabled: {
          background: 900,
          backgroundOpacity: 200,
        },
      },
      teal: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      blue: {
        enabled: {
          background: 600,
        },
        hover: {
          background: 700,
        },
        focus: {
          background: 700,
        },
        active: {
          background: 800,
        },
      },
      red: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      violet: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      yellow: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      green: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
      },
      gray: {
        enabled: {
          background: 500,
        },
        hover: {
          background: 600,
        },
        focus: {
          background: 600,
        },
        active: {
          background: 700,
        },
        disabled: {
          background: 200,
        },
      },
      neutral: {
        enabled: {
          background: 400,
        },
        hover: {
          background: 500,
        },
        focus: {
          background: 500,
        },
        active: {
          background: 600,
        },
      },
    },
    ToggleSlider: {
      default: {
        palette: "gray",
        enabled: {
          background: 50,
          backgroundOpacity: 1000,
          fontWeight: 900,
        },
        hover: {
          background: 50,
          backgroundOpacity: 1000,
        },
        focus: {
          background: 50,
          backgroundOpacity: 1000,
        },
        active: {
          background: 50,
          backgroundOpacity: 1000,
        },
        disabled: {
          background: 50,
          backgroundOpacity: 700,
        },
      },
    },
    ToggleIcon: {
      default: {
        palette: "gray",
        enabled: {
          text: 400,
        },
        hover: {
          text: 400,
        },
        focus: {
          text: 400,
        },
        active: {
          text: 400,
        },
        disabled: {
          text: 400,
        },
      },
    },
    UploadedFile: {
      default: {
        palette: "gray",
        enabled: {
          color: 600,
        },
      },
      teal: {
        enabled: {
          color: 600,
        },
      },
      blue: {
        enabled: {
          color: 600,
        },
      },
      red: {
        enabled: {
          color: 600,
        },
      },
      violet: {
        enabled: {
          color: 600,
        },
      },
      yellow: {
        enabled: {
          color: 600,
        },
      },
      green: {
        enabled: {
          color: 600,
        },
      },
      gray: {
        enabled: {
          color: 600,
        },
      },
      neutral: {
        enabled: {
          color: 600,
        },
      },
    },
    Dropdown: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          removeIcon: 400,
        },
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      teal: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      blue: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      red: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      violet: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      yellow: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      green: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      gray: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
      neutral: {
        hover: {
          background: 100,
        },
        selected: {
          background: 500,
        },
      },
    },
    MenuItem: {
      default: {
        palette: "gray",
        enabled: {
          icon: 600,
          fontWeight: 600,
          separator: 100,
        },
        focus: {
          background: 500,
          icon: 300,
          text: 0,
        },
        active: {
          background: 600,
          icon: 300,
          text: 0,
          fontWeight: 800,
        },
        hover: {
          background: 500,
          icon: 300,
          text: 0,
          fontWeight: 600,
        },
      },
      violet: {
        enabled: {
          icon: 600,
          text: 600,
        },
        focus: {
          background: 50,
          icon: 600,
          text: 600,
        },
        active: {
          background: 50,
          icon: 600,
          text: 600,
        },
        hover: {
          background: 50,
          icon: 600,
          text: 600,
        },
      },
    },
    DragDropFiles: {
      default: {
        palette: "gray",
        enabled: {
          border: 200,
          text: 500,
          icon: 500,
          fontWeight: 400,
        },
      },
    },
    Accordion: {
      default: {
        palette: "gray",
        enabled: {
          line: 200,
          fontWeight: 600,
          summaryText: 500,
          text: 700,
        },
      },
    },
    Breadcrumbs: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 600,
          text: 600,
        },
      },
      teal: {
        enabled: {
          text: 600,
        },
      },
      blue: {
        enabled: {
          text: 600,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
      },
      violet: {
        enabled: {
          text: 600,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
      },
      gray: {
        enabled: {
          text: 600,
        },
      },
      neutral: {
        enabled: {
          text: 600,
        },
      },
    },
    Link: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 600,
          text: 600,
        },
        hover: {
          text: 400,
        },
        active: {
          text: 900,
        },
        visited: {
          text: 800,
        },
      },
      teal: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      blue: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      red: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      violet: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      yellow: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      green: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      gray: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
      neutral: {
        enabled: {
          text: 600,
        },
        hover: {
          text: 500,
        },
        active: {
          text: 800,
        },
        visited: {
          text: 700,
        },
      },
    },
    Toolbar: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          backgroundOpacity: 1000,
          border: 900,
          borderOpacity: 100,
        },
      },
    },
    Kanban: {
      default: {
        palette: "gray",
        enabled: {
          background: 100,
        },
      },
    },
    KanbanHeader: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
          text: 600,
        },
      },
    },
    KanbanCard: {
      default: {
        palette: "gray",
        enabled: {
          highlight: 600,
          background: 0,
          text: 600,
        },
      },
      teal: {
        enabled: {
          highlight: 600,
        },
      },
      blue: {
        enabled: {
          highlight: 600,
        },
      },
      red: {
        enabled: {
          highlight: 600,
        },
      },
      violet: {
        enabled: {
          background: 600,
        },
      },
      yellow: {
        enabled: {
          highlight: 600,
        },
      },
      green: {
        enabled: {
          highlight: 600,
        },
      },
      gray: {
        enabled: {
          highlight: 600,
        },
      },
      neutral: {
        enabled: {
          highlight: 600,
        },
      },
    },
    TableSpecialLastRow: {
      default: {
        palette: "gray",
        enabled: {
          fontWeight: 500,
        },
        hover: {
          fontWeight: 700,
        },
        focus: {
          fontWeight: 700,
        },
        active: {
          fontWeight: 700,
        },
        disabled: {
          fontWeight: 700,
        },
      },
    },
    Drawer: {
      default: {
        palette: "gray",
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      teal: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      blue: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      red: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      violet: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      yellow: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      green: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      gray: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
      neutral: {
        enabled: {
          background: 500,
          fontWeight: 600,
          text: 0,
        },
      },
    },
    MainMenu: {
      default: {
        palette: "neutral",
        enabled: {
          color: 900,
          mediumColor: 600,
          lightColor: 500,
          lightestColor: 100,
          dividerOpacity: 80,
          headerBackgroundColor: 50,
          notificationBackgroundColor: 900,
          notificationOpacity: 80,
        },
        hover: { backgroundColor: 900, backgroundOpacity: 80 },
      },
      teal: {
        enabled: {
          textColor: 700,
          descriptionOpacity: 800,
          backgroundColor: 600,
          backgroundOpacity: 80,
        },
      },
      gray: {
        enabled: {
          color: 600,
          descriptionOpacity: 800,
          backgroundColor: 600,
          backgroundOpacity: 80,
        },
      },
    },
    Danger: {
      default: {
        palette: "red",
        enabled: {
          text: 600,
          border: 300,
        },
      },
    },
    Background: {
      default: {
        palette: "gray",
        enabled: {
          background: 100,
        },
      },
    },
    Surface: {
      default: {
        palette: "gray",
        enabled: {
          background: 0,
        },
      },
    },
    Text: {
      default: {
        palette: "gray",
        enabled: {
          text: 600,
        },
      },
    },
  },

  palette: {
    outline: {
      width: "0",
      style: "solid",
      context: "primary",
      weight: 0,
      offset: "0",
    },
    disabled: {
      color: "gray",
      text: 400,
      background: 900,
      opacity: 50,
    },
    gray: {
      0: "#FFFFFF",
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
    },
    neutral: {
      0: "#FFFFFF",
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
    },
    blue: {
      0: "#FFFFFF",
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
    },
    teal: {
      0: "#FFFFFF",
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
    },
    red: {
      0: "#FFFFFF",
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
    },
    violet: {
      0: "#FFFFFF",
      50: "#ECEAF1",
      100: "#F6F4F8",
      200: "#ECEAF1",
      300: "#E3DFEA",
      400: "#D9D5E4",
      500: "#CFCADD",
      600: "#412B76",
      700: "#342161",
    },
    turquoise: {
      0: "#FFFFFF",
      100: "#2EE8B6",
    },
    yellow: {
      0: "#FFFFFF",
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
    },
    green: {
      0: "#FFFFFF",
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
    },
    opacity: {
      50: "5%",
      100: "10%",
      200: "20%",
      250: "25%",
      300: "30%",
      400: "40%",
      500: "50%",
      600: "60%",
      700: "70%",
      800: "80%",
      900: "90%",
      950: "95%",
      1000: "100%",
    },
  },
  sizes: {
    small: "2.25rem",
    medium: "2.5rem",
    large: "2.75rem",
  },
  borderRadius: {
    slight: "4px",
    regular: "8px",
    edged: "12px",
    curved: "1000px",
    none: "0",
  },
  boxShadow: {
    xs: "0px 1px 2px rgba(0, 0, 0, 0.05);",
    s: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);",
    m: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);",
    l: " 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);",
    xl: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);",
    xxl: "0px 25px 50px -12px rgba(0, 0, 0, 0.25);",
  },
  typography: {
    fontFamily: "Nunito",
    component: {
      weight: 700,
      large: {
        fontSize: "1rem",
        lineHeight: "1.125rem",
        subTxtFontSize: "0.9rem",
      },
      medium: {
        fontSize: "0.875rem",
        lineHeight: "1rem",
        subTxtFontSize: "0.775rem",
      },
      small: {
        fontSize: "0.875rem",
        lineHeight: "1rem",
        subTxtFontSize: "0.775rem",
      },
    },
  },
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
    popover: 1299,
  },
};

const themes = [lanaco_light, lanaco_dark, lanaco_e_commerce];

export { themes };
