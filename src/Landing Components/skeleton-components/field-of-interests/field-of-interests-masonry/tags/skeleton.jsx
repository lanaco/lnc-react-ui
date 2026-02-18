/* eslint-disable react/prop-types */
import {
  SkeletonCirclePlaceholder,
  SkeletonColumnWrapper,
  SkeletonLinePlaceholder,
} from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsMasonryTag = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__tags">
      <SkeletonColumnWrapper
        key={`${keyPrefix}-1`}
        alignItems="center"
        gap="0.5rem"
      >
        <SkeletonCirclePlaceholder width="2.75rem" height="2.75rem" />
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-2`}
        alignItems="center"
        gap="0.5rem"
        noGradient={true}
      >
        <SkeletonCirclePlaceholder width="2.75rem" height="2.75rem" />
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-3`}
        alignItems="center"
        gap="0.5rem"
        noGradient={true}
      >
        <SkeletonCirclePlaceholder width="2.75rem" height="2.75rem" />
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-4`}
        alignItems="center"
        gap="0.5rem"
        noGradient={true}
      >
        <SkeletonCirclePlaceholder width="2.75rem" height="2.75rem" />
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-5`}
        alignItems="center"
        gap="0.5rem"
        noGradient={true}
      >
        <SkeletonCirclePlaceholder width="2.75rem" height="2.75rem" />
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
    </Container>
  );
};

export default SkeletonFieldOfInterestsMasonryTag;
