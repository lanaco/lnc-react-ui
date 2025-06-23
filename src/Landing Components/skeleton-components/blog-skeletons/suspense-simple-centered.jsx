import { Suspense } from "react";

import SimpleBlogCardCenteredSkeleton from "../../blog-components/simple-blog-card-centered/skeleton";

const SkeletonProducts = ({ limit = 3, isLoading = false, keyPrefix }) => {
  return (
    <>
      {Array.from({ length: limit }, (_, index) => (
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

export default SuspenseBlogSimpleCentered;
