import React from "react";
import { useMedia } from "react-use";
import { screenSizes } from "../AdvancedGrid/constants/constants";

export const getCustomRender = (type, children) => {
  var customElement = getChildComponentByType(type, children);

  if (customElement && React.isValidElement(customElement))
    return { current: customElement };

  return { current: null };
};

export const getChildComponentByType = (type = "", children, props = {}) => {
  //TODO: validate properties

  if (children && type) {
    var component = React.Children.toArray(children).find(
      (child) => child.props.__TYPE__ === type
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
  children = null
) => {
  if (customRender.current !== null) {
    properties.children =
      children !== null ? children : customRender.current.props.children;

    return React.cloneElement(customRender.current, properties);
  }

  return null;
};
