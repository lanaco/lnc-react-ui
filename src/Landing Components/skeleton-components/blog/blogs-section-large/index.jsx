/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonBlogsSectionLarge from "./skeleton";

const SuspenseBlogsSectionLarge = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonBlogsSectionLarge keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseBlogsSectionLarge;
