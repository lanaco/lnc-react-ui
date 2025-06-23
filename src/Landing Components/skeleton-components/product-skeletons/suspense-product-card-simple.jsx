import { Suspense } from "react";

import SimpleProductCardSkeleton from "../../product components/simple-product-card/skeleton";

const SkeletonProducts = ({ itemsCount = 6, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: itemsCount }, (_, index) => (
        <SimpleProductCardSkeleton
          key={`${keyPrefix}-skeleton-product-card-${index}`}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

const SuspenseSimpleProductCard = ({
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

export default SuspenseSimpleProductCard;
