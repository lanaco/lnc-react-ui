import { isValidElement, Children, cloneElement } from "react";
import { useMedia } from "react-use";
import { screenSizes } from "../Data display/Table/constants/constants";

export const getCustomRender = (type, children) => {
  var customElement = getChildComponentByType(type, children);

  if (customElement && isValidElement(customElement))
    return { current: customElement };

  return { current: null };
};

export const getChildComponentByType = (type = "", children) => {
  if (children && type) {
    var component = Children.toArray(children)
      .reverse()
      .find(
        (child) =>
          child.props?.__TYPE__ === type || child.type?.displayName === type
      );

    if (component) return component;
  }

  return null;
};

export const getCustomRenderById = (type, id, children) => {
  var customElement = getChildComponentByTypeId(type, id, children);

  if (customElement && isValidElement(customElement))
    return { current: customElement };

  return { current: null };
};

export const getChildComponentByTypeId = (type = "", id, children) => {
  if (children && type) {
    var component = Children.toArray(children)
      .reverse()
      .find(
        (child) =>
          (child.props?.__TYPE__ === type ||
            child.type?.displayName === type) &&
          (id ? child.props?.id === id : !child.props?.id)
      );

    if (component) return component;
  }

  return null;
};

export const useScreenSize = () => {
  const sizeXS = useMedia(screenSizes.XS.mediaQuery);
  const sizeS = useMedia(screenSizes.S.mediaQuery);
  const sizeM = useMedia(screenSizes.M.mediaQuery);
  const sizeL = useMedia(screenSizes.L.mediaQuery);
  const sizeXL = useMedia(screenSizes.XL.mediaQuery);

  if (sizeXS) return screenSizes.XS.type;
  if (sizeS) return screenSizes.S.type;
  if (sizeM) return screenSizes.M.type;
  if (sizeL) return screenSizes.L.type;
  if (sizeXL) return screenSizes.XL.type;

  return screenSizes.M.type;
};

export const renderCustomElement = (
  customRender,
  properties,
  children = null,
  combineChildren = false
) => {
  if (customRender.current !== null) {
    properties.children =
      children !== null ? (
        combineChildren == true ? (
          <>
            {customRender.current.props.children}
            {children}
          </>
        ) : (
          children
        )
      ) : (
        customRender.current.props.children
      );

    return cloneElement(customRender.current, properties);
  }

  return null;
};

export const hexToRgba = (hex, a) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let value = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: a,
      }
    : null;

  return value ? `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})` : null;
};

export const getColorRgbaValue = (
  theme,
  component,
  context,
  stateProp,
  colorProp,
  opacityProp
) => {
  const palette = theme.colorContext[context];
  const componentDefault = theme.components[component].default;
  const componentState = theme.components[component]?.[palette]?.[stateProp];
  const colorWeight = componentState?.[colorProp];
  const defaultColorWeight = componentDefault[stateProp][colorProp];
  const opacityWeight = componentState?.[opacityProp];
  const defaultOpacityWeight = componentDefault[stateProp][opacityProp];

  const hexColorValue =
    colorWeight || colorWeight == 0
      ? theme.palette[palette][colorWeight]
      : theme.palette[componentDefault.palette][defaultColorWeight];
  const opacityValue =
    opacityWeight || opacityWeight == 0
      ? theme.palette.opacity[opacityWeight]
      : theme.palette.opacity[defaultOpacityWeight];

  return hexToRgba(hexColorValue, opacityValue ?? "100%");
};

export const getComponentPropValue = (
  theme,
  component,
  context,
  stateProp,
  prop
) => {
  const palette = theme.colorContext[context];
  const componentDefault = theme.components[component].default;
  const componentState = theme.components[component]?.[palette]?.[stateProp];
  const value = componentState?.[prop];
  const defaultValue = componentDefault[stateProp][prop];

  return value || value == 0 ? value : defaultValue;
};

export const getSizeValueWithUnits = (theme, size) => {
  return theme.sizes[size];
};

export const getComponentTypographyCss = (
  theme,
  component,
  size,
  stateProp
) => {
  const componentDefault = theme.components[component].default;
  const fontWeight = componentDefault[stateProp].fontWeight;

  return `
    font-weight: ${fontWeight};
    font-size: ${theme.typography.component[size].fontSize};
    line-height: ${theme.typography.component[size].lineHeight};
  `;
};

export const getBorderRadiusValueWithUnits = (theme, type) => {
  return theme.borderRadius[type];
};

export const getBoxShadowValue = (theme, type) => {
  return theme.boxShadow[type];
};

export const getOutlineCss = (theme, noOffset) => {
  const palette = theme.colorContext[theme.palette.outline.context];

  const color = theme.palette[palette][theme.palette.outline.weight];

  return `
    outline: ${theme.palette.outline.width} ${
    theme.palette.outline.style
  } ${color};
    ${!noOffset && `outline-offset: ${theme.palette.outline.offset}`};
    `;
};

export const getDisabledStateCss = (theme) => {
  const paletteColor = theme.palette.disabled.color;
  const bgColorHex =
    theme.palette[paletteColor][theme.palette.disabled.background];
  const fontColorHex = theme.palette[paletteColor][theme.palette.disabled.text];
  const opacity = theme.palette.opacity[theme.palette.disabled.opacity];
  const bgColorRgba = hexToRgba(bgColorHex, opacity ?? "100%");

  return `
    background-color: ${bgColorRgba};
    color: ${fontColorHex};
  `;
};

export const getDisabledBackgroundCss = (theme) => {
  const paletteColor = theme.palette.disabled.color;
  const bgColorHex =
    theme.palette[paletteColor][theme.palette.disabled.background];
  const opacity = theme.palette.opacity[theme.palette.disabled.opacity];
  const bgColorRgba = hexToRgba(bgColorHex, opacity ?? "100%");
  return `
    background-color: ${bgColorRgba};
  `;
};

export const truncateText = () => {
  return `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
};

export const truncateTextInRows = (rowCount) => {
  if (
    rowCount === null ||
    rowCount === undefined ||
    rowCount == 0 ||
    rowCount == 1
  ) {
    return truncateText();
  }

  return `
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    word-break: break-word;

    @supports (-webkit-line-clamp: ${rowCount}) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;
      display: -webkit-box;
      -webkit-line-clamp: ${rowCount};
      -webkit-box-orient: vertical;    
    }
  `;
};

export const linearGradientAnimation = (
  deg = "-45deg",
  bgSizePercent = "500% 500%",
  firstColor = "#b3b9c4",
  secondColor = "#e5e9f1"
) => {
  return `
    @keyframes gradient {
      0% {
        background-position: 0% 0%;
      }
      50% {
        background-position: 0% 50%;
      }
      100% {
        background-position: 0% 100%;
      }

      500% {
        background-position: 0% 0%;
      }
    }

    background: linear-gradient(${deg}, ${firstColor}, ${secondColor});
    background-size: ${bgSizePercent};
    animation: gradient 1s linear infinite alternate;
  `;
};

export const isDefinedNotEmptyString = (data) =>
  data !== null && data !== undefined && data !== "";

export const isDefined = (data) => data !== null && data !== undefined;

export const formatPrice = (price) => {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const CurrencySymbolMap = {
  EUR: "€",
  BAM: "KM",
  USD: "$",
  GBP: "£",
  CHF: "CHF",
  HRK: "kn",
  RSD: "RSD",
  BGN: "лв",
  MKD: "ден",
  PLN: "zł",
  CZK: "Kč",
  HUF: "Ft",
  RON: "lei",
  TRY: "₺",
  SEK: "kr",
  DKK: "kr",
  NOK: "kr",
  ISK: "kr",
  CAD: "C$",
  AUD: "A$",
  NZD: "NZ$",
  JPY: "¥",
  CNY: "¥",
  KRW: "₩",
  INR: "₹",
  PKR: "₨",
  AED: "د.إ",
  SAR: "ر.س",
  QAR: "ر.ق",
  KWD: "د.ك",
  OMR: "ر.ع.",
  BHD: "د.ب",
  JOD: "د.ا",
  LBP: "ل.ل",
  EGP: "E£",
  ZAR: "R",
  NGN: "₦",
  GHS: "₵",
  KES: "KSh",
  TZS: "TSh",
};

export const GetCurrencySymbol = (currency) => {
  return CurrencySymbolMap[currency] || "";
};

function caloriesToMacros(
  totalCalories,
  ratios = { carbs: 0.5, protein: 0.25, fat: 0.25 }
) {
  // Validate ratios sum to 1 (or very close)
  const totalRatio = ratios.carbs + ratios.protein + ratios.fat;
  if (Math.abs(totalRatio - 1) > 0.01) {
    throw new Error("Ratios must add up to 1.");
  }

  // Calories per gram constants
  const calPerGram = { carbs: 4, protein: 4, fat: 9 };

  // Calculate grams for each macro
  const grams = {
    carbs: Math.round((totalCalories * ratios.carbs) / calPerGram.carbs),
    protein: Math.round((totalCalories * ratios.protein) / calPerGram.protein),
    fat: Math.round((totalCalories * ratios.fat) / calPerGram.fat),
  };

  return grams;
}

export const calculateCalories = ({
  gender,
  age,
  heightCm,
  weightKg,
  activityLevel,
  goal,
}) => {
  // BMR calculation using Mifflin-St Jeor Equation
  let bmr;
  if (gender === "male") {
    bmr = 10 * +weightKg + 6.25 * +heightCm - 5 * +age + 5;
  } else if (gender === "female") {
    bmr = 10 * +weightKg + 6.25 * +heightCm - 5 * +age - 161;
  } else {
    throw new Error("Invalid gender. Use 'male' or 'female'.");
  }

  // Activity factor
  const activityFactors = {
    // sedentary: 1.2,
    // light: 1.375,
    // moderate: 1.55,
    // active: 1.725,
    // 'very active': 1.9
    verylow: 1.2,
    moderate: 1.55,
    veryactive: 1.9,
  };

  const activityMultiplier = activityFactors[activityLevel.toLowerCase()];
  if (!activityMultiplier) {
    throw new Error("Invalid activity level");
  }

  // Total Daily Energy Expenditure (TDEE)
  const tdee = bmr * activityMultiplier;

  // Adjust based on goal
  let dailyCalories;
  switch (goal.toLowerCase()) {
    case "loseweight":
      dailyCalories = tdee - 500;
      break;
    case "maintaining":
      dailyCalories = tdee;
      break;
    case "gainmuscle":
      dailyCalories = tdee + 500;
      break;
    default:
      throw new Error("Invalid goal. Use: 'lose', 'maintain', or 'gain'.");
  }

  const macrosResults = caloriesToMacros(dailyCalories);

  return {
    calories: Math.round(dailyCalories),
    ...macrosResults,
  };
};

export const formatTimerText = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export const formatString = (text, ...args) => {
  return text.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};

export const getRoundedNumber = (num) => {
  num = num || 0;

  if (num > 999) {
    return Math.round(num / 1000).toLocaleString() + "K";
  }

  return num.toLocaleString();
};

export const formatLocaleDateString = (isoDate) => {
  const date = new Date(isoDate);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${day}. ${month}. ${year}`;
};

// Backend works with UTC time, frontend shows in current time
// We need to handle the timezone difference properly
export const normalizeDate = (date) => {
  if (!date) return null;
  if (date instanceof Date) {
    // If it's a Date object, convert to ISO string (already includes 'Z')
    return date.toISOString();
  }
  // If it's a string, ensure it has 'Z' for UTC parsing
  const dateStr = String(date);
  // Check if it already has timezone info (Z, +HH:MM, or -HH:MM pattern)
  if (dateStr.endsWith("Z") || /[+-]\d{2}:\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  // Add 'Z' to indicate UTC if not present
  return dateStr + "Z";
};

// Generic function to calculate day number for campaigns/promotions
// Works with UTC dates from backend
export const getDayNumberPrecise = (startDate, endDate) => {
  // Backend sends UTC times, so we need to treat them as UTC
  // Handle both Date objects and strings properly
  const startStr = normalizeDate(startDate);
  const endStr = normalizeDate(endDate);
  const start = startStr ? new Date(startStr) : null;
  const end = endStr ? new Date(endStr) : null;
  const now = new Date();

  if (!start || !end) {
    return -1;
  }

  // Calculate total duration in milliseconds
  const totalDurationMs = end.getTime() - start.getTime();

  // Calculate elapsed time in milliseconds
  const elapsedMs = now.getTime() - start.getTime();

  // Calculate total days (including fractional days)
  const totalDays = totalDurationMs / (1000 * 60 * 60 * 24);

  // Calculate current day (including fractional days)
  const currentDay = elapsedMs / (1000 * 60 * 60 * 24);

  // If hasn't started yet
  if (elapsedMs < 0) {
    return -1;
  }

  // If has ended
  if (elapsedMs >= totalDurationMs) {
    return {
      day: Math.ceil(totalDays),
      totalDays: Math.ceil(totalDays),
      isEnded: true,
    };
  }

  return {
    day: Math.floor(currentDay), // Make it 1-based (Day 1, 2, 3, 4 instead of 0, 1, 2, 3)
    totalDays: Math.ceil(totalDays),
    isEnded: false,
    // Additional precision info for progress calculations
    dayProgress: currentDay / totalDays, // 0 to 1 progress within current day
    totalProgress: elapsedMs / totalDurationMs, // 0 to 1 overall progress
  };
};

// Calculate days remaining until a date (using UTC normalization)
export const calcDaysRemaining = (targetDate) => {
  if (!targetDate) return null;

  const targetStr = normalizeDate(targetDate);
  const target = targetStr ? new Date(targetStr) : null;
  const now = new Date();

  if (!target) return null;

  const diffMs = target.getTime() - now.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  return Math.ceil(diffMs / dayMs);
};

// Calculate days until a date (using UTC normalization)
export const calcDaysUntil = (targetDate) => {
  if (!targetDate) return null;

  const targetStr = normalizeDate(targetDate);
  const target = targetStr ? new Date(targetStr) : null;
  const now = new Date();

  if (!target) return null;

  const diffMs = target.getTime() - now.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  return Math.ceil(diffMs / dayMs);
};
