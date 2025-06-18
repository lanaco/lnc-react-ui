import { forwardRef } from "react";

import { SkeletonWrapper } from "./style";

const GeneralWithTagsCardSkeleton = forwardRef(({}, ref) => {
  return <SkeletonWrapper></SkeletonWrapper>;
});

export default GeneralWithTagsCardSkeleton;
