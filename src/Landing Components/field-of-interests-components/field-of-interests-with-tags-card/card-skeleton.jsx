import { forwardRef } from "react";

import { SkeletonWrapper } from "./style";

const FieldOfInterestsWithTagsCardSkeleton = forwardRef(({}, ref) => {
  return (
    <SkeletonWrapper>
      <div className="wrapper__image"></div>
      <div className="wrapper__content">
        <div className="wrapper__title"></div>
        <div className="wrapper__description"></div>
      </div>
    </SkeletonWrapper>
  );
});

export default FieldOfInterestsWithTagsCardSkeleton;
