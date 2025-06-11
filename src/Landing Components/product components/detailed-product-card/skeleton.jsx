/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Wrapper } from "./style";

const DetailedProductCardSkeleton = forwardRef(({}, ref) => {
  return (
    <Wrapper className="product-card">
      <img className="skeleton-img" />
      <div className="wrapper-card-1">
        <div className="skeleton-title"></div>
        <div className="skeleton-tags"></div>
      </div>

      <div className="wrapper-card-1">
        <div className="skeleton-price"></div>
        <div className="skeleton-sponsored" />
      </div>
    </Wrapper>
  );
});

export default DetailedProductCardSkeleton;
