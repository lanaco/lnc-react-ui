import { forwardRef } from "react";

import { SkeletonWrapper } from "./style";

const BrandHitCardSkeleton = forwardRef(({}, ref) => {
  return <SkeletonWrapper theme={theme}></SkeletonWrapper>;
});

export default BrandHitCardSkeleton;
