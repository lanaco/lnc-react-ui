/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonSimpleCategories from "./skeleton";

const SuspenseSimpleCategories = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonSimpleCategories keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseSimpleCategories;
