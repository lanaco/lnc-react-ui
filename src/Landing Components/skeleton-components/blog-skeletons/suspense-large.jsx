import { Suspense } from "react";

import BlogCardLargeSkeleton from "../../blog-components/blog-card-large/skeleton";

const SkeletonProducts = ({ limit = 2, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: limit }, (_, index) => (
        <BlogCardLargeSkeleton
          key={`${keyPrefix}-skeleton-product-card-${index}`}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};

const SuspenseBlogLarge = ({
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

export default SuspenseBlogLarge;
