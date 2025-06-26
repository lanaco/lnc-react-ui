/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { CardWrapper, ExternalWrapper } from "./style";

const GiftCardSkeleton = forwardRef(({}, ref) => {
  return (
    <ExternalWrapper ref={ref} className="simple-gift-card">
      <CardWrapper>
        <div className="skeleton-card"></div>
      </CardWrapper>
    </ExternalWrapper>
  );
});

export default GiftCardSkeleton;
