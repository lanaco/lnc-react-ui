import { Suspense } from "react";

import SkeletonBlogsSectionDetailed from "./skeleton";

const SuspenseBlogsSectionDetailed = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonBlogsSectionDetailed keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseBlogsSectionDetailed;
