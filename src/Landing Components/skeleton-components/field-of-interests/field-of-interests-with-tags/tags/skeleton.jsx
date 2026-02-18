/* eslint-disable react/prop-types */
import { SkeletonColumnWrapper, SkeletonLinePlaceholder } from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsWithTagsTag = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__tags">
      <SkeletonColumnWrapper
        key={`${keyPrefix}-1`}
        alignItems="center"
        gap="0.5rem"
      >
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-2`}
        alignItems="center"
        gap="0.5rem"
        noGradient={true}
      >
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-3`}
        alignItems="center"
        gap="0.5rem"
        noGradient={true}
      >
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-4`}
        alignItems="center"
        gap="0.5rem"
        noGradient={true}
      >
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-5`}
        alignItems="center"
        gap="0.5rem"
        noGradient={true}
      >
        <SkeletonLinePlaceholder height="1.5rem" width="8rem" />
      </SkeletonColumnWrapper>
    </Container>
  );
};

export default SkeletonFieldOfInterestsWithTagsTag;
