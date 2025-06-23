import { Suspense } from "react";

import BlogCardDetailedSkeleton from "../../blog-components/blog-card-detailed/skeleton";

const SkeletonProducts = ({ itemsCount = 6, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: itemsCount }, (_, index) => (
        <BlogCardDetailedSkeleton
          key={`${keyPrefix}-skeleton-product-card-${index}`}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

const SuspenseBlogDetailed = ({
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

export default SuspenseBlogDetailed;
