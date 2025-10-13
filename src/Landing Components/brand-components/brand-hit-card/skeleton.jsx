import { forwardRef } from "react";

import { SkeletonWrapper } from "./style";

const BrandHitCardSkeleton = forwardRef(({}, ref) => {
  return <SkeletonWrapper />;
});

export default BrandHitCardSkeleton;
