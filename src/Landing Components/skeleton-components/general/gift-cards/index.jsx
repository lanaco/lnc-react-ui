/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonGiftCards from "./skeleton";

const SuspenseGiftCards = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonGiftCards keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseGiftCards;
