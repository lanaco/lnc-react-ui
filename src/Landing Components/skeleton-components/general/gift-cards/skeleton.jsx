import { SkeletonColumnWrapper, SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonGiftCards = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonColumnWrapper key={`${keyPrefix}-1`} alignItems="center">
        <SkeletonLinePlaceholder height="11rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder
          height="1.25rem"
          borderRadius="0.75rem"
          width="5rem"
        />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-2`}
        alignItems="center"
        noGradient={true}
      >
        <SkeletonLinePlaceholder height="11rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder
          height="1.25rem"
          borderRadius="0.75rem"
          width="5rem"
        />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-3`}
        alignItems="center"
        noGradient={true}
      >
        <SkeletonLinePlaceholder height="11rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder
          height="1.25rem"
          borderRadius="0.75rem"
          width="5rem"
        />
      </SkeletonColumnWrapper>
      <SkeletonColumnWrapper
        key={`${keyPrefix}-4`}
        alignItems="center"
        noGradient={true}
      >
        <SkeletonLinePlaceholder height="11rem" borderRadius="0.75rem" />
        <SkeletonLinePlaceholder
          height="1.25rem"
          borderRadius="0.75rem"
          width="5rem"
        />
      </SkeletonColumnWrapper>
    </Container>
  );
};

export default SkeletonGiftCards;
