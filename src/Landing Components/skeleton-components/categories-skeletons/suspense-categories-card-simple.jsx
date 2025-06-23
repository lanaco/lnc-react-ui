import { Suspense } from "react";

import ReviewCardSkeleton from "../../category-components/category-simple-card/skeleton";

const SkeletonProducts = ({ itemsCount = 6, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: itemsCount }, (_, index) => (
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

export default SuspenseSimpleCategoryCard;
