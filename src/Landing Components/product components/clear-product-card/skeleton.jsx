/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Wrapper } from "./style";

const LandingPageClearProductCardSkeleton = forwardRef(({}, ref) => {
  return (
    <Wrapper className="product-card">
      <img className="skeleton-img" />
      <div className="skeleton-title"></div>
    </Wrapper>
  );
});

export default LandingPageClearProductCardSkeleton;