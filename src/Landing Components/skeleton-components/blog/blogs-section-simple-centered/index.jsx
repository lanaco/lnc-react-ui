import { Suspense } from "react";

import SkeletonBlogsSectionSimpleCentered from "./skeleton";

const SuspenseBlogsSectionSimpleCentered = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonBlogsSectionSimpleCentered keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseBlogsSectionSimpleCentered;
