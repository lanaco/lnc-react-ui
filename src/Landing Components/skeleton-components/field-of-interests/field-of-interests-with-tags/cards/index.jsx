/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonFieldOfInterestsWithTagsCard from "./skeleton";

const SuspenseFieldOfInterestsWithTagsCard = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonFieldOfInterestsWithTagsCard keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseFieldOfInterestsWithTagsCard;
