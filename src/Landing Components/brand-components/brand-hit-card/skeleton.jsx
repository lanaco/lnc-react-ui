import { forwardRef } from "react";

import { SkeletonWrapper } from "./style";

const BrandHitCardSkeleton = forwardRef(({}, ref) => {
  return <SkeletonWrapper></SkeletonWrapper>;
});

export default BrandHitCardSkeleton;
