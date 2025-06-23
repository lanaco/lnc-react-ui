/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { Wrapper } from "./style";

const LandingPageOverlayGeneralCardSkeleton = forwardRef(({}, ref) => {

  return (
    <Wrapper ref={ref}>
      <div className="img-skeleton"></div>
    </Wrapper>
  );
});

export default LandingPageOverlayGeneralCardSkeleton;
