import { hexToRgba } from "../_utils/utils";

export const getDisabledBg = (theme) => {
    const paletteColor = theme.palette.disabled.color;
    const bgColorHex =
      theme.palette[paletteColor][theme.palette.disabled.background];
    const opacity = theme.palette.opacity[theme.palette.disabled.opacity];
    const bgColorRgba = hexToRgba(bgColorHex, opacity ?? "100%");
  
    return bgColorRgba;
  };
  export const getDisabledColor = (theme) => {
    const paletteColor = theme.palette.disabled.color;
    const fontColorHex =
      theme.palette[paletteColor][theme.palette.disabled.text];
  
    return fontColorHex;
  }