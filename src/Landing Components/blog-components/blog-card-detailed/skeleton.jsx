import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";

const BlogCardDetailedSkeleton = forwardRef(({}, ref) => {
  return (
    <Wrapper className="blog-card">
      <div className="skeleton-img" />
      <TextWrapper>
        <div className="info-wr"></div>
        <div className="skeleton-title"></div>
        <div className="info-wr-skeleton"></div>
      </TextWrapper>
    </Wrapper>
  );
});

export default BlogCardDetailedSkeleton;
