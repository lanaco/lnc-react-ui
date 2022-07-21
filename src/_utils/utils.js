import React from "react";
import { useMedia } from "react-use";
import { screenSizes } from "../Data display/Table/constants/constants";

export const getCustomRender = (type, children) => {
  var customElement = getChildComponentByType(type, children);

  if (customElement && React.isValidElement(customElement))
    return { current: customElement };

  return { current: null };
};

export const getChildComponentByType = (type = "", children, props = {}) => {
  if (children && type) {
    var component = React.Children.toArray(children)
      .reverse()
      .find((child) => child.props.__TYPE__ === type);

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
  children = null
) => {
  if (customRender.current !== null) {
    properties.children =
      children !== null ? children : customRender.current.props.children;

    return React.cloneElement(customRender.current, properties);
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

export const getColor = (theme, color, state, colorWeight) => {
  const paletteColor = theme.palette[color];
  const cssState = paletteColor.cssStates[state];
  const paletteOpacity = theme.palette.opacity[cssState];
  const hexColorValue = paletteColor[colorWeight];

  return hexToRgba(hexColorValue, paletteOpacity ?? "100%");
};

export const getSize = (theme, size) => {
  return theme.sizes[size];
};

export const getComponentTypography = (theme, size) => {
  return `
    font-weight: ${theme.typography.component.weight};
    font-size: ${theme.typography.component[size].fontSize};
    line-height: ${theme.typography.component[size].lineHeight};
  `;
};

export const getBorderRadius = (theme, type) => {
  return theme.borderRadius[type];
};

export const getOutline = (theme) => {
  const color =
    theme.palette[theme.palette.outline.color][theme.palette.outline.weight];

  const outline = `outline: ${theme.palette.outline.width} ${theme.palette.outline.style} ${color};`;
  const offset = `outline-offset: ${theme.palette.outline.offset};`;

  return { outline, offset };
};

export const getDisabledState = (theme) => {
  const paletteColor = theme.palette.disabled.color;
  const bgColorHex =
    theme.palette[paletteColor][theme.palette.disabled.backgroundWeight];
  const fontColorHex =
    theme.palette[paletteColor][theme.palette.disabled.textWeight];
  const opacity = theme.palette.opacity[theme.palette.disabled.opacityWeight];
  const bgColorRgba = hexToRgba(bgColorHex, opacity ?? "100%");

  return `
    background-color: ${bgColorRgba};
    color: ${fontColorHex};
  `;
};
