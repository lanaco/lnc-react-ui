import {
  SkeletonColumnWrapper,
  SkeletonLinePlaceholder,
  SkeletonSquarePlaceholder,
} from "../../style";
import { Container } from "./style";

const SkeletonReviews = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonColumnWrapper key={`${keyPrefix}-1`}>
        <SkeletonSquarePlaceholder
          height="6.25rem"
          width="6.25rem"
          borderRadius="0.75rem"
        />
        <SkeletonLinePlaceholder height="2rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder
          height="1rem"
          borderRadius="0.75rem"
          width="6rem"
        />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper key={`${keyPrefix}-2`} noGradient={true}>
        <SkeletonSquarePlaceholder
          height="6.25rem"
          width="6.25rem"
          borderRadius="0.75rem"
        />
        <SkeletonLinePlaceholder height="2rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder
          height="1rem"
          borderRadius="0.75rem"
          width="6rem"
        />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper key={`${keyPrefix}-3`} noGradient={true}>
        <SkeletonSquarePlaceholder
          height="6.25rem"
          width="6.25rem"
          borderRadius="0.75rem"
        />
        <SkeletonLinePlaceholder height="2rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder height="1rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder
          height="1rem"
          borderRadius="0.75rem"
          width="6rem"
        />
      </SkeletonColumnWrapper>
    </Container>
  );
};

export default SkeletonReviews;
