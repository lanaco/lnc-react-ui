import { Suspense } from "react";

import BlogCardDetailedSkeleton from "../../blog-components/blog-card-detailed/skeleton";

const SkeletonProducts = ({ limit = 3, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: limit }, (_, index) => (
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

export default SuspenseBlogDetailed;
