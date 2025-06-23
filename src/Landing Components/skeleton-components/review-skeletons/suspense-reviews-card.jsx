import { Suspense } from "react";

import ReviewCardSkeleton from "../../reviews-components/review-card/skeleton";

const SkeletonProducts = ({ limit = 3, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: limit }, (_, index) => (
        <ReviewCardSkeleton
          key={`${keyPrefix}-skeleton-review-card-${index}`}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

const SuspenseReviewCard = ({
  children,
  fallbackComponent = <></>,
  isLoading = false,
  limit,
  keyPrefix,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {}
      {isLoading === true ? (
        <SkeletonProducts
          isLoading={isLoading}
          limit={limit}
          keyPrefix={keyPrefix}
        />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseReviewCard;
