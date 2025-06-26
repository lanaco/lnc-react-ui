import { forwardRef } from "react";
import { TextWrapper, Wrapper } from "./style";

const SimpleBlogCardCenteredSkeleton = forwardRef((props, ref) => {
  const { onCardClick } = props;

  return (
    // <SimpleBlogCardSkeleton />
    <Wrapper className="product-card" onClick={onCardClick}>
      <div className="skeleton-img" />
      <TextWrapper>
        <div className="skeleton-title"></div>
      </TextWrapper>
    </Wrapper>
  );
});

export default SimpleBlogCardCenteredSkeleton;
