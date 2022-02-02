import React from "react";
import { useMedia } from "react-use";
import { screenSizes } from "../AdvancedGrid/constants/constants";

export const getChildComponentByType = (type = "", children, props = {}) => {
  //TODO: validate properties

  if (children && type) {
    var component = React.Children.toArray(children).find(
      (child) => child.props.__TYPE__ === type
    );

    props.children = component.props.children;

    if (React.isValidElement(component))
      return React.cloneElement(component, props);
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
