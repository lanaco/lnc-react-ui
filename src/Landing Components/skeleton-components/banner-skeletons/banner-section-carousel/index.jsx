import { Suspense } from "react";

import BannerCarouselSkeleton from "../../../banner-components/banner-carousel/skeleton";

const SuspenseBannerCarousel = ({
  children,
  fallbackComponent = <></>,
  isLoading = false,
  keyPrefix,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <BannerCarouselSkeleton key={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseBannerCarousel;
