/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonShopCards from "./skeleton";

const SuspenseShopCards = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonShopCards keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseShopCards;
