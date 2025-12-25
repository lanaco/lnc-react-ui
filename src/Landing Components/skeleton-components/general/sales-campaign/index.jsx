import { Suspense } from "react";

import SkeletonSalesCampaign from "./skeleton";

const SuspenseSalesCampaign = ({
  keyPrefix,
  isLoading = false,
  fallbackComponent = <></>,
  children,
}) => {
  return (
    <Suspense fallbackComponent={fallbackComponent}>
      {isLoading === true ? (
        <SkeletonSalesCampaign keyPrefix={keyPrefix} />
      ) : (
        children
      )}
    </Suspense>
  );
};

export default SuspenseSalesCampaign;
