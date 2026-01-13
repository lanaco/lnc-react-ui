import { Suspense } from "react";

import SkeletonMasonryGeneralCards from "./skeleton";

const SuspenseMasonryGeneralCards = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonMasonryGeneralCards keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseMasonryGeneralCards;
