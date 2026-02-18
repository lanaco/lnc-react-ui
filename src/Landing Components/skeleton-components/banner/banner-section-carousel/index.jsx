/* eslint-disable react/prop-types */
import { Suspense } from "react";

import SkeletonBannerSectionCarousel from "./skeleton";

const SuspenseBannerSectionCarousel = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonBannerSectionCarousel keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseBannerSectionCarousel;
