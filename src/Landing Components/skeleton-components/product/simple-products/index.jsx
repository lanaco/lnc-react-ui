/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonSimpleProducts from "./skeleton";

const SuspenseSimpleProducts = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonSimpleProducts keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseSimpleProducts;
