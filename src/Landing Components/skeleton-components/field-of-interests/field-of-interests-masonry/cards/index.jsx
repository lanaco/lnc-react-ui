/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonFieldOfInterestsMasonryCard from "./skeleton";

const SuspenseFieldOfInterestsMasonryCard = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonFieldOfInterestsMasonryCard keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseFieldOfInterestsMasonryCard;
