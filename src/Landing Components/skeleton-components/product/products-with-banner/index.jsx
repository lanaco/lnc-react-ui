import { Suspense } from "react";

import SkeletonProductsWithBanner from "./skeleton";

const SuspenseProductsWithBanner = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonProductsWithBanner keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseProductsWithBanner;
