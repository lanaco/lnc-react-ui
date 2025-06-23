import { Suspense } from "react";

import SimpleBlogCardCenteredSkeleton from "../../blog-components/simple-blog-card-centered/skeleton";

const SkeletonProducts = ({ itemsCount = 6, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: itemsCount }, (_, index) => (
        <SimpleBlogCardCenteredSkeleton
          key={`${keyPrefix}-skeleton-product-card-${index}`}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

const SuspenseBlogSimpleCentered = ({
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

export default SuspenseBlogSimpleCentered;
