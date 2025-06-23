import { forwardRef } from "react";
import { Wrapper, ExternalWrapper } from "./style";
import StarRating from "src/ui/components/star-rating";

const ReviewCardSkeleton = forwardRef(({}, ref) => {

  return (
    <ExternalWrapper
      className="review-card"
    >
      <Wrapper>
        <div className="skeleton-img" />
        <div className="cont"></div>
        <StarRating color="warning" rating={0} />
      </Wrapper>
    </ExternalWrapper>
  );
});

export default ReviewCardSkeleton;
