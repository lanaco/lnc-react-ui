/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { SkeletonWrapper } from "./style";

const SimpleProductCardSkeleton = forwardRef((props, ref) => {
  return (
    <SkeletonWrapper />
  );
});

export default SimpleProductCardSkeleton;
