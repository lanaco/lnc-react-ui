import { forwardRef } from "react";

import { useTheme } from "../../ThemeProvider/ThemeProvider";

import { Wrapper } from "./style";

const LandingPageOverlayGeneralCardSkeleton = forwardRef(({}, ref) => {
  const { theme } = useTheme();

  return (
    <Wrapper theme={theme}>
      <div className="wrapper__image--skeleton"></div>
      <div className="wrapper__text">
        <div className="text__title--skeleton"></div>
        <div className="text__description--skeleton"></div>
      </div>
      <div className="text__action--skeleton"></div>
    </Wrapper>
  );
});

export default LandingPageOverlayGeneralCardSkeleton;
