import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";

const SimpleBlogCardHorizontalSkeleton = forwardRef(({}, ref) => {

  return (
    <Wrapper className="blog-card">
      <TextWrapper>
        <div className="skeleton-title"></div>
        <div className="text-wr"></div>
        <div className="skeleton-action"></div>
      </TextWrapper>
      <div className="skeleton-img" />
    </Wrapper>
  );
});

export default SimpleBlogCardHorizontalSkeleton;
