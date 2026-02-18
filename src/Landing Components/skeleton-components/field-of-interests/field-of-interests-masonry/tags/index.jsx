/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonFieldOfInterestsMasonryTag from "./skeleton";

const SuspenseFieldOfInterestsMasonryTag = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonFieldOfInterestsMasonryTag keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseFieldOfInterestsMasonryTag;
