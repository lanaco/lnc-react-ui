import { Suspense } from "react";

import ReviewCardSkeleton from "../../reviews-components/review-card/skeleton";

const SkeletonProducts = ({ itemsCount = 6, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: itemsCount }, (_, index) => (
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
  itemsCount = 5,
  keyPrefix,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {}
      {isLoading === true ? (
        <SkeletonProducts
          isLoading={isLoading}
          itemsCount={itemsCount}
          keyPrefix={keyPrefix}
        />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseReviewCard;
