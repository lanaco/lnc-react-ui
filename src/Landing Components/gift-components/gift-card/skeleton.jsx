import { forwardRef } from "react";

import { SkeletonWrapper } from "./style";

const GiftCardSkeleton = forwardRef(({}, ref) => {
  return <SkeletonWrapper></SkeletonWrapper>;
});

export default GiftCardSkeleton;
