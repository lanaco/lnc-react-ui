import { forwardRef } from "react";
import { CardWrapper } from "./style";

const ReviewCardSkeleton = forwardRef(({}, ref) => {
  return (
    <CardWrapper className="simple-category-card">
      <div className="skeleton-img" />
      <div className="card-content"></div>
    </CardWrapper>
  );
});

export default ReviewCardSkeleton;
