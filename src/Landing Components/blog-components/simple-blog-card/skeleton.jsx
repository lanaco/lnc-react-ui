import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";

const SimpleBlogCardSkeleton = forwardRef(({}, ref) => {
  return (
    // <LandingPageClearProductCardSkeleton />
    <Wrapper className="product-card">
      <div className="skeleton-img" />
      <div className="card-title"></div>
      <TextWrapper></TextWrapper>
    </Wrapper>
  );
});

export default SimpleBlogCardSkeleton;
