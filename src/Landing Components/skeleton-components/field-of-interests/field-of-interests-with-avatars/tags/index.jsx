/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonFieldOfInterestsWithAvatarsTag from "./skeleton";

const SuspenseFieldOfInterestsWithAvatarsTag = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonFieldOfInterestsWithAvatarsTag keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseFieldOfInterestsWithAvatarsTag;
