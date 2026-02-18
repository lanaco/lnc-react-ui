/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonBlogCardsSponsored from "./skeleton";

const SuspenseBlogCardsSponsored = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonBlogCardsSponsored keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseBlogCardsSponsored;
