import { Suspense } from "react";

import SkeletonBlogsSectionWithFilters from "./skeleton";

const SuspenseBlogsSectionWithFilters = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonBlogsSectionWithFilters keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseBlogsSectionWithFilters;
