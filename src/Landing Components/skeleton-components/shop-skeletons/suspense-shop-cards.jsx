import { Suspense } from "react";

import ShopCardSkeleton from "../../shop-components/shop-card/skeleton";

const SkeletonShopCards = ({ limit = 4, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: limit }, (_, index) => (
        <ShopCardSkeleton
          key={`${keyPrefix}-skeleton-shop-card-${index}`}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

const SuspenseShopCards = ({
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
        <SkeletonShopCards
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

export default SuspenseShopCards;
