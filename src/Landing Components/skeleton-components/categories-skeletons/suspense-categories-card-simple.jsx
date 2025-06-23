import { Suspense } from "react";

import ReviewCardSkeleton from "../../category-components/category-simple-card/skeleton";

const SkeletonProducts = ({ limit = 12, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: limit }, (_, index) => (
        <ReviewCardSkeleton
          key={`${keyPrefix}-skeleton-category-card-${index}`}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

const SuspenseSimpleCategoryCard = ({
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

export default SuspenseSimpleCategoryCard;
