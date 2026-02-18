/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonFieldOfInterestsWithTagsTag from "./skeleton";

const SuspenseFieldOfInterestsWithTagsTag = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonFieldOfInterestsWithTagsTag keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseFieldOfInterestsWithTagsTag;
