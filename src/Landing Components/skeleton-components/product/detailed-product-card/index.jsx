import { Suspense } from "react";

import SkeletonDetailedProductCard from "./skeleton";

const SuspenseDetailedProductCard = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonDetailedProductCard keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseDetailedProductCard;
