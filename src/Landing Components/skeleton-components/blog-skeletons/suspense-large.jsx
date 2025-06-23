import { Suspense } from "react";

import BlogCardLargeSkeleton from "../../blog-components/blog-card-large/skeleton";

const SkeletonProducts = ({ itemsCount = 6, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: itemsCount }, (_, index) => (
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

export default SuspenseBlogLarge;
