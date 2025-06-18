import { forwardRef } from "react";

import { SkeletonWrapper } from "./style";

const ShopCardSkeleton = forwardRef(({}, ref) => {
  return (
    <SkeletonWrapper>
      <div className="wrapper__content">
        <div className="wrapper__image"></div>
        <div className="wrapper__info">
          <div className="wrapper__info-item"></div>
          <div className="wrapper__info-item"></div>
          <div className="wrapper__info-item"></div>
          <div className="wrapper__info-item"></div>
        </div>
      </div>
    </SkeletonWrapper>
  );
});

export default ShopCardSkeleton;
