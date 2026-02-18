/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonFieldOfInterestsWithAvatarsCard from "./skeleton";

const SuspenseFieldOfInterestsWithAvatarsCard = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonFieldOfInterestsWithAvatarsCard keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseFieldOfInterestsWithAvatarsCard;
