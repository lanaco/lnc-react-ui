/* eslint-disable react/prop-types */
import {
  SkeletonColumnContainer,
  SkeletonRect,
  SkeletonSquare,
} from "../../style";
import { Container } from "./style";

const SkeletonReviews = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2, 3]?.map((x) => (
        <SkeletonColumnContainer key={`${keyPrefix}-${x}`}>
          <SkeletonSquare size="6.25rem" />
          <SkeletonRect width="100%" height="2rem" borderRadius="0.75rem" />
          <SkeletonRect width="100%" height="1rem" borderRadius="0.75rem" />
          <SkeletonRect width="100%" height="1rem" borderRadius="0.75rem" />
          <SkeletonRect height="1rem" borderRadius="0.75rem" width="6rem" />
        </SkeletonColumnContainer>
      ))}
    </Container>
  );
};

export default SkeletonReviews;
