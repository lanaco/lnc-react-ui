import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";

const BlogCardLargeSkeleton = forwardRef(({}, ref) => {

  return (
    <Wrapper className="blog-card">
      <div className="skeleton-img" />
      <TextWrapper>
        <div className="skeleton-title"></div>
      </TextWrapper>
    </Wrapper>
  );
});

export default BlogCardLargeSkeleton;
